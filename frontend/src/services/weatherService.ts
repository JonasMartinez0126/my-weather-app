import axios from "axios"; // Cliente HTTP para realizar peticiones

// Define la estructura de datos del clima
export interface WeatherData {
  city: string;      // Nombre de la ciudad
  lat: number;       // Latitud
  lon: number;       // Longitud 
  temp: number;      // Temperatura
  description: string; // Descripción del clima
}

// Crea instancia de axios con configuración base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL base desde variables de entorno
  timeout: 5000, // Timeout de 5 segundos
});

/**
 * Obtiene el clima para una ciudad específica
 * @param city Nombre de la ciudad a consultar
 * @returns Promesa con los datos del clima
 * @throws Error si falla la petición
 */
export async function getWeather(city: string): Promise<WeatherData> {
  try {
    const response = await api.get<WeatherData>(`/weather/${city}`);
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al obtener el clima"
    );
  }
}

/**
 * Obtiene el historial de búsquedas
 * @returns Promesa con array de búsquedas previas
 * @throws Error si falla la petición
 */
export async function getHistory(): Promise<WeatherData[]> {
  try {
    const response = await api.get<WeatherData[]>("/history");
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al obtener el historial"
    );
  }
}
