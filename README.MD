# Weather App 🌤️

Aplicación de clima construida con **React + Vite + TypeScript** en el frontend y **Express + TypeScript + PostgreSQL (Neon)** en el backend.  
Permite buscar el clima de cualquier ciudad usando la **API de OpenWeather** y guarda un historial de búsquedas en PostgreSQL.

---

## **Tecnologías**

- Frontend:
  - React 18
  - Vite
  - TypeScript
  - Axios
- Backend:
  - Node.js
  - Express
  - TypeScript
  - PostgreSQL (Neon)
  - Axios
- Otras:
  - CORS
  - dotenv

---

## **Estructura del proyecto**

weather-app/
│
├── backend/
│ ├── src/
│ │ ├── db.ts
│ │ ├── routes/weather.ts
│ │ └── index.ts
│ ├── package.json
│ ├── tsconfig.json
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/weatherService.ts
│ │ ├── App.tsx
│ │ └── main.tsx
│ ├── package.json
│ ├── tsconfig.json
│ └── vite.config.ts
