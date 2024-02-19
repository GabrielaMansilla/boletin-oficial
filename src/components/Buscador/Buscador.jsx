import { Alert, Box, Button, Snackbar, TextField, Grid } from "@mui/material";
import React, { useState } from "react";
import "./Buscador.css";
import FormAvanzada from "../Form/FormAvanzada.jsx";
import axios from "../../config/axios";
import logoMuniBlanco from "../../assets/logo-SMT-Blanco.png";
import { BUSCADOR_VALUES } from "../../helpers/constantes.js";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

const Buscador = () => {
  const [values, setValues] = useState([BUSCADOR_VALUES]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("error");
  const [mensaje, setMensaje] = useState("Algo Explotó :/");
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleMensaje = () => {
    if (values.nroBoletinBusqueda === "" && values.fechaBusqueda === "") {
      setOpen(true);
      setMensaje("Debe Selccionar el Nro de Boletin o  Fecha de Publicacion");
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

  const handleNroBoletinSearch = async (nroBoletin) => {
    try {
      const respuesta = await axios.get(`/boletin/buscar/${nroBoletin}`);
      if (respuesta.data) {
        setOpen(true);
        setMensaje("Boletín encontrado");
        setError("success");
        setValues(respuesta.data);
        setLoading(false);
        console.log("Boletín encontrado:", respuesta.data.fechaBoletin);
      } else {
        setOpen(true);
        setError("error");
        setMensaje("No existe boletin");
        console.log("Boletín no .");
      }
    } catch (error) {
      console.error("Error al buscar boletin:", error);
    }
  };

  const handleFechaBoletinSearch = async (fechaBoletin) => {
    try {
      const respuesta = await axios.get(`/boletin/buscarFecha/${fechaBoletin}`);
      if (respuesta.data !== "") {
        setMensaje("Boletín encontrado");
        setOpen(true);
        setError("success");
        setValues(respuesta.data);
        setLoading(false);
        console.log("Boletín encontrado:", respuesta.data);
      } else {
        setError("error");
        setMensaje("No existe boletin");
        setOpen(true);
        console.log("Boletín no .");
      }
    } catch (error) {
      console.error("Error al buscar boletin:", error);
    }
  };
  const handleBuscarBoletin = () => {
    const boletin = {
      nroBoletinBusqueda: values.nroBoletinBusqueda,
      fechaBusqueda: values.fechaBusqueda,
    };
    if (!boletin.nroBoletinBusqueda && !boletin.fechaBusqueda) {
      setOpen(true);
      setMensaje("Debe ingresar el Nº de Boletín o Fecha de Publicación");
      setError("error");
      return;
    }

    if (boletin.nroBoletinBusqueda !== "" && boletin.fechaBusqueda !== "") {
      handleNroBoletinAndFechaSearch(
        boletin.nroBoletinBusqueda,
        boletin.fechaBusqueda.toString()
      );
      console.log(boletin.nroBoletinBusqueda, boletin.fechaBusqueda);
      return;
    }

    if (boletin.nroBoletinBusqueda !== "") {
      handleNroBoletinSearch(boletin.nroBoletinBusqueda);
      console.log(boletin.nroBoletinBusqueda);
      return;
    }

    // tratando de buscar por fecha
    if (boletin.fechaBusqueda !== "") {
      handleFechaBoletinSearch(boletin.fechaBusqueda.toString());
      console.log(boletin.fechaBusqueda);
      return;
    }
  };
  const handleNroBoletinAndFechaSearch = async (nroBoletin, fechaBoletin) => {
    try {
      const respuesta = await axios.get(
        `/boletin/buscarNroYFecha/${nroBoletin}/${fechaBoletin}`
      );
      if (respuesta.data) {
        setValues(BUSCADOR_VALUES);
        setMensaje("Boletín encontrado");
        setOpen(true);
        setError("success");
        setLoading(false);
        console.log("Boletín encontrado:", respuesta.data);
      } else {
        setOpen(true);
        setError("error");
        setMensaje("No existe Boletin");
        console.log("Boletín no encontrado.");
      }
    } catch (error) {
      console.error("Error al buscar boletín:", error);
    }
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
              <></>
            ) : (
              <>
                {values.length > 0 ? (
                  values.map((boletin) => (
                    <div key={boletin.id} className="boletin mb-2">
                      <img
                        className="logoMuniBlanco"
                        src={logoMuniBlanco}
                        alt=" logo Muni"
                      />
                      <div className="boletinText container mt-3">
                        <div className="d-flex flex-row justify-content-between">
                          {/* <h2>Ultima Edicion | Boletin Nº 22334 </h2> */}
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
                  <p>No hay boletines para la fecha seleccionada.</p>
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
