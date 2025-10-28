import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from "./routes"
import { initDb } from './db'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Rutas
app.use("/api", routes)

const PORT = process.env.PORT || 4000

// Arranque del servidor
app.listen(PORT, async () => {
  console.log('🔄 Inicializando base de datos...')
  await initDb() // Se inicializa Neon
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`)
})
