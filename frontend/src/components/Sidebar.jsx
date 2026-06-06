import { Link } from "react-router-dom";
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

  const { user } = useSelector((state) => state.auth);

  return (
    <aside
      className={`
        bg-white
        border-r
        w-60
        min-h-[calc(100vh-64px)]
        p-4
        transition-all
        duration-300
        ${isOpen ? "block" : "hidden :block"}
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
        className="block hover:bg-gray-100 p-2 rounded"
      >
        {item}
      </Link>
    </li>
  ))}

  {user && (
    <>
      <hr className="my-4" />

      <li>
        <Link
          to="/upload-video"
          className="block hover:bg-gray-100 p-2 rounded"
        >
          Upload Video
        </Link>
      </li>

      <li>
        <Link
          to="/create-channel"
          className="block hover:bg-gray-100 p-2 rounded"
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
