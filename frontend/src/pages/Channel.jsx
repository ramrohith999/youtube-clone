import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import VideoCard from "../components/VideoCard";

import { getChannelById, getChannelVideos } from "../services/channelService";

const Channel = () => {
  const { id } = useParams();

  const [channel, setChannel] = useState(null);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadChannel = async () => {
      const channelData = await getChannelById(id);

      const videosData = await getChannelVideos(id);

      setChannel(channelData);
      setVideos(videosData);
    };

    loadChannel();
  }, [id]);

  if (!channel) {
    return (
      <MainLayout>
        <h2>Loading...</h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        <img
          src={channel.banner || "https://picsum.photos/1200/300"}
          alt={channel.channelName}
          className="
            w-full
            h-56
            object-cover
            rounded-xl
          "
        />

        <h1 className="text-4xl font-bold mt-4">{channel.channelName}</h1>

        <p className="text-gray-500 mt-2">{channel.subscribers} Subscribers</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Videos</h2>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Channel;
