import React, { useEffect, useRef, useState } from 'react'
import './AltaBoletines.css'
import { Box, FormControl, Input, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material'
import { BUSCADOR_VALUES } from '../../helpers/constantes'
import FileUp from '@mui/icons-material/FileUpload';
import File from '@mui/icons-material/UploadFileRounded';

const AltaBoletines = () => {


  const [values, setValues] = useState(BUSCADOR_VALUES)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [selectedFileName, setSelectedFileName] = useState('Seleccione un Archivo');

  const handleChangeFile = (event) => {
    const fileName = event.target.files[0]?.name || '';
    setSelectedFileName(fileName);
  }

  return (
    <Box
      component="form"
      // sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
      noValidate
      autoComplete="off"
      className='contAltaBoletines container'
    >
      <Box className="formGroup">

        <TextField
          label="Nro de Boletín"
          className='inputAltaBoletin'
          type='number'
          value={values.nroBoletin}
          onChange={handleChange}
          inputProps={{ min: "0", max: "99999" }}
          name="nroBoletin"
        />
        {/* <FormControl sx={{ m: 1, minWidth: 80 }}
          className='inputAltaBoletin'
        >

          <InputLabel id="demo-simple-select-autowidth-label">Tipo</InputLabel>
          <Select
            value={values.tipo}
            onChange={handleChange}
            autoWidth
            label="Tipo"
            name="tipo"
            className='selectAltaBoletin'

          >
            <MenuItem value="">
              <em>---- Seleccione el tipo ----</em>
            </MenuItem>
            <MenuItem value={22}>Ordenanza</MenuItem>
            <MenuItem value={10}>Decreto</MenuItem>
            <MenuItem value={21}>Resolución</MenuItem>
            <MenuItem value={22}>Licitaciones Públicas</MenuItem>
          </Select>
        </FormControl> */}
        
      </Box>

      <TextareaAutosize
        minRows={10} className='textAreaBoletines' />

      <Box >
        <label className='fileNameDisplay flex-column'>{selectedFileName}
          <Input
            className="inputFileAltaBoletin"
            type='file'
            name="fileBoletin"
            onChange={handleChangeFile}
          />
          {selectedFileName == 'Seleccione un Archivo' ? (

            <FileUp />
          ) : (
            <File />
          )
          }
        </label>

      </Box>
    </Box>
  )
}

export default AltaBoletines