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
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField'; // Importa TextField para los campos de entrada
import './ListadoBoletines.css';
import useGet from "../../hook/useGet"; 
import axios from "../../config/axios";

export default function ColumnGroupingTable() {
  const [boletines, loading, getboletin] = useGet("/boletin/listar", axios);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editingBoletin, setEditingBoletin] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (boletin) => {
    setEditingBoletin(boletin);
  };

  const handleSave = () => {
    // Aquí puedes implementar la lógica para guardar los cambios en la base de datos
    console.log('Guardando cambios:', editingBoletin);
    setEditingBoletin(null); // Sale del modo de edición después de guardar
  };

  const handleCancel = () => {
    setEditingBoletin(null); // Sale del modo de edición sin guardar cambios
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBoletin((prevBoletin) => ({
      ...prevBoletin,
      [name]: value,
    }));
  };

  const columns = [
    { id: 'nro_boletin', label: 'Nro de Boletin', minWidth: 170 },
    { id: 'fecha_publicacion', label: 'Fecha de Publicacion', minWidth: 100 },
    { id: 'habilitado', label: 'Habilitado', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US') },
    { id: 'acciones', label: 'Acciones', minWidth: 100, align: 'right' },
  ];

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={6}>
                <h6>LISTADO DE BOLETINES</h6>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className="tableCellHeader"
                >
                  {column.label}
                </TableCell>
              ))}
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
                      {editingBoletin && editingBoletin.nro_boletin === boletin.nro_boletin ? (
                        <TextField
                          name={column.id}
                          value={editingBoletin[column.id]}
                          onChange={handleInputChange}
                        />
                      ) : column.id === 'acciones' ? (
                        <>
                          <EditIcon
                            onClick={() => handleEdit(boletin)}
                            className="iconEdit"
                          />
                        </>
                      ) : column.id === 'habilitado' ? (
                        boletin[column.id] ? '1' : '0'
                      ) : (
                        column.format && typeof boletin[column.id] === 'number'
                          ? column.format(boletin[column.id])
                          : column.id === 'fecha_publicacion' ? boletin[column.id].slice(0, 10) : boletin[column.id]
                      )}
                    </TableCell>
                  ))}
                  {editingBoletin && editingBoletin.nro_boletin === boletin.nro_boletin && (
                    <>
                      <button onClick={handleSave}>Guardar</button>
                      <button onClick={handleCancel}>Cancelar</button>
                    </>
                  )}
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
    </Paper>
  );
}
