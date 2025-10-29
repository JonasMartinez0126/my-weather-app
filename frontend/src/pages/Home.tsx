import { useState } from "react"; // Hook para manejo de estado
import SearchBar from "../components/SearchBar"; // Componente de búsqueda
import WeatherCard from "../components/WeatherCard"; // Componente para mostrar clima
import type { WeatherData } from "../services/weatherService"; // Tipo de datos del clima
import { getWeather } from "../services/weatherService"; // Servicio para obtener clima

/**
 * Página principal de la aplicación
 * Maneja la búsqueda y visualización del clima
 */
export default function Home() {
  // Estado para almacenar datos del clima
  const [weather, setWeather] = useState<WeatherData | null>(null);
  // Estado para manejar mensajes de error
  const [error, setError] = useState("");

  /**
   * Maneja la búsqueda de clima para una ciudad
   * @param city Nombre de la ciudad a buscar
   */
  const handleSearch = async (city: string) => {
    try {
      setError(""); // Limpia errores previos
      const data = await getWeather(city);

      // Validación: asegurarse de que la data sea correcta
      if (!data || data.temp === undefined || data.city === undefined) {
        throw new Error("No se recibieron datos válidos del clima");
      }

      setWeather(data); // Actualiza estado con datos del clima
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setWeather(null); // Limpia datos previos
      setError(err.message || "No se pudo obtener el clima 😕");
    }
  };

  return (
    // Contenedor principal con gradiente de fondo
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Título de la aplicación */}
      <h1 className="text-4xl font-bold text-center mb-3 text-emerald-800">
        🌤️ Weather App
      </h1>

      {/* Barra de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      {/* Mensaje de error si existe */}
      {error && (
        <p className="text-red-500 font-medium mt-4 text-center">{error}</p>
      )}

      {/* Tarjeta del clima si hay datos */}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}
