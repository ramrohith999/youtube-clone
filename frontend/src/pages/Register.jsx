import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        username,
        email,
        password,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border p-6 rounded-lg shadow"
      >
        <h1 className="text-3xl font-bold mb-6">Register</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button className="w-full bg-blue-500 text-white py-3 rounded">
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
