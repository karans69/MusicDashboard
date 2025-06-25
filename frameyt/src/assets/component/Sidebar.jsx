import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.jpg";

import {
  FaHome,
  FaMusic,
  FaUser,
  FaCompactDisc,
  FaChartBar,
  FaWallet,
  FaShieldAlt,
  FaHeadset,
  FaCog,
} from "react-icons/fa";

const navItems = [
  { label: "Home", icon: <FaHome />, path: "/" },
  { label: "Releases", icon: <FaCompactDisc />, path: "#" },
  { label: "Artists", icon: <FaUser />, path: "#" },
  { label: "Labels", icon: <FaMusic />, path: "#" },
  { label: "Analytics", icon: <FaChartBar />, path: "#" },
  { label: "Wallet", icon: <FaWallet />, path: "#" },
  { label: "Rights Manager", icon: <FaShieldAlt />, path: "#" },
  { label: "Support", icon: <FaHeadset />, path: "/support" },
  { label: "Account", icon: <FaCog />, path: "#" },
];

const Sidebar = ({ active }) => {
  return (
    <aside className="w-64 bg-white shadow-2xl rounded-2xl p-6 z-20 fixed h-screen">
      <div className="mb-6">
        <img src={logo} className="h-30 w-30 mx-auto"></img>
        <p className="text-xs text-gray-400 mt-1">Sell your music worldwide.</p>
      </div>
      <Link to="/trackUp">
        <button className="w-full bg-black text-white py-2 rounded-xl text-sm font-medium mb-6 hover:bg-gray-800 transition">
          + Create
        </button>
      </Link>
      <nav className="flex flex-col gap-2" aria-label="Main navigation">
        {navItems.map(({ label, icon, path }) => {
          const isActive = label === active;
          return (
            <Link
              to={path}
              key={label}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                isActive
                  ? "bg-gray-100 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
export default Sidebar;
