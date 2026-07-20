import express from "express";
import gardenRoutes from "./garden.routes";
import treeRoutes from "./tree.routes";
import statsRoutes from "./stats.routes";

const router = express.Router();

router.use("/gardens", gardenRoutes);
router.use("/trees", treeRoutes);
router.use("/stats", statsRoutes);

export default router;