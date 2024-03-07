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
import TextField from '@mui/material/TextField';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import './ListadoBoletines.css';

import useGet from '../../hook/useGet';
import axios from '../../config/axios';

export default function ColumnGroupingTable() {
  const [boletines, loading, getboletin] = useGet('/boletin/listar', axios);
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
    setEditingBoletin({ ...boletin });
  };

  const handleSave = () => {
    // Realizar la lógica de guardado aquí
    console.log('Guardando cambios:', editingBoletin);
    setEditingBoletin(null);
  };

  const handleCancel = () => {
    setEditingBoletin(null);
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
    { id: 'habilita', label: 'Habilita', minWidth: 170, align: 'right' },
    { id: 'acciones', label: 'Acciones', minWidth: 100, align: 'right' },
  ];

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
              <TableCell align="center">Acciones</TableCell>
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
                    column.id !== 'acciones' && (
                      <TableCell key={column.id} align={column.align}>
                        {editingBoletin && editingBoletin.nro_boletin === boletin.nro_boletin && column.id === 'habilita' ? (
                          <TextField
                            name={column.id}
                            value={editingBoletin[column.id]}
                            onChange={handleInputChange}
                            variant="filled"
                            inputProps={{
                                 min: "0",
                                max: "1",
                               }}
                            color="primary"
                            size="small"
                          />
                        ) : column.id === 'habilita' ? (
                          boletin[column.id] ? '1' : '0'
                        ) : (
                          column.format && typeof boletin[column.id] === 'number'
                            ? column.format(boletin[column.id])
                            : column.id === 'fecha_publicacion' ? boletin[column.id].slice(0, 10) : boletin[column.id]
                        )}
                      </TableCell>
                    )
                  ))}
                  <TableCell align="center">
                    {editingBoletin && editingBoletin.nro_boletin === boletin.nro_boletin ? (
                      <>
                        <Button onClick={handleSave} color="primary">
                          <CheckCircleOutlineIcon fontSize="small" />
                        </Button>
                        <Button onClick={handleCancel} color="error">
                          <CancelIcon fontSize="small" />
                        </Button>
                      </>
                    ) : (
                      <EditIcon
                        onClick={() => handleEdit(boletin)}
                        className="iconEdit"
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
        count={boletines.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
