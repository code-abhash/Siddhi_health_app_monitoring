// api.js
import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development'
const baseUrl2 = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL_FLASK : import.meta.env.VITE_API_BASE_URL_PROD_FLASK 

const api = axios.create({
    baseURL: baseUrl2, 
    timeout: 5000, 
    headers: {
        "Content-Type": "application/json", 
        accept: "application/json"
    }
});

export default api;
