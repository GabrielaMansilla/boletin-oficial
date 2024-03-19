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

import useGet from '../../hook/useGet';
import axios from '../../config/axios';

export default function ColumnGroupingTable() {
  const [contenidoBoletin, getContenido, setContenido] = useGet('/boletin/listarContenido', axios);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingContenidoBoletin, setEditingContenidoBoletin] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (contenidoBoletin) => {
    // Copia el contenido del boletín para evitar mutaciones no deseadas
    const editedContenidoBoletin = { ...contenidoBoletin };
  
    // Si la fecha de la norma existe y no está vacía, realiza cualquier manipulación necesaria aquí
    if (editedContenidoBoletin.fecha_norma) {
      // Convierte la fecha al formato 'YYYY-MM-DD'
      editedContenidoBoletin.fecha_norma = editedContenidoBoletin.fecha_norma.slice(0, 10);
    }
  
    // Establece el contenido del boletín editado en el estado de edición
    setEditingContenidoBoletin(editedContenidoBoletin);
    setOpenDialog(true);
  };
  

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Si el campo de entrada no es uno de los campos inmutables, actualiza el estado de edición
    if (name !== 'id_contenido_boletin' && name !== 'id_boletin' && name !== 'id_norma' && name !== 'id_origen') {
      setEditingContenidoBoletin((prevContenidoBoletin) => ({
        ...prevContenidoBoletin,
        [name]: value,
      }));
    }
  };
  

  const cargarContenido = () => {
    axios.get('/boletin/listarContenido')
      .then(response => {
        setContenido(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener contenido del boletín:', error);
        setLoading(false);
      });
  };

  const handleSave = () => {
    try {
      console.log('Guardando cambios:', editingContenidoBoletin);
  
      // Extraer las propiedades necesarias de editingContenidoBoletin
      const { id_contenido_boletin, id_boletin, id_norma, nro_norma, id_origen, fecha_norma } = editingContenidoBoletin;
      console.log(id_contenido_boletin);
      // Haces la llamada para guardar los cambios en la base de datos utilizando axios
      axios.put(`/boletin/traer`, {
        id_contenido_boletin,
        id_boletin,
        id_norma,
        nro_norma,
        id_origen,
        fecha_norma
      })
      .then((response) => {
        console.log('Cambios guardados correctamente:', response.data);
        cargarContenido();
        setEditingContenidoBoletin(null);
        setOpenDialog(false);
      })
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      // Manejar el error según tus necesidades
    }
  };
  

  const columns = [
    { id: 'id_contenido_boletin', label: 'ID de Contenido Boletín', minWidth: 170 },
    { id: 'id_boletin', label: 'ID de Boletín', minWidth: 170 },   
    { id: 'id_norma', label: 'ID de Norma', minWidth: 170 }, // Modificado el campo id_norma
    { id: 'nro_norma', label: 'Número de Norma', minWidth: 170 },
    { id: 'id_origen', label: 'ID de Origen', minWidth: 170 },
    { id: 'fecha_norma', label: 'Fecha de Norma', minWidth: 170 },
    { id: 'acciones', label: 'Acciones', minWidth: 100, align: 'right' },
  ];

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={6}>
                <h6>LISTADO DE CONTENIDO DE BOLETINES</h6>
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
  {contenidoBoletin
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((contenido, rowIndex) => (
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={rowIndex}
        className={rowIndex % 2 === 0 ? 'tableRowEven' : 'tableRowOdd'}
      >
        {columns.map((column) => (
          <TableCell key={column.id} align={column.align}>
            {column.id === 'acciones' ? (
              <EditIcon
                onClick={() => handleEdit(contenido)}
                className="iconEdit"
                color="primary"
              />
            ) : (
              // Apply slice(0, 10) to fecha_norma if it's the fecha_norma column
              column.id === 'fecha_norma' ? (
                contenido[column.id]?.slice(0, 10)
              ) : (
                contenido[column.id]
              )
            )}
          </TableCell>
        ))}
      </TableRow>
    ))}
</TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={contenidoBoletin.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle className='Titulo'>Editar Contenido Boletín</DialogTitle>
        <DialogContent className='modal_content' >
          {editingContenidoBoletin && (
            <>
             {columns.map((column) => (
            column.id !== 'acciones' && (
              <TextField 
                key={column.id}
                name={column.id}
                label={column.label}
                value={column.id === 'fecha_norma' ? editingContenidoBoletin[column.id]?.slice(0, 10) : editingContenidoBoletin[column.id]}
                onChange={handleInputChange}
                fullWidth
              />
            )
          ))}

            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button className='btn_Norma' onClick={handleSave} color="primary" variant="contained">
            Guardar
          </Button>
          <Button  className='btn_Norma' onClick={handleCancel} color="primary" variant="contained">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
