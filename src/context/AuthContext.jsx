import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, registerRequest } from "../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restaurar sesión al recargar
    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('user_email');
        if (token && email) setUser({ email });
        setLoading(false);
    }, []);

    // RF-1
    const login = async (email, password) => {
        const response = await loginRequest(email, password);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_email', email);
        setUser({ email });
    };

    // RF-2
    const register = async (email, password) => {
        await registerRequest(email, password);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_email');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);