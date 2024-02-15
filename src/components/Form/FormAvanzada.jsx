import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { BUSCADOR_AVANZADA_VALUES } from "../../helpers/constantes";
import "./FormAvanzada.css";

export default function FormAvanzada() {

  const [values, setValues] = useState(BUSCADOR_AVANZADA_VALUES);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("error");
  const [mensajeAlert, setMensajeAlert] = useState("Algo Explotó :/");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const handleClear = () => {
  //   setValues(BUSCADOR_AVANZADA_VALUES);
  //   handleClose(); 
  // };

  const handleBuscarNorma = () => {

    console.log('Valores de búsqueda:', values);
    setOpen(true)
    setMensajeAlert("Busqueda realizada con éxito!")
    setError("success")
    setValues(BUSCADOR_AVANZADA_VALUES);
    handleCloseModal();
    console.log("hola")
  };


  const handleMensaje = () => {
    if (values.tipoBusquedaAvanzada === "") {

      setOpen(true)
      setMensajeAlert("Debe Seleccionar el Tipo de Norma")
      setError("error")

    } else {
      setOpen(true)
      setMensajeAlert("Debe llenar al menos un campo")
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
    <div>
      <Button className="text-light" onClick={handleOpenModal}>
        Busqueda Avanzada
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}

      >
        <Box className="modal-busqueda-avanzada">
          <h3 className="tituloBusquedaAvanzada">Búsqueda Avanzada</h3>
          <Box className="modal-content"
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"

          >
            <FormControl sx={{ m: 1, minWidth: 80 }} className="ms-3">
              <InputLabel id="demo-simple-select-autowidth-label" >
                Tipo de Norma
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={values.tipoBusquedaAvanzada}
                onChange={handleChange}
                autoWidth
                label="Tipo de Norma"
                name="tipoBusquedaAvanzada"
              >
                <MenuItem value="">
                  <em>--Seleccione--</em>
                </MenuItem>
                <MenuItem value={10}>Decreto</MenuItem>
                <MenuItem value={21}>Resolución</MenuItem>
                <MenuItem value={22}>Ordenanza</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Nro de Norma"
              variant="outlined"
              className="inputBuscador"
              type="number"
              value={values.nroNormaBusquedaAvanzada}
              onChange={handleChange}
              inputProps={{ min: "0" }}
              name="nroNormaBusquedaAvanzada"
            />

            <TextField
              label="Fecha"
              variant="outlined"
              type="date"
              className="inputBuscador"
              value={values.fechaBusquedaAvanzada}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              name="fechaBusquedaAvanzada"
            />

            {values.tipoBusquedaAvanzada !== "" ? (
              <Button variant="contained" className="btnAvanzada"  onClick={handleBuscarNorma}>
                Buscar
              </Button>
            ) : (
              <Button variant="contained" className="btnAvanzada" onClick={handleMensaje}>
                Buscar
              </Button>
            )

            }
          </Box>
        </Box>
      </Modal>
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
            {mensajeAlert}
          </Alert>
        </Snackbar>
    </div>
  );
}
