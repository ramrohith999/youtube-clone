import Video from "../models/Video.js";
//create video
export const createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//GET to get all videos
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("channel")
      .populate("uploader");

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//GET to get video by id

export const getVideoById = async (
  req,
  res
) => {
  try {
    const video = await Video.findById(
      req.params.id
    )
      .populate("channel")
      .populate("uploader");

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//update video

export const updateVideo = async (
  req,
  res
) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// delete videos

export const deleteVideo = async (
  req,
  res
) => {
  try {
    await Video.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Video deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};