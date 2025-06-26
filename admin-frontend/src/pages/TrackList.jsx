import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";

const TrackList = () => {
  const API = "https://musicdashboard.onrender.com";
  const token = localStorage.getItem("adminToken");

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error , setError ] = useState("");

  // fetch on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/api/admin/tracks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTracks(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tracks");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* ---- download metadata as .txt ---- */
  const downloadMeta = (track) => {
    const meta =
      `Title: ${track.title}\n` +
      `Artist: ${track.artist}\n` +
      `Album : ${track.albumName || "-"}\n` +
      `Genre : ${track.genre}\n` +
      `UPC   : ${track.upc || "-"}\n` +
      `ISRC  : ${track.isrc || "-"}\n` +
      `Release: ${track.releaseDate}\n` +
      `Status : ${track.status || "Pending"}\n`;
    const blob = new Blob([meta], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = `${track.title.replace(/\s+/g, "_")}_meta.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---- change status ---- */
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${API}/api/admin/tracks/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTracks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  if (loading) return <p className="p-6">Loading…</p>;
  if (error)   return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Uploaded Tracks</h1>

        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Artwork</th>
              <th className="p-3">Title</th>
              <th className="p-3">Artist</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Download</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((t) => (
              <tr key={t._id} className="border-t">
                <td className="p-3">
                  <img src={t.artworkPath} alt="art" className="w-12 h-12 rounded" />
                </td>
                <td className="p-3 font-medium">{t.title}</td>
                <td className="p-3">{t.artist}</td>
                <td className="p-3">{new Date(t.releaseDate).toLocaleDateString()}</td>
                <td className="p-3">
                  <select
                    value={t.status || "Pending"}
                    onChange={(e) => handleStatusChange(t._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </td>
                <td className="p-3 space-y-1">
                  <a href={t.audioPath} className="flex items-center gap-1 text-blue-600" download>
                    <FaDownload /> Audio
                  </a>
                  <a href={t.artworkPath} className="flex items-center gap-1 text-blue-600" download>
                    <FaDownload /> Artwork
                  </a>
                  <button
                    onClick={() => downloadMeta(t)}
                    className="flex items-center gap-1 text-blue-600"
                  >
                    <FaDownload /> Meta&nbsp;.txt
                  </button>

                  {/* If you implemented the ZIP route */}
                  {/* <a href={`${API}/api/admin/tracks/${t._id}/zip`} className="flex items-center gap-1 text-blue-600">
                    <FaDownload /> ZIP
                  </a> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackList;
