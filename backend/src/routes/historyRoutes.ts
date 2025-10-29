import { Router } from "express"; // Importa Router de express para definir rutas
import { getHistory } from "../db"; // Importa función para obtener historial de búsquedas

// Crea nueva instancia del router
const router = Router();

/**
 * Ruta GET para obtener el historial de búsquedas
 * No requiere parámetros
 * Retorna array con las últimas búsquedas realizadas
 */
router.get("/", async (_req, res) => {
  try {
    // Obtiene historial desde la base de datos
    const history = await getHistory();
    // Envía respuesta en formato JSON
    res.json(history);
  } catch (error: any) {
    // Log del error para debugging
    console.error("Error al obtener historial:", error.message);
    // Envía error 500 con mensaje genérico
    res.status(500).json({ error: "Error al obtener historial" });
  }
});

// Exporta el router para ser usado en la aplicación
export default router;
