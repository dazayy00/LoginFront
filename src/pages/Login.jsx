import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Credenciales incorrectas');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-white">Escuela App</h1>
                    <p className="text-slate-400 text-sm mt-1">Inicia sesión para continuar</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1.5">Correo</label>
                            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"/>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1.5">Contraseña</label>
                            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"/>
                        </div>
                        <button type="submit" disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>
                    <div className="mt-5 pt-5 border-t border-slate-800 flex flex-col gap-2 text-center text-sm">
                        <Link to="/forgot" className="text-slate-400 hover:text-indigo-400 transition-colors">¿Olvidaste tu contraseña?</Link>
                        <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">Crear cuenta nueva</Link>
                        <Link to="/settings" className="text-slate-600 hover:text-slate-400 text-xs mt-1">Configurar endpoint</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}