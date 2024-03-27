import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import "./ModalAltaBoletines.css";

export const ModalAltaBoletines = ({ abrir, datosBoletin, onConfirm }) => {

  const [openModal, setOpenModal] = useState(abrir);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpenModal(abrir);
  }, [abrir]);
  
  const handleAcept = () => {
    // console.log([datosBoletin]);
    setOpen(false);
    onConfirm(true);
    handleCloseModal(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

const mondongo = datosBoletin.nroResolucion.join("-");

  return (
    <div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className=" d-flex align-items-center flex-column ">
          <h3 className="tituloBusquedaAvanzada">Verificación de Boletín</h3>
          <Box className=" contBoxAltaBoletinesModal">
            <div className="contDivAltaBoletinesModal">
              <Box
                className="formGroupModal flex-col "
                component="form"
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                noValidate
                autoComplete="off"
              >
                <div className="contRangoModal">
                  <h5>Boletin:</h5>
                  <div>
                    <TextField
                      label="Nro de Boletín"
                      variant="outlined"
                      className="inputAltaBoletinModal"
                      type="number"
                      value={datosBoletin.nroBoletin}
                      name="nroBoletin"
                      disabled
                    />

                    <TextField
                      label="Fecha Boletin"
                      variant="outlined"
                      name="fechaBoletin"
                      type="date"
                      value={datosBoletin.fechaBoletin}
                      className="inputAltaBoletinModal ms-3"
                      InputLabelProps={{ shrink: true }}
                      disabled
                    />
                  </div>
                </div>

                <div className="contRangoModal">
                  <h5>Decretos:</h5>

                  <div>
                    <TextField
                      label="Nº de Decreto inicial"
                      className="inputAltaBoletinModal"
                      type="number"
                      value={datosBoletin.nroDecretoInicial}
                      name="nroDecretoInicial"
                      disabled
                    />
                    <TextField
                      label="Nº de Decreto Final"
                      className="inputAltaBoletinModal ms-3"
                      type="number"
                      value={datosBoletin.nroDecretoFinal}
                      name="nroDecretoFinal"
                      disabled
                    />
                  </div>
                </div>

                <div className="contRangoModal">
                  <h5>Ordenanza:</h5>

                  <div>
                    <TextField
                      label="Nº de Ordenanza Inicial"
                      className="inputAltaBoletinModal"
                      type="number"
                      value={datosBoletin.nroOrdenanzaInicial}
                      name="nroOrdenanzaInicial"
                      disabled
                    />
                    <TextField
                      label="Nº de Ordenanza Final"
                      className="inputAltaBoletinModal ms-3"
                      type="number"
                      value={datosBoletin.nroOrdenanzaFinal}
                      name="nroOrdenanzaFinal"
                      disabled
                    />
                  </div>
                </div>

                <div className="contRangoModal">
                  <h5>Resolución:</h5>

                  {/* <div>
                    <TextField
                      label="Nº de Resolución"
                      className="inputAltaBoletinModal"
                      type="text"
                      // value={values.nroResolucion}
                      value={mondongo}
                      name="nroResolucion"
                      disabled
                    />
                  </div> */}
                </div>
              </Box>

              {/* <TextareaAutosize
        minRows={10} className='textAreaBoletines' /> */}

              <Box className="contInputFileBoletinModal col-4 W-100 pt-5 pb-4">
                <label className="fileNameDisplayModal flex-column">
                  {datosBoletin.archivoBoletin}
                  {/* <TextField
                    className="inputFileAltaBoletinModal"
                    type="file"
                    name="archivoBoletin"
                    value={datosBoletin.archivoBoletin}
                    disabled
                  /> */}
                </label>
              </Box>
            </div>
            <div className=" btnModal d-flex align-items-center justify-content-center">
              <Button onClick={handleAcept}>Confirmar</Button>
            </div>
          </Box>
        </div>
      </Modal>
      {/* <Snackbar
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
          {mensajeAlert}
        </Alert>
      </Snackbar> */}
    </div>
  );
};
