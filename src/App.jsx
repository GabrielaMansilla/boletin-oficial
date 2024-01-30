import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ListarBoletines from './components/ListarBoletines/ListarBoletines';
import AltaBoletines from './components/AltaBoletines/AltaBoletines';
import Login from './components/Login/Login';
import Form from './components/Form/Form';




const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/*" element={<ListarBoletines />} />
          <Route path="/login" element={<Login />} />
          <Route path="/altaBoletines" element={<AltaBoletines />} />
          <Route path="/form" element={<Form />} />
          
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
