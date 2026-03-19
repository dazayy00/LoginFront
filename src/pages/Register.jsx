import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const rules = [
        { label: 'Mínimo 12 caracteres', ok: password.length >= 12 },
        { label: 'Una mayúscula', ok: /[A-Z]/.test(password) },
        { label: 'Una minúscula', ok: /[a-z]/.test(password) },
        { label: 'Un número', ok: /[0-9]/.test(password) },
        { label: 'Un símbolo (!@#$...)', ok: /[!@#$%^&*]/.test(password) },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault(); setError('');
        if (password !== confirm) { setError('Las contraseñas no coinciden'); return; }
        setLoading(true);
        try {
            await register(email, password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrar');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-white">Crear cuenta</h1>
                    <p className="text-slate-400 text-sm mt-1">Regístrate para acceder</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    {error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1.5">Correo</label>
                            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition"/>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1.5">Contraseña</label>
                            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition"/>
                            {password && <div className="mt-2 space-y-1">{rules.map((r,i)=>(
                                <div key={i} className="flex items-center gap-2 text-xs">
                                    <span className={r.ok?'text-emerald-400':'text-slate-600'}>{r.ok?'✓':'○'}</span>
                                    <span className={r.ok?'text-emerald-400':'text-slate-500'}>{r.label}</span>
                                </div>
                            ))}</div>}
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1.5">Confirmar contraseña</label>
                            <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition"/>
                        </div>
                        <button type="submit" disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                            {loading ? 'Registrando...' : 'Crear cuenta'}
                        </button>
                    </form>
                    <div className="mt-5 pt-5 border-t border-slate-800 text-center text-sm">
                        <span className="text-slate-500">¿Ya tienes cuenta? </span>
                        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Inicia sesión</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}