import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

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

  const { user } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();

  const activeCategory = searchParams.get("category");

  return (
    <aside
      className={`
        bg-white
        shadow-sm
        w-60
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
              to={item === "Home" ? "/" : `/?category=${item}`}
              className={`block p-2 rounded transition
                    ${
                      (item === "Home" && !activeCategory) ||
                      activeCategory === item
                        ? "bg-gray-200 text-gray-800 font-semibold"
                        : "hover:bg-gray-100"
                    }
                `}
            >
              {item}
            </Link>
          </li>
        ))}

        {user && (
          <>
            <hr className="my-4 border border-gray-300" />

            <li>
              <Link
                to="/upload-video"
                className="block shadow-md bg-blue-200 rounded-xl hover:bg-blue-300 p-2 hover:translate-0.5 transition duration-300 "
              >
                Upload Video
              </Link>
            </li>

            <li>
              <Link
                to="/create-channel"
                className="block shadow-md bg-blue-200 rounded-xl  hover:bg-blue-300 p-2 hover:translate-0.5 transition duration-300"
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
