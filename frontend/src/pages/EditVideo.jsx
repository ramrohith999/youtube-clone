import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

import {
  getVideoById,
  updateVideo,
} from "../services/videoService";

const EditVideo = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(false);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const video =
          await getVideoById(id);

        setTitle(video.title);

        setDescription(
          video.description
        );
      } catch (error) {
        toast.error(
          "Failed to load video"
        );
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length < 5) {
      toast.error(
        "Title must be at least 5 characters"
      );
      return;
    }

    try {
      setUpdating(true);

      await updateVideo(id, {
        title,
        description,
      });

      toast.success(
        "Video Updated Successfully"
      );

      setTimeout(() => {
        navigate(`/video/${id}`);
      }, 1000);
    } catch (error) {
      toast.error(
        "Failed to update video"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center py-20">
          <div
            className="
              animate-spin
              h-12
              w-12
              rounded-full
              border-b-2
              border-blue-500
            "
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Edit Video
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Update your video details.
          </p>
        </div>

        <div
          className="
            bg-white
            dark:bg-gray-900
            rounded-2xl
            shadow-lg
            p-8
            border
            border-gray-200
            dark:border-gray-700
          "
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                className="
                  block
                  font-medium
                  mb-2
                  dark:text-gray-200
                "
              >
                Video Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
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
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-400
                "
                required
                minLength={5}
              />
            </div>

            <div>
              <label
                className="
                  block
                  font-medium
                  mb-2
                  dark:text-gray-200
                "
              >
                Description
              </label>

              <textarea
                rows="6"
                value={description}
                onChange={(e) =>
                  setDescription(
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
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-400
                "
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={updating}
                className="
                  flex-1
                  bg-blue-500
                  text-white
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-blue-600
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  cursor-pointer
                "
              >
                {updating
                  ? "Saving..."
                  : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/video/${id}`
                  )
                }
                className="
                  flex-1
                  bg-gray-200
                  dark:bg-gray-700
                  text-gray-800
                  dark:text-white
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-gray-300
                  dark:hover:bg-gray-600
                  transition
                  cursor-pointer
                "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditVideo;