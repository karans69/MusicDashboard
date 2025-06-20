import React from "react";
import { FaDownload } from "react-icons/fa";

const TrackList = () => {
  const uploads = [
    {
      id: 1,
      UserNamr: "Name",
      title: "My First Track",
      artist: "Shreshth",
      date: "2025-06-06",
      status: "Pending",
      imageUrl: "https://via.placeholder.com/60",
      audioUrl: "#",
      zipUrl: "#",
    },
    {
      id: 2,
      UserNamr: "Name",
      title: "Energy Beats",
      artist: "Suraj",
      date: "2025-06-05",
      status: "Approved",
      imageUrl: "https://via.placeholder.com/60",
      audioUrl: "#",
      zipUrl: "#",
    },
  ];

  const handleStatusChange = (id, newStatus) => {
    console.log(`Track ID ${id} status changed to ${newStatus}`);
    // Implement backend update call here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Track List</h1>

        <table className="w-full table-auto border border-gray-200">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Artwork</th>
              <th className="p-3">Title</th>
              <th className="p-3">Artist</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Download</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((upload) => (
              <tr key={upload.id} className="border-t border-gray-200">
                <td className="p-3">
                  <img src={upload.imageUrl} alt="UserImg" className="w-8 h-8 rounded-full" />
                  <h6>User Name</h6>
                </td>
                <td className="p-3">
                  <img src={upload.imageUrl} alt="Artwork" className="w-12 h-12 rounded" />
                </td>
                <td className="p-3 font-medium text-gray-800">{upload.title}</td>
                <td className="p-3">{upload.artist}</td>
                <td className="p-3">{upload.date}</td>
                <td className="p-3">
                  <select
                    value={upload.status}
                    onChange={(e) => handleStatusChange(upload.id, e.target.value)}
                    className="border border-gray-300 px-3 py-1 rounded-md"
                  >
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </td>
                <td className="p-3">
                  <a
                    href={upload.zipUrl}
                    download
                    className="text-blue-600 hover:underline flex items-center gap-2"
                  >
                    <FaDownload />
                    ZIP File
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Placeholder for Login */}
        
      </div>
    </div>
  );
};

export default TrackList;
