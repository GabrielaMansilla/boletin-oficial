import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState} from 'react';
import './Buscador.css'
import Form from '../Form/Form.jsx';




const Buscador = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
         <div className='d-flex justify-content-center'>

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
            value={values.nroBoletin}
            onChange={handleChange}
            inputProps={{ min: "0" }}
            name="nroBoletin"
        />

        <TextField
            label="Fecha"
            variant="outlined"
            name="fecha"
            type="date"
            className='inputBuscador'
            value={values.fecha}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
        />
        <FormControl sx={{ m: 1, minWidth: 80 }} >

            <InputLabel id="demo-simple-select-autowidth-label">Tipo</InputLabel>
            <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={values.tipo}
                onChange={handleChange}
                autoWidth
                label="Tipo"
                name="tipo"
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
        <Button variant="contained" className='btnBuscador' type='submit'>Busqueda Avanzada</Button>
 <div className='d-flex justify-content-center'>

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
                        value={values.nroBoletin}
                        onChange={handleChange}
                        inputProps={{ min: "0" }}
                        name="nroBoletin"
                    />

                    <TextField
                        label="Fecha"
                        variant="outlined"
                        name="fecha"
                        type="date"
                        className='inputBuscador'
                        value={values.fecha}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <FormControl sx={{ m: 1, minWidth: 80 }} >

                        <InputLabel id="demo-simple-select-autowidth-label">Tipo</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={values.tipo}
                            onChange={handleChange}
                            autoWidth
                            label="Tipo"
                            name="tipo"
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
                    <Button variant="contained" className='btnBuscador' type='submit' onClick={handleShow}>Busqueda Avanzada</Button>
            
                </Box>
            </Box> 
        </div>
    </Box>
</Box> 
</div>
<Form/>
        </>
    )
}

export default Buscador;