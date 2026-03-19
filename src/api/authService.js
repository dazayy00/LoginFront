import api from "./axiosInstance";

export const loginRequest = (email, password) =>
    api.post('/auth/login', { email, password });

export const registerRequest = (email, password) =>
    api.post('/auth/register', { email, password });

export const forgotPasswordRequest = (email) =>
    api.post(`/auth/forgot-password?email=${encodeURIComponent(email)}`);

export const resetPasswordRequest = (token, newPassword) =>
    api.post('/auth/reset-password', { token, newPassword });

export const sendVerificationCodeRequest = () =>
    api.post('/auth/verify/send-code');

export const validateCodeRequest = (code) =>
    api.post('/auth/verify/validate-code', { code });

export const changePasswordRequest = (currentPassword, newPassword) =>
    api.post('/auth/verify/change-password', { currentPassword, newPassword });

export const changeEmailRequest = (newEmail) =>
    api.put('/account/email', { newEmail });
