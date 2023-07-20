import express from "express";
import auth from "../middleware/auth.js";

import {
  handleAddComment,
  handleDeleteComment,
  handleEditComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/add", auth, handleAddComment);
router.delete("/delete/:post/:comment", auth, handleDeleteComment);
router.post("/edit", auth, handleEditComment);

export default router;
