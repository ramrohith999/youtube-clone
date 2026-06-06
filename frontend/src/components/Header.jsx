import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/auth/authSlice";

const Header = ({ toggleSidebar, searchTerm, setSearchTerm }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  return (
<header
  className="
    sticky
    top-0
    z-50
    h-16
    px-4
    border-b
    flex
    items-center
    justify-between
    bg-white
  "
>      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-xl cursor-pointer">
          <FaBars />
        </button>

        <Link to="/" className="text-2xl font-bold text-red-600 tracking-tight">
          YouTube
        </Link>
      </div>

      <div className="flex-1 max-w-xl mx-8">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
                    w-full
                    border
                   border-gray-200
                      rounded-full
                      px-5
                      py-2.5
                    shadow-sm
                    focus:outline-none
                      focus:ring-2
                    focus:ring-gray-400
                      focus:border-transparent
                      transition
                          "
        />
      </div>

      {user ? (
        <div className="flex items-center gap-3">
          <span className="font-medium hover:text-indigo-600 cursor-pointer transition duration-200 ">
            {user.username}
          </span>

          <button
            onClick={() => dispatch(logout())}
            className="
            
        px-4
        py-2
        rounded-2xl
        shadow-md
        bg-gray-300
        cursor-pointer
        hover:translate-x-0.5
        hover:bg-red-300
        transition-all
        duration-200

      "
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="
          px-4
          py-2
          rounded-2xl
          bg-gray-300
          cursor-pointer
          hover:translate-x-0.5
         hover:bg-green-300
          transition-all
          duration-200

          "
        >
          Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;
