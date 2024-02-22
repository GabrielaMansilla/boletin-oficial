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

import "./FormAvanzada.css";
import axios from "../../config/axios";
import { BUSCADOR_AVANZADA_VALUES } from "../../helpers/constantes";

export default function FormAvanzada({ busquedaAvanzada }) {
  const [values, setValues] = useState([BUSCADOR_AVANZADA_VALUES]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setValues(BUSCADOR_AVANZADA_VALUES);
  };
  const [resultados, setResultados] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("error");
  const [mensaje, setMensaje] = useState("Algo Explotó :/");
  const [loading, setLoading] = useState(true);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleMensaje = () => {
    if (
      values.tipoBusquedaAvanzada === "" &&
      values.nroNormaBusquedaAvanzada === "" &&
      values.fechaBusquedaAvanzada === ""
    ) {
      setOpen(true);
      setMensaje("Debe llenar al menos un campo");
      setError("error");
    } else {
      setOpen(true);
      setMensaje("Debe Seleccionar el Tipo de Norma o Fecha");
      setError("error");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // const handleNroDecretoSearch = async (nroDecreto) => {
  //   try {
  //     const respuesta = await axios.get(`/boletin/buscarDecreto/${nroDecreto}`);
  //     if (respuesta.data) {
  //       setMensaje("Decreto encontrado");
  //       setValues(respuesta.data);
  //       setLoading(false);
  //       console.log("Decreto encontrado:", respuesta.data.nroDecreto);
  //     } else {
  //       setMensaje("error");
  //       console.log("Decreto no .");
  //     }
  //   } catch (error) {
  //     console.error("Error al buscar decreto:", error);
  //   }
  // };
  // const handleNroOrdenanzaSearch = async (nroOrdenanza) => {
  //   try {
  //     const respuesta = await axios.get(
  //       `/boletin/buscarOrdenanza/${nroOrdenanza}`
  //     );
  //     if (respuesta.data) {
  //       setMensaje("Ordenanza encontrado");
  //       setValues(respuesta.data);
  //       setLoading(false);
  //       console.log("Ordenanza encontrada:", respuesta.data.nroOrdenanza);
  //     } else {
  //       setMensaje("error");
  //       console.log("Ordenanza no .");
  //     }
  //   } catch (error) {
  //     console.error("Error al buscar Ordenanza:", error);
  //   }
  // };
  // const handleNroResolucionSearch = async (nroResolucion) => {
  //   try {
  //     const respuesta = await axios.get(
  //       `/boletin/buscarResolucion/${nroResolucion}`
  //     );
  //     if (respuesta.data) {
  //       setMensaje("Resolucion encontrado");
  //       setValues(respuesta.data);
  //       setLoading(false);
  //       console.log("Resolucion encontrado:", respuesta.data.nroResolucion);
  //     } else {
  //       setMensaje("error");
  //       console.log("Resolucion no .");
  //     }
  //   } catch (error) {
  //     console.error("Error al buscar Resolucion:", error);
  //   }
  // };

  // const handleFechaBoletinSearch = async (fechaBoletin) => {
  //   try {
  //     const respuesta = await axios.get(`/boletin/buscarFecha/${fechaBoletin}`);
  //     if (respuesta.data) {
  //       setMensaje("Norma encontrado");
  //       // const respuestaFiltrada = respuesta.data.filter(boletin => {
  //       //   return boletin.fechaBoletin === values.fechaBusqueda;
  //       // });
  //       // setValues(respuestaFiltrada);
  //       setValues(respuesta.data);
  //       setLoading(false);
  //       console.log("Norma encontrado:", respuesta.data.fechaBoletin);
  //     } else {
  //       setMensaje("error");
  //       console.log("Norma no .");
  //     }
  //   } catch (error) {
  //     console.error("Error al buscar norma:", error);
  //   }
  // };

  // const handleBuscarNorma = () => {
  //   const boletin = {
  //     tipoBusquedaAvanzada: values.tipoBusquedaAvanzada,
  //     nroNormaBusquedaAvanzada: values.nroNormaBusquedaAvanzada,
  //     fechaBusquedaAvanzada: values.fechaBusquedaAvanzada,
  //   };
  //   if (
  //     boletin.tipoBusquedaAvanzada === "" &&
  //     boletin.nroNormaBusquedaAvanzada === ""
  //   ) {
  //     setOpen(true);
  //     setMensaje("Debe llenar al menos un campo");
  //     setError("error");
  //   } else {
  //     setOpen(true);
  //     setMensaje("Debe Seleccionar el Tipo de Norma");
  //     setError("error");
  //   }
  //   // if (boletin.tipoBusquedaAvanzada) {
  //   //   handleNroDecretoSearch(boletin.tipoBusquedaAvanzada);
  //   //   console.log(boletin.tipoBusquedaAvanzada);
  //   // }
  //   // if (boletin.tipoBusquedaAvanzada) {
  //   //   handleNroOrdenanzaSearch(boletin.tipoBusquedaAvanzada);
  //   //   console.log(boletin.tipoBusquedaAvanzada);
  //   // }
  //   // if (boletin.tipoBusquedaAvanzada) {
  //   //   handleNroResolucionSearch(boletin.tipoBusquedaAvanzada);
  //   //   console.log(boletin.tipoBusquedaAvanzada);
  //   // }

  //   // if (boletin.nroNormaBusquedaAvanzada) {
  //   //   handleNroDecretoSearch(boletin.nroNormaBusquedaAvanzada);
  //   //   console.log(boletin.nroNormaBusquedaAvanzada);
  //   // }
  //   // if (boletin.nroNormaBusquedaAvanzada) {
  //   //   handleNroOrdenanzaSearch(boletin.nroNormaBusquedaAvanzada);
  //   //   console.log(boletin.nroNormaBusquedaAvanzada);
  //   // }
  //   // if (boletin.nroNormaBusquedaAvanzada) {
  //   //   handleNroResolucionSearch(boletin.nroNormaBusquedaAvanzada);
  //   //   console.log(boletin.nroNormaBusquedaAvanzada);
  //   // }
  //   // if (boletin.fechaBusquedaAvanzada) {
  //   //   handleFechaBoletinSearch(boletin.fechaBusquedaAvanzada.toString());
  //   //   console.log(boletin.fechaBusquedaAvanzada);
  //   // }
  // };

  const handleBuscarPorNorma = async (tipoDeNorma, nroDeNorma) => {
    try {
      if (
        (values.tipoDeNorma === "" && values.nroDeNorma === "") ||
        (!tipoDeNorma && !nroDeNorma)
      ) {
        setOpen(true);
        setMensaje("Debe llenar al menos un campo");
        setError("error");
      } else if (values.tipoDeNorma === "" && values.nroDeNorma !== "") {
        setOpen(true);
        console.log(values.tipoDeNorma, values.nroDeNorma);
        setMensaje("Debe Seleccionar el Tipo de Norma");
        setError("error");
      } else if (values.tipoDeNorma !== "" && values.nroDeNorma === "") {
        const response = await axios.get(
          `/boletin/buscarPorTipo/${tipoDeNorma}/${nroDeNorma}`
        );
        console.log(response.data);
        setResultados(response.data);
        setOpen(true);
        setMensaje("Buscado por Tipo de Norma");
        setError("success");
      } else if (values.tipoDeNorma !== "" && values.nroDeNorma !== "") {
        console.log(tipoDeNorma, nroDeNorma);

        const response = await axios.get(
          `/boletin/buscarPorTipo/${tipoDeNorma}/${nroDeNorma}`
        );
        console.log(response.data);
        setResultados(response.data);
        setOpen(true);
        setMensaje("Busacado por tipo de Norma y nro");
        setError("success");
      }
    } catch (error) {
      setOpen(true);
      setMensaje("Error en la conexión");
      setError("warning");
      console.log("algo explotó! :(", error);
    }
  };

  const handleBuscarPorFechaAvanzada = async (fecha, tipo) => {
    try {
      if (fecha === "" || tipo === "") {
        setOpen(true);
        setMensaje("Debe llenar al menos un campo");
        setError("error");
      } else if ((fecha !== "") & (tipo === "")) {
        console.log(fecha);
        const resp = await axios.get(`/boletin/buscarFecha/${fecha}`);
        console.log(resp.data);
        setResultados(resp.data);
        setOpen(true);
        setMensaje("Boletin buscado por fecha");
        setError("success");
      } else if (fecha !== "" && tipo !== "") {
        const resp = await axios.get(
          `/boletin/buscarPorFecha/${fecha}/${tipo}`
        );
        console.log(resp.data);
        setResultados(resp.data);
        setOpen(true);
        setMensaje("Boletin buscado por fecha y tipo");
        setError("success");
      }
    } catch (error) {
      setOpen(true);
      setMensaje("Error en la conexión");
      setError("warning");
      console.log("algo explotó! :(", error);
    }
  };

  const handlebuscarBoletinAvanzado = async () => {
    try {
      const {
        tipoBusquedaAvanzada,
        nroNormaBusquedaAvanzada,
        fechaBusquedaAvanzada,
      } = values;

      if (
        !tipoBusquedaAvanzada &&
        !nroNormaBusquedaAvanzada &&
        !fechaBusquedaAvanzada
      ) {
        setOpen(true);
        setMensaje("Debe llenar al menos un campo");
        setError("error");
      } else if (
        tipoBusquedaAvanzada &&
        !nroNormaBusquedaAvanzada &&
        !fechaBusquedaAvanzada
      ) {
        handleBuscarPorNorma(tipoBusquedaAvanzada);
        setOpen(true);
        setMensaje("Boletin buscado por Tipo de Norma");
        setError("success");
      } else if (
        tipoBusquedaAvanzada &&
        nroNormaBusquedaAvanzada &&
        !fechaBusquedaAvanzada
      ) {
        handleBuscarPorNorma(tipoBusquedaAvanzada, nroNormaBusquedaAvanzada);
        setOpen(true);
        setMensaje("Boletin buscado por Tipo de Norma y nro");
        setError("success");
      } else if (
        !tipoBusquedaAvanzada &&
        !nroNormaBusquedaAvanzada &&
        fechaBusquedaAvanzada
      ) {
        handleBuscarPorFechaAvanzada(fechaBusquedaAvanzada);
        setOpen(true);
        setMensaje("Boletin buscado por fecha");
        setError("success");
      } else if (
        tipoBusquedaAvanzada &&
        !nroNormaBusquedaAvanzada &&
        fechaBusquedaAvanzada
      ) {
        handleBuscarPorFechaAvanzada(
          fechaBusquedaAvanzada,
          tipoBusquedaAvanzada
        );
        setOpen(true);
        setMensaje("Boletin buscado por tipo y fecha");
        setError("success");
      } else if (
        !tipoBusquedaAvanzada &&
        nroNormaBusquedaAvanzada &&
        fechaBusquedaAvanzada
      ) {
        setOpen(true);
        setMensaje("Debe ingresar el Tipo de Norma");
        setError("error");
      } else if (
        !tipoBusquedaAvanzada &&
        nroNormaBusquedaAvanzada &&
        !fechaBusquedaAvanzada
      ) {
        setOpen(true);
        setMensaje("Debe seleccionar Tipo de Norma o Fecha ");
        setError("error");
      } else if (
        tipoBusquedaAvanzada &&
        nroNormaBusquedaAvanzada &&
        fechaBusquedaAvanzada
      ) {
        setOpen(true);
        setMensaje("Boletin buscado por todos");
        setError("success");
      } else {
        setOpen(true);
        setMensaje("Debe llenar al menos un campo");
        setError("error");
      }
    } catch (error) {
      setOpen(true);
      setMensaje("Error en la conexión");
      setError("warning");
      console.log("algo explotó! :(", error);
    }
  };
  return (
    <div>
      <Button className="text-light busqueda" onClick={handleOpenModal}>
        Busqueda Avanzada
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="modal-busqueda-avanzada">
          <h3 className="tituloBusquedaAvanzada">Búsqueda Avanzada</h3>
          <Box
            className="modal-content"
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <FormControl sx={{ m: 1, minWidth: 80 }} className="ms-3">
              <InputLabel id="demo-simple-select-autowidth-label">
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
                <MenuItem value={"Decreto"}>Decreto</MenuItem>
                <MenuItem value={"Ordenanza"}>Ordenanza</MenuItem>
                <MenuItem value={"Resolucion"}>Resolución</MenuItem>
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

            {values.tipoBusquedaAvanzada !== "" ||
            values.fechaBusquedaAvanzada !== "" ? (
              <Button
                variant="contained"
                className="btnAvanzada"
                onClick={handlebuscarBoletinAvanzado}
              >
                Buscar
              </Button>
            ) : (
              <Button
                variant="contained"
                className="btnAvanzada"
                onClick={handleMensaje}
              >
                Buscar
              </Button>
            )}
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
          sx={{ width: "100%" }}
        >
          {mensaje}
        </Alert>
      </Snackbar>
    </div>
  );
}
