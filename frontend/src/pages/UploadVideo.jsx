import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { createVideo } from "../services/videoService";
import { useSelector } from "react-redux";

const UploadVideo = () => {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [videoUrl, setVideoUrl] = useState("");

  const [category, setCategory] = useState("React");

  const channelId = "6a22827ae4ec1b63bd01b2c7";

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      alert("Video Uploaded Successfully");

      setTitle("");
      setDescription("");
      setThumbnailUrl("");
      setVideoUrl("");
      setCategory("React");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Upload Video</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Thumbnail URL"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-3 rounded"
          >
            <option>React</option>
            <option>JavaScript</option>
            <option>NodeJS</option>
            <option>MongoDB</option>
            <option>Gaming</option>
            <option>Music</option>
            <option>Sports</option>
          </select>

          <button
            type="submit"
            className="
              bg-blue-500
              text-white
              px-5
              py-3
              rounded
              cursor-pointer
            "
          >
            Upload Video
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default UploadVideo;
