const PageLoader = () => {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
      "
    >
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
  );
};

export default PageLoader;