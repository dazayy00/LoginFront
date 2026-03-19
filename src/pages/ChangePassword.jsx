import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendVerificationCodeRequest, validateCodeRequest, changePasswordRequest } from "../api/authService";

const STEPS = ['Solicitar código','Verificar código','Nueva contraseña'];

export default function ChangePassword() {
    const [step, setStep] = useState(0);
    const [code, setCode] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const navigate = useNavigate();

    const handleSendCode = async () => {
        setError(''); setLoading(true);
        try { await sendVerificationCodeRequest(); setStep(1); }
        catch (err) { setError(err.response?.data?.message || 'Error al enviar código'); }
        finally { setLoading(false); }
    };

    const handleValidateCode = async (e) => {
        e.preventDefault(); setError(''); setLoading(true);
        try { await validateCodeRequest(code); setStep(2); }
        catch (err) { setError(err.response?.data?.message || 'Código incorrecto o expirado'); }
        finally { setLoading(false); }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault(); setError('');
        if (newPassword !== confirm) { setError('Las contraseñas no coinciden'); return; }
        setLoading(true);
        try {
            const res = await changePasswordRequest(currentPassword, newPassword);
            if (res.data.token) localStorage.setItem('token', res.data.token);
            setDone(true);
        } catch (err) { setError(err.response?.data?.message || 'Error al cambiar contraseña'); }
        finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-white">Cambiar contraseña</h1>
                    <p className="text-slate-400 text-sm mt-1">Verificación de identidad requerida</p>
                </div>
                {/* Stepper */}
                <div className="flex items-center mb-6">
                    {STEPS.map((s,i) => (
                        <div key={i} className="flex items-center flex-1 last:flex-none">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${i<step?'bg-emerald-500 text-white':i===step?'bg-violet-600 text-white':'bg-slate-800 text-slate-500'}`}>
                                {i<step?'✓':i+1}
                            </div>
                            {i<STEPS.length-1 && <div className={`flex-1 h-0.5 mx-1 ${i<step?'bg-emerald-500':'bg-slate-800'}`}/>}
                        </div>
                    ))}
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    {done ? (
                        <div className="text-center py-4">
                            <p className="text-white font-medium">¡Contraseña actualizada!</p>
                            <button onClick={()=>navigate('/dashboard')} className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm">Volver al dashboard</button>
                        </div>
                    ) : (
                        <>
                            {error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
                            {step===0 && (
                                <div className="text-center">
                                    <p className="text-slate-300 text-sm mb-6">Te enviaremos un código de 6 dígitos a tu correo.</p>
                                    <button onClick={handleSendCode} disabled={loading}
                                        className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                        {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                                        Enviar código
                                    </button>
                                </div>
                            )}
                            {step===1 && (
                                <form onSubmit={handleValidateCode} className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1.5">Código de 6 dígitos</label>
                                        <input type="text" value={code} onChange={e=>setCode(e.target.value.replace(/D/g,'').slice(0,6))} maxLength={6} required
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm text-center tracking-[0.5em] focus:outline-none focus:border-violet-500 transition"/>
                                    </div>
                                    <button type="submit" disabled={loading||code.length<6}
                                        className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                        {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                                        Verificar
                                    </button>
                                    <button type="button" onClick={()=>{setStep(0);setCode('');setError('');}} className="w-full text-slate-500 hover:text-slate-300 text-xs transition-colors">Reenviar código</button>
                                </form>
                            )}
                            {step===2 && (
                                <form onSubmit={handleChangePassword} className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1.5">Contraseña actual</label>
                                        <input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} required
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1.5">Nueva contraseña</label>
                                        <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} required
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1.5">Confirmar</label>
                                        <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition"/>
                                    </div>
                                    <button type="submit" disabled={loading}
                                        className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                        {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                                        Cambiar contraseña
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