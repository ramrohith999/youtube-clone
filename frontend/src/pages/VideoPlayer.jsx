import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import toast from "react-hot-toast";

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

  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const userId = user?.id;

  const {
    currentVideo,
    videos,
    loading,
  } = useSelector(
    (state) => state.videos
  );

  const relatedVideos =
    currentVideo && videos
      ? videos.filter(
          (video) =>
            video._id !==
              currentVideo._id &&
            video.category ===
              currentVideo.category
        )
      : [];

  const isOwner =
    currentVideo?.uploader?._id ===
    user?.id;

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const viewedVideo =
          sessionStorage.getItem(
            `viewed-${id}`
          );

        if (!viewedVideo) {
          await incrementViews(id);

          sessionStorage.setItem(
            `viewed-${id}`,
            "true"
          );
        }

        dispatch(fetchVideoById(id));
      } catch (error) {
        console.error(error);
      }
    };

    loadVideo();
  }, [dispatch, id]);

  if (loading) {
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
              border-red-500
            "
          />
        </div>
      </MainLayout>
    );
  }

  if (!currentVideo) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2
            className="
              text-3xl
              font-bold
              dark:text-white
            "
          >
            Video Not Found
          </h2>

          <p
            className="
              text-gray-500
              dark:text-gray-400
              mt-2
            "
          >
            This video may have been deleted.
          </p>
        </div>
      </MainLayout>
    );
  }

  const handleLike = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await likeVideo(id, userId);

      dispatch(fetchVideoById(id));
    } catch (error) {
      toast.error(
        "Failed to like video"
      );
    }
  };

  const handleDislike = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await dislikeVideo(id, userId);

      dispatch(fetchVideoById(id));
    } catch (error) {
      toast.error(
        "Failed to dislike video"
      );
    }
  };

  const handleDeleteVideo =
    async () => {
      const confirmed =
        window.confirm(
          "Delete this video?"
        );

      if (!confirmed) return;

      try {
        await deleteVideo(id);

        toast.success(
          "Video deleted successfully"
        );

        navigate("/");
      } catch (error) {
        toast.error(
          "Failed to delete video"
        );
      }
    };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Video Section */}
        <div className="lg:col-span-2">

          <iframe
            className="
              w-full
              aspect-video
              rounded-xl
              shadow-lg
            "
            src={getYoutubeEmbedUrl(
              currentVideo.videoUrl
            )}
            title={currentVideo.title}
            allowFullScreen
          />

          <h1
            className="
              text-3xl
              font-bold
              mt-4
              dark:text-white
            "
          >
            {currentVideo.title}
          </h1>

          <Link
            to={`/channel/${currentVideo.channel?._id}`}
            className="
              mt-3
              block
              text-gray-600
              dark:text-gray-300
              hover:text-blue-500
            "
          >
            {
              currentVideo.channel
                ?.channelName
            }
          </Link>

          <p
            className="
              text-gray-500
              dark:text-gray-400
              mt-2
            "
          >
            {currentVideo.views} views
          </p>

          <div className="flex gap-4 mt-4 flex-wrap">

            <button
              onClick={handleLike}
              className="
                flex
                items-center
                gap-2
                bg-gray-100
                dark:bg-gray-800
                dark:text-white
                px-4
                py-2
                rounded-full
                cursor-pointer
                hover:shadow-sm
                transition-all
                duration-200
              "
            >
              <FaThumbsUp />
              {
                currentVideo.likes
                  .length
              }
            </button>

            <button
              onClick={
                handleDislike
              }
              className="
                flex
                items-center
                gap-2
                bg-gray-100
                dark:bg-gray-800
                dark:text-white
                px-4
                py-2
                rounded-full
                cursor-pointer
                hover:shadow-sm
                transition-all
                duration-200
              "
            >
              <FaThumbsDown />
              {
                currentVideo.dislikes
                  .length
              }
            </button>

            {isOwner && (
              <>
                <button
                  onClick={() =>
                    navigate(
                      `/edit-video/${id}`
                    )
                  }
                  className="
                    bg-yellow-500
                    text-white
                    hover:bg-yellow-600
                    px-4
                    py-2
                    rounded-xl
                    cursor-pointer
                  "
                >
                  Edit Video
                </button>

                <button
                  onClick={
                    handleDeleteVideo
                  }
                  className="
                    bg-red-500
                    text-white
                    hover:bg-red-600
                    px-4
                    py-2
                    rounded-xl
                    cursor-pointer
                  "
                >
                  Delete Video
                </button>
              </>
            )}
          </div>

          <div
            className="
              bg-gray-100
              dark:bg-gray-900
              dark:text-gray-300
              p-4
              rounded-xl
              mt-4
              border
              border-gray-200
              dark:border-gray-700
            "
          >
            <p>
              {
                currentVideo.description
              }
            </p>
          </div>

          <CommentSection
            videoId={
              currentVideo._id
            }
          />
        </div>

        {/* Related Videos */}
        <div className="lg:col-span-1">

          <h2
            className="
              text-xl
              font-bold
              mb-4
              dark:text-white
            "
          >
            Related Videos
          </h2>

          {relatedVideos.length ===
            0 && (
            <p
              className="
                text-gray-500
                dark:text-gray-400
              "
            >
              No related videos
              found.
            </p>
          )}

          <div className="space-y-4">
            {relatedVideos.map(
              (video) => (
                <VideoCard
                  key={video._id}
                  video={video}
                />
              )
            )}
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default VideoPlayer;