import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import useGet from "../../hook/useGet";
import axios from "../../config/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
  TextField,
} from "@mui/material";
import ModalGenerica from "../ModalGenerico/ModalGenerico";
import EditarNormaDialog from "../EditarNormaDialog/EditarNormaDialog";
import "../ListarNormas/ListarNormas.css";

const Tabla = () => {
  const [origen, getOrigen, setOrigen] = useGet("/origen/listado", axios);
  const [editOrigen, setEditOrigen] = useState("");

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [origenInput, setOrigenInput] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [nombreCampoEditado, setNombreCampoEditado] = useState("");
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function obtenerNombreCampoPorPosicion(objeto, posicion) {
    var keys = Object.keys(objeto);
    if (posicion >= 0 && posicion < keys.length) {
      return keys[posicion];
    } else {
      return null; // Si la posición está fuera de rango, devolver null o algún indicador de error
    }
  }
  const handleEdit = (Origen) => {
    setEditOrigen((prevOrigen) => ({ ...prevOrigen, ...Origen }));
    setOpenModal(true);
    setOpenDialog(true);
    const nombreCampo = obtenerNombreCampoPorPosicion(Origen, 1);
    setNombreCampoEditado(nombreCampo);
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setEditOrigen((prevValues) => ({
      ...prevValues,
      habilita: isChecked,
    }));
  };

  const handleCancel = (event, reason) => {
    setOpenDialog(false);
  };

  // const handleCancel = (event, reason) => {
  //       setOpenDialog(false);
  // };

  const handleAcceptModal = (nombre_origen, habilita) => {
    // Aquí puedes realizar acciones como enviar la norma a la base de datos

    try {
      // console.log("Guardando cambios:", updatedNormas);
      // console.log(id_origen, "eliminado");
      axios
        .post(`/origen/editar`, { nombre_origen, habilita })
        .then((response) => {
          console.log("Origen deshabilitada correctamente:", response.data);
          // cargarNormas();
          // setEditingNorma(null);
          // setOpenDialog(false);
        });
    } catch (error) {
      console.error("Error al guardar Origen:", error);
    }
    console.log("Origen:", origenInput);
    console.log("Checkbox:", checkboxValue);
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "id_origen") {
      setEditOrigen((prevOrigen) => ({
        ...prevOrigen,
        [name]: value,
      }));
    }
  };

  const handleDelete = (origenId) => {
    const updatedOrigen = origen.map((item) =>
      item.id_origen === origenId ? { ...item, habilita: 0 } : item
    );
    setOrigen(updatedOrigen);
    handleSave(updatedOrigen);
  };

  const cargarOrigen = () => {
    axios
      .get("/origen/listado")
      .then((response) => {
        setOrigen(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener normas:", error);
        setLoading(false);
      });
  };

  const handleSave = (updatedOrigen) => {
    if (editOrigen) {
      try {
        console.log("Guardando cambios:", editOrigen);

        // Extraer las propiedades necesarias de editingNorma
        const { id_origen, nombre_origen, habilita } = editOrigen;
        console.log(id_origen);
        // Haces la llamada para guardar los cambios en la base de datos utilizando axios
        axios
          .put(`/origen/editar`, { id_origen, nombre_origen, habilita })
          .then((response) => {
            console.log("Cambios guardados correctamente:", response.data);
            cargarOrigen();
            setEditOrigen(null);
            setOpenDialog(false);
            setNombreCampoEditado("");
          });
      } catch (error) {
        console.error("Error al guardar cambios:", error);
        // Manejar el error según tus necesidades
      }
    } else {
      try {
        updatedOrigen.forEach((origen) => {
          const { id_origen, nombre_origen, habilita } = origen;
          axios
            .put(`/origen/editar`, { id_origen, nombre_origen, habilita })
            .then((response) => {
              console.log("Origen deshabilitada correctamente:", response.data);
              cargarOrigen();
            });
        });
      } catch (error) {
        console.error("Error al guardar cambios:", error);
      }
    }
  };

  const columns = [
    { id: "id_origen", label: "ID", minWidth: "auto", align: "center" },
    { id: "nombre_origen", label: "Nombre", minWidth: "auto", align: "center" },
    { id: "habilita", label: "Habilita", minWidth: "auto", align: "center" },
  ];

  // const handleEdit = (Origen) => {
  //   setEditOrigen((prevOrigen) => ({ ...prevOrigen, ...Origen }));

  // };
  useEffect(() => {
    console.log(editOrigen);
  }, [editOrigen]);

  return (
    <div className="tablaNormas">
      <Paper
        className="container mt-4 mb-4"
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
                  {columns.map((column) =>
                  column.id !== "acciones" &&  (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      className="tableCellHeader"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                   <TableCell align="center" colSpan={4}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(origen)}
                {!getOrigen ? (
                  origen
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((origen, rowIndex) => (
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
                          <TableCell
                            key={column.id}
                            align={column.align}
                            width={column.minWidth}
                          >
                            {column.id === "habilita" ? (
                              origen[column.id] ? (
                                <p className="habilitado">Habilitado</p>
                              ) : (
                                <p className="deshabilitado">Deshabilitado</p>
                              )
                            ) : (
                              origen[column.id] !== "acciones" &&
                              origen[column.id]
                            )}
                          </TableCell>
                        ))}
                        <TableCell className="d-flex justify-content-center">
                          <EditIcon
                            onClick={() => handleEdit(origen)}
                            className="iconEdit"
                            color="primary"
                          />
                          {origen.habilita === 1 ? (
                            <DeleteIcon
                              className="iconDelete"
                              onClick={() => handleDelete(origen.id_origen)}
                            />
                          ) : (
                            <DeleteIcon className="iconDelete" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {origen.length / rowsPerPage < 1 && rowsPerPage === 10 ? (
            <TablePagination
              className="pagination"
              rowsPerPageOptions={[]}
              component="div"
              count={1}
              rowsPerPage={1}
              page={0}
            />
          ) : (
            <TablePagination
              className="pagination"
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={origen.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelDisplayedRows={({ from, to, count }) => {
                const currentPage = Math.ceil(from / rowsPerPage);
                const totalPages = Math.ceil(count / rowsPerPage);
                return `${currentPage} de ${totalPages} páginas`;
              }}
              labelRowsPerPage="Filas por página:"
            />
          )}
          <EditarNormaDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            editingNorma={editOrigen}
            handleCheckboxChange={handleCheckboxChange}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            nombreCampo={nombreCampoEditado}
          />
        </div>
      </Paper>
    </div>
  );
};

export default Tabla;
