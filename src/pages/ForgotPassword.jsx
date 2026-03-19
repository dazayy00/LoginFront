import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordRequest } from "../api/authService";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true);
        try { await forgotPasswordRequest(email); } catch {}
        // Siempre muestra éxito — no revela si el correo existe
        setSent(true); setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-white">Recuperar contraseña</h1>
                    <p className="text-slate-400 text-sm mt-1">Te enviaremos un enlace a tu correo</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    {sent ? (
                        <div className="text-center py-4">
                            <p className="text-white font-medium mb-1">Correo enviado</p>
                            <p className="text-slate-400 text-sm mb-4">Si el correo está registrado, recibirás instrucciones en breve.</p>
                            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 text-sm">Volver al inicio</Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1.5">Correo</label>
                                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition"/>
                            </div>
                            <button type="submit" disabled={loading}
                                className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                                {loading ? 'Enviando...' : 'Enviar instrucciones'}
                            </button>
                            <div className="text-center"><Link to="/login" className="text-slate-400 hover:text-indigo-400 text-sm">Volver al inicio</Link></div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}