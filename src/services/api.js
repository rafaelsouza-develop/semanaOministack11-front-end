import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        
    }
})

export default api;