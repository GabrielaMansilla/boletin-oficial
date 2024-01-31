import React, { useEffect, useRef, useState } from 'react'
import './AltaBoletines.css'
import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material'
import { ALTA_BOLETIN_VALUES } from '../../helpers/constantes'
import FileUp from '@mui/icons-material/FileUpload';
import File from '@mui/icons-material/UploadFileRounded';

const AltaBoletines = () => {

  const [values, setValues] = useState(ALTA_BOLETIN_VALUES)
  const [selectedFileName, setSelectedFileName] = useState('Seleccione un Archivo');

  const obternerLista = (inicio, fin) => {
    const inicioNum = parseInt(inicio, 10)
    const finNum = parseInt(fin, 10)

    if (!isNaN(inicioNum) && !isNaN(finNum)) {
      return Array.from({ length: finNum - inicioNum + 1 }, (_, index) => inicioNum + index)
    } else if (!isNaN(inicioNum)) {
      return [inicioNum]
    } else {
      return []
    }
  }

  const obtenerDecretos = () => {
    return obternerLista(values.nroDecretoInicial, values.nroDecretoFinal)
  };

  const obtenerResoluciones = () => {
    return obternerLista(values.nroResolucionInicial, values.nroResolucionFinal)
  };

  const obtenerLicitaciones = () => {
    return obternerLista(values.nroLicitacionInicial, values.nroLicitacionFinal)
  };

  const handleGuardarBoletin = () => {
    const boletin = {
      decretos: obtenerDecretos(),
      resoluciones: obtenerResoluciones(),
      licitaciones: obtenerLicitaciones()
    };

    // Aquí deberías manejar el guardado del boletín en tu backend o donde corresponda
    console.log('Boletín a guardar:', boletin);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e) => {
    const fileName = e.target.files[0]?.name || '';
    setSelectedFileName(fileName);
  };


  return (
    <Box
      component="form"
      // sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
      noValidate
      autoComplete="off"
      className='contAltaBoletines container'
    >
      <div className='d-flex flex-row justify-content-around w-100'> 
        <Box className="formGroup flex-col ">

          <h3 className='nroBoletin'>Nro de Boletin: 4465
            {/* ´ {values.nroBoletin}´ */}
          </h3>
          {/* <TextField
          label="Nro de Boletín"
          className='inputAltaBoletin'
          type='number'
          value={values.nroBoletin}
          onChange={handleChange}
          inputProps={{ min: "10000", max: "99999" }}
          name="nroBoletin"
        /> */}

          <div className='contRango'>

            <h5>Decreto</h5>

            <div >
              <TextField
                label="Nº de Decreto inicial"
                className='inputAltaBoletin'
                type='number'
                value={values.nroDecretoInicial}
                onChange={handleChange}
                inputProps={({ min: "1000", max: "999999" }, { minLength: 4, maxLength: 6 })}
                name="nroDecretoInicial"
              />
              <TextField
                label="Nº de Decreto Final"
                className='inputAltaBoletin ms-3'
                type='number'
                value={values.nroDecretoFinal}
                onChange={handleChange}
                inputProps={({ min: "1000", max: "999999" }, { minLength: 4, maxLength: 6 })}
                name="nroDecretoFinal"
              />
            </div>
          </div>

          <div className='contRango'>

            <h5>Resolución</h5>

            <div>
              <TextField
                label="Nº de Resolución Inicial"
                className='inputAltaBoletin'
                type='number'
                value={values.nroResolucionInicial}
                onChange={handleChange}
                inputProps={({ min: "1000", max: "999999" }, { minLength: 4, maxLength: 6 })}
                name="nroResolucionInicial"
              />
              <TextField
                label="Nº de Resolución Final"  
                className='inputAltaBoletin ms-3'
                type='number'
                value={values.nroResolucionFinal}
                onChange={handleChange}
                inputProps={({ min: "1000", max: "999999" }, { minLength: 4, maxLength: 6 })}
                name="nroResolucionFinal"
              />

            </div>
          </div>

          <div className='contRango'>

            <h5>Licitación</h5>

            <div >
              <TextField
                label="Nº de Licitación Inicial"
                className='inputAltaBoletin'
                type='number'
                value={values.nroLicitacionInicial}
                onChange={handleChange}
                inputProps={({ min: "1000", max: "999999" }, { minLength: 4, maxLength: 6 })}
                name="nroLicitacionInicial"
              />
              <TextField
                label="Nº de Licitación Final"
                className='inputAltaBoletin ms-3'
                type='number'
                value={values.nroLicitacionFinal}
                onChange={handleChange}
                inputProps={({ min: "1000", max: "999999" }, { minLength: 4, maxLength: 6 })}
                name="nroLicitacionFinal"
              />
            </div>
          </div>
        </Box>

        {/* <TextareaAutosize
        minRows={10} className='textAreaBoletines' /> */}

        <Box className="d-flex flex-column col-4 W-100">
          <label className='fileNameDisplay flex-column'>{selectedFileName}
            <Input
              className="inputFileAltaBoletin"
              type='file'
              name="fileBoletin"
              onChange={handleChangeFile}
              required
            />
            {selectedFileName == 'Seleccione un Archivo' ? (

              <FileUp />
            ) : (
              <File />
            )
            }
          </label>
        </Box>
      </div>
          <Button type="button" variant="contained" onClick={handleGuardarBoletin}>
            Guardar Boletín
          </Button>
    </Box >
  )
}

export default AltaBoletines