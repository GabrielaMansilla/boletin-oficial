// import { Calendario } from "../Calendario/Calendario";
import React, { useState } from "react";
import "./ListarBoletines.css";
import axios from "../../config/axios";
import useGet from "../../hook/useGet";
import Buscador from "../Buscador/Buscador";
import { Alert, Button, Grid, Snackbar } from "@mui/material";
import logoMuniBlanco from "../../assets/logo-SMT-Blanco.png";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

const ListarBoletines = () => {
  const [boletines, loading, getboletin] = useGet("/boletin/listar", axios);
  const boletinesInvertidos = boletines.slice().reverse();
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
      console.log(boletin._id)
      const response = await axios.get(
        `http://localhost:4000/boletin/listarDescarga/${boletin._id}`,
        {
          
          responseType: "blob", // Especifica el tipo de respuesta como Blob
        }
        );
        console.log(boletin._id)
  
      const blob = response.data;
      const url = URL.createObjectURL(blob);
  
      // Crear un elemento de enlace temporal para iniciar la descarga
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Boletin_Oficial_Municipal Nº ${boletin.nroBoletin}.pdf`); // Establecer el nombre de archivo
  
      // Hacer clic en el enlace para iniciar la descarga
      link.click();
    } catch (error) {
      setOpen(true);
      setMensaje("Error en la conexión");
      setError("warning");
    }
  };
  
  return (
    <>
      <Buscador />
      <div className="d-flex flex-row mt-4">
        <Grid container spacing={2} className="d-flex contGrid">
          <Grid className="contBoletines ps-5  pe-4 " item xs={12} md={12}>
            {loading ? (
              <p>cargando Boletines</p>
            ) : (
              boletinesInvertidos.map((boletin) => (
                <div className="boletin mb-2 " key={boletin._id}>
                  <img
                    className="logoMuniBlanco"
                    src={logoMuniBlanco}
                    alt=" logo Muni"
                  />
                  <div className="boletinText container mt-3">
                    <div className="d-flex flex-row justify-content-between">
                      {/* <h2>Ultima Edicion | Boletin Nº 22334 </h2> */}
                      <h2>Boletin Nº {boletin.nroBoletin}</h2>
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
                      <h6>{boletin.fechaBoletin}</h6>{" "}
                      <h6 className="ms-2">| Tucumán, Argentina</h6>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Grid>
          {/* <Grid item xs={12} md={5}>
                    <aside className='calendarioBoletines'>
                        <Calendario />
                    </aside>
                </Grid> */}
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
