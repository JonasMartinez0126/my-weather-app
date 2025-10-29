import { Router } from "express"; // Importa Router de express para definir rutas
import weatherRoutes from "./weatherRoutes"; // Importa rutas relacionadas con el clima
import historyRoutes from "./historyRoutes"; // Importa rutas relacionadas con el historial

// Crea nueva instancia del router
const router = Router();

// Registra las rutas bajo sus respectivos prefijos
router.use("/weather", weatherRoutes); // Rutas del clima bajo /weather
router.use("/history", historyRoutes); // Rutas del historial bajo /history

// Exporta el router configurado para ser usado en la aplicación
export default router;
