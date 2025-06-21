import React, { useState } from "react";
import axios from "axios";
import cover1 from '../../assets/imgs/bgm.jpg';
import cover2 from '../../assets/imgs/logo.jpg';

const LoginPage = () => {

  const URL = "https://musicdashboard.onrender.com";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      // Redirect to dashboard or main app
      window.location.href = "/";
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    
    <div className="min-h-screen flex">
      

      <div
        className="w-full h-screen bg-cover bg-center relative flex "
        style={{ backgroundImage: `url(${cover1})` }}
      >
      <div className="flex absolute m-5 w-25 h-25"><img className="rounded-full border-black " src={cover2} alt="" /></div>

      <div className="w-1/2  flex flex-col items-center justify-center relative ">

        <div className=" border border-white/50   p-8 rounded-3xl w-full max-w-sm bg-white/20 backdrop:blur-sm  shadow-lg ">
          <h3 className="text-5xl  text-center mb-2 text-[#002291] font-[Caprasimo]">Login</h3>
          <p className="text-md text-center mb-6 text-black font-semibold">
            Enter your Email and password below
          </p>

          {message && (
            <p className="text-center text-sm mb-4 text-red-600">{message}</p>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-1 font-bold text-black">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-black text-black  focus:outline-none focus:ring-1 focus:ring-black shadow-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-1 font-bold text-black">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-black text-black  focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#002291] text-white py-2 rounded-md hover:bg-gray-800 transition text-2xl font-[Caprasimo] "
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>

      </div>
    </div>
  );
};

export default LoginPage;
