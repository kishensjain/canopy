import { Router } from "express";
import { protect } from "../middleware/auth";
// import { upload } from "../middleware/upload";
import {
  listTrees,
  getTree,
  createTree,
  updateTree,
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

export default router;
