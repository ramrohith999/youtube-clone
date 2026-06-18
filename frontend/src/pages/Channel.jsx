import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import VideoCard from "../components/VideoCard";

import {
  getChannelById,
  getChannelVideos,
} from "../services/channelService";

import { deleteVideo } from "../services/videoService";

const Channel = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const [channel, setChannel] =
    useState(null);

  const [videos, setVideos] =
    useState([]);

  useEffect(() => {
    const loadChannel = async () => {
      try {
        const channelData =
          await getChannelById(id);

        const videosData =
          await getChannelVideos(id);

        setChannel(channelData);
        setVideos(videosData);
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load channel"
        );
      }
    };

    loadChannel();
  }, [id]);

  const isOwner =
    user &&
    (channel?.owner === user.id ||
      channel?.owner?._id === user.id);

  const handleDeleteVideo = async (
    videoId
  ) => {
    const confirmed =
      window.confirm(
        "Delete this video?"
      );

    if (!confirmed) return;

    try {
      await deleteVideo(videoId);

      setVideos((prev) =>
        prev.filter(
          (video) =>
            video._id !== videoId
        )
      );

      toast.success(
        "Video deleted successfully"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete video"
      );
    }
  };

  if (!channel) {
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
      <div>
        {/* Banner */}
        <div className="relative">
          <img
            src={
              channel.banner ||
              "https://picsum.photos/1200/300"
            }
            alt={channel.channelName}
            className="
              w-full
              h-64
              object-cover
              rounded-2xl
              shadow-md
              border
              border-gray-200
              dark:border-gray-700
            "
          />

          {/* Avatar */}
          <div
            className="
              absolute
              -bottom-10
              left-8
              h-24
              w-24
              rounded-full
              bg-blue-500
              text-white
              flex
              items-center
              justify-center
              text-4xl
              font-bold
              border-4
              border-white
              dark:border-gray-900
              shadow-lg
            "
          >
            {channel.channelName
              ?.charAt(0)
              .toUpperCase()}
          </div>
        </div>

        {/* Channel Info */}
        <div className="mt-14">
          <h1
            className="
              text-4xl
              font-bold
              dark:text-white
            "
          >
            {channel.channelName}
          </h1>

          <p
            className="
              text-gray-500
              dark:text-gray-400
              mt-2
            "
          >
            {channel.subscribers?.toLocaleString()}
            {" "}
            Subscribers
          </p>

          <div className="flex gap-8 mt-4">
            <div>
              <p
                className="
                  text-2xl
                  font-bold
                  dark:text-white
                "
              >
                {videos.length}
              </p>

              <p
                className="
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Videos
              </p>
            </div>

            <div>
              <p
                className="
                  text-2xl
                  font-bold
                  dark:text-white
                "
              >
                {channel.subscribers?.toLocaleString()}
              </p>

              <p
                className="
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Subscribers
              </p>
            </div>
          </div>

          <p
            className="
              text-gray-600
              dark:text-gray-300
              mt-5
              max-w-3xl
            "
          >
            {channel.description ||
              "Welcome to this channel."}
          </p>
        </div>

        {/* Videos Header */}
        <div className="mt-12 mb-6">
          <h2
            className="
              text-3xl
              font-bold
              dark:text-white
            "
          >
            Channel Videos
          </h2>

          <p
            className="
              text-gray-500
              dark:text-gray-400
              mt-1
            "
          >
            {videos.length} videos uploaded
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">
              🎥
            </div>

            <h2
              className="
                text-2xl
                font-bold
                dark:text-white
              "
            >
              No Videos Yet
            </h2>

            <p
              className="
                text-gray-500
                dark:text-gray-400
                mt-2
              "
            >
              This channel hasn't uploaded
              any videos.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >
            {videos.map((video) => (
              <div
                key={video._id}
                className="relative"
              >
                <VideoCard
                  video={video}
                />

                {isOwner && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/edit-video/${video._id}`
                        )
                      }
                      className="
                        flex-1
                        bg-yellow-500
                        text-white
                        py-2
                        rounded-xl
                        hover:bg-yellow-600
                        transition
                        cursor-pointer
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteVideo(
                          video._id
                        )
                      }
                      className="
                        flex-1
                        bg-red-500
                        text-white
                        py-2
                        rounded-xl
                        hover:bg-red-600
                        transition
                        cursor-pointer
                      "
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Channel;