import React from "react";
import "./ListarBoletines.css";
import { Button, Grid } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import logoMuniBlanco from "../../assets/logo-SMT-Blanco.png";
import { Calendario } from "../Calendario/Calendario";
import Buscador from "../Buscador/Buscador";
import axios from "../../config/axios";
import useGet from "../../hook/useGet";

const ListarBoletines = () => {
    const [boletines, loading, getboletin] = useGet("/boletin/listar", axios);

//     const obtenerBoletines = async () => {
//     try {
//       const resp = await axios.get("/boletin/listar");
//       const boletines = resp.data;
//       console.log("Boletines encontrados: ", boletines);
//     } catch (error) {
//       console.error("Error al obtener Boletines: ", error);
//     }
//   };

  return (
    <>
      <Buscador />
      <div className="d-flex flex-row mt-4">
        <Grid container spacing={2} className="d-flex contGrid">
          <Grid className="contBoletines ps-5  pe-4 " item xs={12} md={12}>
            {loading ?(
            <p>cargando Boletines</p>
            ):(
                boletines.map((boletin )=>(

            
            <div className="boletin mb-2 " key={boletin._id} >
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
            // <div className="boletin mb-2 ">
            //   <img
            //     className="logoMuniBlanco"
            //     src={logoMuniBlanco}
            //     alt=" logo Muni"
            //   />
            //   <div className="boletinText container mt-3">
            //     <div className="d-flex flex-row justify-content-between">
            //       <h2> Boletin Nº 22333 </h2>
            //       <div className="contBtn">
            //         <Button variant="contained" className="btnPdf">
            //           <DownloadForOfflineIcon />
            //         </Button>
            //       </div>
            //     </div>
            //     <div className=" d-flex flex-row">
            //       <h6>23/01/2024</h6>{" "}
            //       <h6 className="ms-2">| Tucumán, Argentina</h6>
            //     </div>
            //   </div>
            // </div>
            // <div className="boletin mb-2 ">
            //   <img
            //     className="logoMuniBlanco"
            //     src={logoMuniBlanco}
            //     alt=" logo Muni"
            //   />
            //   <div className="boletinText container mt-3">
            //     <div className="d-flex flex-row justify-content-between">
            //       <h2> Boletin Nº 22332 </h2>
            //       <div className="contBtn">
            //         <Button
            //           variant="contained"
            //           className="btnPdf"
            //           onClick={obtenerBoletines}
            //         >
            //           <DownloadForOfflineIcon />
            //         </Button>
            //       </div>
            //     </div>
            //     <div className=" d-flex flex-row">
            //       <h6>22/01/2024</h6>{" "}
            //       <h6 className="ms-2">| Tucumán, Argentina</h6>
            //     </div>
            //   </div>
            // </div>
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
