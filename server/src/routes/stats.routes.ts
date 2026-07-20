import { Router } from "express";
import { getStats } from "../controllers/stats.controller";

const router = Router();

router.get("/", getStats); // public: aggregate numbers, nothing user-specific

export default router;
