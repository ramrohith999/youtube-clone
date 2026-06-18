import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-linear-to-br
        from-gray-50
        to-gray-100
        dark:from-gray-950
        dark:to-gray-900
        px-4
      "
    >
      <div className="text-center">
        <div className="text-7xl mb-4">
          🎥
        </div>

        <h1
          className="
            text-8xl
            font-extrabold
            text-gray-800
            dark:text-white
          "
        >
          404
        </h1>

        <h2
          className="
            text-3xl
            font-bold
            mt-4
            dark:text-white
          "
        >
          Page Not Found
        </h2>

        <p
          className="
            text-gray-500
            dark:text-gray-400
            mt-3
            max-w-md
            mx-auto
          "
        >
          The page you're looking for
          doesn't exist or may have
          been moved.
        </p>

        <Link
          to="/"
          className="
            inline-block
            mt-8
            bg-blue-500
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            hover:bg-blue-600
            hover:scale-105
            transition-all
            duration-200
            shadow-md
          "
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;