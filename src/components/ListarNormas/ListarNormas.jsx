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
import './ListarNormas.css';
import useGet from '../../hook/useGet';
import axios from '../../config/axios';

export default function ColumnGroupingTable() {
  const [normas, getNorma, setNormas] = useGet('/norma/listado', axios);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingNorma, setEditingNorma] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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
    if(reason === "clickaway"){
        return;
    }
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'id_norma') {
    setEditingNorma((prevNorma) => ({
      ...prevNorma,
      [name]: value,
    }));
}
  };

  const cargarNormas = () => {
    axios.get('/norma/listar')
      .then(response => {
        setNormas(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener normas:', error);
        setLoading(false);
      });
  };

  const handleSave = () => {
    try {
        console.log('Guardando cambios:', editingNorma);
    
        // Extraer las propiedades necesarias de editingNorma
        const { id_norma, tipo_norma, habilita } = editingNorma;
        console.log(id_norma);
        // Haces la llamada para guardar los cambios en la base de datos utilizando axios
    axios.put(`/norma/editar`, { id_norma, tipo_norma,  habilita })
      .then((response) => {
        console.log('Cambios guardados correctamente:', response.data);
        cargarNormas();
        setEditingNorma(null);
        setOpenDialog(false);
      })
    } catch (error) {
        console.error('Error al guardar cambios:', error);
        // Manejar el error según tus necesidades
      }
    };



  const columns = [
    { id: 'id_norma', label: 'ID de Norma', minWidth: 170 },
    { id: 'tipo_norma', label: 'Tipo de Norma', minWidth: 170 },
    { id: 'habilita', label: 'Habilita', minWidth: 170, align: 'right' },
    { id: 'acciones', label: 'Acciones', minWidth: 100, align: 'right' },
  ];

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={4}>
                <h6>LISTADO DE NORMAS</h6>
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
              <TableCell align="center" colSpan={4}>Acciones</TableCell>
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
                  className={rowIndex % 2 === 0 ? 'tableRowEven' : 'tableRowOdd'}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'habilita' ? (
                        norma[column.id] ? '1' : '0'
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

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Editar Normas</DialogTitle>
        <DialogContent >
          {editingNorma && (
            <>
              <TextField 
                name="id_norma"
                label="ID de Norma"
                value={editingNorma.id_norma}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField 
                name="tipo_norma"
                label="Tipo de Norma"
                value={editingNorma.tipo_norma}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="habilita"
                label="Habilita"
                value={editingNorma.habilita}
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
