import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { loginUser } from "../services/authService";

import {
  loginSuccess,
} from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data =
        await loginUser({
          email,
          password,
        });

      dispatch(
        loginSuccess(data)
      );

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border p-6 rounded-lg shadow"
      >
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button
          className="w-full bg-blue-500 text-white py-3 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500"
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Login;