// import { Calendario } from "../Calendario/Calendario";
import React, { useState } from "react";
import "./ListarBoletines.css";
import axios from "../../config/axios";
import useGet from "../../hook/useGet";
import Buscador from "../Buscador/Buscador";
import { Alert, Button, Grid, Snackbar } from "@mui/material";
import logoMuniColor from "../../assets/logo-SMT.png";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

const ListarBoletines = () => {
  const [boletines, loading, getboletin] = useGet("/boletin/listar", axios);
  const boletinesInvertidos = boletines.slice().reverse().slice(0, 3);
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("Algo Explotó :/");
  const [error, setError] = useState("error");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const funcionDescarga = async (boletin) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/boletin/listarDescarga/${boletin.id_boletin}`,
        {
          responseType: "blob", // Especifica el tipo de respuesta como Blob
        }
      );
      const blob = response.data;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute(
        "download",
        `Boletin_Oficial_Municipal Nº ${boletin.nro_boletin}.pdf`
      );

      link.click();
    } catch (error) {
      setOpen(true);
      setMensaje("Error en la conexión");
      setError("warning");
      console.log("algo explotó! :(", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-row mt-4">
        <Grid container spacing={2} className="d-flex contGrid">
          <Grid className="contBoletines ps-5  pe-4 " item xs={12} md={12}>
            {loading ? (
              <p>cargando Boletines</p>
            ) : (
              boletinesInvertidos.map((boletin, index) => (
                <div className="boletin mb-2 " key={boletin.id_boletin}>
                  <img
                    className="logoMuniColor"
                    src={logoMuniColor}
                    alt=" logo Muni"
                  />
                  <div className="boletinText container mt-3">
                    <div className="d-flex flex-row justify-content-between">
                      <h2>
                        {index === 0
                          ? `ÚLTIMA EDICIÓN | BOLETÍN Nº ${boletin.nro_boletin}`
                          : `BOLETÍN Nº ${boletin.nro_boletin}`}
                      </h2>
                      {/* <h2>Boletin Nº {boletin.nroBoletin}</h2> */}
                      <div className="contBtn">
                        <Button
                          variant="contained"
                          className="btnPdf"
                          onClick={() => funcionDescarga(boletin)}
                        >
                          <DownloadForOfflineIcon />
                        </Button>
                      </div>
                    </div>
                    <div className=" d-flex flex-row">
                      <h6>{boletin.fecha_publicacion.slice(0, 10)}</h6>{" "}
                      <h6 className="ms-2">| Tucumán, Argentina</h6>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Grid>
        </Grid>
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
    </>
  );
};

export default ListarBoletines;
