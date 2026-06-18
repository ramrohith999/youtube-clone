import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    "Home",
    "React",
    "JavaScript",
    "NodeJS",
    "MongoDB",
    "Gaming",
    "Music",
    "Sports",
  ];

  const { user } = useSelector(
    (state) => state.auth
  );

  const [searchParams] =
    useSearchParams();

  const activeCategory =
    searchParams.get("category");

  return (
    <aside
      className={`
        bg-white
        dark:bg-gray-900
        shadow-sm
        border-r
        border-gray-200
        dark:border-gray-700
        w-56
        md:w-60
        min-h-[calc(100vh-64px)]
        p-4
        transition-all
        duration-300
        ${isOpen ? "block" : "hidden"}
      `}
    >
      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li key={item}>
            <Link
              to={
                item === "Home"
                  ? "/"
                  : `/?category=${item}`
              }
              className={`
                block
                p-3
                rounded-xl
                transition-all
                duration-200
                ${
                  (item === "Home" &&
                    !activeCategory) ||
                  activeCategory === item
                    ? `
                      bg-blue-100
                      text-blue-700
                      dark:bg-blue-900
                      dark:text-blue-300
                      font-semibold
                    `
                    : `
                      hover:bg-gray-100
                      dark:hover:bg-gray-800
                    `
                }
              `}
            >
              {item}
            </Link>
          </li>
        ))}

        {user && (
          <>
            <hr
              className="
                my-4
                border-gray-300
                dark:border-gray-700
              "
            />

            <li>
              <Link
                to="/upload-video"
                className="
                  block
                  p-3
                  rounded-xl
                  bg-blue-500
                  text-white
                  shadow-md
                  hover:bg-blue-600
                  transition-all
                  duration-200
                "
              >
                Upload Video
              </Link>
            </li>

            <li>
              <Link
                to="/create-channel"
                className="
                  block
                  p-3
                  rounded-xl
                  bg-indigo-500
                  text-white
                  shadow-md
                  hover:bg-indigo-600
                  transition-all
                  duration-200
                "
              >
                Create Channel
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;