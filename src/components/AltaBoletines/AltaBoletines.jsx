import React, { useEffect, useState } from "react";
import "./AltaBoletines.css";
import { Alert, Box, Button, Input, Snackbar, TextField } from "@mui/material";
import { ALTA_BOLETIN_VALUES } from "../../helpers/constantes";
import FileUp from "@mui/icons-material/FileUpload";
import File from "@mui/icons-material/UploadFileRounded";
import axios from "../../config/axios";
import { ModalAltaBoletin } from "../ModalAltaBoletines/ModalAltaBoletin.jsx";
import useGet from "../../hook/useGet";
const AltaBoletines = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("error");
  const [formattedValue, setFormattedValue] = useState(" ");
  const [values, setValues] = useState(ALTA_BOLETIN_VALUES);
  const [mensaje, setMensaje] = useState("Algo Explotó :/");
  const [selectedFileName, setSelectedFileName] = useState(
    "Seleccione un Archivo"
  );
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [resolucionArray, setResolucionArray] = useState([]);
  const [decretoArray, setDecretoArray] = useState([]);
  const [ordenanzaArray, setOrdenanzaArray] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  // eslint-disable-next-line
  const [bandera, setBandera] = useState(false);
  // const [datosBoletin, setDatosBoletin] = useState({});
  // eslint-disable-next-line
  const [boletines, loading, getboletin] = useGet("/boletin/listar", axios);
  // eslint-disable-next-line
  const [nroBoletinExistente, setNroBoletinExistente] = useState(false);

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
      setOpen(false);
    }
    const aux = e.target.files[0];
    setArchivoSeleccionado(aux);
  };
  useEffect(() => {
    setFormattedValue(formatNroResolucion(values.nroResolucion));
  }, [values.nroResolucion]);

  useEffect(() => {}, [formattedValue]);

  useEffect(() => {
    // eslint-disable-next-line
    getboletin();
  }, []);

  useEffect(() => {
    const nuevoNumeroBoletin = values.nroBoletin;
    // eslint-disable-next-line
    const existe = numeroBoletinExiste(nuevoNumeroBoletin);
    setNroBoletinExistente(existe);
  }, [boletines, values.nroBoletin]);

  const formatNroResolucion = (inputValue) => {
    if (typeof inputValue === "string") {
      const formatted = inputValue
        .replace(/[^\d]/g, "") // Elimina caracteres no numéricos
        .replace(/(\d{4})(?!$)/g, "$1-"); // Inserta un guion después de cada grupo de 4 dígitos, excepto al final
      return formatted;
    } else {
      return inputValue;
    }
  };

  const handleResolucionChange = (e) => {
    const inputValue = e.target.value;
    if (typeof inputValue === "string") {
      if (inputValue?.length < 150) {
        const formatted = inputValue
          .replace(/[^\d]/g, "") // Elimina caracteres no numéricos
          .replace(/(\d{4})(?!$)/g, "$1-"); // Inserta un guion después de cada grupo de 4 dígitos, excepto al final
        setFormattedValue(formatted);
        setResolucionArray(formatted.split("-").filter(Boolean));
      }
    }
  };
  const handleDecretoChange = (e) => {
    const inputValue = e.target.value;
    if (typeof inputValue === "string") {
      if (inputValue?.length < 150) {
        const formatted = formatNroResolucion(inputValue);
        setValues({ ...values, nroDecretoInicial: formatted });
        setDecretoArray(formatted.split("-").filter(Boolean));
      }
    }
  };

  const handleOrdenanzaChange = (e) => {
    const inputValue = e.target.value;
    if (typeof inputValue === "string") {
      if (inputValue?.length < 150) {
        const formatted = formatNroResolucion(inputValue);
        setValues({ ...values, nroOrdenanzaInicial: formatted });
        setOrdenanzaArray(formatted.split("-").filter(Boolean));
        console.log(esNumeroDeResolucionValido(formatted));
        console.log(ordenanzaArray);
      }
    }
  };

  // const esNumeroDeResolucionValido = () => {
  //   return (
  //     formattedValue === undefined ||
  //     /\d{4}$/.test(formattedValue) !== false ||
  //     formattedValue.length === 0
  //   );
  // };
  const esNumeroDeResolucionValido = (formattedValue) => {
    return (
      formattedValue === undefined ||
      /\d{4}$/.test(formattedValue) !== false ||
      formattedValue.length === 0
    );
  };

  const puedeEnviarFormulario =
    selectedFileName !== "Seleccione un Archivo" &&
    (values.nroDecretoInicial !== "" ||
      // values.nroDecretoFinal !== "" ||
      values.nroOrdenanzaInicial !== "" ||
      // values.nroOrdenanzaFinal !== "" ||
      formattedValue !== "") &&
    esNumeroDeResolucionValido(formattedValue) &&
    esNumeroDeResolucionValido(values.nroDecretoInicial) &&
    esNumeroDeResolucionValido(values.nroOrdenanzaInicial) &&
    values.fechaBoletin !== "" &&
    values.nroBoletin !== "";
  const handleMensaje = () => {
    let mensaje = "";
    let fileName = archivoSeleccionado?.name || "";
    if (!/^\d{4}$/.test(formattedValue?.split("-")) && formattedValue !== "") {
      console.log(1);
      mensaje = "El último número de resolución debe tener 4 dígitos";
      setError("warning");
    } else if (
      !/^\d{4}$/.test(values.nroDecretoInicial?.split("-")) &&
      values.nroDecretoInicial !== ""
    ) {
      console.log(2);
      console.log(values.nroDecretoInicial);
      mensaje = "El último número de decreto debe tener 4 dígitos";
      setError("warning");
    } else if (
      !/^\d{4}$/.test(values.nroOrdenanzaInicial?.split("-")) &&
      values.nroOrdenanzaInicial !== ""
    ) {
      console.log(9);
      console.log(values.nroOrdenanzaInicial);
      mensaje = "El último número de ordenanza debe tener 4 dígitos";
      setError("warning");
    } else if (values.nroBoletin === "") {
      console.log(3);
      mensaje = "Debe ingresar el Nº de Boletín";
      setError("error");
    } else if (numeroBoletinExiste(values.nroBoletin)) {
      console.log(4);
      mensaje = `El Nº de Boletín ${values.nroBoletin} ya existe!`;
      setError("error");
    } else if (values.fechaBoletin === "") {
      console.log(5);
      mensaje = "Debe ingresar la fecha del Boletín";
      setError("warning");
    } else if (
      !values.nroDecretoInicial &&
      !values.nroOrdenanzaInicial &&
      !formattedValue
    ) {
      console.log(6);
      mensaje = "Debe llenar al menos un campo y adjuntar un archivo .pdf";
      setError("error");
    } else if (fileName === "") {
      console.log(7);
      mensaje = "Debe seleccionar un archivo";
      setError("warning");
    } else if (!fileName.toLowerCase().endsWith(".pdf")) {
      console.log(8);
      mensaje = "El archivo solo puede ser PDF";
    } else {
      mensaje = "Recarga la pagina";
      return;
    }
    setOpen(true);
    setMensaje(mensaje);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const numeroBoletinExiste = (nuevoNumeroBoletin) => {
    const numero = parseInt(nuevoNumeroBoletin, 10); // Convertir a número
    return boletines.some((boletin) => boletin.nroBoletin === numero);
  };
  const handleGuardarBoletin = async () => {
    setMostrarModal(true);
  };
  const handleConfirm = async (confirmado) => {
    setBandera(confirmado);
    setMostrarModal(false);
    if (confirmado) {
      enviarDatos();
    } else {
      setOpen(true);
      setMensaje("Intente nuevamente");
      setError("warning");
    }
  };
  const enviarDatos = async () => {
    try {
      const resolucionSinGuiones = resolucionArray.map((item) =>
        parseInt(item)
      );
      const decretos = decretoArray.map((item) => parseInt(item));
      const ordenanzas = ordenanzaArray.map((item) => parseInt(item));
      const requestData = {
        nroBoletin: parseInt(values.nroBoletin, 10),
        fechaBoletin: values.fechaBoletin,
        fechaNormaBoletin: values.fechaNormaBoletin,
        nroDecreto: decretos,
        nroOrdenanza: ordenanzas,
        nroResolucion: resolucionSinGuiones,
      };
      formData.append("requestData", JSON.stringify(requestData));
      formData.append("archivoBoletin", archivoSeleccionado);
      setFormData(formData);
      console.log(...formData.entries());
      const respuesta = await axios.post("/boletin/alta", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(respuesta);
      setValues(ALTA_BOLETIN_VALUES);
      setSelectedFileName("Seleccione un Archivo");
      setFormattedValue("");
      setOpen(true);
      setMensaje("Boletin generado con éxito!");
      setError("success");
      setFormData(new FormData());
    } catch (error) {
      console.error("Algo explotó! D:' ", error);
    }
  };
  return (
    <Box
      component="form"
      id="form"
      noValidate
      enctype="multipart/form-data"
      autoComplete="on"
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
              <TextField
                label="Fecha Norma"
                variant="outlined"
                name="fechaNormaBoletin"
                type="date"
                className="inputAltaBoletin ms-3"
                value={values.fechaNormaBoletin}
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
                type="text"
                value={values.nroDecretoInicial}
                onChange={handleDecretoChange}
                // inputProps={{
                //   min: "1000",
                //   max: "999999",
                //   minLength: 4,
                //   maxLength: 6,
                // }}
                name="nroDecretoInicial"
              />
              {/* <TextField
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
              /> */}
            </div>
          </div>
          <div className="contRango">
            <h5>Ordenanza:</h5>
            <div>
              <TextField
                label="Nº de Ordenanza Inicial"
                className="inputAltaBoletin"
                type="text"
                value={values.nroOrdenanzaInicial}
                onChange={handleOrdenanzaChange}
                // inputProps={{
                //   min: "1000",
                //   max: "999999",
                //   minLength: 4,
                //   maxLength: 6,
                // }}
                name="nroOrdenanzaInicial"
              />
              {/* <TextField
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
              /> */}
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
              id="fileBoletin"
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
        !numeroBoletinExiste(values.nroBoletin) &&
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
        <ModalAltaBoletin
          // datosCorrectos={bandera}
          abrir={mostrarModal}
          onConfirm={handleConfirm}
        />
      )}
    </Box>
  );
};
export default AltaBoletines;
