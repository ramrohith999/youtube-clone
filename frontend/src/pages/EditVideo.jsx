import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { getVideoById, updateVideo } from "../services/videoService";

const EditVideo = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  useEffect(() => {
    const loadVideo = async () => {
      const video = await getVideoById(id);

      setTitle(video.title);

      setDescription(video.description);
    };

    loadVideo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateVideo(id, {
      title,
      description,
    });

    navigate(`/video/${id}`);
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Video</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full
            border
            p-3
            rounded
          "
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="
            w-full
            border
            p-3
            rounded
          "
        />

        <button
          className="
            bg-blue-500
            text-white
            px-5
            py-3
            rounded
            cursor-pointer
          "
        >
          Save Changes
        </button>
      </form>
    </MainLayout>
  );
};

export default EditVideo;
