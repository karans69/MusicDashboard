import React, { useState } from "react";

const AdminSupportPanel = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [subject, setSubject] = useState("");
  const [queries, setQueries] = useState([
    {
      id: 1,
      user: "Ravi",
      subject: "Issue with release date",
      status: "Pending",
      date: "2025-06-06 10:30 AM",
    },
    {
      id: 2,
      user: "Priya",
      subject: "Audio upload failed",
      status: "Open",
      date: "2025-06-05 2:00 PM",
    },
  ]);

  const handleCreateQuery = () => {
    if (selectedUser && subject) {
      const newQuery = {
        id: queries.length + 1,
        user: selectedUser,
        subject,
        status: "Pending",
        date: new Date().toLocaleString(),
      };
      setQueries([newQuery, ...queries]);
      setSubject("");
      setSelectedUser("");
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setQueries((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: newStatus } : q
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Admin Support Panel
        </h1>

        {/* Create New Query */}
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Create New Query</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-1/3"
            >
              <option value="">Select User</option>
              <option value="Ravi">Ravi</option>
              <option value="Priya">Priya</option>
              <option value="Karan">Karan</option>
            </select>

            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />

            <button
              onClick={handleCreateQuery}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Create
            </button>
          </div>
        </div>

        {/* Query List */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left border-b">User</th>
                <th className="p-3 text-left border-b">Subject</th>
                <th className="p-3 text-left border-b">Status</th>
                <th className="p-3 text-left border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query) => (
                <tr
                  key={query.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 border-b">{query.user}</td>
                  <td className="p-3 border-b">{query.subject}</td>
                  <td className="p-3 border-b">
                    <select
                      value={query.status}
                      onChange={(e) =>
                        handleStatusChange(query.id, e.target.value)
                      }
                      className="border border-gray-300 px-2 py-1 rounded-md text-xs"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="p-3 border-b text-gray-500">{query.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSupportPanel;
