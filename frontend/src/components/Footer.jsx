import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="
        mt-12
        border-t
        border-gray-200
        dark:border-gray-700
        bg-white
        dark:bg-gray-900
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-10
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-8
          "
        >
          {/* Brand */}
          <div>
            <h2
              className="
                text-xl
                font-bold
                text-red-600
              "
            >
              YouTube Clone
            </h2>

            <p
              className="
                mt-3
                text-gray-500
                dark:text-gray-400
              "
            >
              A full-stack video sharing platform
              built with React, Redux, Node.js,
              Express, MongoDB and JWT.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="
                font-semibold
                mb-3
                dark:text-white
              "
            >
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="
                  text-gray-500
                  dark:text-gray-400
                  hover:text-blue-500
                "
              >
                Home
              </Link>

              <Link
                to="/upload-video"
                className="
                  text-gray-500
                  dark:text-gray-400
                  hover:text-blue-500
                "
              >
                Upload Video
              </Link>

              <Link
                to="/create-channel"
                className="
                  text-gray-500
                  dark:text-gray-400
                  hover:text-blue-500
                "
              >
                Create Channel
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3
              className="
                font-semibold
                mb-3
                dark:text-white
              "
            >
              Categories
            </h3>

            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "JavaScript",
                "NodeJS",
                "MongoDB",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    px-3
                    py-1
                    text-sm
                    rounded-full
                    bg-gray-100
                    dark:bg-gray-800
                    dark:text-gray-300
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="
            mt-8
            pt-6
            border-t
            border-gray-200
            dark:border-gray-700
            text-center
            text-gray-500
            dark:text-gray-400
          "
        >
          © {new Date().getFullYear()} YouTube
          Clone. Built by Ram Rohith.
        </div>
      </div>
    </footer>
  );
};

export default Footer;