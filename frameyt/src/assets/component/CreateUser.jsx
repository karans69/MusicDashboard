import React, { useState } from "react";
import axios from "axios";
import cover1 from '../../assets/imgs/cover1.png';

const CreateUser = () => {

  const URL = "http://localhost:3000";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${URL}/users`, {
        email,
        name,
        password,
      });

      if (res.data.message) {
        setMessage(res.data.message);
      } else {
        setMessage("User created successfully!");
        setEmail("");
        setName("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div
        className="w-1/2 h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${cover1})` }}
      >
        <div className="absolute top-3 right-3 text-6xl text-white font-bold select-none">P</div>
        <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center px-10">
          <h2 className="text-white text-3xl font-serif text-center leading-snug">
            Start &amp; Continue your music journey with us...
          </h2>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center relative">
        <div className="absolute top-3 left-3 text-6xl font-bold text-black select-none">R.</div>

        <div className="border border-black shadow-xl p-8 rounded-md w-full max-w-sm bg-white">
          <h3 className="text-2xl font-bold text-center mb-2 text-black">Create User</h3>
          <p className="text-sm text-center mb-6 text-black">
            Enter the Email, Label Name, and Password below
          </p>

          {message && (
            <p className="text-center text-sm mb-4 text-red-600">{message}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-bold text-black">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-bold text-black">
                Label Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Label name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 font-bold text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block mb-1 font-bold text-black">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition font-semibold active:scale-95"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
