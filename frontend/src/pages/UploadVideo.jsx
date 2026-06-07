import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import { createVideo } from "../services/videoService";
import { getChannelByOwner } from "../services/channelService";

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
        alert("error");
      }
    };

    loadChannel();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!channelId) {
      alert(
        "Please create a channel first"
      );
      return;
    }

    try {
      await createVideo({
        title,
        description,
        thumbnailUrl,
        videoUrl,
        category,
        uploader: user.id,
        channel: channelId,
      });

      alert(
        "Video Uploaded Successfully"
      );

      setTitle("");
      setDescription("");
      setThumbnailUrl("");
      setVideoUrl("");
      setCategory("React");
    } catch (error) {
      alert("Upload failed");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Upload Video
          </h1>

          <p className="text-gray-500 mt-2">
            Share your content with the world.
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
                placeholder="Enter video title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
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
              <label className="block font-medium mb-2">
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
              <label className="block font-medium mb-2">
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
              <label className="block font-medium mb-2">
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
              className="
                w-full
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
              Upload Video
            </button>

          </form>
        </div>

      </div>
    </MainLayout>
  );
};

export default UploadVideo;