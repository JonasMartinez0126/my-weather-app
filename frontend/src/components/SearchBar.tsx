import { useState } from "react"; // Importa useState hook para manejar estado local

// Define interfaz para las props del componente
interface Props {
  onSearch: (city: string) => void; // Función callback que se ejecuta al buscar
}

/**
 * Componente SearchBar que renderiza un formulario de búsqueda
 * @param onSearch Función que maneja la búsqueda de ciudades
 */
export default function SearchBar({ onSearch }: Props) {
  // Estado local para el valor del input
  const [city, setCity] = useState("");

  /**
   * Maneja el envío del formulario
   * Previene el comportamiento por defecto y valida el input
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return; // Valida que no esté vacío
    onSearch(city); // Ejecuta callback con la ciudad
    setCity(""); // Limpia el input
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md mx-auto mb-6" // Contenedor flexible centrado
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Buscar ciudad..."
        className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500" // Estilos del input
      />
      <button
        type="submit"
        className="bg-emerald-600 text-white px-4 py-2 rounded-r-lg hover:bg-emerald-700 transition" // Estilos del botón
      >
        Buscar
      </button>
    </form>
  );
}
