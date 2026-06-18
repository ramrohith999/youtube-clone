const VideoCardSkeleton = () => {
  return (
    <div
      className="
        animate-pulse
        bg-white
        dark:bg-gray-900
        rounded-2xl
        overflow-hidden
        shadow-sm
        border
        dark:border-gray-700
      "
    >
      <div
        className="
          h-48
          bg-gray-300
          dark:bg-gray-700
        "
      />

      <div className="p-4">
        <div
          className="
            h-4
            bg-gray-300
            dark:bg-gray-700
            rounded
            mb-3
          "
        />

        <div
          className="
            h-4
            w-3/4
            bg-gray-300
            dark:bg-gray-700
            rounded
            mb-3
          "
        />

        <div
          className="
            h-3
            w-1/2
            bg-gray-300
            dark:bg-gray-700
            rounded
          "
        />
      </div>
    </div>
  );
};

export default VideoCardSkeleton;