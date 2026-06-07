import { useState } from "react";
import { useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import { createChannel } from "../services/channelService";

const CreateChannel = () => {
  const [channelName, setChannelName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [banner, setBanner] =
    useState("");

  const { user } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createChannel({
        channelName,
        description,
        banner,
        owner: user.id,
      });

      alert(
        "Channel Created Successfully"
      );

      setChannelName("");
      setDescription("");
      setBanner("");
    } catch (error) {
      alert("Failed to create channel");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Create Channel
          </h1>

          <p className="text-gray-500 mt-2">
            Build your own channel and start
            sharing videos.
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
                Channel Name
              </label>

              <input
                type="text"
                placeholder="Enter channel name"
                value={channelName}
                onChange={(e) =>
                  setChannelName(
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
                rows="5"
                placeholder="Tell viewers about your channel"
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
                Banner URL
              </label>

              <input
                type="text"
                placeholder="Paste banner image URL"
                value={banner}
                onChange={(e) =>
                  setBanner(
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

            {banner && (
              <div>
                <p className="font-medium mb-2">
                  Banner Preview
                </p>

                <img
                  src={banner}
                  alt="Banner Preview"
                  className="
                    w-full
                    h-48
                    object-cover
                    rounded-xl
                    border
                  "
                  onError={(e) => {
                    e.target.style.display =
                      "none";
                  }}
                />
              </div>
            )}

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
              Create Channel
            </button>

          </form>
        </div>

      </div>
    </MainLayout>
  );
};

export default CreateChannel;