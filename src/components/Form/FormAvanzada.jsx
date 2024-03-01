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
  // const [resultados, callback] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("error");
  const [mensaje, setMensaje] = useState("Algo Explotó :/");
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Verificar si el valor es nulo o indefinido y establecer un valor vacío en su lugar
    const updatedValue = value === null || value === "" ? undefined : value;
    setValues({ ...values, [name]: updatedValue });
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

  const handleBuscarPorNorma = async (tipoDeNorma, nroDeNorma, callback) => {
    try {
      if (
        (values.tipoDeNorma === "" && values.nroDeNorma === "") ||
        (!tipoDeNorma && !nroDeNorma) ||
        (values.tipoDeNorma === "undefined" &&
          values.nroDeNorma === "undefined")
      ) {
        setOpen(true);
        setMensaje("Debe llenar al menos un campo");
        setError("error");
      } else if (
        (values.tipoDeNorma === "" ||
          values.tipoDeNorma === "undefined" ||
          !tipoDeNorma) &&
        values.nroDeNorma !== ""
      ) {
        setOpen(true);
        setMensaje("Debe Seleccionar el Tipo de Norma");
        setError("error");
      } else if (
        values.tipoDeNorma !== "" &&
        values.tipoDeNorma !== "undefined" &&
        (values.nroDeNorma === "" ||
          values.nroDeNorma === "undefined" ||
          !nroDeNorma)
      ) {
        callback([]);
        nroDeNorma = "undefined"
        const response = await axios.get(
          `/boletin/buscarPorTipo/${tipoDeNorma}/${nroDeNorma}`
        );
        response.data.length > 0 ? (
          <>
            {callback(response.data)}
            {setOpen(true)}
            {setMensaje("Boletin encontrado con éxito!")}
            {setError("success")}
          </>
        ) : (
          <>
            {setOpen(true)};
            {setMensaje(
              "No se encontraron boletines para los datos ingresados"
            )}
            {setError("error")}
          </>
        );
      } else if (values.tipoDeNorma !== "" && values.nroDeNorma !== "") {
        callback([]);

        const response = await axios.get(
          `/boletin/buscarPorTipo/${tipoDeNorma}/${nroDeNorma}`
        );
        response.data.length > 0 ? (
          <>
            {callback(response.data)}
            {setOpen(true)}
            {setMensaje("Boletin encontrado con éxito!")}
            {setError("success")}
          </>
        ) : (
          <>
            {setOpen(true)};
            {setMensaje(
              "No se encontraron boletines para los datos ingresados"
            )}
            {setError("error")}
          </>
        );
      }
    } catch (error) {
      setOpen(true);
      setMensaje("Error en la conexión");
      setError("warning");
      console.log("algo explotó! :(", error);
    }
    handleCloseModal();
  };

  const handleBuscarPorFechaAvanzada = async (fecha, tipo, callback) => {
    try {
      callback([]);
      if (
        (fecha === "" && tipo === "") ||
        (!fecha && !tipo) ||
        (fecha === undefined && tipo === undefined)
      ) {
        setOpen(true);
        setMensaje("Debe llenar al menos un campo");
        setError("error");
      } else if (fecha !== "" && (tipo === "" || !tipo || tipo === undefined)) {
        callback([]);

        const resp = await axios.get(
          `/boletin/buscarPorFecha/${fecha}/${tipo}`
        );
        resp.data.length > 0 ? (
          <>
            {callback(resp.data)}
            {setOpen(true)}
            {setMensaje("Boletin encontrado con éxito!")}
            {setError("success")}
          </>
        ) : (
          <>
            {setOpen(true)};
            {setMensaje(
              "No se encontraron boletines para los datos ingresados"
            )}
            {setError("error")}
          </>
        );
      } else if (fecha !== "" && tipo !== "" && tipo !== undefined) {
        callback([]);

        const resp = await axios.get(
          `/boletin/buscarPorFecha/${fecha}/${tipo}`
        );
        resp.data.length > 0 ? (
          <>
            {callback(resp.data)}
            {setOpen(true)}
            {setMensaje("Boletin encontrado con éxito!")}
            {setError("success")}
          </>
        ) : (
          <>
            {setOpen(true)};
            {setMensaje(
              "No se encontraron boletines para los datos ingresados"
            )}
            {setError("error")}
          </>
        );
      }
    } catch (error) {
      setOpen(true);
      setMensaje("Error en la conexión");
      setError("warning");
      console.log("algo explotó! :(", error);
    }
    handleCloseModal();
  };

  const handleBuscarPorTodo = async (fecha, tipo, nroNorma, callback) => {
    try {
      callback([]);
      if (
        (!fecha || fecha === "") &&
        !tipo &&
        (!nroNorma || nroNorma === "" || nroNorma === undefined)
      ) {
        setOpen(true);
        setMensaje("Debe llenar al menos un campo");
        setError("error");
      } else if (
        fecha !== "" &&
        tipo !== "" &&
        nroNorma !== "" &&
        nroNorma !== undefined
      ) {
        const response = await axios.get(
          `boletin/buscarPorTodo/${fecha}/${tipo}/${nroNorma}`
        );

        if (response.data.length > 0) {
          callback(response.data);
          setOpen(true);
          setMensaje("Boletin encontrado con éxito!");
          setError("success");
        } else {
          setOpen(true);
          setMensaje("No se encontraron boletines para los datos ingresados");
          setError("error");
        }
      }
    } catch (error) {
      setOpen(true);
      setMensaje("Error en la conexión");
      setError("warning");
      console.log("algo explotó! :(", error);
    }
    handleCloseModal();
  };

  const handlebuscarBoletinAvanzado = async (callback) => {
    try {
      callback([]);
      const {
        tipoBusquedaAvanzada,
        nroNormaBusquedaAvanzada,
        fechaBusquedaAvanzada,
      } = values;

      if (
        !tipoBusquedaAvanzada &&
        !nroNormaBusquedaAvanzada &&
        nroNormaBusquedaAvanzada === "" &&
        !fechaBusquedaAvanzada &&
        tipoBusquedaAvanzada === "" &&
        nroNormaBusquedaAvanzada === "" &&
        fechaBusquedaAvanzada === ""
      ) {
        setOpen(true);
        setMensaje("Debe llenar al menos un campo");
        setError("error");
      } else if (
        tipoBusquedaAvanzada &&
        (!nroNormaBusquedaAvanzada || nroNormaBusquedaAvanzada === "") &&
        (!fechaBusquedaAvanzada || fechaBusquedaAvanzada === "")
      ) {
        handleBuscarPorNorma(
          tipoBusquedaAvanzada,
          nroNormaBusquedaAvanzada,
          callback
        );
      } else if (
        tipoBusquedaAvanzada &&
        nroNormaBusquedaAvanzada &&
        nroNormaBusquedaAvanzada !== "" &&
        (!fechaBusquedaAvanzada || fechaBusquedaAvanzada === "")
      ) {
        handleBuscarPorNorma(
          tipoBusquedaAvanzada,
          nroNormaBusquedaAvanzada,
          callback
        );
      } else if (
        (!tipoBusquedaAvanzada || tipoBusquedaAvanzada === "") &&
        (!nroNormaBusquedaAvanzada || nroNormaBusquedaAvanzada === "") &&
        fechaBusquedaAvanzada
      ) {
        handleBuscarPorFechaAvanzada(
          fechaBusquedaAvanzada,
          tipoBusquedaAvanzada,
          callback
        );
      } else if (
        tipoBusquedaAvanzada &&
        (!nroNormaBusquedaAvanzada || nroNormaBusquedaAvanzada === "") &&
        fechaBusquedaAvanzada
      ) {
        handleBuscarPorFechaAvanzada(
          fechaBusquedaAvanzada,
          tipoBusquedaAvanzada,
          callback
        );
      } else if (
        !tipoBusquedaAvanzada &&
        nroNormaBusquedaAvanzada &&
        nroNormaBusquedaAvanzada !== "" &&
        fechaBusquedaAvanzada
      ) {
        setOpen(true);
        setMensaje("Debe ingresar el Tipo de Norma");
        setError("error");
      } else if (
        !tipoBusquedaAvanzada &&
        nroNormaBusquedaAvanzada &&
        nroNormaBusquedaAvanzada !== "" &&
        !fechaBusquedaAvanzada
      ) {
        setOpen(true);
        setMensaje("Debe seleccionar Tipo de Norma o Fecha ");
        setError("error");
      } else if (
        tipoBusquedaAvanzada &&
        nroNormaBusquedaAvanzada &&
        nroNormaBusquedaAvanzada !== "" &&
        fechaBusquedaAvanzada
      ) {
        handleBuscarPorTodo(
          fechaBusquedaAvanzada,
          tipoBusquedaAvanzada,
          nroNormaBusquedaAvanzada,
          callback
        );
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
    handleCloseModal();
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
                onClick={() => handlebuscarBoletinAvanzado(busquedaAvanzada)}
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
