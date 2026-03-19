import api from "./axiosInstance";

// RF-1
export const loginRequest = (email, password) =>
    api.post('/auth/login', { email, password });

// RF-2
export const registerRequest = (email, password) =>
    api.post('/auth/register', { email, password });

// RF-12/14: Paso 1 — solicitar enlace
export const forgotPasswordRequest = (email) =>
    api.post(`/auth/forgot-password?email=${encodeURIComponent(email)}`);

// RF-12/14: Paso 2 — aplicar nueva contraseña
export const resetPasswordRequest = (token, newPassword) =>
    api.post('/auth/reset-password', { token, newPassword });

// RF-15: Paso 1 — enviar código (requiere JWT)
export const sendVerificationCodeRequest = () =>
    api.post('/auth/verify/send-code');

// RF-15: Paso 2 — validar código
export const validateCodeRequest = (code) =>
    api.post('/auth/verify/validate-code', { code });

// RF-15: Paso 3 — cambiar contraseña
export const changePasswordRequest = (currentPassword, newPassword) =>
    api.post('/auth/verify/change-password', { currentPassword, newPassword });