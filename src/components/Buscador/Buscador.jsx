import { Alert, Box, Button, Snackbar, TextField, Grid } from "@mui/material";
import React, { useState } from "react";
import "./Buscador.css";
import FormAvanzada from "../Form/FormAvanzada.jsx";
import axios from "../../config/axios";
import logoMuniColor from "../../assets/logo-SMT.png";
import { BUSCADOR_VALUES } from "../../helpers/constantes.js";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import ListarBoletines from "../ListarBoletines/ListarBoletines.jsx";

const Buscador = () => {
  const [values, setValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("error");
  const [mensaje, setMensaje] = useState("Algo Explotó :/");
  const [loading, setLoading] = useState(true);
  const [boletinEncontrado, setBoletinEncontrado] = useState(true);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setBusquedaRealizada(false);
  };

  const handleMensaje = () => {
    if (values.nroBoletinBusqueda === "" && values.fechaBusqueda === "") {
      setOpen(true);
      setMensaje("Debe Selccionar el Nro de Boletin o Fecha de Publicación");
      setError("error");
    } else {
      setOpen(true);
      setMensaje("Debe llenar al menos un campo");
      setError("error");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleBuscarBoletin = async () => {
    try {
      setLoading(true);
      const boletin = {
        nroBoletinBusqueda: values.nroBoletinBusqueda,
        fechaBusqueda: values.fechaBusqueda,
      };
      if (!boletin.nroBoletinBusqueda && !boletin.fechaBusqueda) {
        setOpen(true);
        setMensaje("Debe ingresar el Nº de Boletín o Fecha de Publicación");
        setError("error");
        return;
      } else if (boletin.nroBoletinBusqueda || boletin.fechaBusqueda) {
        handleSearchBoletin(boletin.nroBoletinBusqueda, boletin.fechaBusqueda);
        console.log(boletin.nroBoletinBusqueda, boletin.fechaBusqueda);
        setValues(BUSCADOR_VALUES);
        setBusquedaRealizada(true);
        // setMensaje("Boletín encontrado 101");
        // setError("success");
        // setOpen(true);

        return;
      }
    } catch (error) {
      setOpen(true);
      setMensaje("Algo explotó! :(");
      setError("warning");
      console.error("Error al buscar boletín:", error);
    }
  };

  const handleSearchBoletin = async (nroBoletin, fechaBoletin) => {
    try {
      console.log(!!nroBoletin, !!fechaBoletin, "a");
      if (!nroBoletin && !fechaBoletin) {
        setOpen(true);
        setMensaje(
          "Debe ingresar el Nº de Boletín o Fecha de Publicación por nada"
        );
        setError("error");
        <ListarBoletines />;
      } else if (nroBoletin && fechaBoletin) {
        const respuesta = await axios.get(
          `/boletin/buscarNroYFecha/${nroBoletin}/${fechaBoletin}`
        );
        if (respuesta.data.length > 0) {
          setValues(
            Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
          );
          setOpen(true);
          setLoading(false);
          setMensaje(
            `Boletín encontrado Nº ${nroBoletin} fecha: ${fechaBoletin}`
          );
          setError("success");
          setBoletinEncontrado(true);
        } else {
          setValues(BUSCADOR_VALUES);
          setLoading(false);
          setOpen(true);
          setMensaje(`No existe boletin Nº ${nroBoletin}`);
          setError("error");
          console.log("Boletín no encontrado:", error);
          setBoletinEncontrado(false);
        }
      } else if (nroBoletin && !fechaBoletin) {
        const respuesta = await axios.get(`/boletin/buscar/${nroBoletin}`);
        console.log("Boletín encontrado:", respuesta.data);
        if (respuesta.data.length > 0) {
          setValues(
            Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
          );
          setLoading(false);
          setOpen(true);
          setMensaje(`Boletín encontrado Nº ${nroBoletin}`);
          setError("success");
          setBoletinEncontrado(true);
        } else {
          setValues(BUSCADOR_VALUES);
          setLoading(false);
          setOpen(true);
          setMensaje(`No existe boletin Nº ${nroBoletin}`);
          setError("error");
          console.log("Boletín no encontrado:", error);
          setBoletinEncontrado(false);
        }
      } else if (!nroBoletin && fechaBoletin) {
        const respuesta = await axios.get(
          `/boletin/buscarFecha/${fechaBoletin}`
        );
        console.log(fechaBoletin, respuesta, respuesta.data.length);
        if (respuesta.data.length > 0) {
          setValues(
            Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
          );
          setLoading(false);
          setOpen(true);
          setMensaje(`Boletín encontrado fecha: ${fechaBoletin}`);
          setError("success");
          console.log("Boletín encontrado:", respuesta.data);
          setBoletinEncontrado(true);
        } else {
          setValues(BUSCADOR_VALUES);
          setLoading(false);
          setOpen(true);
          setMensaje(`No existe boletin para la fecha ${fechaBoletin}`);
          setError("error");
          console.log("Boletín no encontrado:", error);
          setBoletinEncontrado(false);
        }
      }
    } catch (error) {
      setLoading(false);
      setOpen(true);
      setMensaje("Error de conexión");
      setError("warning");
      console.error("Error al buscar boletín:", error);
    }
    return;
  };

  const funcionDescarga = async (boletin) => {
    try {
      console.log(boletin._id);
      const response = await axios.get(
        `http://localhost:4000/boletin/listarDescarga/${boletin._id}`,
        {
          responseType: "blob", // Especifica el tipo de respuesta como Blob
        }
      );
      console.log(boletin._id);

      const blob = response.data;
      const url = URL.createObjectURL(blob);

      // Crear un elemento de enlace temporal para iniciar la descarga
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Boletin_Oficial_Municipal Nº ${boletin.nroBoletin}.pdf`
      ); // Establecer el nombre de archivo

      // Hacer clic en el enlace para iniciar la descarga
      link.click();
    } catch (error) {
      setOpen(true);
      setMensaje("Error en la conexión");
      setError("warning");
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <Box className="buscador ">
          <h3 className="tituloBuscador">BUSCAR BOLETINES ANTERIORES</h3>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            className="inputCont container"
          >
            <div className="inputsBuscadores">
              <TextField
                label="Nro de Boletín"
                variant="outlined"
                className="inputBuscador"
                type="number"
                value={values.nroBoletinBusqueda}
                onChange={handleChange}
                inputProps={{ min: "0" }}
                name="nroBoletinBusqueda"
              />

              <TextField
                label="Fecha"
                variant="outlined"
                type="date"
                className="inputBuscador"
                value={values.fechaBusqueda}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                name="fechaBusqueda"
              />
            </div>
            <div className="botonesBuscadores">
              {values.nroBoletinBusqueda !== "" ||
              values.fechaBusqueda !== "" ? (
                <Button
                  variant="contained"
                  className="btnBuscador"
                  onClick={handleBuscarBoletin}
                >
                  Buscar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="btnBuscador"
                  onClick={handleMensaje}
                >
                  Buscar
                </Button>
              )}
              <Button variant="contained" className="btnBuscadorAvanzada">
                <FormAvanzada />
              </Button>
            </div>
          </Box>
        </Box>
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
      </div>
      <div className="d-flex flex-row mt-4">
        <Grid container spacing={2} className="d-flex contGrid">
          <Grid className="contBoletines ps-5  pe-4 " item xs={12} md={12}>
            {loading ? (
              <ListarBoletines />
            ) : (
              <>
                {Array.isArray(values) && values.length > 0 ? (
                  values.map((boletin) => (
                    <div key={boletin.id} className="boletin mb-2">
                      <img
                        className="logoMuniColor"
                        src={logoMuniColor}
                        alt=" logo Muni"
                      />
                      <div className="boletinText container mt-3">
                        <div className="d-flex flex-row justify-content-between">
                          <h2>Boletin Nº {boletin.nroBoletin}</h2>
                          <div className="contBtn">
                            <Button
                              variant="contained"
                              className="btnPdf"
                              onClick={() => funcionDescarga(boletin)}
                            >
                              <DownloadForOfflineIcon />
                            </Button>
                          </div>
                        </div>
                        <div className=" d-flex flex-row">
                          <h6>{boletin.fechaBoletin}</h6>{" "}
                          <h6 className="ms-2">| Tucumán, Argentina</h6>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <p className="d-flex justify-content-center">
                      No se encontró Boletin
                    </p>
                    <ListarBoletines />
                  </>
                )}
              </>
            )}
          </Grid>
        </Grid>
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
      </div>
    </>
  );
};

export default Buscador;
