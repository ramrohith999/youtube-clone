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

  //to delete a commnt
  const handleDelete = async (id) => {
    await deleteComment(id);

    loadComments();
  };

  //to edit a comment
  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.text);
  };

  //to update a comment
  const handleUpdate = async () => {
    await updateComment(editingId, editText);

    setEditingId(null);
    setEditText("");

    loadComments();
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-6">Comments</h2>

      {user ? (
        <div className="flex gap-3mb-8 bg-white p-4 rounded-xl shadow-sm border">
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className=" flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2
  focus:ring-blue-400
"
          />

          <button
            onClick={handleSubmit}
            className="
  bg-blue-500
  text-white
  px-5
  rounded-xl
  font-medium
  hover:bg-blue-600
  transition
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
  bg-white
  rounded-xl
  p-4
  shadow-sm
  border
  mb-4
"
          >
            <p className="font-semibold text-lg">{comment.user?.username}</p>

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
  px-4
  py-2
  rounded-xl
  mt-3
  hover:bg-green-600
  transition
  cursor-pointer
"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-gray-700 mt-2">{comment.text}</p>
            )}

            {isCommentOwner && (
              <>
                <button
                  onClick={() => handleEdit(comment)}
                  className="
  text-blue-500
  text-sm
  font-medium
  mr-4
  hover:text-blue-700
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
  font-medium
  hover:text-red-700
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
