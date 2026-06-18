import { useState, useEffect } from "react";

import {
  FaBars,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { getChannelByOwner } from "../services/channelService";

import { logout } from "../features/auth/authSlice";

const Header = ({
  toggleSidebar,
  searchTerm,
  setSearchTerm,
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem("theme") ===
        "dark"
    );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  }, [darkMode]);

  const handleMyChannel =
    async () => {
      try {
        const channel =
          await getChannelByOwner(
            user.id
          );

        if (channel) {
          navigate(
            `/channel/${channel._id}`
          );
        } else {
          navigate(
            "/create-channel"
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        h-16
        px-3
        md:px-4
        flex
        items-center
        justify-between
        bg-white
        dark:bg-gray-900
        border-b
        border-gray-300
        dark:border-gray-700
        transition-colors
        duration-300
      "
    >
      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="
            text-xl
            cursor-pointer
          "
        >
          <FaBars />
        </button>

        <Link
          to="/"
          className="
            text-2xl
            font-bold
            text-red-600
            tracking-tight
          "
        >
          YouTube
        </Link>

        

      </div>

      <div className="hidden md:block flex-1 max-w-xl mx-8">

        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="
            w-full
            border
            border-gray-200
            dark:border-gray-700
            dark:bg-gray-800
            dark:text-white
            rounded-full
            px-5
            py-2.5
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-gray-400
            transition
          "
        />

      </div>

      <div className="flex items-center gap-2 md:gap-3">

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="
            p-2
            rounded-full
            hover:bg-gray-200
            dark:hover:bg-gray-700
            transition
            cursor-pointer
          "
        >
          {darkMode ? (
            <FaSun />
          ) : (
            <FaMoon />
          )}
        </button>

        {user ? (
          <>
            <button
              onClick={() =>
                navigate(
                  "/upload-video"
                )
              }
              className="
                px-4
                py-2
                rounded-2xl
                bg-blue-500
                text-white
                shadow-md
                hover:bg-blue-600
                transition-all
                duration-200
                cursor-pointer
              "
            >
              Upload
            </button>

            <button
              onClick={
                handleMyChannel
              }
              className="
                px-4
                py-2
                rounded-2xl
                bg-indigo-500
                text-white
                shadow-md
                hover:bg-indigo-600
                transition-all
                duration-200
                cursor-pointer
              "
            >
              My Channel
            </button>

            <span
              className="
                font-medium
                hover:text-indigo-600
                cursor-pointer
                transition
                duration-200
              "
            >
              {user.username}
            </span>

            <button
              onClick={() =>
                dispatch(logout())
              }
              className="
                px-4
                py-2
                rounded-2xl
                shadow-md
                bg-gray-300
                dark:bg-gray-700
                dark:text-white
                cursor-pointer
                hover:bg-red-300
                dark:hover:bg-red-500
                transition-all
                duration-200
              "
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="
              px-4
              py-2
              rounded-2xl
              bg-gray-300
              dark:bg-gray-700
              dark:text-white
              cursor-pointer
              hover:bg-green-300
              dark:hover:bg-green-500
              transition-all
              duration-200
            "
          >
            Sign In
          </Link>
        )}

      </div>
    </header>
  );
};

export default Header;