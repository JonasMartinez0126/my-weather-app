import express from 'express' // Framework web para Node.js
import cors from 'cors' // Middleware para habilitar CORS
import dotenv from 'dotenv' // Para cargar variables de entorno
import routes from "./routes/index" // Importa todas las rutas de la aplicación
import { initDb } from './db' // Función para inicializar la base de datos

// Carga las variables de entorno del archivo .env
dotenv.config()

// Crea la aplicación Express
const app = express()
// Habilita CORS para todas las rutas
app.use(cors())
// Middleware para parsear JSON en el body de las peticiones
app.use(express.json())

// Monta todas las rutas bajo el prefijo /api
app.use("/api", routes)

// Puerto donde escuchará el servidor, usa variable de entorno o 4000 por defecto
const PORT = process.env.PORT || 4000

// Inicia el servidor y la base de datos
app.listen(PORT, async () => {
  console.log('Inicializando base de datos...')
  await initDb() // Inicializa la conexión con PostgreSQL
  console.log(`Backend escuchando en http://localhost:${PORT}`)
})
