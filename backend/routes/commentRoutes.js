import express from "express";

import {
  createComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", createComment);

router.get("/:videoId", getCommentsByVideo);

router.put("/:id", updateComment);

router.delete("/:id", deleteComment);

export default router;
