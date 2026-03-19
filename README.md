# Escuela App — Frontend

React + Vite + Tailwind CSS v4

---

## Requisitos previos

| Herramienta | Versión mínima |
|-------------|----------------|
| Node.js     | 20+            |
| npm         | 10+            |

Verifica tu versión:
```bash
node -v
npm -v
```

---

## Instalación

### 1. Instalar dependencias del proyecto

```bash
npm install
```

Esto instala automáticamente:
- `react` y `react-dom`
- `react-router-dom` — manejo de rutas
- `axios` — llamadas HTTP al backend

### 2. Instalar Tailwind CSS v4

```bash
npm install -D @tailwindcss/vite
```

> **Importante:** este proyecto usa Tailwind v4, que no requiere `tailwind.config.js` ni `npx tailwindcss init`.

### 3. Verificar `vite.config.js`

Asegúrate de que el archivo tenga el plugin de Tailwind:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### 4. Verificar `src/index.css`

El archivo debe contener únicamente esta línea:

```css
@import "tailwindcss";
```

---

## Configurar el endpoint del backend

Por defecto el frontend apunta a `http://localhost:8080/api`.

Para cambiarlo sin tocar el código, usa la pantalla de **Configurar endpoint** dentro de la app, o edita directamente `src/api/config.js`:

```js
export const getBaseURL = () =>
    localStorage.getItem('backend_url') || "http://localhost:8080/api";
```

---

## Correr en desarrollo

```bash
npm run dev
```

La app queda disponible en: `http://localhost:5173`

---

## Build para producción

```bash
npm run build
```

Los archivos compilados quedan en la carpeta `dist/`.

Para previsualizarlos localmente:

```bash
npm run preview
```

---

## Estructura del proyecto

```
src/
├── api/
│   ├── axiosInstance.js   — cliente HTTP con interceptor JWT
│   ├── authService.js     — todas las llamadas a /api/auth y /api/account
│   └── config.js          — URL base del backend (configurable)
├── context/
│   └── AuthContext.jsx    — estado global de sesión
├── routes/
│   └── ProtectedRoute.jsx — guarda rutas privadas
├── pages/
│   ├── Login.jsx          — RF-1
│   ├── Register.jsx       — RF-2
│   ├── ForgotPassword.jsx — RF-12/14
│   ├── ResetPassword.jsx  — RF-12/14
│   ├── ChangePassword.jsx — RF-15 (3 pasos)
│   ├── ChangeEmail.jsx    — RF-15 (3 pasos)
│   ├── Dashboard.jsx      — pantalla principal protegida
│   └── Settings.jsx       — configurar endpoint
├── App.jsx                — router principal
├── main.jsx               — punto de entrada
└── index.css              — @import "tailwindcss"
```

---

## Rutas disponibles

| Ruta               | Descripción                        | Auth |
|--------------------|------------------------------------|------|
| `/login`           | Inicio de sesión                   | No   |
| `/register`        | Registro de usuario                | No   |
| `/forgot`          | Solicitar reset de contraseña      | No   |
| `/reset-password`  | Aplicar nueva contraseña con token | No   |
| `/settings`        | Configurar endpoint del backend    | No   |
| `/dashboard`       | Pantalla principal                 | Sí   |
| `/change-password` | Cambiar contraseña (RF-15)         | Sí   |
| `/change-email`    | Cambiar correo (RF-15)             | Sí   |

---

## Acceso desde celular

1. Conecta tu PC y celular a la misma red WiFi.
2. Obtén la IP local de tu PC:
   ```bash
   # Windows
   ipconfig
   # Mac / Linux
   ifconfig | grep inet
   ```
3. Abre en el celular: `http://TU_IP_LOCAL:5173` (desarrollo) o `http://TU_IP_LOCAL:80` (Docker).
4. En la app ve a **Configurar endpoint** y pon: `http://TU_IP_LOCAL:8080/api`

---

## Dependencias instaladas

```json
"dependencies": {
  "axios": "^1.x",
  "react": "^19.x",
  "react-dom": "^19.x",
  "react-router-dom": "^7.x"
},
"devDependencies": {
  "@tailwindcss/vite": "^4.x",
  "@vitejs/plugin-react": "^5.x",
  "tailwindcss": "^4.x",
  "vite": "^7.x"
}
```
