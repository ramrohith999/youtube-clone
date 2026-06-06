import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { loginUser } from "../services/authService";
import { loginSuccess } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    
  if (!email.trim()) {
    alert("Email is required");
    return;
  }

  if (!password.trim()) {
    alert("Password is required");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email");
    return;
  }

    try {
      const data = await loginUser({
        email,
        password,
      });

      dispatch(loginSuccess(data));

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
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
            Welcome Back
          </h1>

          <p className="text-gray-600 mt-2">Login to continue</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
          Login
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              text-blue-600
              font-medium
              hover:underline
            "
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
