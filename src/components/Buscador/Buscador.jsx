import { Alert, Box, Button, Snackbar, TextField, Grid } from "@mui/material";
import React, { useState } from "react";
import "./Buscador.css";
import FormAvanzada from "../Form/FormAvanzada.jsx";
import axios from "../../config/axios";
import logoMuniColor from "../../assets/logo-SMT.png";
import { BUSCADOR_VALUES } from "../../helpers/constantes.js";



const Buscador = () => {
  const [values, setValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("error");
  const [mensaje, setMensaje] = useState("Algo Explotó :/");
  const [loading, setLoading] = useState(true);
  const [resultados, setResultados] = useState([]);
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

  const handleModalResults = (results) => {
    setResultados(results.slice().reverse());
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  const handleNroBoletinSearch = async (nroBoletin) => {
    try {
      const respuesta = await axios.get(`/boletin/buscar/${nroBoletin}`) 
      if (respuesta.data) {
        setMensaje('Boletín encontrado')
        setValues(respuesta.data)
        setLoading(false)
        console.log('Boletín encontrado:', respuesta.data.fechaBoletin );
      } else {
      setOpen(true);
      setError("success");
      setMensaje('error')
        console.log('Boletín no .');
      }
    } catch (error) {
      console.error('Error al buscar boletin:', error);
    }
  };

//probando con otro buscador 01

// const handleFechaBoletinSearch = async (fechaBoletin) => {
//   try {
//     const respuesta = await axios.get(`/boletin/buscar2/${fechaBoletin}`) 
//     if (respuesta.data) {
//       setMensaje('Boletín encontrado')
//       setValues(respuesta.data)
//       setLoading(false)
//       console.log('Boletín encontrado:', respuesta.data.fechaBoletin );
//     } else {
//       setMensaje('error')
//       console.log('Boletín no .');
//     }
//   } catch (error) {
//     console.error('Error al buscar boletin:', error);
//   }
// };

// probando buscadormio2

const handleFechaBoletinSearch = async (fechaBoletin) => {
  try {
    const respuesta = await axios.get(`/boletin/buscarFecha/${fechaBoletin}`) 
    if (respuesta.data) {
      setMensaje('Boletín encontrado')

      // const respuestaFiltrada = respuesta.data.filter(boletin => {
      //   return boletin.fechaBoletin === values.fechaBusqueda;
      // });
      // setValues(respuestaFiltrada);
      setValues(respuesta.data)
      setLoading(false);
      console.log('Boletín encontrado:', respuesta.data.fechaBoletin );
    } else {
      setMensaje('error')
      console.log('Boletín no .');
    }
  } catch (error) {
    console.error('Error al buscar boletin:', error);
  }
}
  const handleBuscarBoletin = () => {
    const boletin = {
      nroBoletinBusqueda: values.nroBoletinBusqueda,
      fechaBusqueda: values.fechaBusqueda,
    };
    if (!boletin.nroBoletinBusqueda && !boletin.fechaBusqueda) {
      setOpen(true);
      setMensaje("Debe ingresar el Nº de Boletín o Fecha de Publicación");
      setError("success");
      return;
    }

      if (boletin.nroBoletinBusqueda && boletin.fechaBusqueda) {
    handleNroBoletinAndFechaSearch(boletin.nroBoletinBusqueda, boletin.fechaBusqueda.toString());
    console.log(boletin.nroBoletinBusqueda, boletin.fechaBusqueda);
    setValues(BUSCADOR_VALUES);
    setError("success");
    setOpen(true);

    return;
  }

    if (boletin.nroBoletinBusqueda) {
      handleNroBoletinSearch(boletin.nroBoletinBusqueda);
      console.log(boletin.nroBoletinBusqueda)
      setValues(BUSCADOR_VALUES);
      setError("success");
      setOpen(true);
      return;
    }

  // tratando de buscar por fecha
    if (boletin.fechaBusqueda){
      handleFechaBoletinSearch((boletin.fechaBusqueda).toString());
      console.log(boletin.fechaBusqueda)
      setValues(BUSCADOR_VALUES)
      setError("success");
      setOpen(true);
      return;
    }
  };
  const handleNroBoletinAndFechaSearch = async (nroBoletin, fechaBoletin) => {
    try {
      const respuesta = await axios.get(`/boletin/buscarNroYFecha/${nroBoletin}/${fechaBoletin}`);
      if (respuesta.data) {
        setMensaje('Boletín encontrado');
        setValues(respuesta.data);
        setLoading(false);
        console.log('Boletín encontrado:', respuesta.data);
      } else {
        setMensaje('error');
        console.log('Boletín no encontrado.');
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
                <FormAvanzada busquedaAvanzada={handleModalResults} />
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
            {resultados.length > 0 ? (
              <>
                {Array.isArray(values) && resultados.length > 0 ? (
                  resultados.map((boletin) => (
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
                  </>
                )}
              </>
            ) : (
              <>
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
