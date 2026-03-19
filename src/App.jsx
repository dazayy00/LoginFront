import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";
import ChangeEmail from "./pages/ChangeEmail";
import Settings from "./pages/Settings";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>

                    <Route path="/login"          element={<Login />} />
                    <Route path="/register"       element={<Register />} />
                    <Route path="/forgot"         element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/settings"       element={<Settings />} />

                    <Route path="/dashboard" element={
                        <ProtectedRoute><Dashboard /></ProtectedRoute>
                    }/>
                    <Route path="/change-password" element={
                        <ProtectedRoute><ChangePassword /></ProtectedRoute>
                    }/>
                    <Route path="/change-email" element={
                        <ProtectedRoute><ChangeEmail /></ProtectedRoute>
                    }/>

                    <Route path="/"  element={<Navigate to="/login" replace />} />
                    <Route path="*"  element={<Navigate to="/login" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
