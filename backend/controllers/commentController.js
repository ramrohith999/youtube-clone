import Comment from "../models/Comment.js";

// to create a comment
export const createComment = async (
  req,
  res
) => {
  try {
    const comment =
      await Comment.create(req.body);

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//to get comments of a videop by videoid

export const getCommentsByVideo =
  async (req, res) => {
    try {
      const comments =
        await Comment.find({
          video: req.params.videoId,
        })
          .populate("user")
          .sort({
            createdAt: -1,
          });

      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// to update a comment
  export const updateComment =
  async (req, res) => {
    try {
      const comment =
        await Comment.findByIdAndUpdate(
          req.params.id,
          {
            text: req.body.text,
          },
          {
            new: true,
          }
        );

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  //to delete a comment
  export const deleteComment =
  async (req, res) => {
    try {
      await Comment.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Comment deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };