import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

    
const handleSubmit = async (e) => {
  e.preventDefault();

  if (username.trim().length < 3) {
    alert("Username must be at least 3 characters");
    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    await registerUser({
      username,
      email,
      password,
    });

    alert("Registration Successful");

    navigate("/login");
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );
  }
};
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-linear-to-br
        from-gray-50
        to-gray-100
        px-4
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-xl
          p-8
        "
      >
        <div className="text-center mb-8">

          <h1
            className="
              text-4xl
              font-bold
              text-gray-800
            "
          >
            Create Account
          </h1>

          <p className="text-gray-600 mt-2">
            Join and start uploading videos
          </p>

        </div>

        <div className="space-y-4">

          <input
            required
            minLength={3}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="
              w-full
              border
              border-gray-200
              rounded-2xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-gray-400
            "
          />

          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              border
              border-gray-200
              rounded-2xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-gray-400
            "
          />

          <input
            type="password"
            placeholder="Password"
            required
            minLength={6}
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              border
              border-gray-200
              rounded-2xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-gray-400
            "
          />

        </div>

        <button
          className="
            w-full
            mt-6
            bg-blue-500
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-blue-600
            transition
            cursor-pointer
          "
        >
          Create Account
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              text-blue-600
              font-medium
              hover:underline
            "
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;