import axios from 'axios';

// base url til backend
const API_BASE = import.meta.env.VITE_API_URL + '/api';

// lag axios-instans
const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

// Endepunktene 
export const API_ENDPOINTS = {
    login: '/auth/login',
    register: '/auth/register',
    // contacts: '/contact',
    // complaints: '/complaints',
    me: '/me', 
    users: '/settings/users',

    contactSubmit: '/contact',
    adminContacts: '/admin/contacts',
    adminComplaints: '/admin/complaints',
    complaintSubmit: '/complaints',
    adminArticles: '/admin/articles',
    adminArchivedContacts: '/admin/archived/contacts',
    adminArchivedComplaints: '/admin/archived/complaints',
    adminActivity: '/admin/activity',

};

export default api;