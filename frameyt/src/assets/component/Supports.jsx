
import React from "react";
import Sidebar from "./Sidebar";

const Support = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed top-5 left-5">
        <Sidebar active="Support" />
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Support <span className="text-gray-500">11</span>
            </h2>
            <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition">
              + Create
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Type & Enter to Search"
              aria-label="Search support queries"
            />
          </div>

          <div className="flex space-x-3 mb-6">
            {["All", "Pending", "Open", "Closed"].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-1 rounded ${
                  filter === "All"
                    ? "bg-gray-200 text-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left border-b">Subject</th>
                  <th className="p-3 text-left border-b">Status</th>
                  <th className="p-3 text-left border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  
                ].map(([subject, status, date], index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="p-3 border-b">{subject}</td>
                    <td className="p-3 border-b">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          status === "Open"
                            ? "bg-yellow-300 text-yellow-900"
                            : status === "Pending"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-gray-300 text-gray-800"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="p-3 border-b">{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <nav aria-label="Pagination">
              <ul className="inline-flex items-center space-x-1">
                <li>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded text-gray-500 cursor-not-allowed"
                    disabled
                    aria-disabled="true"
                    aria-label="Previous page"
                  >
                    ‹
                  </button>
                </li>
                <li>
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                    aria-current="page"
                  >
                    1
                  </button>
                </li>
                <li>
                  <button
                    className="px-3 py-1 bg-white border rounded text-gray-700 hover:bg-gray-100"
                    aria-label="Go to page 2"
                  >
                    2
                  </button>
                </li>
                <li>
                  <button
                    className="px-3 py-1 bg-white border rounded text-gray-700 hover:bg-gray-100"
                    aria-label="Next page"
                  >
                    ›
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
