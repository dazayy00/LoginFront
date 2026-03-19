import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <span className="font-semibold">Escuela App</span>
                <div className="flex items-center gap-4">
                    <span className="text-slate-400 text-sm hidden sm:block">{user?.email}</span>
                    <Link to="/change-password" className="text-slate-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-slate-800">
                        Cambiar contraseña
                    </Link>
                    <button onClick={logout} className="text-sm text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/10">
                        Cerrar sesión
                    </button>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-2xl font-semibold mb-2">Bienvenido</h1>
                <p className="text-slate-400 text-sm mb-8">Sesión activa como <span className="text-indigo-400">{user?.email}</span></p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link to="/change-password" className="group bg-slate-900 border border-slate-800 hover:border-violet-500/40 rounded-2xl p-5 transition-all">
                        <h3 className="font-medium text-white mb-1">Cambiar contraseña</h3>
                        <p className="text-slate-500 text-sm">Verificación de identidad RF-15</p>
                    </Link>
                    <Link to="/settings" className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 transition-all">
                        <h3 className="font-medium text-white mb-1">Configuración</h3>
                        <p className="text-slate-500 text-sm">Cambiar endpoint del servidor</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}