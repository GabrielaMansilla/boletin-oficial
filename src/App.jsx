
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from './common/Layout/NavBar';
import { Footer } from './common/Layout/Footer';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Definir rutas aquí */}
        <Route path="/" component={NavBar} /> 
        <Route path="/" component={Footer} />
      </Routes>
      <NavBar />
      <Footer />
    </Router>
  )
}
export default App;