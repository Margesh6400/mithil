// pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-4 text-3xl font-bold text-sky-600">💖 Welcome to DilCare</h1>
      <p className="mb-6 text-gray-700">Your daily heart-health assistant — track habits, reduce risk, and take care of your dil (heart) everyday.</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link to="/checkin" className="block p-4 bg-pink-100 shadow rounded-xl hover:bg-pink-200">
          <h2 className="text-xl font-semibold">📝 Daily Check-In</h2>
          <p className="text-sm text-gray-600">Log today’s food, mood, water & more</p>
        </Link>

        <Link to="/daily-report" className="block p-4 bg-blue-100 shadow rounded-xl hover:bg-blue-200">
          <h2 className="text-xl font-semibold">📊 Today’s Report</h2>
          <p className="text-sm text-gray-600">See your heart-health score for the day</p>
        </Link>

        <Link to="/main-report" className="block p-4 bg-yellow-100 shadow rounded-xl hover:bg-yellow-200">
          <h2 className="text-xl font-semibold">📈 Overall Report</h2>
          <p className="text-sm text-gray-600">Track your risk, habits & improvements</p>
        </Link>

        <Link to="/profile" className="block p-4 bg-green-100 shadow rounded-xl hover:bg-green-200">
          <h2 className="text-xl font-semibold">👤 Profile</h2>
          <p className="text-sm text-gray-600">Manage your info & one-time questions</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;