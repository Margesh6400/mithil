import React from "react";
import { NavLink } from "react-router-dom";
import { Heart, FileText, LogOut, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between max-w-6xl px-4 py-3 mx-auto">
        <div className="text-xl font-bold text-red-600">
          ❤️ Heart Tracker
        </div>

        <div className="items-center hidden space-x-6 text-sm font-medium md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 border-b-2 border-red-500 pb-1"
                : "text-gray-600 hover:text-red-500"
            }
          >
            <Heart className="inline-block w-4 h-4 mr-1" />
            Dashboard
          </NavLink>

          <NavLink
            to="/log/meals"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 border-b-2 border-red-500 pb-1"
                : "text-gray-600 hover:text-red-500"
            }
          >
            🍽️ Log Meals
          </NavLink>

          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 border-b-2 border-red-500 pb-1"
                : "text-gray-600 hover:text-red-500"
            }
          >
            <FileText className="inline-block w-4 h-4 mr-1" />
            Report
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 border-b-2 border-red-500 pb-1"
                : "text-gray-600 hover:text-red-500"
            }
          >
            <User className="inline-block w-4 h-4 mr-1" />
            Profile
          </NavLink>

          <button className="ml-4 text-gray-600 hover:text-red-600">
            <LogOut className="inline-block w-4 h-4 mr-1" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
