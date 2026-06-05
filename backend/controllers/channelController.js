import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

//to create channel
export const createChannel = async (req, res) => {
  try {
    const {
      channelName,
      description,
      banner,
      owner,
    } = req.body;

    const channel = await Channel.create({
      channelName,
      description,
      banner,
      owner,
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//to get channel by channelid
export const getChannelById = async (
  req,
  res
) => {
  try {
    const channel = await Channel.findById(
      req.params.id
    );

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//GET to get the videos of thr channel
export const getChannelVideos =
  async (req, res) => {
    try {
      const videos = await Video.find({
        channel: req.params.id,
      });

      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };