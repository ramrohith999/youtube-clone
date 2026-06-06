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
        px-4
      "
    >
      <div className="text-center">

        

        <h1
          className="
            text-8xl
            font-extrabold
            text-gray-800
          "
        >
          404
        </h1>

        <h2
          className="
            text-3xl
            font-bold
            mt-4
          "
        >
          Page Not Found
        </h2>

        <p
          className="
            text-gray-500
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
            transition
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