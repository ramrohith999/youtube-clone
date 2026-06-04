import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="h-16 px-4 border-b flex items-center justify-between bg-white">

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="text-xl cursor-pointer"
        >
          <FaBars />
        </button>

        <Link
          to="/"
          className="text-xl font-bold text-red-600"
        >
          YouTube
        </Link>

      </div>

      <div className="flex-1 max-w-xl mx-8">

        <input
          type="text"
          placeholder="Search"
          className="w-full border rounded-full px-4 py-2"
        />

      </div>

      <Link
        to="/login"
        className="border px-4 py-2 rounded-full"
      >
        Sign In
      </Link>

    </header>
  );
};

export default Header;