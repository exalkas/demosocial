import express from "express";
import auth from "../middleware/auth.js";

import {
  handleListPosts,
  handleAddPost,
  handleLike,
  handleEdit,
  handleDelete,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/list", auth, handleListPosts);
router.post("/add", auth, handleAddPost);
router.post("/like", auth, handleLike);
router.post("/edit", auth, handleEdit);
router.delete("/delete/:post", auth, handleDelete);

export default router;
