import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import useGet from "../../hook/useGet";
import { MenuItem, Select } from "@mui/material";

const Tabla = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tiposNorma, loadingNorma, getTiposNoma] = useGet("/norma/listar", axios);
  const [boletines, loading, getboletin] = useGet("/boletin/listar", axios);
 
  const columns = [
    { id: "tipo_norma", label: "Norma", minWidth: 100, align: "center" },
    { id: "habilita", label: "Habilita", minWidth: 100, align: "center" },
    { id: "acciones", label: "Acciones", minWidth: 100, align: "center", },
    
  ];
console.log(tiposNorma);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (<>
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
           { console.log(tiposNorma)}
            {loadingNorma ? (
              
              
              tiposNorma
              .map((Norma, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {Norma[column.id]}
                    </TableCell>
                  ))}
                  </TableRow>
                  ))
                  
                  ): (<></>)
                }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>   <Select
    labelId="demo-simple-select-autowidth-label"
    id="demo-simple-select-autowidth"
   
    
    autoWidth
    label="Tipo de Norma"
    name="tipoBusquedaAvanzada"
  >
    <MenuItem value="">
      <em>--Seleccione--</em>
    </MenuItem>
    {tiposNorma.map((tipo) => (
      <MenuItem key={tipo.id_norma} value={tipo.tipo_norma}>
        {tipo.tipo_norma}
      </MenuItem>
    ))}
    {/* <MenuItem value={"Ordenanza"}>Ordenanza</MenuItem>
    <MenuItem value={"Resolucion"}>Resolución</MenuItem> */}
  </Select>
        </>
 
  );
}

export default Tabla;
