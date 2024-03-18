import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import './ListadoBoletines.css';
import useGet from '../../hook/useGet';
import axios from '../../config/axios';

export default function ColumnGroupingTable() {
  const [boletines, getboletin, setBoletines] = useGet('/boletin/listado', axios);
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
      editedBoletin.fecha_publicacion = editedBoletin.fecha_publicacion.slice(0, 10);
    }
  
    // Establece el boletín editado en el estado de edición
    setEditingBoletin(editedBoletin);
    setOpenDialog(true);
  };
  

  const handleCancel = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDialog(false);
  };

 // Modifica la función handleInputChange para que no actualice la ID de Boletín
const handleInputChange = (e) => {
  const { name, value } = e.target;
  // Si el campo de entrada no es la ID de Boletín, actualiza el estado de edición
  if (name !== 'id_boletin') {
    setEditingBoletin((prevBoletin) => ({
      ...prevBoletin,
      [name]: value,
    }));
  }
};


  const cargarBoletines = () => {
    axios.get('/boletin/listado')
      .then(response => {
        setBoletines(response.data);
        setLoading(false); // Establecer loading en false cuando se complete la carga
      })
      .catch(error => {
        console.error('Error al obtener boletines:', error);
        setLoading(false); // También se debe establecer loading en false en caso de error
      });
  };
  
  const handleSave = () => {
    try {
      console.log('Guardando cambios:', editingBoletin);
  
      // Extraer las propiedades necesarias de editingBoletin
      const { id_boletin, nro_boletin, fecha_publicacion, habilita } = editingBoletin;
      console.log(id_boletin);
  
      // Haces la llamada para guardar los cambios en la base de datos utilizando axios
      axios.put(`/boletin/editar`, { id_boletin, nro_boletin, fecha_publicacion, habilita })
        .then((response) => {
          console.log('Cambios guardados correctamente:', response.data);
  
          // Llamada a cargarBoletines después de que los cambios se guarden exitosamente
          cargarBoletines();
  
          // Después de actualizar los boletines, resetea el estado de edición y cierra el diálogo
          setEditingBoletin(null);
          setOpenDialog(false);
        })
        .catch((error) => {
          console.error('Error al guardar cambios:', error);
          // Manejar el error según tus necesidades
        });
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      // Manejar el error según tus necesidades
    }
  };
  
  const columns = [
    { id: 'id_boletin', label: 'ID de Boletin', minWidth: 170 },
    { id: 'nro_boletin', label: 'Nro de Boletin', minWidth: 170 },
    { id: 'fecha_publicacion', label: 'Fecha de Publicacion', minWidth: 100 },
    { id: 'habilita', label: 'Habilita', minWidth: 170, align: 'right' },
    { id: 'acciones', label: 'Acciones', minWidth: 100, align: 'right' },
  ];

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={6}>
                <h6>LISTADO DE BOLETINES</h6>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                column.id !== 'acciones' && (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="tableCellHeader"
                  >
                    {column.label}
                  </TableCell>
                )
              ))}
              <TableCell align="center" colSpan={6}>Acciones</TableCell>
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
                  className={rowIndex % 2 === 0 ? 'tableRowEven' : 'tableRowOdd'}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'habilita' ? (
                        boletin[column.id] ? '1' : '0'
                      ) : column.id === 'fecha_publicacion' ? (
                        <span>{boletin[column.id].slice(0, 10)}</span>
                      ) : column.id === 'id_boletin' ? (
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={boletines.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog for editing */}
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Editar Boletines</DialogTitle>
        <DialogContent >
          {editingBoletin && (
            <>
              <TextField 
                name="id_boletin"
                label="Id de Boletin"
                value={editingBoletin.id_boletin}
                onChange={handleInputChange}
                inputProps={{ min: "0" }}
                fullWidth
              />
              <TextField 
                name="nro_boletin"
                label="Nro de Boletin"
                value={editingBoletin.nro_boletin}
                onChange={handleInputChange}
                inputProps={{ min: "0" }}
                fullWidth
              />
              <TextField
                name="fecha_publicacion"
                label="Fecha de Publicacion"
                type="date"
                value={editingBoletin.fecha_publicacion}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                name="habilita"
                label="Habilita"
                value={editingBoletin.habilita}
                onChange={handleInputChange}
                fullWidth
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary" variant="contained">
            Guardar
          </Button>
          <Button onClick={handleCancel} color="primary" variant="contained">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
