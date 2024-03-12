import React, { useEffect, useState } from "react";
import "./AltaBoletinesNuevo.css";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { ALTA_CABECERA_BOLETIN_VALUES } from "../../helpers/constantes";
import { ALTA_CONTENIDO_BOLETIN_VALUES } from "../../helpers/constantes";
import FileUp from "@mui/icons-material/FileUpload";
import File from "@mui/icons-material/UploadFileRounded";
import axios from "../../config/axios";
import { ModalAltaBoletin } from "../ModalAltaBoletines/ModalAltaBoletin.jsx";
import useGet from "../../hook/useGet";

const AltaBoletinesNuevo = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("error");
  // const [formattedValue, setFormattedValue] = useState(" ");
  const [valuesCabecera, setValuesCabecera] = useState(
    ALTA_CABECERA_BOLETIN_VALUES
  );
  const [valuesContenido, setValuesContenido] = useState(
    ALTA_CONTENIDO_BOLETIN_VALUES
  );
  const [mensaje, setMensaje] = useState("Algo Explotó :/");
  const [selectedFileName, setSelectedFileName] = useState(
    "Seleccione un Archivo"
  );
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  // const [resolucionArray, setResolucionArray] = useState([]);
  // const [decretoArray, setDecretoArray] = useState([]);
  // const [ordenanzaArray, setOrdenanzaArray] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  // eslint-disable-next-line
  const [bandera, setBandera] = useState(false);
  // const [datosBoletin, setDatosBoletin] = useState({});
  // eslint-disable-next-line
  const [boletines, loading, getboletin] = useGet("/boletin/listar", axios);
  // eslint-disable-next-line
  const [nroBoletinExistente, setNroBoletinExistente] = useState(false);
  // eslint-disable-next-line
  const [tiposOrigen, loadingOrigen, getTiposOrigen] = useGet(
    "/boletin/listarOrigen",
    axios
  );
  const [tiposNorma, loadingNorma, getTiposNoma] = useGet(
    "/norma/listar",
    axios
  );
  console.log(tiposNorma);
  console.log(tiposOrigen);

  const [normasAgregadas, setNormasAgregadas] = useState([]);

  const handleAgregarNorma = () => {
    const nuevaNorma = {
      norma: valuesContenido.norma.tipo_norma,
      numero: valuesContenido.nroNorma,
      origen: valuesContenido.origen.nombre_origen,
      año: new Date(valuesContenido.fechaNormaBoletin).getFullYear(),
    };
    setNormasAgregadas([...normasAgregadas, nuevaNorma]);
    // Limpiar campos después de agregar la norma
    setValuesContenido(ALTA_CONTENIDO_BOLETIN_VALUES);
    console.log(normasAgregadas);
  };

  useEffect(() => {
    console.log(normasAgregadas);
  }, [normasAgregadas]);

  const handleEliminarNorma = (index) => {
    const nuevasNormas = [...normasAgregadas];
    nuevasNormas.splice(index, 1);
    setNormasAgregadas(nuevasNormas);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValuesCabecera({
      ...valuesCabecera,
      [name]: value,
    });
    setValuesContenido({
      ...valuesContenido,
      [name]: value,
    });
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
    getboletin();
  }, []);

  useEffect(() => {
    const nuevoNumeroBoletin = valuesCabecera.nroBoletin;
    // eslint-disable-next-line
    const existe = numeroBoletinExiste(nuevoNumeroBoletin);
    // eslint-disable-next-line
    setNroBoletinExistente(existe);
    // eslint-disable-next-line
  }, [boletines, valuesCabecera.nroBoletin]);

  const puedeEnviarFormulario =
    selectedFileName !== "Seleccione un Archivo" &&
    valuesCabecera.fechaPublicacion !== "" &&
    valuesContenido.origen !== "" &&
    valuesCabecera.nroBoletin !== "";

  const handleMensaje = () => {
    let mensaje = "";
    let fileName = archivoSeleccionado?.name || "";
    if (valuesCabecera.nroBoletin === "") {
      console.log(1);
      mensaje = "Debe ingresar el Nº de Boletín";
      setError("error");
    } else if (numeroBoletinExiste(valuesCabecera.nroBoletin)) {
      console.log(2);
      mensaje = `El Nº de Boletín ${valuesCabecera.nroBoletin} ya existe!`;
      setError("error");
    } else if (valuesCabecera.fechaPublicacion === "") {
      console.log(3);
      mensaje = "Debe ingresar la fecha del Boletín";
      setError("warning");
    } else if (normasAgregadas !== "") {
      console.log(4);
      mensaje = "Debe ingresar al menos una norma";
      setError("warning");
    } else if (fileName === "") {
      console.log(8);
      mensaje = "Debe seleccionar un archivo";
      setError("warning");
    } else if (!fileName.toLowerCase().endsWith(".pdf")) {
      console.log(9);
      mensaje = "El archivo solo puede ser PDF";
    } else {
      mensaje = "Recarga la pagina";
      return;
    }
    setOpen(true);
    setMensaje(mensaje);
  };

  const handleMensajeContenido = () => {
    let mensaje = "";
    // if (numeroBoletinExiste(valuesCabecera.nroBoletin)) {
    //   console.log(2);
    //   mensaje = `El Nº de Boletín ${valuesCabecera.nroBoletin} ya existe!`;
    //   setError("error");
    // } else
    if (!valuesContenido.norma || valuesContenido.norma === "") {
      console.log(4);
      mensaje = "Debe seleccionar la Norma";
      setError("warning");
    } else if (!valuesContenido.origen || valuesContenido.origen === "") {
      console.log(5);
      mensaje = "Debe ingresar la Secretaría";
    } else if (
      !valuesContenido.fechaNormaBoletin ||
      valuesContenido.fechaNormaBoletin === ""
    ) {
      console.log(6);
      mensaje = "Debe ingresar la fecha de Norma";
      setError("warning");
    } else if (!valuesContenido.nroNorma || valuesContenido.nroNorma === "") {
      console.log(7);
      mensaje = "Debe ingresar el Nro de norma";
      setError("warning");
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
      // const resolucionSinGuiones = resolucionArray.map((item) =>
      //   parseInt(item)
      // );
      // const decretos = decretoArray.map((item) => parseInt(item));
      // const ordenanzas = ordenanzaArray.map((item) => parseInt(item));
      const requestData = {
        nroBoletin: parseInt(valuesCabecera.nroBoletin, 10),
        fechaPublicacion: valuesCabecera.fechaPublicacion,
        fechaNormaBoletin: valuesContenido.fechaNormaBoletin,
        origen: valuesContenido.origen,
        // nroDecreto: decretos,
        // nroOrdenanza: ordenanzas,
        // nroResolucion: resolucionSinGuiones,
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
      console.log("modongo");
      console.log(respuesta);
      setValuesCabecera(ALTA_CABECERA_BOLETIN_VALUES);
      setValuesContenido(ALTA_CONTENIDO_BOLETIN_VALUES);
      setSelectedFileName("Seleccione un Archivo");
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
            <div>
              <div className="d-flex flex-column ">
                <div className="encabezadoBoletin">
                  <h5>Boletin:</h5>
                  <div className="d-flex flex-row">
                    <TextField
                      label="Nro de Boletín"
                      variant="outlined"
                      className="inputAltaBoletin"
                      type="number"
                      value={valuesCabecera.nroBoletin}
                      onChange={handleChange}
                      inputProps={{ min: "0" }}
                      name="nroBoletin"
                    />
                    <TextField
                      label="Fecha Publicación"
                      variant="outlined"
                      name="fechaPublicacion"
                      type="date"
                      className="inputAltaBoletin ms-3"
                      value={valuesCabecera.fechaPublicacion}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <hr className="mt-4 mb-3" />
                </div>
                <div className="cuerpoBoletin">
                  <div className="d-flex flex-row">
                    <div className="d-flex flex-column">
                      <FormControl sx={{ minWidth: 80 }} className="mb-3">
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Norma
                        </InputLabel>
                        <Select
                          labeld="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={valuesContenido.norma}
                          onChange={handleChange}
                          autoWidth
                          label="Norma"
                          name="norma"
                          //   disabled
                        >
                          <MenuItem value="">
                            <em>--Seleccione--</em>
                          </MenuItem>
                          {tiposNorma.map((norma) => (
                            <MenuItem key={norma.id_norma} value={norma}>
                              {norma.tipo_norma}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ minWidth: 80 }} className="mb-3">
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Secretaría de Origen
                        </InputLabel>
                        <Select
                          labeld="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={valuesContenido.origen}
                          onChange={handleChange}
                          autoWidth
                          label="Secretaría de Origen"
                          name="origen"
                          //   disabled
                        >
                          <MenuItem value="">
                            <em>--Seleccione--</em>
                          </MenuItem>
                          {tiposOrigen.map((origen) => (
                            <MenuItem key={origen.id_origen} value={origen}>
                              {origen.nombre_origen}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        label="Fecha Norma"
                        variant="outlined"
                        name="fechaNormaBoletin"
                        type="date"
                        className="inputAltaBoletin mb-3"
                        value={valuesContenido.fechaNormaBoletin}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        label="Nº de Nroma"
                        className="inputAltaBoletin mb-3"
                        type="text"
                        value={valuesContenido.nroNorma}
                        onChange={handleChange}
                        name="nroNorma"
                      />

                      {valuesContenido.nroNorma !== "" &&
                      valuesContenido.origen !== "" &&
                      valuesContenido.fechaNormaBoletin !== "" &&
                      valuesContenido.norma !== "" ? (
                        <Button
                          type="button"
                          className="btnAgregar"
                          variant="contained"
                          onClick={handleAgregarNorma}
                        >
                          Agregar Norma
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="btnAgregar"
                          variant="contained"
                          onClick={handleMensajeContenido}
                        >
                          Agregar Norma
                        </Button>
                      )}
                    </div>
                    <div className="listadoPrueba">
                      <div className="listadoNormas">
                        {normasAgregadas.map((norma, index) => (
                          <div key={index} className="norma">
                            {norma.norma} Nº {norma.numero}/{norma.origen}/
                            {norma.año}{" "}
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleEliminarNorma(index)}
                            >
                              X
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mt-4 mb-3" />

                <Box className="contInputFileBoletin col-2 ">
                  <label className="fileNameDisplay flex-column">
                    {selectedFileName}
                    <Input
                      className="inputFileAltaBoletin"
                      type="file"
                      id="fileBoletin"
                      name="archivoBoletin"
                      value={valuesCabecera.archivoBoletin}
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
            </div>
          </div>
        </Box>
      </div>
      {puedeEnviarFormulario ? (
        !numeroBoletinExiste(valuesCabecera.nroBoletin) &&
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
        <ModalAltaBoletin abrir={mostrarModal} onConfirm={handleConfirm} />
      )}
    </Box>
  );
};
export default AltaBoletinesNuevo;
