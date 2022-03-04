import axios from "axios"
const axiosInstance = axios.create({
    baseURL:"https://bloogappapi.herokuapp.com/"
})
export default axiosInstance