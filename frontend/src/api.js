import axios from 'axios';

// base url til backend
const API_BASE = 'http://localhost:5050/api';

// lag axios-instans
const api = axios.create({
    baseURL: API_BASE,
});

// legg automatisk til Authorization-header hvis token finnes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;