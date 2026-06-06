import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  getComments,
  createComment,
  deleteComment,
  updateComment,
} from "../services/commentService";

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  const [text, setText] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editText, setEditText] = useState("");

  const { user } = useSelector((state) => state.auth);

  const loadComments = async () => {
    const data = await getComments(videoId);

    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, [videoId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    if (!user) {
      alert("Please login first");

      return;
    }

    await createComment({
      text,
      user: user.id,
      video: videoId,
    });

    setText("");

    loadComments();
  };

  const handleDelete = async (id) => {
    await deleteComment(id);

    loadComments();
  };

  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.text);
  };

  const handleUpdate = async () => {
    await updateComment(editingId, editText);

    setEditingId(null);
    setEditText("");

    loadComments();
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {user ? (
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
      ) : (
        <p className="text-gray-500 mb-6">Login to post comments</p>
      )}

      {comments.map((comment) => {
        const isCommentOwner = user && comment.user?._id === user.id;

        return (
          <div
            key={comment._id}
            className="
            border-b
            py-3
          "
          >
            <p className="font-semibold">{comment.user?.username}</p>

            {editingId === comment._id ? (
              <div className="mt-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="
        border
        rounded
        px-2
        py-1
        w-full
      "
                />

                <button
                  onClick={handleUpdate}
                  className="
        bg-green-500
        text-white
        px-3
        py-1
        rounded
        mt-2
        cursor-pointer
      "
                >
                  Save
                </button>
              </div>
            ) : (
              <p>{comment.text}</p>
            )}

            {isCommentOwner && (
              <>
                <button
                  onClick={() => handleEdit(comment)}
                  className="
        text-blue-500
        text-sm
        mr-4
        cursor-pointer
      "
                >
                  Edit
                </button>

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
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentSection;
