import { useEffect, useState } from "react";

import {
  getComments,
  createComment,
  deleteComment,
} from "../services/commentService";

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  const [text, setText] = useState("");

  const userId = "6a1b11a1f2b72e71b85a7a73";

  const loadComments = async () => {
    const data = await getComments(videoId);

    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, [videoId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    await createComment({
      text,
      user: userId,
      video: videoId,
    });

    setText("");

    loadComments();
  };

  const handleDelete = async (id) => {
    await deleteComment(id);

    loadComments();
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="
            flex-1
            border
            rounded
            px-3
            py-2
          "
        />

        <button
          onClick={handleSubmit}
          className="
            bg-blue-500
            text-white
            px-4
            rounded
            cursor-pointer
          "
        >
          Post
        </button>
      </div>

      {comments.map((comment) => (
        <div
          key={comment._id}
          className="
            border-b
            py-3
          "
        >
          <p className="font-semibold">{comment.user?.username}</p>

          <p>{comment.text}</p>

          <button
            onClick={() => handleDelete(comment._id)}
            className="
              text-red-500
              text-sm
              mt-1
              cursor-pointer
            "
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
