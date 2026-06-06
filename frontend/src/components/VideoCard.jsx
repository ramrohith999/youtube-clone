import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`} className="block">
      <div>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full rounded-xl"
        />

        <div className="mt-2">
          <h3 className="font-semibold">{video.title}</h3>

          <Link
            to={`/channel/${video.channel?._id}`}
            className=" text-gray-600 text-sm hover:text-blue-500"
          >
            {video.channel?.channelName}
          </Link>

          <p className="text-gray-500 text-sm">{video.views} views</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
