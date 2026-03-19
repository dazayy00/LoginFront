import axios from "axios";
import { getBaseURL } from "./config";

const api = axios.create({ baseURL: getBaseURL() });

// Inyecta JWT en cada petición
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Maneja 401 globalmente — sesión expirada
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;