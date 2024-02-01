import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { BUSCADOR_AVANZADA_VALUES } from "../../helpers/constantes";

export default function FormAvanzada(algo) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState(BUSCADOR_AVANZADA_VALUES);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Button className="buscadorAvanzada text-light" onClick={handleOpen}>
        Busqueda Avanzada
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <h3 className="tituloBuscador">BUSQUEDA AVANZADA</h3>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            className="inputCont container"
          >
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Tipo de Norma
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={values.tipo}
                onChange={handleChange}
                autoWidth
                label="Tipo"
                name="tipo"
              >
                <MenuItem value="">
                  <em>-- Seleccione el tipo de Norma --</em>
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
              value={values.nroNorma}
              onChange={handleChange}
              inputProps={{ min: "0" }}
              name="nroNorma"
            />

            <TextField
              label="Fecha"
              variant="outlined"
              name="fecha"
              type="date"
              className="inputBuscador"
              value={values.fecha}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <Button variant="contained" className="btnBuscador" type="submit">
              Limpiar
            </Button>
            <Button variant="contained" className="btnBuscador" type="submit">
              Buscar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
