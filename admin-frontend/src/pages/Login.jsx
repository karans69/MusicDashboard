import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const URL = "https://musicdashboard.onrender.com";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // 🌀 loading flag

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // 🌀 start loading
    setMessage("");
    try {
      const res = await axios.post(`${URL}/admin/login`, {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      onLogin?.();
      setMessage("Login successful!");
      // Redirect to dashboard or main app
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); // ✅ stop loading no matter what
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

        {message && <p className="text-orange-500 text-sm mb-2">{message}</p>}

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className={`w-full bg-black text-white py-2 rounded hover:bg-gray-800 flex justify-center items-center`}
          disabled={loading} // ⛔ prevent multiple clicks
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
