import './NavBar.css'
import { Container } from '@mui/material'
import logoMuni from '../../assets/logo-SMT.png'
import LogIcono from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom';


export const NavBar = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/login");
    }

    return (
        <>
            <Container div className='navCont mt-4 mb-4'>
                <div onClick={()=>handleNavigate()}  className=' contIcono'>
                    <LogIcono className='iconoLogin' />
                </div>

                <div className='contLogo mb-3'>
                    <img src={logoMuni} alt="logo Muni" className='logoNav' />
                    <div className='ms-2'>
                        <h4 className='mb-0'>CIUDAD</h4>
                        <div className='textMuni'>
                            <h1>San Miguel </h1> <h1 className='ms-2'>de Tucumán</h1>
                        </div>
                    </div>
                </div>

            </Container >
        </>
    )
}
