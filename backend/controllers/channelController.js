import Channel from "../models/Channel.js";

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