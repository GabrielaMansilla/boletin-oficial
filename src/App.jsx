// import ListarBoletines from './components/ListarBoletines/ListarBoletines';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AltaBoletines from './components/AltaBoletines/AltaBoletines';
import Login from './components/Login/Login';
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
          <Route path="/altaBoletines" element={<AltaBoletines />} />
          <Route path="/listadoBoletines" element={<ListadoBoletines />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
