import React, { useState } from "react";
import "./TablasEdicion.css";
import ListarNormas from "../ListarNormas/ListarNormas";
import Tabla from "../Tabla/Tabla";

const TablasEdicion = () => {
    return (
    <>
      <div>
        <ListarNormas />
        <Tabla/>
      </div>
    </>
  );
};

export default TablasEdicion;
