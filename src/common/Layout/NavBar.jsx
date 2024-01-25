import React, { useState } from 'react'
import './NavBar.css'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import logoMuni from '../../assets/logo-SMT.png'


export const NavBar = () => {

    const initialState = {
        fecha: '',
        nroBoletin: '',
        tipo: '',
    };
    const [state, setState] = useState(initialState);
    const { fecha, nroBoletin, tipo } = state;

    const handleChange = (e) => {
        setState({ ...state, tipo: e.target.value });
    };


    return (
        <>
            <Container div className='navCont mt-4'>
                <div className='contLogo mb-3'>
                    <img src={logoMuni} alt="logo Muni" className='logoNav' />
                    <div className='ms-2'>
                        <h4 className='mb-0'>CIUDAD</h4>
                        <div className='textMuni'>

                            <h1>San Miguel </h1> <h1 className='ms-2'>de Tucumán</h1>
                        </div>
                    </div>
                </div>


                <Box className="buscador ">
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
                            onChange={handleChange}
                            inputProps={{ min: "0" }}
                            />

                        <TextField
                            label="Fecha"
                            variant="outlined"
                            name="fecha"
                            type="date"
                            className='inputBuscador'
                            value=" "
                            onChange={handleChange}
                            />
                        <FormControl sx={{ m: 1, minWidth: 80 }} >

                            <InputLabel id="demo-simple-select-autowidth-label">Tipo</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={tipo}
                                onChange={handleChange}
                                autoWidth
                                label="Tipo"
                                >
                                <MenuItem value="">
                                    <em>---- Seleccione el tipo ----</em>
                                </MenuItem>
                                <MenuItem value={10}>Decreto</MenuItem>
                                <MenuItem value={21}>Resolución</MenuItem>
                                <MenuItem value={22}>Ordenanza</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" className='btnBuscador' type='submit'>Buscar</Button>
                    </Box>
                </Box>

            </Container >
        </>
    )
}
