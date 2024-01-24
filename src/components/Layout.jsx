import React from 'react'
import { NavBar } from '../common/Layout/NavBar.jsx'
import { Footer } from '../common/Layout/Footer.jsx'

const Layout = ({children}) => {
  return (
    <div>
      <NavBar/>
      {children}
      <Footer/>
    </div>
  );
}

export default Layout