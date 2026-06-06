import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateVideo(id, {
        title,
        description,
      });

      alert(
        "Video Updated Successfully"
      );

      navigate(`/video/${id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to update video");
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

          <p className="text-gray-500 mt-2">
            Update your video details.
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-lg
            p-8
          "
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="block font-medium mb-2">
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
                  rounded-xl
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-400
                "
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
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
                className="
                  flex-1
                  bg-blue-500
                  text-white
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-blue-600
                  transition
                  cursor-pointer
                "
              >
                Save Changes
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
                  text-gray-800
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-gray-300
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