import * as express from 'express' // Importa Express para crear el router
const axios = require('axios') // Importa Axios para realizar peticiones HTTP
import { saveSearch } from '../db' // Importa función para guardar búsquedas

// Crea nueva instancia del router
const router = express.Router()

/**
 * Ruta GET para obtener el clima de una ciudad específica
 * @param city Nombre de la ciudad a consultar
 * @returns Datos del clima formateados
 */
router.get('/:city', async (req, res) => {
  const city = req.params.city as string;
  // Valida que se haya proporcionado una ciudad
  if (!city) {
    return res.status(400).json({ error: 'Debe especificar una ciudad' });
  }

  try {
    // Obtiene API key desde variables de entorno
    const apiKey = process.env.OPENWEATHER_API_KEY
    // Formatea el nombre de la ciudad para la URL
    const cityParam = city.replace(" ", "+");
    // Construye URL de la API con parámetros
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityParam}&appid=${apiKey}&units=metric&lang=es`
    // Realiza petición GET a OpenWeather
    const { data } = await axios.get(url)

    // Extrae y formatea datos relevantes
    const weather = {
      city: data.name,
      lat: data.coord.lat,
      lon: data.coord.lon,
      temp: data.main.temp,
      description: data.weather[0].description,
    }

    // Guarda la búsqueda en la base de datos
    await saveSearch({ city: weather.city, lat: weather.lat, lon: weather.lon, temp: weather.temp, payload: data })
    // Envía respuesta con datos del clima
    return res.json(weather)
  } catch (err) {
    // Manejo de errores con mensaje descriptivo
    return res.status(500).json({ error: 'Error al consultar OpenWeather', details: err })
  }
})

// Exporta el router para ser usado en la aplicación
export default router
