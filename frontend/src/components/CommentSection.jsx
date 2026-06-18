import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  getComments,
  createComment,
  deleteComment,
  updateComment,
} from "../services/commentService";

const CommentSection = ({ videoId }) => {
  const [comments, setComments] =
    useState([]);

  const [text, setText] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editText, setEditText] =
    useState("");

  const { user } = useSelector(
    (state) => state.auth
  );

  const loadComments = async () => {
    try {
      const data =
        await getComments(videoId);

      setComments(data);
    } catch (error) {
      toast.error(
        "Failed to load comments"
      );
    }
  };

  useEffect(() => {
    loadComments();
  }, [videoId]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error(
        "Comment cannot be empty"
      );
      return;
    }

    if (!user) {
      toast.error(
        "Please login first"
      );
      return;
    }

    try {
      await createComment({
        text,
        user: user.id,
        video: videoId,
      });

      toast.success(
        "Comment posted"
      );

      setText("");

      loadComments();
    } catch (error) {
      toast.error(
        "Failed to post comment"
      );
    }
  };

  const handleDelete = async (
    id
  ) => {
    try {
      await deleteComment(id);

      toast.success(
        "Comment deleted"
      );

      loadComments();
    } catch (error) {
      toast.error(
        "Failed to delete comment"
      );
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment._id);

    setEditText(comment.text);
  };

  const handleUpdate = async () => {
    if (!editText.trim()) {
      toast.error(
        "Comment cannot be empty"
      );
      return;
    }

    try {
      await updateComment(
        editingId,
        editText
      );

      toast.success(
        "Comment updated"
      );

      setEditingId(null);
      setEditText("");

      loadComments();
    } catch (error) {
      toast.error(
        "Failed to update comment"
      );
    }
  };

  return (
    <div className="mt-8">
      <h2
        className="
          text-3xl
          font-bold
          mb-6
          dark:text-white
        "
      >
        Comments
      </h2>

      {user ? (
        <div
          className="
            flex
            gap-3
            mb-8
            bg-white
            dark:bg-gray-900
            p-4
            rounded-xl
            shadow-sm
            border
            border-gray-200
            dark:border-gray-700
          "
        >
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            className="
              flex-1
              border
              border-gray-200
              dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
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
        <p
          className="
            text-gray-500
            dark:text-gray-400
            mb-6
          "
        >
          Login to post comments
        </p>
      )}

      {comments.length === 0 && (
        <div
          className="
            text-center
            py-10
            text-gray-500
            dark:text-gray-400
          "
        >
          No comments yet.
          Be the first to comment!
        </div>
      )}

      {comments.map((comment) => {
        const isCommentOwner =
          user &&
          comment.user?._id ===
            user.id;

        return (
          <div
            key={comment._id}
            className="
              bg-white
              dark:bg-gray-900
              rounded-xl
              p-4
              shadow-sm
              border
              border-gray-200
              dark:border-gray-700
              mb-4
            "
          >
            <p
              className="
                font-semibold
                text-lg
                dark:text-white
              "
            >
              {comment.user?.username}
            </p>

            {editingId ===
            comment._id ? (
              <div className="mt-3">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) =>
                    setEditText(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-white
                    rounded-xl
                    px-4
                    py-2
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-400
                  "
                />

                <button
                  onClick={
                    handleUpdate
                  }
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
              <p
                className="
                  text-gray-700
                  dark:text-gray-300
                  mt-2
                "
              >
                {comment.text}
              </p>
            )}

            {isCommentOwner && (
              <div className="mt-3">
                <button
                  onClick={() =>
                    handleEdit(comment)
                  }
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
                  onClick={() =>
                    handleDelete(
                      comment._id
                    )
                  }
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
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentSection;