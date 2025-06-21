import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const Home = () => {

  const URL = "https://musicdashboard.onrender.com";

  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [showArtistForm, setShowArtistForm] = useState(false);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const tr = [{status : "pending"}]

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");

    async function fetchData() {
      const res = await axios.get(`${URL}/api/tracks/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTracks(res.data);

      const artistsRes = await axios.get(`${URL}/api/userArtists`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArtists(artistsRes.data);

      const { name } = JSON.parse(atob(token.split(".")[1]));
      setUserName(name || "User");
    }
    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleArtistSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("image", imageFile);

    await axios.post(`${URL}/api/userArtists`, data, {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
    });
    setShowArtistForm(false);
    setName("");
    setImageFile(null);

    const refreshed = await axios.get(`${URL}/api/userArtists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setArtists(refreshed.data);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="Home" />
      <main className="flex-1 p-6 space-y-6">
        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome Back 👋
            </h2>
          </div>
          
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          {showArtistForm ? (
            <form onSubmit={handleArtistSubmit} className="max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-4">Add New Artist</h3>
              <input
                type="text"
                placeholder="Artist Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={e => setImageFile(e.target.files[0])}
                required
                className="w-full mb-4"
              />
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                Submit
              </button>
            </form>
          ) : (
            <>
              <h3 className="font-semibold mb-4">Welcome New Artists</h3>
              <div className="flex gap-6 overflow-x-auto">
                <div
                  className="flex flex-col items-center justify-center w-20 h-20 bg-blue-100 rounded cursor-pointer"
                  onClick={() => setShowArtistForm(true)}
                >
                  <span className="text-3xl">+</span>
                </div>
                {artists.map(a => (
                  <div key={a._id} className="flex flex-col items-center w-20">
                    <img src={`${URL}/${a.imagePath}`} className="w-20 h-20 rounded-xl" />
                    <small>{a.name}</small>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="font-semibold mb-4">Your Tracks</h3>
          <ul>
            {tracks.map(tr => (
              <li key={tr._id} className="flex items-center mb-4 bg-gray-200 rounded-xl p-2">
                <img src={`${URL}/${tr.artworkPath}`} className="w-20 h-20 rounded mr-4" />
                <div>
                  <div className="font-semibold">{tr.title}</div>
                  <div className="text-xs">UPC: {tr.upc || "N/A"}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    {/* Aside Notices */}
      <aside className="w-64 bg-white shadow-2xl rounded-2xl p-6 z-20 hidden lg:block">
        <div className="mb-6">
          <div className="flex justify-end p-5">
            <FaUser className="text-3xl text-gray-700 m-1" />
            <div className="border-solid border-1 flex px-2 bg-black rounded-2xl ">
            <button onClick={handleLogout} className="text-white active:scale-90 ">LogOut</button>
            </div>
          </div>
          <hr />
          <h1 className="text-xl text-black mt-4">Notices</h1>
          <p className="mt-2 text-gray-600 text-sm">
            No new notices at the moment.
          </p>
        </div>
      </aside>

    </div>
  );
};

export default Home;
