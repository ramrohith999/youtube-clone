import express from "express";
import Video from "../models/Video.js";

const router = express.Router();

router.post("/videos", async (req, res) => {
  try {
    const videos = await Video.insertMany(req.body);

    res.status(201).json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;