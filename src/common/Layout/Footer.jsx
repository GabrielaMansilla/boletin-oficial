import '../../common/Layout/Footer.css'
import logo from '../../assets/logo_smt.jpg'

export const Footer = () => {
  return (
    <footer className="page-footer font-small blue pt-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <img src={ logo } width="400" alt="logo municipalidad de Tucumán" />
          </div>
          {/* <ul className="list-unstyled"> */}
          <div className="col-md-6 mb-md-0 mb-3 ">
            <div className='d-flex justify-content-center mt-md-0 mt-3'>
              <h5 className="px-2">Seguinos en </h5>
              <div className=''>
                <a className='p-2' href="https://www.facebook.com/?locale=es_LA"><i className="bi bi-facebook"></i></a>
                <a className='p-2' href="https://www.instagram.com/"><i className="bi bi-instagram"></i></a>
                <a className='p-2' href="https://twitter.com/?lang=es"><i className="bi bi-twitter"></i></a>
                <a className='p-2' href="https://www.youtube.com/"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
            <div className='pt-3 '>
              <p className='text-center text-md-end my-2 me-0 me-md-5  ' >Municipalidad de San Miguel de Tucumán</p>
              <p className='text-center text-md-end my-2 me-0  me-md-5 '>9 de Julio 598 Tucumán, República Argentina</p>
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