
import React from "react";
import "./ListarBoletines.css";
import axios from "../../config/axios";
import useGet from "../../hook/useGet";
import Buscador from "../Buscador/Buscador";
import { Button, Grid } from "@mui/material";
import logoMuniBlanco from "../../assets/logo-SMT-Blanco.png";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

const ListarBoletines = () => {
 
<<<<<<< HEAD
  const [boletines, loading, getboletin] = useGet("/boletin/listar", axios);
  const boletinesInvertidos = boletines.slice(0, 3).reverse();

  // const funcionDescarga = async (obj) => {
  //   try {

  //     const response = await axios.get(
  //       `http://10.0.0.230:4000/noticias/listar/${obj._id}`,
  //       {
  //         responseType: "blob", // Especifica el tipo de respuesta como Blob
  //       }
  //     );

  //     const blob = response.data;
  //     const url = URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.setAttribute("target", "_blank");
  //     link.href = url;

  //     if(!blob.type.includes("image") && !blob.type.includes('application/pdf')){
  //       link.download = obj.titulo;
  //     }
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     toast.error("Error en la conexión");
  //   }
  // }
=======
  const [boletin, loading, getboletin] = useGet("/boletin/listar", axios);
  const boletinesInvertidos = boletin.slice().reverse();
>>>>>>> d166b05950951cfc75ad667921c98a526699804e

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
                        <Button variant="contained" className="btnPdf">
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
      </div>
    </>
  );
};

export default ListarBoletines;