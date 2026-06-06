import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

import { fetchVideoById } from "../features/videos/videoSlice";

import getYoutubeEmbedUrl from "../utils/getYoutubeEmbedUrl";
import {
  likeVideo,
  dislikeVideo,
  deleteVideo,
  incrementViews,
} from "../services/videoService";

import CommentSection from "../components/CommentSection";
import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const userId = user?.id;

  const dispatch = useDispatch();

  const { currentVideo, videos, loading } = useSelector(
    (state) => state.videos,
  );

  const relatedVideos =
    currentVideo && videos
      ? videos.filter(
          (video) =>
            video._id !== currentVideo._id &&
            video.category === currentVideo.category,
        )
      : [];

  const isOwner = currentVideo?.uploader?._id === user?.id;

  useEffect(() => {
    const loadVideo = async () => {
      const viewedVideo = sessionStorage.getItem(`viewed-${id}`);

      if (!viewedVideo) {
        await incrementViews(id);

        sessionStorage.setItem(`viewed-${id}`, "true");
      }

      dispatch(fetchVideoById(id));
    };

    loadVideo();
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
    if (!user) {
      navigate("/login");
      return;
    }

    await likeVideo(id, userId);

    dispatch(fetchVideoById(id));
  };

  const handleDislike = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    await dislikeVideo(id, userId);

    dispatch(fetchVideoById(id));
  };

  const handleDeleteVideo = async () => {
    const confirmed = window.confirm("Delete this video?");

    if (!confirmed) return;

    await deleteVideo(id);

    navigate("/");
  };

  console.log(currentVideo);
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

        <Link
          to={`/channel/${currentVideo.channel?._id}`}
          className="mt-3 block text-gray-600 hover:text-blue-500 "
        >
          {currentVideo.channel?.channelName}
        </Link>

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
      cursor-pointer
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
      cursor-pointer
    "
          >
            <FaThumbsDown />

            {currentVideo.dislikes.length}
          </button>

          {isOwner && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => navigate(`/edit-video/${id}`)}
                className="
        bg-yellow-500
        text-white
        px-4
        py-2
        rounded
      "
              >
                Edit Video
              </button>

              <button
                onClick={handleDeleteVideo}
                className="
        bg-red-500
        text-white
        px-4
        py-2
        rounded
      "
              >
                Delete Video
              </button>
            </div>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded-xl mt-4">
          <p>{currentVideo.description}</p>
        </div>
        <CommentSection videoId={currentVideo._id} />

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Related Videos</h2>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {relatedVideos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoPlayer;
