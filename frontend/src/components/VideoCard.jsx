import { Link } from "react-router-dom";

//video card component
const VideoCard = ({ video }) => {
  return (
    //video and its link
    <Link to={`/video/${video._id}`} className="block">
      <div
        className="
          bg-white
          rounded-xl
          overflow-hidden
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
          duration-300
        "
      >
        {/*thumbnail*/}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="
            w-full
            h-48
            object-cover
          "
        />

        <div className="p-3">
          <h3
            className="
              font-semibold
              line-clamp-2
              min-h-12
            "
          >
            {video.title}
          </h3>

          <Link
            to={`/channel/${video.channel?._id}`}
            className="
              text-gray-800
              text-sm
              hover:text-blue-600
              transition
              duration-200
            "
          >
            {video.channel?.channelName}
          </Link>

          <p className="text-gray-500 text-sm mt-1">
            {video.views?.toLocaleString()} views
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;