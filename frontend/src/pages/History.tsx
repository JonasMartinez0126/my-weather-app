import { useEffect, useState } from "react"; // Hooks para manejo de estado y efectos
import type { WeatherData } from "../services/weatherService"; // Tipo para datos del clima
import { getHistory } from "../services/weatherService"; // Función para obtener historial

/**
 * Página de historial que muestra las búsquedas previas
 * Obtiene y muestra el listado de búsquedas realizadas
 */
export default function History() {
  // Estado para almacenar el historial de búsquedas
  const [history, setHistory] = useState<WeatherData[]>([]);
  // Estado para manejar errores
  const [error, setError] = useState("");

  // Efecto que carga el historial al montar el componente
  useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch((err) => setError(err.message));
  }, []);

  return (
    // Contenedor principal con fondo y padding
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Título de la página */}
      <h1 className="text-3xl font-bold text-emerald-800 text-center mb-6">
        📜 Historial de búsquedas
      </h1>

      {/* Muestra mensaje de error si existe */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Tarjeta contenedora del historial */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Muestra mensaje si no hay registros o la lista de búsquedas */}
        {history.length === 0 ? (
          <p className="text-center text-gray-500">No hay registros aún</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {/* Mapea cada item del historial */}
            {history.map((item, idx) => (
              <li key={idx} className="py-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-emerald-700">
                    {item.city}
                  </span>
                  <span className="text-gray-600">{item.temp.toFixed(1)}°C</span>
                </div>
                <p className="text-sm text-gray-500 capitalize">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
