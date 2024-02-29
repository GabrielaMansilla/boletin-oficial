import axiosOriginal from 'axios'

const axios = axiosOriginal.create({
    baseURL: "http://172.16.8.209:4000"
    // baseURL: "http://localhost:4000"
})

export default axios;