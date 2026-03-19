import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseURL, setBaseURL } from "../api/config";

export default function Settings() {
    const [url, setUrl] = useState(getBaseURL());
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-white">Configuración</h1>
                    <p className="text-slate-400 text-sm mt-1">Endpoint del servidor backend</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1.5">URL del servidor</label>
                            <p className="text-xs text-slate-600 mb-2">Ej: http://192.168.1.50:8080/api</p>
                            <input value={url} onChange={e=>setUrl(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-indigo-500 transition"/>
                        </div>
                        <button onClick={()=>setBaseURL(url)}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl text-sm transition-colors">
                            Guardar y reconectar
                        </button>
                        <button onClick={()=>navigate(-1)}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 rounded-xl text-sm transition-colors">
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}