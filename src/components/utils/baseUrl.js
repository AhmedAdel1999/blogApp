import axios from "axios"
const axiosInstance = axios.create({
    baseURL:"https://blogappapi-3shb.onrender.com/"
})
export default axiosInstance