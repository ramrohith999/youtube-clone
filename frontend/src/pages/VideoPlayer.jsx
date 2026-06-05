import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

import { fetchVideoById } from "../features/videos/videoSlice";

import getYoutubeEmbedUrl from "../utils/getYoutubeEmbedUrl";
import { likeVideo, dislikeVideo } from "../services/videoService";

const VideoPlayer = () => {
  const { id } = useParams();

  const userId = "6a1b11a1f2b72e71b85a7a73";

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

  const handleLike = async () => {
    await likeVideo(id, userId);

    dispatch(fetchVideoById(id));
  };

  const handleDislike = async () => {
    await dislikeVideo(id, userId);

    dispatch(fetchVideoById(id));
  };

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

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleLike}
            className="
      flex
      items-center
      gap-2
      bg-gray-100
      px-4
      py-2
      rounded-full
    "
          >
            <FaThumbsUp />

            {currentVideo.likes.length}
          </button>

          <button
            onClick={handleDislike}
            className="
      flex
      items-center
      gap-2
      bg-gray-100
      px-4
      py-2
      rounded-full
    "
          >
            <FaThumbsDown />

            {currentVideo.dislikes.length}
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl mt-4">
          <p>{currentVideo.description}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoPlayer;
