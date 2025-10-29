import type { WeatherData } from "../services/weatherService"; // Importa tipo WeatherData

// Define las props del componente usando WeatherData
interface Props {
  data: WeatherData; // Datos del clima a mostrar
}

/**
 * Componente WeatherCard que muestra la información del clima
 * @param data Objeto con los datos del clima a mostrar
 */
export default function WeatherCard({ data }: Props) {
  return (
    // Contenedor principal con efectos visuales
    <div className="bg-white/80 shadow-lg rounded-2xl p-6 mt-8 w-full max-w-md mx-auto text-center backdrop-blur">
      {/* Nombre de la ciudad */}
      <h2 className="text-2xl font-bold text-emerald-700 mb-2">{data.city}</h2>
      {/* Descripción del clima */}
      <p className="text-gray-600 capitalize mb-3">{data.description}</p>
      {/* Temperatura actual */}
      <p className="text-6xl font-semibold text-gray-800 mb-4">
        {data.temp.toFixed(1)}°C
      </p>
      {/* Coordenadas geográficas */}
      <div className="flex justify-center gap-6 text-sm text-gray-500">
        <span>Lat: {data.lat}</span>
        <span>Lon: {data.lon}</span>
      </div>
    </div>
  );
}
