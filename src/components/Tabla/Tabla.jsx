import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import useGet from '../../hook/useGet';
import axios from '../../config/axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';


const Tabla = () => {

    const [origen, getOrigen, setOrigen] = useGet("/origen/listado", axios);
    const [editOrigen, setEditOrigen] = useState ("");

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (Origen) => {
    setEditOrigen((prevOrigen) => ({ ...prevOrigen, ...Origen }));
    setOpenDialog(true);
  };

  const handleCancel = (event, reason) => {
        setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'id_origen') {
        setEditOrigen(prevOrigen => ({
            ...prevOrigen,
            [name]: value,
        }));
    }
}

  const cargarOrigen = () => {
    axios.get('/origen/listado')
      .then(response => {
        setOrigen(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener normas:', error);
        setLoading(false);
      });
  };

  const handleSave = () => {
    try {
        console.log('Guardando cambios:', editOrigen);
    
        // Extraer las propiedades necesarias de editingNorma
        const { id_origen, nombre_origen, habilita } = editOrigen;
        console.log(id_origen);
        // Haces la llamada para guardar los cambios en la base de datos utilizando axios
    // axios.put(`/origen/editar`, { id_norma, tipo_norma,  habilita })
    //   .then((response) => {
    //     console.log('Cambios guardados correctamente:', response.data);
    //     cargarOrigen();
    //     setEditOrigen(null);
    //     setOpenDialog(false);
    //   })
    } catch (error) {
        console.error('Error al guardar cambios:', error);
        // Manejar el error según tus necesidades
      }
    };
 
  const columns = [
    { id: "id_origen", label: "ID", minWidth: 100, align: "center" },
    { id: "nombre_origen", label: "Nombre", minWidth: 100, align: "center" },
    { id: "habilita", label: "Habilita", minWidth: 100, align: "center" },
    { id: "acciones", label: "Acciones", minWidth: 100, align: "center", },
    
  ];

 
  // const handleEdit = (Origen) => {
  //   setEditOrigen((prevOrigen) => ({ ...prevOrigen, ...Origen }));
    
  // };
  useEffect(() => {
    console.log(editOrigen);
  }, [editOrigen]);
    
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
           { console.log(origen)}
            {!getOrigen ? (
                          
              origen
              .map((origen, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      
                     {column.id === "acciones" ? (  
                        <EditIcon
                         onClick={() => handleEdit(origen)}
                        className="iconEdit"
                      />
                    ):(origen[column.id])}

                    </TableCell>
                  ))}
                  </TableRow>
                  ))
                  
                  ): (<></>)
                }
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog  open={openDialog} onClose={handleCancel}>
        <DialogTitle className='Titulo'>Editar Normas</DialogTitle>
        <DialogContent className='modal_content' >
          {editOrigen && (
            <>
              <TextField 
                name="id_origen"
                label="ID origen"
                value={editOrigen.id_origen}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField 
                name="nombre_origen"
                label="Nombre Origen"
                value={editOrigen.nombre_origen}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="habilita"
                label="Habilita"
                value={editOrigen.habilita}
                onChange={handleInputChange}
                fullWidth
              />
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

export default Tabla;
