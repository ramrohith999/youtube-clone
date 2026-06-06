import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { createChannel } from "../services/channelService";

import { useSelector } from "react-redux";

const CreateChannel = () => {
  const [channelName, setChannelName] = useState("");

  const [description, setDescription] = useState("");

  const [banner, setBanner] = useState("");

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createChannel({
        channelName,
        description,
        banner,
        owner: user.id,
      });

      alert("Channel Created Successfully");

      setChannelName("");
      setDescription("");
      setBanner("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create Channel</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="
              w-full
              border
              p-3
              rounded
            "
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
              w-full
              border
              p-3
              rounded
            "
          />

          <input
            type="text"
            placeholder="Banner URL"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
            className="
              w-full
              border
              p-3
              rounded
            "
          />

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
            Create Channel
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateChannel;
