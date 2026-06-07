import { Link } from "react-router-dom";

//video card component
const VideoCard = ({ video }) => {
  return (
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
      {/* thumbnail */}
      <Link to={`/video/${video._id}`}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="
            w-full
            h-48
            object-cover
          "
        />
      </Link>

      <div className="p-3">
        {/* title */}
        <Link to={`/video/${video._id}`}>
          <h3
            className="
              font-semibold
              line-clamp-2
              min-h-12
              hover:text-red-600
              transition
              duration-200
            "
          >
            {video.title}
          </h3>
        </Link>

        {/* channel */}
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

        {/* views */}
        <p className="text-gray-500 text-sm mt-1">
          {video.views?.toLocaleString()} views
        </p>
      </div>
    </div>
  );
};

export default VideoCard;