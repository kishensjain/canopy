import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import {
  listTrees,
  getTree,
  createTree,
  updateTree,
  addWateringLog,
  uploadTreePhoto,
  deleteTree,
} from "../controllers/tree.controller";

const router = Router();

// /trees
router
  .route("/")
  .get(listTrees) // Public
  .post(protect, createTree);

// /trees/:id
router
  .route("/:id")
  .get(getTree) // Public
  .patch(protect, updateTree)
  .delete(protect, deleteTree);

// /trees/:id/water
router.post("/:id/water", protect, addWateringLog);

// /trees/:id/photo
router.post("/:id/photo", protect, upload.single("photo"), uploadTreePhoto);

export default router;
