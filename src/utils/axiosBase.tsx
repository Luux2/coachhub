import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',  //'https://coachhub-api-chcag8d0bcdqatf4.westeurope-01.azurewebsites.net/api',
    timeout: 5000,
});

export default apiClient;