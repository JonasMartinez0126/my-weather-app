import { Router } from "express";
import { getHistory } from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const history = await getHistory();
    res.json(history);
  } catch (error: any) {
    console.error("Error al obtener historial:", error.message);
    res.status(500).json({ error: "Error al obtener historial" });
  }
});

export default router;
