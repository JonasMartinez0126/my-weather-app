import { Router } from "express";
import weatherRoutes from "./weatherRoutes";
import historyRoutes from "./historyRoutes";

const router = Router();

router.use("/weather", weatherRoutes);
router.use("/history", historyRoutes);

export default router;
