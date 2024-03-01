import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox'; // Importar Checkbox de Material-UI
import "./ListadoBoletines.css";

const columns = [
  { id: 'nroBoletin', label: 'Nro Boletin', minWidth: 170 },
  { id: 'fechaPublicacion', label: 'fecha de Publicacion', minWidth: 100 },
  {
    id: 'habilitado',
    label: 'Habilitado',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'desabilitado',
    label: 'Desabilitado',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(nroBoletin, fechaPublicacion, habilitado, desabilitado) {
  return { nroBoletin, fechaPublicacion, habilitado, desabilitado };
}

const rows = [
  createData(4391, "2024-02-22", true, false),
  createData(4390, "2024-02-21", false, true),
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  

  const handleCheckboxChange = (event, rowIndex, columnId) => {
    const { id } = event.target;
    const newSelectedRows = [...selectedRows];
    const indexToRemove = newSelectedRows.findIndex(row => row.columnId === columnId);
    
    if (indexToRemove !== -1) {
      newSelectedRows.splice(indexToRemove, 1);
    }
  
    newSelectedRows.push({ rowIndex, columnId });
    setSelectedRows(newSelectedRows);
  };
  
  
  

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="tituloListado">
            <TableRow >
              <TableCell align="left" colSpan={6}>
               <h6 >LISTADO DE BOLETINES</h6> 
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                const isSelected = selectedRows.includes(rowIndex);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={rowIndex}
                    selected={isSelected}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'habilitado' || column.id === 'desabilitado' ? (
                            <Checkbox
                            id={column.id}
                            checked={selectedRows.some(row => row.rowIndex === rowIndex && row.columnId === column.id)}
                            onChange={(event) => handleCheckboxChange(event, rowIndex, column.id)}
                          />
                          
                          ) : (
                            column.format && typeof value === 'number'
                              ? column.format(value)
                              : value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
