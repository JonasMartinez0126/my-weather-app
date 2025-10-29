import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // Componentes de React Router
import Home from "./pages/Home"; // Página principal
import History from "./pages/History"; // Página de historial

/**
 * Componente principal de la aplicación
 * Configura el enrutamiento y la navegación
 */
export default function App() {
  return (
    <BrowserRouter>
      {/* Barra de navegación */}
      <nav className="bg-emerald-700 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo/Título de la app */}
          <h1 className="font-bold text-xl">MyWeatherApp</h1>
          {/* Links de navegación */}
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Inicio</Link>
            <Link to="/history" className="hover:underline">Historial</Link>
          </div>
        </div>
      </nav>

      {/* Configuración de rutas */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta principal */}
        <Route path="/history" element={<History />} /> {/* Ruta del historial */}
      </Routes>
    </BrowserRouter>
  );
}
