import React, { useState } from 'react'
import './NavBar.css'
import { Box, Button, TextField } from '@mui/material'
export const NavBar = () => {
    const [fecha, setFecha] = useState(' ');
    const [nroBoletin, setNroBoletin] = useState('');

    return (
        <>
            <div className='navCont '>
                <div className="buscador     ">
                    <h3 className='tituloBuscador'>BUSCAR BOLETINES ANTERIORES</h3>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
                        noValidate
                        autoComplete="off"
                        className='inputCont container'
                    >
                        <TextField
                            label="Nro de Boletín"
                            variant="outlined"
                            className='inputBuscador'
                            value={nroBoletin}
                            onChange={(e) => setNroBoletin(e.target.value)}
                        />

                        <TextField
                            label="Fecha"
                            variant="outlined"
                            name="fecha"
                            type="date"
                            className='inputBuscador'
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />
                         <Button variant="contained" className='btnBuscador'>Buscar</Button>
                    </Box>
                </div>

            </div>
        </>
    )
}
