import axiosOriginal from 'axios'

const axios = axiosOriginal.create({
    // baseURL: "IP SERVIDOR PRODUCCION:PUERTO DEL BACK-END"
    baseURL: "http://172.16.8.209:4000"
    // baseURL: "http://localhost:4000"
})

export default axios;