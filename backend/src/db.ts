import { Pool } from 'pg' // Importa el Pool de postgresql para manejar conexiones
import dotenv from 'dotenv' // Importa dotenv para variables de entorno

dotenv.config() // Inicializa la configuración de variables de entorno

// Crear pool de conexión a PostgreSQL usando la variable de entorno PG_URI
const pool = new Pool({
  connectionString: process.env.PG_URI,
})

/**
 * Inicializa la base de datos creando la tabla 'searches' si no existe
 * La tabla almacena el historial de búsquedas del clima
 */
export async function initDb() {
  try {
    // Crea la tabla con campos para ciudad, coordenadas, temperatura y datos completos
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
    console.error('Error al inicializar la base de datos:', err)
    process.exit(1) // Termina el proceso si hay error de conexión
  }
}

/**
 * Guarda una nueva búsqueda en la base de datos
 * @param entry Objeto con los datos de la búsqueda a guardar
 */
export async function saveSearch(entry: {
  city: string
  lat: number
  lon: number
  temp: number
  payload: any
}) {
  try {
    const { city, lat, lon, temp, payload } = entry
    // Inserta los datos usando parámetros preparados para prevenir SQL injection
    await pool.query(
      `INSERT INTO searches (city, lat, lon, temp, payload) VALUES ($1, $2, $3, $4, $5)`,
      [city, lat, lon, temp, payload]
    )
  } catch (err) {
    console.error('Error al guardar la búsqueda:', err)
  }
}

/**
 * Obtiene las últimas 20 búsquedas realizadas
 * @returns Array con el historial de búsquedas ordenado por ID descendente
 */
export async function getHistory() {
  try {
    // Consulta las últimas 20 búsquedas ordenadas por ID descendente
    const res = await pool.query(
      `SELECT city, lat, lon, temp, payload, created_at FROM searches ORDER BY id DESC LIMIT 20`
    )
    return res.rows
  } catch (err) {
    console.error('Error al obtener historial:', err)
    return [] // Retorna array vacío en caso de error
  }
}
