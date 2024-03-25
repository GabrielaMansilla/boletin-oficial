import React, { useState } from "react";
import "./TablasEdicion.css";
import ListarNormas from "../ListarNormas/ListarNormas";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModalGenerica from "../ModalGenerico/ModalGenerico";
import axios from "../../config/axios";
const TablasEdicion = () => {
  const [openModal, setOpenModal] = useState(false);
  const [normaInput, setNormaInput] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAcceptModal = () => {
    // Aquí puedes realizar acciones como enviar la norma a la base de datos
   
    try {
      // console.log("Guardando cambios:", updatedNormas);
      const { id_norma, tipo_norma, habilita } = updatedNormas[0];
      console.log(id_norma, "eliminado");
      axios
        .post(`/norma/editar`, {tipo_norma, habilita })
        .then((response) => {
          console.log("Norma deshabilitada correctamente:", response.data);
          // cargarNormas();
          // setEditingNorma(null);
          // setOpenDialog(false);
        });
    } catch (error) {
      console.error("Error al guardar Norma:", error);
    }
    console.log("Norma:", normaInput);
    console.log("Checkbox:", checkboxValue);
    handleCloseModal();
  };

  return (
    <>
      <div className="tablaNormas">
        <ListarNormas />
        <AddCircleIcon
          className="btnAddNorma"
          color="primary"
          variant="contained"
          onClick={handleOpenModal}
        />
      </div>
      <ModalGenerica
        open={openModal}
        onClose={handleCloseModal}
        onAccept={handleAcceptModal}
        title="Agregar Norma"
        inputLabel="Nombre de la Norma"
        inputValue={normaInput}
        onInputChange={(e) => setNormaInput(e.target.value)}
        checkboxLabel="Habilitada"
        checked={checkboxValue}
        onCheckboxChange={(e) => setCheckboxValue(e.target.checked)}
      />
    </>
  );
};

export default TablasEdicion;
