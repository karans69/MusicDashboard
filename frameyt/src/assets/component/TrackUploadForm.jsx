import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const TrackUploadPage = () => {

  const URL = "http://localhost:3000";
  
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    lline: "",
    cline: "",
    upc: "",
    artist: "",
    producer: "",
    engineer: "",
    musicians: "",
    others: "",
    recording: "",
    releaseDate: "",
  });

  const [artwork, setArtwork] = useState(null);
  const [audio, setAudio] = useState(null);
  const [message, setMessage] = useState("");
  const artworkRef = useRef();
  const audioRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileUpload = (setter, refSetter) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setter(file);
    }
  };

  const validateFields = () => {
    const requiredFields = ["title", "genre", "lline", "cline", "releaseDate"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setMessage(`❌ Please fill out: ${field}`);
        return false;
      }
    }
    if (!artwork || !audio) {
      setMessage("❌ Please upload both artwork and audio file");
      return false;
    }
    return true;
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  if (!validateFields()) return;

  const token = localStorage.getItem("token");
  if (!token) {
    setMessage("User not logged in");
    return;
  }

  const trackForm = new FormData();
  trackForm.append("title", formData.title);
  trackForm.append("genre", formData.genre);
  trackForm.append("lline", formData.lline);
  trackForm.append("cline", formData.cline);
  trackForm.append("upc", formData.upc);
  trackForm.append("artist", formData.artist);
  trackForm.append("producers", formData.producer); // ✅ fixed name
  trackForm.append("engineers", formData.engineer); // ✅ fixed name
  trackForm.append("musicians", formData.musicians);
  trackForm.append("otherContributors", formData.others); // ✅ fixed name
  trackForm.append("recordingDetails", formData.recording); // ✅ fixed name
  trackForm.append("releaseDate", formData.releaseDate);
  trackForm.append("artwork", artwork);
  trackForm.append("audio", audio);

  try {
    const res = await axios.post(`${URL}/api/tracks/upload`, trackForm, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    setMessage("✅ Track uploaded successfully!");
    // Clear form after success
    setFormData({
      title: "", genre: "", lline: "", cline: "", upc: "",
      artist: "", producer: "", engineer: "", musicians: "",
      others: "", recording: "", releaseDate: ""
    });
    setArtwork(null);
    setAudio(null);
  } catch (error) {
    console.error(error);
    setMessage("❌ Upload failed");
  }
};


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active="Releases" />

      <main className="flex-1 p-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Upload New Track</h2>
          {message && <p className="text-red-600 text-sm">{message}</p>}

          {/* Artwork Upload */}
          <div
            onClick={() => artworkRef.current.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400"
          >
            <input type="file" accept="image/*" ref={artworkRef} onChange={handleFileUpload(setArtwork)} className="hidden" />
            <p className="text-gray-500">{artwork ? artwork.name : "Click to upload artwork image"}</p>
          </div>

          {/* Basic Info */}
          <input id="title" placeholder="Track Title *" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" required />
          <select id="genre" value={formData.genre} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Select Genre *</option>
            <option>Pop</option>
            <option>Rock</option>
            <option>Hip-hop</option>
            <option>Jazz</option>
          </select>
          <input id="lline" placeholder="Ⓛline *" value={formData.lline} onChange={handleChange} className="w-full border p-2 rounded" />
          <input id="cline" placeholder="©line *" value={formData.cline} onChange={handleChange} className="w-full border p-2 rounded" />
          <input id="upc" placeholder="UPC (optional)" value={formData.upc} onChange={handleChange} className="w-full border p-2 rounded" />

          {/* Audio Upload */}
          <div
            onClick={() => audioRef.current.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400"
          >
            <input type="file" accept="audio/*" ref={audioRef} onChange={handleFileUpload(setAudio)} className="hidden" />
            <p className="text-gray-500">{audio ? audio.name : "Click to upload audio file"}</p>
          </div>

          {/* Contributors */}
          <input id="artist" placeholder="Artist" value={formData.artist} onChange={handleChange} className="w-full border p-2 rounded" />
          <input id="producer" placeholder="Producer(s)" value={formData.producer} onChange={handleChange} className="w-full border p-2 rounded" />
          <input id="engineer" placeholder="Engineer(s)" value={formData.engineer} onChange={handleChange} className="w-full border p-2 rounded" />
          <input id="musicians" placeholder="Musicians/Performers" value={formData.musicians} onChange={handleChange} className="w-full border p-2 rounded" />
          <input id="others" placeholder="Other Contributors" value={formData.others} onChange={handleChange} className="w-full border p-2 rounded" />
          <textarea id="recording" placeholder="Recording Details" value={formData.recording} onChange={handleChange} className="w-full border p-2 rounded" rows={3} />

          {/* Release Date */}
          <input type="date" id="releaseDate" value={formData.releaseDate} onChange={handleChange} className="w-full border p-2 rounded" required />

          <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
            Finish Upload
          </button>
        </form>
      </main>

      <aside className="w-64 bg-white shadow-2xl rounded-2xl p-6 z-20 hidden lg:block">
        <div className="flex justify-end mb-4">
          <FaUser className="text-2xl" />
        </div>
        <hr className="mb-4" />
        <h1 className="text-xl font-semibold mb-4">Notices</h1>
        <div className="bg-gray-100 p-3 rounded-lg">
          <strong className="block">🎧 Reminder</strong>
          <p className="text-xs text-gray-600">Upload high-quality audio and proper artwork.</p>
        </div>
      </aside>
    </div>
  );
};

export default TrackUploadPage;
