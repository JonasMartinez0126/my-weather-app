# 🌤️ My Weather App

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/) 
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?logo=typescript)](https://www.typescriptlang.org/) 
[![Vite](https://img.shields.io/badge/Vite-5.0.0-yellow?logo=vite)](https://vitejs.dev/) 
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.2-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.3.1-green?logo=node.js)](https://nodejs.org/) 
[![Express](https://img.shields.io/badge/Express-4.18.2-black?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://www.postgresql.org/)
[![Axios](https://img.shields.io/badge/Axios-1.12.2-red?logo=axios)](https://axios-http.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)
[![CI](https://img.shields.io/badge/GitHub%20Actions-CI-blue?logo=github)](https://github.com/)

## 🔹 Descripción

Aplicación web **fullstack** para consultar el clima actual de cualquier ciudad usando la API de OpenWeather y almacenar un historial de búsquedas en PostgreSQL/Neon.  

- Backend: Node.js + Express + TypeScript + PostgreSQL/Neon  
- Frontend: React + TypeScript + Vite + Tailwind + Axios + react-router-dom 

---

<details>
<summary>📂 Estructura del proyecto</summary>

```
my-weather-app/
│
├─ backend/
│  ├─ src/
│  │  ├─ db.ts                 # Conexión a PostgreSQL y funciones para historial
│  │  ├─ index.ts              # Servidor principal
│  │  └─ routes/
│  │     ├─ index.ts           # Centraliza todas las rutas
│  │     ├─ weatherRoutes.ts   # Rutas para obtener clima actual
│  │     └─ historyRoutes.ts   # Rutas para historial
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ .env                     # Variables de entorno
│
├── frontend/
│ ├── src/
│ │ ├── components/ # WeatherCard, SearchBar
│ │ ├── pages/ # Home, History
│ │ ├── services/ # weatherService
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── index.css
│ ├── .env
│ ├── tsconfig.json
│ ├── vite.config.ts
│ └── package.json
```

</details>

---

<details>
<summary>⚙️ Tecnologías utilizadas</summary>

* **Frontend:** React, TypeScript, Axios, Tailwind CSS
* **Backend:** Node.js, Express, TypeScript, Axios
* **Base de datos:** PostgreSQL (Neon)
* **API externa:** OpenWeather

</details>

---

<details>
<summary>🚀 Instalación y ejecución</summary>

### Backend

```bash
cd backend
npm install
```

Crear `.env`:

```
PORT=4000
OPENWEATHER_API_KEY=tu_api_key_openweather
DATABASE_URL=postgresql://usuario:password@host:puerto/dbname
```

Crear tabla en Neon:

```sql
CREATE TABLE IF NOT EXISTS weather_history (
  id SERIAL PRIMARY KEY,
  ciudad VARCHAR(100),
  temperatura DECIMAL(5,2),
  clima VARCHAR(100),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Ejecutar backend:

```bash
npm run dev
```

Servidor corriendo en `http://localhost:4000/api`.

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App disponible en `http://localhost:5173`.

</details>

---

<details>
<summary>🔧 Rutas del backend</summary>

| Ruta                 | Método | Descripción                                |
| -------------------- | ------ | ------------------------------------------ |
| `/api/weather/:city` | GET    | Obtener clima actual de la ciudad          |
| `/api/history`       | GET    | Obtener historial de las últimas búsquedas |

</details>

---

<details>
<summary>🌐 Flujo de datos</summary>

```text
[Frontend Home.tsx]
       |
       | Axios GET /weather/:city
       v
[Backend weatherRoutes.ts] --> Consulta OpenWeather API
       |                           |
       | Axios GET                v
       |                       OpenWeather
       v
 Guarda en PostgreSQL           Response JSON
       |
       v
 Devuelve datos al Frontend
       |
       v
 [WeatherCard] muestra clima
 [History] muestra historial (GET /history)
```

</details>

---

<details>
<summary>⚠️ Notas importantes</summary>

* Asegurarse de que la **API Key de OpenWeather** sea válida.
* Los nombres de ciudad deben estar correctamente escritos.
* Backend maneja automáticamente espacios en nombres de ciudad.

</details>

---
