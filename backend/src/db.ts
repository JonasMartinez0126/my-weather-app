import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Crear pool de conexión
const pool = new Pool({
  connectionString: process.env.PG_URI,
})

// Función para inicializar la base de datos
export async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS searches (
        id SERIAL PRIMARY KEY,
        city TEXT NOT NULL,
        lat DOUBLE PRECISION,
        lon DOUBLE PRECISION,
        temp DOUBLE PRECISION,
        payload JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)
    console.log('🗄️ Tabla "searches" verificada o creada correctamente')
  } catch (err) {
    console.error('❌ Error al inicializar la base de datos:', err)
    process.exit(1) // Salir si no se puede conectar
  }
}

// Guardar una búsqueda en la tabla
export async function saveSearch(entry: {
  city: string
  lat: number
  lon: number
  temp: number
  payload: any
}) {
  try {
    const { city, lat, lon, temp, payload } = entry
    await pool.query(
      `INSERT INTO searches (city, lat, lon, temp, payload) VALUES ($1, $2, $3, $4, $5)`,
      [city, lat, lon, temp, payload]
    )
  } catch (err) {
    console.error('❌ Error al guardar la búsqueda:', err)
  }
}

// Obtener historial de búsquedas
export async function getHistory() {
  try {
    const res = await pool.query(
      `SELECT city, lat, lon, temp, payload, created_at FROM searches ORDER BY id DESC LIMIT 20`
    )
    return res.rows
  } catch (err) {
    console.error('❌ Error al obtener historial:', err)
    return []
  }
}
