import axios from 'axios';

// base url til backend
const API_BASE = import.meta.env.VITE_API_URL + '/api';

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

// Endepunktene 
export const API_ENDPOINTS = {
    login: '/auth/login',
    register: '/auth/register',
    contacts: '/contact',
    complaints: '/complaints',
    me: '/me', 
    users: '/users'

};

export default api;