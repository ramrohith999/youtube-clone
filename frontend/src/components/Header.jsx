import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/auth/authSlice";

const Header = ({ toggleSidebar, searchTerm, setSearchTerm }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-16 px-4 border-b flex items-center justify-between bg-white">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-xl cursor-pointer">
          <FaBars />
        </button>

        <Link to="/" className="text-xl font-bold text-red-600">
          YouTube
        </Link>
      </div>

      <div className="flex-1 max-w-xl mx-8">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-full px-4 py-2"
        />
      </div>

      {user ? (
        <div className="flex items-center gap-3">
          <span className="font-medium">{user.username}</span>

          <button
            onClick={() => dispatch(logout())}
            className="
        border
        px-4
        py-2
        rounded-full
      "
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="
          border
          px-4
          py-2
          rounded-full
          "
        >
          Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;
