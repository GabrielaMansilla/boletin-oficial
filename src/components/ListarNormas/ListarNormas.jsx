import React, { useState } from "react";
import "./ListarNormas.css";
import useGet from "../../hook/useGet";
import axios from "../../config/axios";
import EditIcon from "@mui/icons-material/Edit";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// import "../ListarBoletines/ListarBoletines.css";
// import "../AltaBoletines/AltaBoletinesNuevo.css";

export default function ColumnGroupingTable() {
  const [normas, getNorma, setNormas] = useGet("/norma/listado", axios);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingNorma, setEditingNorma] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBoletin, setEditingBoletin] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (norma) => {
    setEditingNorma({ ...norma });
    setOpenDialog(true);
  };

  const handleCancel = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "id_norma") {
      setEditingNorma((prevNorma) => ({
        ...prevNorma,
        [name]: value,
      }));
    }
  };
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setEditingNorma((prevValues) => ({
      ...prevValues,
      habilita: isChecked,
    }));
  };
  const cargarNormas = () => {
    axios
      .get("/norma/listar")
      .then((response) => {
        setNormas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener normas:", error);
        setLoading(false);
      });
  };

  const handleSave = () => {
    try {
      console.log("Guardando cambios:", editingNorma);

      // Extraer las propiedades necesarias de editingNorma
      const { id_norma, tipo_norma, habilita } = editingNorma;
      console.log(id_norma);
      // Haces la llamada para guardar los cambios en la base de datos utilizando axios
      axios
        .put(`/norma/editar`, { id_norma, tipo_norma, habilita })
        .then((response) => {
          console.log("Cambios guardados correctamente:", response.data);
          cargarNormas();
          setEditingNorma(null);
          setOpenDialog(false);
        });
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      // Manejar el error según tus necesidades
    }
  };

  const columns = [
    { id: "id_norma", label: "ID de Norma", minWidth: 170 },
    { id: "tipo_norma", label: "Tipo de Norma", minWidth: 170 },
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
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
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
                <TableCell align="center" colSpan={4}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {normas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((norma, rowIndex) => (
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
                          norma[column.id] ? (
                            <p className="habilitado">Habilitado</p>
                          ) : (
                            <p className="deshabilitado ">Deshabilitado</p>
                          )
                        ) : (
                          norma[column.id]
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <EditIcon
                        onClick={() => handleEdit(norma)}
                        className="iconEdit"
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={normas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Dialog
          className="modalEditar"
          open={openDialog}
          disableBackdropClick={true}
          //  onClose={handleCancel}
        >
          <DialogContent className="modal_content">
            <DialogTitle className="titulo">Editar Norma</DialogTitle>
            {editingNorma && (
              <>
                {/* <TextField
                  name="id_norma"
                  label="ID de Norma"
                  value={editingNorma.id_norma}
                  onChange={handleInputChange}
                  className="inputNorma"
                  fullWidth
                /> */}
                <div className="contModal">

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
                      checked={editingNorma.habilita}
                      onChange={handleCheckboxChange}
                      />
                    }
                    label="Habilitado"
                    className="checkBoxNorma"
                    labelPlacement="start"
                    />
                <TextField
                  name="tipo_norma"
                  label="Tipo de Norma"
                  value={editingNorma.tipo_norma}
                  onChange={handleInputChange}
                  className="inputNorma"
                  fullWidth
                />
                  </div>
                {/* <TextField
                  name="habilita"
                  label="Habilita"
                  value={editingNorma.habilita}
                  onChange={handleInputChange}
                  className="inputNorma"
                  fullWidth
                /> */}
              </>
            )}
            <DialogActions className="btnEditarNorma">
              <Button
                // className="btn_Norma"
                onClick={handleSave}
                color="primary"
                variant="contained"
              >
                Guardar
              </Button>
              <Button
                // className="btn_Norma"
                onClick={handleCancel}
                color="primary"
                variant="contained"
              >
                Cancelar
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    </Paper>
  );
}
