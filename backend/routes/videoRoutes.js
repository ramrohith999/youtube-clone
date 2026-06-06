import express from "express";

import {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
  incrementViews,
} from "../controllers/videoController.js";

const router = express.Router();

router.post("/", createVideo);

router.get("/", getVideos);

router.get("/:id", getVideoById);

router.put("/:id", updateVideo);

router.delete("/:id", deleteVideo);

router.patch("/:id/like", likeVideo);

router.patch("/:id/dislike", dislikeVideo);

router.patch("/:id/view", incrementViews);

export default router;
