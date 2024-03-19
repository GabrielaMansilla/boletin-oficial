// import ListarBoletines from './components/ListarBoletines/ListarBoletines';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AltaBoletinesNuevo from './components/AltaBoletines/AltaBoletinesNuevo';
import Login from './components/Login/Login';
import Tabla from "./components/Tabla/Tabla"
import Buscador from './components/Buscador/Buscador';
import ListadoBoletines from './components/ListadoBoletines/ListadoBoletines';


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/*" element={<ListarBoletines />} /> */}
          <Route path="/*" element={<Buscador />} />
          <Route path="/login" element={<Login />} />
          <Route path='/tabla' element={<Tabla />} />
          <Route path="/altaBoletines" element={<AltaBoletinesNuevo />} />
          <Route path="/listadoBoletines" element={<ListadoBoletines />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
