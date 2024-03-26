import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";

const EditarNormaDialog = ({
  open,
  onClose,
  editingNorma,
  handleCheckboxChange,
  handleInputChange,
  handleSave,
  handleCancel,
}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState("error");
  const [mensaje, setMensaje] = useState("Algo Explotó :/");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleMensaje = () => {
    let mensaje = "";
    if (editingNorma?.tipo_norma.length <= 0) {
      mensaje = "Debe llenar el campo nombre";
      setError("warning");
    }
    setOpenAlert(true);
    setMensaje(mensaje);
  };

  return (
    <>
      <Dialog open={open} disableBackdropClick={true}>
        <DialogContent className="modal_content">
          <DialogTitle className="titulo">Editar Norma</DialogTitle>
          {editingNorma && (
            <>
              <div className="contModal">
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                      checked={editingNorma.habilita}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Habilitado"
                  className="checkBoxNorma"
                  labelPlacement="start"
                />
                <TextField
                  name="tipo_norma"
                  label="Tipo de Norma"
                  value={editingNorma.tipo_norma}
                  onChange={handleInputChange}
                  className="inputNorma"
                  fullWidth
                />
              </div>
            </>
          )}
          <DialogActions className="btnEditarNorma">
            {editingNorma?.tipo_norma === "" || !editingNorma?.tipo_norma ? (
              <Button
                onClick={handleMensaje}
                color="primary"
                variant="contained"
              >
                Guardar
              </Button>
            ) : (
              <Button onClick={handleSave} color="primary" variant="contained">
                Guardar
              </Button>
            )}
            <Button onClick={handleCancel} color="primary" variant="contained">
              Cancelar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
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
    </>
  );
};

export default EditarNormaDialog;
