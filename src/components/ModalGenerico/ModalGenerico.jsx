import React from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import './ModalGenerico.css'
const ModalGenerica = ({
  open,
  onClose,
  onAccept,
  title,
  inputLabel,
  inputValue,
  onInputChange,
  checkboxLabel,
  checked,
  onCheckboxChange,
}) => {
  return (
    <Dialog open={open} disableBackdropClick={true}>
      <DialogContent className="modal_content">
        <DialogTitle className="titulo">{title}</DialogTitle>

        <div className="contModal">
          <FormControlLabel
            control={
              <Checkbox
                // checked={checked}
                onChange={onCheckboxChange}
                defaultChecked
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
              />
            }
            label="Habilitado"
            className="checkBoxNorma"
            labelPlacement="start"
          />
          <TextField
            label={inputLabel}
            value={inputValue}
            onChange={onInputChange}
            fullWidth
            className="inputNorma"
            margin="normal"
          />
        </div>
        <DialogActions className="btnEditarNorma">
          <Button onClick={onAccept} color="primary" variant="contained">
            Aceptar
          </Button>
          <Button onClick={onClose} color="primary" variant="contained">
            Cancelar
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ModalGenerica;
