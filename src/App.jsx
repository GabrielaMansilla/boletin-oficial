import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AltaBoletinesNuevo from "./components/AltaBoletines/AltaBoletinesNuevo";
import Buscador from "./components/Buscador/Buscador";
import ListadoBoletines from "./components/ListadoBoletines/ListadoBoletines";
import TablasEdicion from "./components/TablasEdicion/TablasEdicion";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/*" element={<Buscador />} />
          <Route path="/listadoBoletines" element={<ListadoBoletines />} />
          <Route path="/altaBoletines" element={<AltaBoletinesNuevo />} />
          <Route path="/listadoBoletines" element={<ListadoBoletines />} />
          <Route path="/tablas" element={<TablasEdicion />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
