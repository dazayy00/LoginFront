import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../api/authService";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); setError('');
        if (newPassword !== confirm) { setError('Las contraseñas no coinciden'); return; }
        setLoading(true);
        try {
            await resetPasswordRequest(token, newPassword);
            setDone(true);
            setTimeout(() => navigate('/login'), 2500);
        } catch (err) {
            setError(err.response?.data?.message || 'El enlace no es válido o ha expirado');
        } finally { setLoading(false); }
    };

    if (!token) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <p className="text-red-400">Enlace inválido</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-white">Nueva contraseña</h1>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    {done ? (
                        <div className="text-center py-4">
                            <p className="text-white font-medium">¡Contraseña actualizada!</p>
                            <p className="text-slate-400 text-sm mt-1">Redirigiendo...</p>
                        </div>
                    ) : (
                        <>
                            {error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1.5">Nueva contraseña</label>
                                    <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} required
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition"/>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1.5">Confirmar</label>
                                    <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition"/>
                                </div>
                                <button type="submit" disabled={loading}
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                    {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                                    Guardar contraseña
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}