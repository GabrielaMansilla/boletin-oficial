import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import "./ListadoBoletines.css";
import useGet from "../../hook/useGet";
import axios from "../../config/axios";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Input,
  Snackbar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import File from "@mui/icons-material/UploadFileRounded";
import "../AltaBoletines/AltaBoletinesNuevo.css";
import "./ListadoBoletines.css";

export default function ColumnGroupingTable() {
  const [boletines, getboletin, setBoletines] = useGet(
    "/boletin/listado",
    axios
  );
  const [tiposOrigen, loadingOrigen, getTiposOrigen] = useGet(
    "/boletin/listarOrigen",
    axios
  );
  const [tiposNorma, loadingNorma, getTiposNoma] = useGet(
    "/norma/listar",
    axios
  );
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editingBoletin, setEditingBoletin] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (boletin) => {
    // Copia el boletín para evitar mutaciones no deseadas
    const editedBoletin = { ...boletin };
    // Si la fecha de publicación existe y no está vacía, conviértela al formato deseado
    if (editedBoletin.fecha_publicacion) {
      // Convierte la fecha al formato 'YYYY-MM-DD'
      editedBoletin.fecha_publicacion = editedBoletin.fecha_publicacion.slice(
        0,
        10
      );
    }

    // Establece el boletín editado en el estado de edición
    setEditingBoletin(editedBoletin);
    setOpenDialog(true);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  // Modifica la función handleInputChange para que no actualice la ID de Boletín
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Si el campo de entrada no es la ID de Boletín, actualiza el estado de edición
    if (name !== "id_boletin") {
      setEditingBoletin((prevBoletin) => ({
        ...prevBoletin,
        [name]: value,
      }));
    }
  };

  const cargarBoletines = () => {
    axios
      .get("/boletin/listado")
      .then((response) => {
        setBoletines(response.data);
        setLoading(false); // Establecer loading en false cuando se complete la carga
      })
      .catch((error) => {
        console.error("Error al obtener boletines:", error);
        setLoading(false); // También se debe establecer loading en false en caso de error
      });
  };

  const handleSave = () => {
    try {
      console.log("Guardando cambios:", editingBoletin);

      // Extraer las propiedades necesarias de editingBoletin
      const { id_boletin, nro_boletin, fecha_publicacion, habilita } =
        editingBoletin;
      console.log(id_boletin);

      // Haces la llamada para guardar los cambios en la base de datos utilizando axios
      axios
        .put(`/boletin/editar`, {
          id_boletin,
          nro_boletin,
          fecha_publicacion,
          habilita,
        })
        .then((response) => {
          console.log("Cambios guardados correctamente:", response.data);

          // Llamada a cargarBoletines después de que los cambios se guarden exitosamente
          cargarBoletines();

          // Después de actualizar los boletines, resetea el estado de edición y cierra el diálogo
          setEditingBoletin(null);
          setOpenDialog(false);
        })
        .catch((error) => {
          console.error("Error al guardar cambios:", error);
          // Manejar el error según tus necesidades
        });
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      // Manejar el error según tus necesidades
    }
  };

  const columns = [
    { id: "id_boletin", label: "ID de Boletin", minWidth: 170 },
    { id: "nro_boletin", label: "Nro de Boletin", minWidth: 170 },
    { id: "fecha_publicacion", label: "Fecha de Publicacion", minWidth: 100 },
    { id: "habilita", label: "Habilita", minWidth: 170, align: "right" },
    { id: "acciones", label: "Acciones", minWidth: 100, align: "right" },
  ];

  return (
    <Paper
      className="container mt-4"
      sx={{
        width: "100%",
        boxShadow:
          "0px 2px 4px -1px rgba(165, 53, 53, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
      }}
    >
      <div className="pt-1">
        <TableContainer sx={{ maxHeight: 452 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              {/* <TableRow>
                <TableCell align="left" colSpan={6}>
                  <h6>LISTADO DE BOLETINES</h6>
                </TableCell>
              </TableRow> */}
              <TableRow>
                {columns.map(
                  (column) =>
                    column.id !== "acciones" && (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        className="tableCellHeader"
                      >
                        {column.label}
                      </TableCell>
                    )
                )}
                <TableCell align="center" colSpan={6}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boletines
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((boletin, rowIndex) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={rowIndex}
                    className={
                      rowIndex % 2 === 0 ? "tableRowEven" : "tableRowOdd"
                    }
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "habilita" ? (
                          boletin[column.id] ? (
                            <p className="habilitado">Habilitado</p>
                          ) : (
                            <p className="deshabilitado ">Deshabilitado</p>
                          )
                        ) : column.id === "fecha_publicacion" ? (
                          <span>{boletin[column.id].slice(0, 10)}</span>
                        ) : column.id === "id_boletin" ? (
                          boletin[column.id]
                        ) : (
                          boletin[column.id]
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <EditIcon
                        onClick={() => handleEdit(boletin)}
                        className="iconEdit"
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={boletines.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {console.log(boletines, "59")}
      {/* Dialog for editing */}
      <Dialog className="modalEditar" open={openDialog} onClose={handleCancel}>
        {/* <DialogTitle>Editar Boletines</DialogTitle> */}
        <DialogContent>
          {editingBoletin && (
            <>
              {console.log(editingBoletin)}
              <Box
                component="form"
                id="form"
                noValidate
                enctype="multipart/form-data"
                autoComplete="on"
                className="contBoxAltaBoletinesEditar pt-0 container"
              >
                <div className="contAltaBoletines mt-0">
                  <Box className="formGroup flex-col pb-1 pt-3 ">
                    <div className="contRangoEditar d-flex align-items-center mt-0">
                      <div>
                        <div className="d-flex flex-column mt-0 ">
                          <div className="encabezadoBoletin mt-0">
                            <div className="d-flex justify-content-between text-align-start mt-0">
                              <h5 className="mt-2">Boletin:</h5>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    defaultChecked
                                    sx={{
                                      color: "white",
                                      "&.Mui-checked": {
                                        color: "white",
                                      },
                                    }}
                                    checked={editingBoletin.habilita}
                                    // onChange={handleCheckboxChange}
                                  />
                                }
                                label="Habilitado"
                                labelPlacement="start"
                              />
                            </div>
                            <div className="d-flex flex-row pe-2 mt-0 ">
                              <TextField
                                label="Nro de Boletín"
                                variant="outlined"
                                className="inputAltaBoletin pt-0"
                                type="number"
                                value={editingBoletin.nro_boletin}
                                // onChange={handleChange}
                                inputProps={{ min: "0" }}
                                name="nroBoletin"
                              />
                              <TextField
                                label="Fecha Publicación"
                                variant="outlined"
                                name="fechaPublicacion"
                                type="date"
                                className="inputAltaBoletin ms-3 pt-0"
                                value={editingBoletin.fecha_publicacion}
                                // onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                              />
                            </div>
                            <hr className="mt-3 mb-1" />
                          </div>
                          <div className="cuerpoBoletin mt-0">
                            <div className="d-flex flex-row mt-0">
                              <div className=" cuerpoBoletinForm ">
                                <FormControl
                                  sx={{ minWidth: 80 }}
                                  className="mb-3 "
                                >
                                  <InputLabel
                                    id="demo-simple-select-autowidth-label
                        "
                                  >
                                    Norma
                                  </InputLabel>
                                  <Select
                                    labeld="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    // value={valuesContenido.norma}
                                    // onChange={handleChange}
                                    autoWidth
                                    label="Norma"
                                    name="norma"
                                    //   disabled
                                  >
                                    <MenuItem
                                    //  value=""
                                    >
                                      <em>--Seleccione--</em>
                                    </MenuItem>
                                    {tiposNorma.map((norma) => (
                                      <MenuItem
                                        key={norma.id_norma}
                                        value={norma}
                                      >
                                        {norma.tipo_norma}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <FormControl
                                  sx={{ minWidth: 80 }}
                                  className="mb-3"
                                >
                                  <InputLabel id="demo-simple-select-autowidth-label">
                                    Secretaría de Origen
                                  </InputLabel>
                                  <Select
                                    labeld="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    // value={valuesContenido.origen}
                                    // onChange={handleChange}
                                    autoWidth
                                    label="Secretaría de Origen"
                                    name="origen"
                                    //   disabled
                                  >
                                    <MenuItem
                                    //  value=""
                                    >
                                      <em>--Seleccione--</em>
                                    </MenuItem>
                                    {tiposOrigen.map((origen) => (
                                      <MenuItem
                                        key={origen.id_origen}
                                        value={origen}
                                      >
                                        {origen.nombre_origen}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <TextField
                                  label="Fecha Norma"
                                  variant="outlined"
                                  name="fechaNormaBoletin"
                                  type="date"
                                  className="inputAltaBoletin mb-3"
                                  // value={valuesContenido.fechaNormaBoletin}
                                  // onChange={handleChange}
                                  InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                  label="Nº de Norma"
                                  className="inputAltaBoletin mb-3"
                                  type="number"
                                  // value={valuesContenido.nroNorma}
                                  // onChange={handleChange}
                                  name="nroNorma"
                                />
                                <Button
                                  type="button"
                                  className="btnAgregar"
                                  variant="contained"
                                  // onClick={handleAgregarNorma}
                                >
                                  Agregar Norma
                                </Button>
                              </div>
                              <div className="listadoPrueba container">
                                <div className="listadoNormas">
                                  {/* {normasAgregadas.map((norma, index) => (
                          <div
                            key={index}
                            // className={`norma ${validarNormasAgregadas().some(n => n === norma) ? 'normaRepetida' : 'norma'}`}
                          >
                            {/* {norma.norma.tipo_norma} Nº {norma.numero}/
                            {norma.origen.nombre_origen}/{norma.año.slice(0, 4)}{" "} */}
                                  {/* <CloseIcon
                              className="X"
                              fontSize="small"
                              // onClick={() => handleEliminarNorma(index)}
                            /> */}
                                  {/* </div> */}
                                  {/* ))} */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className="mt-4 mb-3" />

                          <Box className="contInputFileBoletin col-2 ">
                            <label className="fileNameDisplay flex-column">
                              {/* {selectedFileName} */}
                              <Input
                                className="inputFileAltaBoletin"
                                type="file"
                                id="fileBoletin"
                                name="archivoBoletin"
                                // value={valuesCabecera.archivoBoletin}
                                // onChange={handleChangeFile}
                                accept="application/pdf"
                                required
                              />

                              <File />
                            </label>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </Box>
                </div>
                <DialogActions>
                  <Button
                    onClick={handleSave}
                    color="primary"
                    variant="contained"
                  >
                    Guardar
                  </Button>
                  <Button
                    onClick={handleCancel}
                    color="primary"
                    variant="contained"
                  >
                    Cancelar
                  </Button>
                </DialogActions>
                <Snackbar
                  // open={open}
                  autoHideDuration={6000}
                  // onClose={() => setOpen(false)}
                >
                  <Alert
                    // onClose={handleClose}
                    // severity={error}
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {/* {mensaje} */}
                  </Alert>
                </Snackbar>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
