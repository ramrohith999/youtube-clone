import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <div
      className="
        bg-white
        dark:bg-gray-900
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
        border
        border-transparent
        dark:border-gray-700
      "
    >
      {/* Thumbnail */}
      <Link to={`/video/${video._id}`}>
        <div className="overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="
              w-full
              h-48
              object-cover
              hover:scale-105
              transition-transform
              duration-300
            "
          />
        </div>
      </Link>

      <div className="p-4">
        {/* Category */}
        {video.category && (
          <span
            className="
              inline-block
              mb-2
              px-2
              py-1
              text-xs
              font-medium
              rounded-full
              bg-blue-100
              text-blue-700
              dark:bg-blue-900
              dark:text-blue-300
            "
          >
            {video.category}
          </span>
        )}

        {/* Title */}
        <Link to={`/video/${video._id}`}>
          <h3
            className="
              font-semibold
              text-lg
              line-clamp-2
              min-h-14
              hover:text-red-600
              transition-colors
              duration-200
            "
          >
            {video.title}
          </h3>
        </Link>

        {/* Channel */}
        <Link
          to={`/channel/${video.channel?._id}`}
          className="
            block
            mt-2
            text-sm
            text-gray-700
            dark:text-gray-300
            hover:text-blue-600
            transition-colors
            duration-200
          "
        >
          {video.channel?.channelName}
        </Link>

        {/* Stats */}
        <div
          className="
            mt-2
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          <p>
            {video.views?.toLocaleString()} views
          </p>

          {video.createdAt && (
            <p>
              {new Date(
                video.createdAt
              ).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;