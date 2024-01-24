import React from 'react'
import './ListarBoletines.css'
import { Button } from '@mui/material'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import logoMuniBlanco from '../../assets/logo-SMT-Blanco.png'

const ListarBoletines = () => {
    return (
        <div className='d-flex flex-row mt-4'>
            <div className='contBoletines ps-4'>
            <div className='boletin mb-2'>
                    <img className='logoMuniBlanco' src={logoMuniBlanco} alt=" logo Muni" />
                    <div className='boletinText container mt-3' >

                        <h2>Ultima Edicion | Boletin Nº 22334 </h2>
                        <div className=' d-flex flex-row'>

                            <h6>24/01/2024 |</h6> <h6>| Tucumán, Argentina</h6>
                        </div>
                    </div>
                    <Button variant="contained" className='btnPdf' >
                        <DownloadForOfflineIcon />
                    </Button>
                </div>
                <div className='boletin mb-2'>
                    <img className='logoMuniBlanco2' src={logoMuniBlanco} alt=" logo Muni" />
                    <div className='boletinText container mt-3' >

                        <h2>Ultima Edicion | Boletin Nº 22334 </h2>
                        <div className=' d-flex flex-row'>

                            <h6>24/01/2024 |</h6> <h6>| Tucumán, Argentina</h6>
                        </div>
                    </div>
                    <Button variant="contained" className='btnPdf' >
                        <DownloadForOfflineIcon />
                    </Button>
                </div>
                <div className='boletin mb-2'>
                    <div className='boletinText container mt-3' >

                        <h2>Ultima Edicion | Boletin Nº 22334 </h2>
                        <div className=' d-flex flex-row'>

                            <h6>24/01/2024 |</h6> <h6>| Tucumán, Argentina</h6>
                        </div>
                    </div>
                    <Button variant="contained" className='btnPdf' >
                        <DownloadForOfflineIcon />
                    </Button>
                </div>
            </div>
            <aside className='calendarioBoletines'>

            </aside>
            <div>

            </div>
        </div>
    )
}

export default ListarBoletines