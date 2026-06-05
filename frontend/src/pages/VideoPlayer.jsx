import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import { fetchVideoById } from "../features/videos/videoSlice";

import getYoutubeEmbedUrl from "../utils/getYoutubeEmbedUrl";

const VideoPlayer = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { currentVideo, loading } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideoById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <MainLayout>
        <h2>Loading...</h2>
      </MainLayout>
    );
  }

  if (!currentVideo) {
    return (
      <MainLayout>
        <h2>Video not found</h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl">
        <iframe
          className="w-full h-125 rounded-xl"
          src={getYoutubeEmbedUrl(currentVideo.videoUrl)}
          title={currentVideo.title}
          allowFullScreen
        />
        <h1 className="text-3xl font-bold mt-4">{currentVideo.title}</h1>

        <p className="mt-3 text-gray-600">
          {currentVideo.channel?.channelName}
        </p>

        <p className="text-gray-500 mt-2">{currentVideo.views} views</p>

        <div className="bg-gray-100 p-4 rounded-xl mt-4">
          <p>{currentVideo.description}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoPlayer;
