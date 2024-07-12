import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
const baseUrl2 = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL_FLASK_LLM : import.meta.env.VITE_API_BASE_URL_PROD

const AxiosLLM = axios.create({
    baseURL: baseUrl2, 
    timeout: 10000, 
    headers: {
        "Content-Type": "application/json", 
        accept: "application/json"
    }
})

export default AxiosLLM 