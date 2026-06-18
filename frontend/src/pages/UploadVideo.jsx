
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { createVideo } from "../services/videoService";
import { getChannelByOwner } from "../services/channelService";

import toast from "react-hot-toast";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [thumbnailUrl, setThumbnailUrl] =
    useState("");
  const [videoUrl, setVideoUrl] =
    useState("");
  const [category, setCategory] =
    useState("React");

  const [channelId, setChannelId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const loadChannel = async () => {
      if (!user) return;

      try {
        const channel =
          await getChannelByOwner(
            user.id
          );

        if (channel) {
          setChannelId(channel._id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadChannel();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!channelId) {
      toast.error(
        "Please create a channel first"
      );
      return;
    }

    if (title.trim().length < 5) {
      toast.error(
        "Title must be at least 5 characters"
      );
      return;
    }

    if (!thumbnailUrl.trim()) {
      toast.error(
        "Thumbnail URL is required"
      );
      return;
    }

    if (!videoUrl.trim()) {
      toast.error(
        "Video URL is required"
      );
      return;
    }

    try {
      setLoading(true);

      const newVideo =
        await createVideo({
          title,
          description,
          thumbnailUrl,
          videoUrl,
          category,
          uploader: user.id,
          channel: channelId,
        });

      toast.success(
        "Video Uploaded Successfully"
      );

      navigate(
        `/video/${newVideo._id}`
      );
    } catch (error) {
      console.error(error);

      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Upload Video
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Share your content with the world.
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
              <label className="block font-medium mb-2 dark:text-gray-200">
                Video Title
              </label>

              <input
                type="text"
                placeholder="Enter video title"
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
              />
            </div>

            <div>
              <label className="block font-medium mb-2 dark:text-gray-200">
                Description
              </label>

              <textarea
                rows="5"
                placeholder="Describe your video"
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

            <div>
              <label className="block font-medium mb-2 dark:text-gray-200">
                Thumbnail URL
              </label>

              <input
                type="text"
                placeholder="Paste thumbnail URL"
                value={thumbnailUrl}
                onChange={(e) =>
                  setThumbnailUrl(
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
              />
            </div>

            <div>
              <label className="block font-medium mb-2 dark:text-gray-200">
                Video URL
              </label>

              <input
                type="text"
                placeholder="Paste YouTube URL"
                value={videoUrl}
                onChange={(e) =>
                  setVideoUrl(
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
              />
            </div>

            <div>
              <label className="block font-medium mb-2 dark:text-gray-200">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
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
              >
                <option>React</option>
                <option>JavaScript</option>
                <option>NodeJS</option>
                <option>MongoDB</option>
                <option>Gaming</option>
                <option>Music</option>
                <option>Sports</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
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
              {loading
                ? "Uploading..."
                : "Upload Video"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default UploadVideo;
