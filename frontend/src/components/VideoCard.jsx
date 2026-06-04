import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link
      to={`/video/${video._id}`}
      className="block"
    >
      <div>

        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full rounded-xl"
        />

        <div className="mt-2">

          <h3 className="font-semibold">
            {video.title}
          </h3>

          <p className="text-gray-600 text-sm">
            {video.channelName}
          </p>

          <p className="text-gray-500 text-sm">
            {video.views} views
          </p>

        </div>

      </div>
    </Link>
  );
};

export default VideoCard;