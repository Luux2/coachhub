import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',  //'https://coachhub-api.onrender.com/api',
    timeout: 5000,
});

export default apiClient;