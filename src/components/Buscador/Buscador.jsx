import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./Buscador.css";
import { BUSCADOR_VALUES } from "../../helpers/constantes";
import FormAvanzada from "../Form/FormAvanzada.jsx";

const Buscador = () => {

  const [values, setValues] = useState(BUSCADOR_VALUES);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("error");
  const [mensaje, setMensaje] = useState("Algo Explotó :/");


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleBuscarBoletin = () => {

    const boletin = {
      nroBoletinBusqueda: values.nroBoletinBusqueda,
      fechaBusqueda: values.fechaBusqueda,
    };

    setOpen(true)
    setMensaje("Busqueda realizada con éxito!")
    setError("success")
    // Aquí deberías manejar el guardado del boletín en tu backend o donde corresponda
    console.log('Boletín a buscar:', boletin);
    setValues(BUSCADOR_VALUES)
  };


  const handleMensaje = () => {
    if (values.nroBoletinBusqueda === "" && values.fechaBusqueda === "") {

      setOpen(true)
      setMensaje("Debe ingresar el Nº de Boletín o Fecha de Publicación")
      setError("error")

    } else {
      setOpen(true)
      setMensaje("Debe llenar al menos un campo")
      setError("error")

    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <Box className="buscador ">
        <h3 className="tituloBuscador">BUSCAR BOLETINES ANTERIORES</h3>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          className="inputCont container"
        >
          <div className="inputsBuscadores d-flex flex-column flex-md-row align-items-md-center" >

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
            {(values.nroBoletinBusqueda !== "" || values.fechaBusqueda !== "") ? (

              <Button variant="contained" className="btnBuscador" onClick={handleBuscarBoletin}>
                Buscar
              </Button>
            ):(
              <Button variant="contained" className="btnBuscador" onClick={handleMensaje}>
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
          sx={{ width: '100%' }}
        >
          {mensaje}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Buscador;
