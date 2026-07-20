import { Router } from "express";
import { protect } from "../middleware/auth";
import {
  listGardens,
  getGarden,
  createGarden,
  joinGarden,
  updateGarden,
  deleteGarden,
} from "../controllers/garden.controller";

const router = Router();

// /gardens
router
  .route("/")
  .get(listGardens) // Public: browse gardens
  .post(protect, createGarden);

// /gardens/:id
router
  .route("/:id")
  .get(getGarden) // Public: view a garden + its trees
  .patch(protect, updateGarden)
  .delete(protect, deleteGarden);

// /gardens/:id/join
router.post("/:id/join", protect, joinGarden);

export default router;
