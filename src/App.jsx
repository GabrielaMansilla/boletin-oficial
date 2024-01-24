import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ListarBoletines from './components/ListarBoletines/ListarBoletines';


const App = () => {
  return (
    <Router>
      <Layout>
        {/* <Routes> */}
          <ListarBoletines />
        {/* </Routes> */}
      </Layout>
    </Router>
  );
};

export default App;
