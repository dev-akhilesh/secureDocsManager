import axios from 'axios';


const api = axios.create({
    baseURL: 'https://securedocsmanagerbe.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
