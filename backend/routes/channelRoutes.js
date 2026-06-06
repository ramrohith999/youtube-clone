import express from "express";
import {
  createChannel,
  getChannelById,
  getChannelVideos,
  getMyChannel,
} from "../controllers/channelController.js";
const router = express.Router();

router.post("/", createChannel);

router.get("/:id", getChannelById);

router.get("/:id/videos", getChannelVideos);

router.get("/owner/:userId", getMyChannel);

export default router;
