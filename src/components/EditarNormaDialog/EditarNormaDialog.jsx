import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
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
  return (
    <Dialog open={open} onClose={onClose} disableBackdropClick={true}>
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
          <Button onClick={handleSave} color="primary" variant="contained">
            Guardar
          </Button>
          <Button onClick={handleCancel} color="primary" variant="contained">
            Cancelar
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EditarNormaDialog;
