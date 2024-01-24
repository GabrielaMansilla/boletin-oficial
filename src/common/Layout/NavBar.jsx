import React, { useState } from 'react'
import './NavBar.css'
import { Box, Button, TextField } from '@mui/material'
import logoMuni from '../../assets/logo-SMT.png'


export const NavBar = () => {
    const [fecha, setFecha] = useState(' ');
    const [nroBoletin, setNroBoletin] = useState('');

    return (
        <>
            <div className='navCont container align-items-center'>
                <div className='contLogo mb-3'>
                    <img src={logoMuni} alt="logo Muni" className='logoNav' />
                    <div>
                        <h4 className='mb-0'>CIUDAD</h4>
                        <h1>San Miguel de Tucumán</h1>
                    </div>
                </div>


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
                            type='number'
                            value={nroBoletin}
                            onChange={(e) => setNroBoletin(e.target.value)}
                            inputProps={{ min: "0" }}
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
                        <Button variant="contained" className='btnBuscador' type='submit'>Buscar</Button>
                    </Box>
                </div>

            </div>
        </>
    )
}
