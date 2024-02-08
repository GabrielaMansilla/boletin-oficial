import React, { useEffect, useState } from "react";
import "./AltaBoletines.css";
import {
  Alert,
  Box,
  Button,
  Input,
  Snackbar,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { ALTA_BOLETIN_VALUES } from "../../helpers/constantes";
import FileUp from "@mui/icons-material/FileUpload";
import File from "@mui/icons-material/UploadFileRounded";
import axios from "../../config/axios";
import { ModalAltaBoletines } from "../ModalAltaBoletines/ModalAltaBoletines";

const AltaBoletines = () => {
  
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("error");
  const [formattedValue, setFormattedValue] = useState("");
  const [values, setValues] = useState(ALTA_BOLETIN_VALUES);
  const [mensaje, setMensaje] = useState("Algo Explotó :/");
  const [selectedFileName, setSelectedFileName] = useState(
    "Seleccione un Archivo"
  );
  const [resolucionArray, setResolucionArray] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [bandera, setBandera] = useState(true);
  const [datosBoletin, setDatosBoletin] = useState({});

  const obternerLista = (inicio, fin) => {
    const inicioNum = parseInt(inicio, 10);
    const finNum = parseInt(fin, 10);

    if (!isNaN(inicioNum) && !isNaN(finNum)) {
      return Array.from(
        { length: finNum - inicioNum + 1 },
        (_, index) => inicioNum + index
      );
    } else if (!isNaN(inicioNum)) {
      return [inicioNum];
    } else {
      return [];
    }
  };

  const obtenerDecretos = () => {
    return obternerLista(values.nroDecretoInicial, values.nroDecretoFinal);
  };

  const obtenerOrdenanzas = () => {
    return obternerLista(values.nroOrdenanzaInicial, values.nroOrdenanzaFinal);
  };

  const obtenerResoluciones = () => {
    return obternerLista(values.nroResolucionInicial);
  };

  //   // Aquí deberías manejar el guardado del boletín en tu backend o donde corresponda
  //   console.log("Boletín a guardar:", boletin);
  // };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e) => {
    const fileName = e.target.files[0]?.name || "";
    setSelectedFileName(fileName);

    if (!fileName.toLowerCase().endsWith(".pdf")) {
      setOpen(true);
      setMensaje("El archivo solo puede ser PDF");
      setError("warning");
    } else {
      setOpen(false); // Cerrar la advertencia si el archivo es un PDF
    }
  };

  useEffect(() => {
    setFormattedValue(formatNroResolucion(values.nroResolucion));
  }, [values.nroResolucion]);

  const formatNroResolucion = (inputValue) => {
    const formatted = inputValue
      ?.replace(/[^\d]/g, "") // Elimina caracteres no numéricos
      ?.replace(/(\d{4})(?!$)/g, "$1-"); // Inserta un guion después de cada grupo de 4 dígitos, excepto al final
    return formatted;
  };

  const handleResolucionChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue?.length < 150) {
      const formatted = formatNroResolucion(inputValue);
      setFormattedValue(formatted);
      setResolucionArray(formatted.split("-").filter(Boolean));
    }
  };

  const esNumeroDeResolucionValido = () => {
    return formattedValue === "" || /\d{4}$/.test(formattedValue) !== false;
  };

  const puedeEnviarFormulario =
    selectedFileName !== "Seleccione un Archivo" &&
    (values.nroDecretoInicial !== "" ||
      values.nroDecretoFinal !== "" ||
      values.nroOrdenanzaInicial !== "" ||
      values.nroOrdenanzaFinal !== "" ||
      formattedValue !== "") &&
    esNumeroDeResolucionValido() &&
    values.fechaBoletin !== "" &&
    values.nroBoletin !== "";

  const handleMensaje = () => {
    
    if (formattedValue.length >= 1 && formattedValue.length < 4) {
      if (!/\d{4}$/.test(formattedValue)) {
        setOpen(true);
        setMensaje("El último número de resolución debe tener 4 dígitos");
        setError("warning");
      } else {
        setOpen(true);
        setMensaje("El número de resolución debe tener 4 dígitos");
        setError("warning");
      }
    } else if (values.nroBoletin === "") {
      setOpen(true);
      setMensaje("Debe ingresar el Nº de Boletín");
      setError("error");
    } else if (values.fechaBoletin === "") {
      setOpen(true);
      setMensaje("Debe ingresar la fehca del Boletín");
      setError("warning");
    } else {
      setOpen(true);
      setMensaje("Debe llenar al menos un campo y adjuntar un archivo .pdf");
      setError("error");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

const handleConfirm = (flag) =>{
  setBandera(flag)
}

  const handleGuardarBoletin = async () => {
    // const enviarDatos = async () => {
    setMostrarModal(true);
console.log(bandera)
    if(bandera){
      try {
        const resolucionSinGuiones = resolucionArray.map((item) =>
          parseInt(item)
        );
        values.nroDecreto = obtenerDecretos();
        values.nroOrdenanza = obtenerOrdenanzas();
        values.nroResolucion = resolucionSinGuiones;
        console.log(resolucionSinGuiones);
  
        const respuesta = await axios.post("/boletin/alta", values);
        console.log(respuesta);
        setValues(ALTA_BOLETIN_VALUES);
        setSelectedFileName("Seleccione un Archivo");
        setFormattedValue("");
        setOpen(true);
        setMensaje("Boletin generado con éxito!");
        setError("success");
      } catch (error) {
        console.error("Algo explotó! D:' ")
      }

    }else{
      setOpen(true);
      setMensaje("Intente nuevamente");
      setError("warning");
    }

  };

  return (
    <Box
      component="form"
      // sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
      noValidate
      autoComplete="off"
      className="contBoxAltaBoletines container"
    >
      <div className="contAltaBoletines">
        <Box className="formGroup flex-col ">
          <div className="contRango">
            <h5>Boletin:</h5>
            <div>
              <TextField
                label="Nro de Boletín"
                variant="outlined"
                className="inputAltaBoletin"
                type="number"
                value={values.nroBoletin}
                onChange={handleChange}
                inputProps={{ min: "0" }}
                name="nroBoletin"
              />

              <TextField
                label="Fecha Boletin"
                variant="outlined"
                name="fechaBoletin"
                type="date"
                className="inputAltaBoletin ms-3"
                value={values.fechaBoletin}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>

          <div className="contRango">
            <h5>Decretos:</h5>

            <div>
              <TextField
                label="Nº de Decreto inicial"
                className="inputAltaBoletin"
                type="number"
                value={values.nroDecretoInicial}
                onChange={handleChange}
                inputProps={{
                  min: "1000",
                  max: "999999",
                  minLength: 4,
                  maxLength: 6,
                }}
                name="nroDecretoInicial"
              />
              <TextField
                label="Nº de Decreto Final"
                className="inputAltaBoletin ms-3"
                type="number"
                value={values.nroDecretoFinal}
                onChange={handleChange}
                inputProps={{
                  min: "1000",
                  max: "999999",
                  minLength: 4,
                  maxLength: 6,
                }}
                name="nroDecretoFinal"
              />
            </div>
          </div>

          <div className="contRango">
            <h5>Ordenanza:</h5>

            <div>
              <TextField
                label="Nº de Ordenanza Inicial"
                className="inputAltaBoletin"
                type="number"
                value={values.nroOrdenanzaInicial}
                onChange={handleChange}
                inputProps={{
                  min: "1000",
                  max: "999999",
                  minLength: 4,
                  maxLength: 6,
                }}
                name="nroOrdenanzaInicial"
              />
              <TextField
                label="Nº de Ordenanza Final"
                className="inputAltaBoletin ms-3"
                type="number"
                value={values.nroOrdenanzaFinal}
                onChange={handleChange}
                inputProps={{
                  min: "1000",
                  max: "999999",
                  minLength: 4,
                  maxLength: 6,
                }}
                name="nroOrdenanzaFinal"
              />
            </div>
          </div>

          <div className="contRango">
            <h5>Resolución:</h5>

            <div>
              <TextField
                label="Nº de Resolución"
                className="inputAltaBoletin"
                type="text"
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
          <label className="fileNameDisplay flex-column">
            {selectedFileName}
            <Input
              className="inputFileAltaBoletin"
              type="file"
              name="archivoBoletin"
              value={values.archivoBoletin}
              onChange={handleChangeFile}
              accept="application/pdf"
              required
            />
            {selectedFileName === "Seleccione un Archivo" ? (
              <FileUp />
            ) : (
              <File />
            )}
          </label>
        </Box>
      </div>
      {puedeEnviarFormulario ? (
        selectedFileName !== "" &&
        selectedFileName.toLowerCase().endsWith(".pdf") ? (
          <>
            <Button
              type="button"
              variant="contained"
              onClick={handleGuardarBoletin}
            >
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
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={handleClose}
          severity={error}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {mensaje}
        </Alert>
      </Snackbar>
      {mostrarModal && (
        <ModalAltaBoletines 
        // datosCorrectos={bandera}
         abrir={mostrarModal}  datosBoletin={values} onConfirm={handleConfirm} />
      )}
    </Box>
  );
};
export default AltaBoletines;
