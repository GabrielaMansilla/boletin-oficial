import '../../common/Layout/Footer.css'
import logo from '../../assets/logo-SMT.png'

export const Footer = () => {
  return (
    <footer className="footerCont pt-4 pb-4">
      <div className="container-fluid text-center text-md-left ">
        <div className="row">
          <div className="d-flex justify-content-center col-md-6 mt-md-0 mt-3 mb-2">
            <div className=' logoFooter'>
              
              <img src={logo} width="80" alt="logo municipalidad de Tucumán" />
              
              <div cla0ssName='ms-2'>
                
                <h4 className='mb-0'>CIUDAD</h4>
                
                <div>
                  <h1>SMTucumán</h1>
                </div>
              
              </div>
            </div>
          </div>
          {/* <ul className="list-unstyled"> */}
<<<<<<< HEAD
          <div className="col-md-6 mb-md-0 mb-3">
            <div className='d-flex mt-3 me-5 seguinos' >
              <h5 className="px-2">Seguinos en </h5>
=======
          <div className="col-md-6 mb-md-0 mb-3  ">
            <div className='d-flex mt-3 me-5 seguinos ' >
              <h5 className="pe-2 mb-0  ">Seguinos en </h5>
>>>>>>> 52a1b429a4c983af56cd6f610cfc9bcc6a6a695a
              <div className='iconosRedes'>
                <a className='p-2' href="https://www.facebook.com/MuniSMTucuman/"><i className="bi bi-facebook"></i></a>
                <a className='p-2' href="https://www.instagram.com/munismtucuman/"><i className="bi bi-instagram"></i></a>
                <a className='p-2' href="https://twitter.com/muniSMT"><i className="bi bi-twitter"></i></a>
                <a className='p-2' href="https://www.youtube.com/munismtucuman"><i className="bi bi-youtube"></i></a>
                <a className='p-2' href="https://smt.gob.ar/"><i className="smt.gob.ar"><img className
                = 'p-2' src= {logo} width="33"  alt="logo municipalidad de Tucumán" /></i></a>
              </div>
            </div>
            <div className='pt-1 '>
              <p className='text-center text-md-end my-2 me-0 me-md-5  ' >Municipalidad de San Miguel de Tucumán</p>
              <p className='text-center text-md-end my-2 me-0  me-md-5 '>9 de Julio 598, Tucumán. República Argentina</p>
              <p className='text-center text-md-end my-2 me-0 me-md-5'>(0381)- 4516500</p>
            
            </div>
          </div>
          {/* </ul> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer