import React, { useState } from "react";
import "./ListarNormas.css";
import useGet from "../../hook/useGet";
import axios from "../../config/axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import EditarNormaDialog from "../EditarNormaDialog/EditarNormaDialog";

// import "../ListarBoletines/ListarBoletines.css";
// import "../AltaBoletines/AltaBoletinesNuevo.css";

export default function ColumnGroupingTable() {
  const [normas, getNorma, setNormas] = useGet("/norma/listado", axios);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingNorma, setEditingNorma] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  // const [editingBoletin, setEditingBoletin] = useState(null);

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
  const handleDelete = (normaId) => {
    const updatedNormas = normas.map((item) =>
      item.id_norma === normaId ? { ...item, habilita: 0 } : item
    );
    setNormas(updatedNormas);
    handleSave(updatedNormas);
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

  const handleSave = (updatedNormas) => {
    if (editingNorma) {
      try {
        console.log("Guardando cambios:", editingNorma);
        const { id_norma, tipo_norma, habilita } = editingNorma;
        console.log(id_norma);
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
      }
    } else {
      try {
        console.log("Guardando cambios:", updatedNormas);
        const { id_norma, tipo_norma, habilita } = updatedNormas[0];
        console.log(id_norma, "eliminado");
        axios
          .put(`/norma/editar`, { id_norma, tipo_norma, habilita })
          .then((response) => {
            console.log("Norma deshabilitada correctamente:", response.data);
            cargarNormas();
            // setEditingNorma(null);
            // setOpenDialog(false);
          });
      } catch (error) {
        console.error("Error al guardar cambios:", error);
      }
    }
  };

  const columns = [
    {
      id: "id_norma",
      label: "ID de Norma",
      minWidth: "auto ",
      align: "center",
    },
    {
      id: "tipo_norma",
      label: "Tipo de Norma",
      minWidth: "auto",
      align: "center",
    },
    { id: "habilita", label: "Habilita", minWidth: "auto", align: "center" },
    // { id: "acciones", label: "Acciones", minWidth: 100, align: "center" },
  ];

  return (
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
                      <TableCell
                        key={column.id}
                        align={column.align}
                        width={column.minWidth}
                      >
                        {column.id === "habilita" ? (
                          norma[column.id] ? (
                            <p className="habilitado">Habilitado</p>
                          ) : (
                            <p className="deshabilitado">Deshabilitado</p>
                          )
                        ) : (
                          norma[column.id] !== "acciones" && norma[column.id]
                        )}
                      </TableCell>
                    ))}

                    <TableCell className="d-flex justify-content-center">
                      <EditIcon
                        onClick={() => handleEdit(norma)}
                        className="iconEdit"
                        color="primary"
                      />
                      {norma.habilita === 1 ? (
                        <DeleteIcon
                          className="iconDelete"
                          onClick={() => handleDelete(norma.id_norma)}
                        />
                      ) : (
                        <DeleteIcon
                          className="iconDelete"
                          // onClick={() => handleDelete(norma.id_norma)}
                        />
                      )}
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

        <EditarNormaDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        editingNorma={editingNorma}
        handleCheckboxChange={handleCheckboxChange}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
      </div>
    </Paper>
  );
}
