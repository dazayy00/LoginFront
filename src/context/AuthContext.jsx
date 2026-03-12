import { createContext, useState, useContext, Children } from "react";
import api from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ Children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', {email, password});
        localStorage.setItem('token', response.data.token);
        setUser({ email });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {Children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);