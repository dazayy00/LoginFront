import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    sendVerificationCodeRequest,
    validateCodeRequest,
} from "../api/authService";
import { changeEmailRequest } from "../api/authService";

const STEPS = ['Solicitar código', 'Verificar código', 'Nuevo correo'];

export default function ChangeEmail() {
    const [step, setStep] = useState(0);
    const [code, setCode] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const navigate = useNavigate();

    const handleSendCode = async () => {
        setError(''); setLoading(true);
        try {
            await sendVerificationCodeRequest();
            setStep(1);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al enviar el código');
        } finally { setLoading(false); }
    };

    const handleValidateCode = async (e) => {
        e.preventDefault();
        setError(''); setLoading(true);
        try {
            await validateCodeRequest(code);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Código incorrecto o expirado');
        } finally { setLoading(false); }
    };

    const handleChangeEmail = async (e) => {
        e.preventDefault();
        setError(''); setLoading(true);
        try {
            await changeEmailRequest(newEmail);
            setDone(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al actualizar el correo');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 mb-4">
                        <svg className="w-7 h-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold text-white">Cambiar correo</h1>
                    <p className="text-slate-400 text-sm mt-1">Verificación de identidad requerida</p>
                </div>

                {/* Stepper */}
                <div className="flex items-center mb-6">
                    {STEPS.map((s, i) => (
                        <div key={i} className="flex items-center flex-1 last:flex-none">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                                i < step ? 'bg-emerald-500 text-white' :
                                i === step ? 'bg-teal-600 text-white' :
                                'bg-slate-800 text-slate-500'}`}>
                                {i < step ? '✓' : i + 1}
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-1 transition-colors ${i < step ? 'bg-emerald-500' : 'bg-slate-800'}`}/>
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    {done ? (
                        <div className="text-center py-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <p className="text-white font-medium">¡Correo actualizado!</p>
                            <p className="text-slate-400 text-sm mt-1 mb-4">Tu correo ha sido cambiado exitosamente.</p>
                            <button onClick={() => navigate('/dashboard')}
                                className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                                Volver al dashboard
                            </button>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Paso 0 */}
                            {step === 0 && (
                                <div className="text-center">
                                    <p className="text-slate-300 text-sm mb-2">Para cambiar tu correo necesitamos verificar tu identidad.</p>
                                    <p className="text-slate-500 text-xs mb-6">Te enviaremos un código de 6 dígitos a tu correo actual.</p>
                                    <button onClick={handleSendCode} disabled={loading}
                                        className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                        {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                                        {loading ? 'Enviando...' : 'Enviar código de verificación'}
                                    </button>
                                </div>
                            )}

                            {/* Paso 1 */}
                            {step === 1 && (
                                <form onSubmit={handleValidateCode} className="space-y-4">
                                    <div>
                                        <p className="text-slate-300 text-sm mb-4">Ingresa el código de 6 dígitos enviado a tu correo actual. Expira en 15 minutos.</p>
                                        <label className="block text-sm text-slate-400 mb-1.5">Código de verificación</label>
                                        <input
                                            type="text"
                                            value={code}
                                            onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            placeholder="000000"
                                            maxLength={6}
                                            required
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm text-center tracking-[0.5em] placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition"
                                        />
                                    </div>
                                    <button type="submit" disabled={loading || code.length < 6}
                                        className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                        {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                                        Verificar código
                                    </button>
                                    <button type="button" onClick={() => { setStep(0); setCode(''); setError(''); }}
                                        className="w-full text-slate-500 hover:text-slate-300 text-xs transition-colors">
                                        Reenviar código
                                    </button>
                                </form>
                            )}

                            {/* Paso 2 */}
                            {step === 2 && (
                                <form onSubmit={handleChangeEmail} className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1.5">Nuevo correo electrónico</label>
                                        <input
                                            type="email"
                                            value={newEmail}
                                            onChange={e => setNewEmail(e.target.value)}
                                            placeholder="nuevo@correo.com"
                                            required
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition"
                                        />
                                    </div>
                                    <button type="submit" disabled={loading}
                                        className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                        {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                                        {loading ? 'Actualizando...' : 'Actualizar correo'}
                                    </button>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
