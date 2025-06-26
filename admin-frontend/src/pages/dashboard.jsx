
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMusic, FaUsers, FaCalendarAlt } from "react-icons/fa";

const AdminDashboard = () => {

    const navigate = useNavigate(); 

    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage uploads, users, and track releases</p>
        </div>
        <div className="p-5 bg-black text-white rounded-lg m-5 flex justify-between items-center w-25 fixed right-0 top-0 z-50 ">
        <button onClick={handleLogout} className="text-blacl active:scale-90 ">LogOut</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <FaMusic className="text-3xl text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Total Tracks</h2>
              <p className="text-gray-500 text-sm">128 Uploaded</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <FaUsers className="text-3xl text-green-600" />
            <div>
              <h2 className="text-lg font-semibold">Users</h2>
              <p className="text-gray-500 text-sm">32 Active Users</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <FaCalendarAlt className="text-3xl text-purple-600" />
            <div>
              <h2 className="text-lg font-semibold">Releases</h2>
              <p className="text-gray-500 text-sm">10 Scheduled</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="bg-black text-white px-4 py-2 rounded-lg">Upload Basic Info</a>
            <a href="/TrackList" className="bg-black text-white px-4 py-2 rounded-lg">Tracks</a>
            <a href="#" className="bg-black text-white px-4 py-2 rounded-lg">Set Release Date</a>
            <a href="/AdminSupport" className="bg-black text-white px-4 py-2 rounded-lg">Support Queries</a>
            <a href="/Createuser" className="bg-black text-white px-4 py-2 rounded-lg">Create new User</a>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>📥 New track uploaded by <strong>Aryan</strong> – 2 hrs ago</li>
            <li>🎵 Track “Night Vibes” moved to Release Date – 1 day ago</li>
            <li>✅ Support query #113 closed – 3 days ago</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
