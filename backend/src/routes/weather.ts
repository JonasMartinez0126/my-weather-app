import express from 'express'
import axios from 'axios'
import { saveSearch, getHistory } from '../db'

const router = express.Router()

router.get('/', async (req, res) => {
  const city = req.query.city as string
  if (!city) return res.status(400).json({ error: 'Debe especificar una ciudad' })

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`
    const { data } = await axios.get(url)

    const weather = {
      city: data.name,
      lat: data.coord.lat,
      lon: data.coord.lon,
      temp: data.main.temp,
      description: data.weather[0].description,
    }

    await saveSearch({ city: weather.city, lat: weather.lat, lon: weather.lon, temp: weather.temp, payload: data })
    res.json(weather)
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar OpenWeather', details: err })
  }
})

router.get('/history', async (_req, res) => {
  const history = await getHistory()
  res.json(history)
})

export default router
