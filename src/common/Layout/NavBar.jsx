import './NavBar.css'
import { Container } from '@mui/material'
import logoMuni from '../../assets/logo-SMT-Blanco.png'
import LogIcono from '@mui/icons-material/AccountCircleOutlined';
import React, { useState } from 'react';



export const NavBar = () => {

    
    return (
        <div className='fondo'>
            <Container div className='navCont'>

         

                <div className='contLogo mb-3'>
                   <a href="/"> <img src={logoMuni} alt="logo Muni" className='logoNav' /></a>
                    <div className='ms-2'>
                        <h4 className='text-light mb-0'>CIUDAD</h4>
                        <div className='textMuni'>
                            <h1>San Miguel </h1> <h1 className='text-light ms-2'>Tucumán</h1>
                        </div>
                    </div>
                </div>
                <div className='boletinNavCont'>
                    <h1 className='boletinNav'>Boletín Oficial Municipal </h1>
                </div>
            </Container >
        </div>
    )
}
