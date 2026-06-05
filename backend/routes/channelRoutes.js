import express from "express";
import {
  createChannel,
  getChannelById,
  getChannelVideos,
} from "../controllers/channelController.js";
const router = express.Router();

router.post("/", createChannel);

router.get("/:id", getChannelById);

router.get("/:id/videos", getChannelVideos);

export default router;
