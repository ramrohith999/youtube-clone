import { Link } from "react-router-dom";

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
              to="/"
              className="block hover:bg-gray-100 p-2 rounded"
            >
              {item}
            </Link>

          </li>
        ))}

      </ul>
    </aside>
  );
};

export default Sidebar;