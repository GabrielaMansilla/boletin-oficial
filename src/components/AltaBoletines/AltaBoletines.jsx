import React, { useEffect, useRef, useState } from 'react'
import './AltaBoletines.css'
import { Alert, Box, Button, FormControl, Input, InputLabel, MenuItem, Select, Snackbar, TextField, TextareaAutosize } from '@mui/material'
import { ALTA_BOLETIN_VALUES } from '../../helpers/constantes'
import FileUp from '@mui/icons-material/FileUpload';
import File from '@mui/icons-material/UploadFileRounded';

const AltaBoletines = () => {

  const [values, setValues] = useState(ALTA_BOLETIN_VALUES)
  const [selectedFileName, setSelectedFileName] = useState('Seleccione un Archivo');
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("Algo Explotó :/");
  const [error, setError] = useState("error");
  const [formattedValue, setFormattedValue] = useState('');


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

  const listarResoluciones = (inputString) => {
    if (typeof inputString === 'string') {
      const array = inputString.split('-').map(Number);
      return array
    } else {
      console.error('inputString no es una cadena');
    }
  }

  const obtenerDecretos = () => {
    return obternerLista(values.nroDecretoInicial, values.nroDecretoFinal)
  };

  const obtenerOrdenanzas = () => {
    return obternerLista(values.nroOrdenanzaInicial, values.nroOrdenanzaFinal)
  };
  const obtenerResoluciones = () => {
    return listarResoluciones(formattedValue)
  };

  const handleGuardarBoletin = () => {

    const boletin = {
      decretos: obtenerDecretos(),
      ordenanzas: obtenerOrdenanzas(),
      resoluciones: obtenerResoluciones(),
    };

    setOpen(true)
    setMensaje("Boletin generado con éxito!")
    setError("success")
    // Aquí deberías manejar el guardado del boletín en tu backend o donde corresponda
    console.log('Boletín a guardar:', boletin);
    setValues(ALTA_BOLETIN_VALUES)
    setSelectedFileName('Seleccione un Archivo')
    setFormattedValue("")
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e) => {
    const fileName = e.target.files[0]?.name || '';
    setSelectedFileName(fileName);

    if (!fileName.toLowerCase().endsWith('.pdf')) {
      setOpen(true);
      setMensaje("El archivo solo puede ser PDF")
      setError('warning')
    } else {
      setOpen(false); // Cerrar la advertencia si el archivo es un PDF
    }
  };

  // Actualizar el formattedValue cuando cambia values.nroResolucion
  useEffect(() => {
    setFormattedValue(formatNroResolucion(values.nroResolucion));
  }, [values.nroResolucion]);

  const formatNroResolucion = (inputValue) => {

    const formatted = inputValue
      .replace(/[^\d]/g, '') // Elimina caracteres no numéricos
      .replace(/(\d{4})(?!$)/g, '$1-'); // Inserta un guion después de cada grupo de 4 dígitos, excepto al final
    return formatted;

  }

  const handleResolucionChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue?.length < 150) {
      setFormattedValue(formatNroResolucion(inputValue));

    };
  };

  const esNumeroDeResolucionValido = () => {
    return formattedValue === '' || ((/\d{4}$/).test(formattedValue) !== false);
  };

  const puedeEnviarFormulario =
    selectedFileName !== 'Seleccione un Archivo' &&
    (
      (values.nroDecretoInicial !== "" || values.nroDecretoFinal !== "" || values.nroOrdenanzaInicial !== "" || values.nroOrdenanzaFinal !== "" || values.formattedValue !== "") &&
      esNumeroDeResolucionValido()
    );

  const handleMensaje = () => {
    if ((1 < formattedValue.length < 4 || !((/\d{4}$/).test(formattedValue)) && ) ) {
      setOpen(true);
      setMensaje("El último número de resolución debe tener 4 dígitos");
      setError("warning");
    } 
      setOpen(true)
      setMensaje("Debe llenar al menos un campo y adjuntar un archivo .pdf")
      setError("error")
    
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      component="form"
      // sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
      noValidate
      autoComplete="off"
      className='contBoxAltaBoletines container'
    >
      <div className='contAltaBoletines'>
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

            <h5>Decreto:</h5>

            <div >
              <TextField
                label="Nº de Decreto inicial"
                className='inputAltaBoletin'
                type='number'
                value={values.nroDecretoInicial}
                onChange={handleChange}
                inputProps={{ min: "1000", max: "999999", minLength: 4, maxLength: 6 }}
                name="nroDecretoInicial"
              />
              <TextField
                label="Nº de Decreto Final"
                className='inputAltaBoletin ms-3'
                type='number'
                value={values.nroDecretoFinal}
                onChange={handleChange}
                inputProps={{ min: "1000", max: "999999", minLength: 4, maxLength: 6 }}
                name="nroDecretoFinal"
              />
            </div>
          </div>

          <div className='contRango'>

            <h5>Ordenanza:</h5>

            <div>
              <TextField
                label="Nº de Ordenanza Inicial"
                className='inputAltaBoletin'
                type='number'
                value={values.nroOrdenanzaInicial}
                onChange={handleChange}
                inputProps={{ min: "1000", max: "999999", minLength: 4, maxLength: 6 }}
                name="nroOrdenanzaInicial"
              />
              <TextField
                label="Nº de Ordenanza Final"
                className='inputAltaBoletin ms-3'
                type='number'
                value={values.nroOrdenanzaFinal}
                onChange={handleChange}
                inputProps={{ min: "1000", max: "999999", minLength: 4, maxLength: 6 }}
                name="nroOrdenanzaFinal"
              />

            </div>
          </div>

          <div className='contRango'>

            <h5>Resolución:</h5>

            <div >
              <TextField
                label="Nº de Resolución"
                className='inputAltaBoletin'
                type='text'
                // value={values.nroResolucion}
                value={formattedValue}
                onChange={handleResolucionChange}
                name="nroResolucion"
              />
            </div>
          </div>
        </Box>

        {/* <TextareaAutosize
        minRows={10} className='textAreaBoletines' /> */}

        <Box className="contInputFileBoletin col-4 W-100 pt-5 pb-4">
          <label className='fileNameDisplay flex-column'>{selectedFileName}
            <Input
              className="inputFileAltaBoletin"
              type='file'
              name="fileBoletin"
              value={values.archivoBoletin}
              onChange={handleChangeFile}
              accept="application/pdf"
              required
            />
            {selectedFileName === 'Seleccione un Archivo' ? (

              <FileUp />
            ) : (
              <File />
            )
            }
          </label>
        </Box>
      </div>
      {puedeEnviarFormulario ?
        (
          (selectedFileName !== '' && (selectedFileName.toLowerCase().endsWith('.pdf'))) ? (
            <>
              <Button type="button" variant="contained" onClick={handleGuardarBoletin}>
                Guardar Boletín
              </Button>
            </>

          ) : (
            <>
              <Button type="button" variant="contained" onClick={handleMensaje}>
                Guardar Boletín
              </Button>
            </>
          )
        ) : (
          <Button type="button" variant="contained" onClick={handleMensaje}>
            Guardar Boletín
          </Button>

        )


      }
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}

      >
        <Alert
          onClose={handleClose}
          severity={error}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {mensaje}
        </Alert>
      </Snackbar>
    </Box >
  )
}

export default AltaBoletines