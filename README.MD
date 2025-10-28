# 🌤️ My Weather App

![Node.js](https://img.shields.io/badge/Node.js-14.x-green) ![React](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blueviolet) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.3-blue) ![OpenWeather](https://img.shields.io/badge/OpenWeather-API-orange)

Aplicación web para consultar el clima de cualquier ciudad usando la **API de OpenWeather**, con historial de búsquedas guardado en **PostgreSQL (Neon)**.
Frontend con **React + TypeScript**, backend con **Node.js + Express + TypeScript**.

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
└─ frontend/
   ├─ src/
   │  ├─ api/weatherApi.ts      # Funciones para consumir backend
   │  ├─ components/
   │  │  ├─ WeatherCard.tsx     # Mostrar clima de una ciudad
   │  │  └─ HistoryList.tsx     # Mostrar historial de búsquedas
   │  ├─ pages/Home.tsx         # Página principal
   │  ├─ App.tsx
   │  └─ main.tsx
   ├─ package.json
   └─ tsconfig.json
```

</details>

---

<details>
<summary>⚙️ Tecnologías utilizadas</summary>

* **Frontend:** React, TypeScript, Axios, Tailwind CSS (opcional)
* **Backend:** Node.js, Express, TypeScript, Axios
* **Base de datos:** PostgreSQL (Neon)
* **API externa:** OpenWeather

</details>

---

<details>
<summary>📝 Funcionalidades</summary>

1. Consultar el clima actual de cualquier ciudad.
2. Guardar automáticamente la búsqueda en la base de datos.
3. Mostrar un historial de las últimas búsquedas (máx. 10).
4. Manejo de errores: ciudad no encontrada, API no disponible.

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
OPENWEATHER_API_KEY=tu_api_key_aqui
DATABASE_URL=postgresql://usuario:contraseña@neon_url/db_name
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
<summary>📌 Uso</summary>

1. Abrir la app en el navegador.
2. Ingresar el nombre de una ciudad y hacer clic en **Buscar**.
3. Se mostrará el clima actual en un card.
4. Debajo aparecerá el historial de búsquedas realizadas.

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
 [HistoryList] muestra historial (GET /history)
```

</details>

---

<details>
<summary>⚠️ Notas importantes</summary>

* Asegurarse de que la **API Key de OpenWeather** sea válida.
* Los nombres de ciudad deben estar correctamente escritos.
* Backend maneja automáticamente espacios en nombres de ciudad.
* Para múltiples países, se puede agregar código ISO al nombre: `"Asuncion,PY"`.

</details>

---

<details>
<summary>🏗️ Mejoras futuras</summary>

* Autocompletar ciudades en el frontend.
* Mostrar íconos según el clima.
* Filtrado y paginación del historial.
* Multi-idioma y soporte para distintas unidades de temperatura.

</details>
