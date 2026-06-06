import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import VideoCard from "../components/VideoCard";

import {
  getChannelById,
  getChannelVideos,
} from "../services/channelService";

const Channel = () => {
  const { id } = useParams();

  const [channel, setChannel] =
    useState(null);

  const [videos, setVideos] =
    useState([]);

  useEffect(() => {
    const loadChannel = async () => {
      const channelData =
        await getChannelById(id);

      const videosData =
        await getChannelVideos(id);

      setChannel(channelData);
      setVideos(videosData);
    };

    loadChannel();
  }, [id]);

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

          <h1 className="text-4xl font-bold">
            {channel.channelName}
          </h1>

          <p className="text-gray-500 mt-2">
            {channel.subscribers.toLocaleString()} Subscribers
          </p>

          <p className="text-gray-600 mt-4 max-w-2xl">
            {channel.description ||
              "Welcome to this channel."}
          </p>

        </div>

        {/* Videos Section */}
        <div className="mt-12 mb-6">

          <h2 className="text-3xl font-bold">
            Channel Videos
          </h2>

          <p className="text-gray-500 mt-1">
            {videos.length} videos uploaded
          </p>

        </div>

        {videos.length === 0 ? (
          <div className="text-center py-20">

            <div className="text-6xl mb-4">
              🎥
            </div>

            <h2 className="text-2xl font-bold">
              No Videos Yet
            </h2>

            <p className="text-gray-500 mt-2">
              This channel hasn't uploaded any videos.
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
              <VideoCard
                key={video._id}
                video={video}
              />
            ))}
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default Channel;