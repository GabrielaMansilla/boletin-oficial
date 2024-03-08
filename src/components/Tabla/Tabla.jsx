import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "../../config/axios";
import useGet from "../../hook/useGet";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";



const Tabla = () => {

    const [tiposNorma, loadingNorma, getTiposNoma] = useGet("/norma/listar", axios);
    const [editNorma, setEditNorma] = useState ("");
 
  const columns = [
    { id: "tipo_norma", label: "Norma", minWidth: 100, align: "center" },
    { id: "habilita", label: "Habilita", minWidth: 100, align: "center" },
    { id: "acciones", label: "Acciones", minWidth: 100, align: "center", },
    
  ];

 
  const handleEdit = (Norma) => {
    setEditNorma((prevNorma) => ({ ...prevNorma, ...Norma }));
    
  };
  useEffect(() => {
    console.log(editNorma);
  }, [editNorma]);
    
  return (
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
            {!loadingNorma ? (
                          
              tiposNorma
              .map((Norma, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      
                     { column.id === "acciones" ? (  
                        <EditIcon
                         onClick={() => handleEdit(Norma)}
                        className="iconEdit"
                      />
                    ):(Norma[column.id])}

                    </TableCell>
                  ))}
                  </TableRow>
                  ))
                  
                  ): (<></>)
                }
          </TableBody>
        </Table>
      </TableContainer>
        </Paper>   
  );
}

export default Tabla;
