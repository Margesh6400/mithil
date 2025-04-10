import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { Link } from "react-router-dom";

// Dummy risk data (replace with Firebase data later)
const riskData = [
  { date: "Apr 3", risk: 38 },
  { date: "Apr 4", risk: 42 },
  { date: "Apr 5", risk: 51 },
  { date: "Apr 6", risk: 46 },
  { date: "Apr 7", risk: 50 },
  { date: "Apr 8", risk: 44 },
  { date: "Apr 9", risk: 45 },
];

const getDailyTip = (score) => {
  if (score < 30) return "Great job! Keep up the healthy habits.";
  if (score < 60) return "Try to add 15 min of walking or reduce salt intake.";
  return "High risk! Consider reviewing your diet and stress levels.";
};

const getRiskLevel = (score) => {
  if (score < 30) return { text: "Low", color: "text-green-500" };
  if (score < 60) return { text: "Moderate", color: "text-yellow-500" };
  return { text: "High", color: "text-red-500" };
};

const Dashboard = () => {
  const todayRisk = riskData[riskData.length - 1].risk;
  const dailyTip = getDailyTip(todayRisk);
  const riskLevel = getRiskLevel(todayRisk);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="max-w-6xl p-6 mx-auto mt-6">  
      {/* Navbar Section */}
      <div className="flex items-center justify-between p-6 mb-8 bg-white shadow-lg rounded-2xl">
        <div>
          <h1 className="mb-2 text-3xl font-bold">👋 Welcome back!</h1>
          <p className="text-gray-600">{today}</p>
        </div>
        <div className="text-right">
          <Link to="/profile" className="font-medium text-blue-600 hover:text-blue-800">
            View Profile →
          </Link>
        </div>
      </div>

      {/* Risk Score and Chart Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
        {/* Today's Heart Risk */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="mb-4 text-2xl font-semibold">❤️ Today's Heart Risk</h2>
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-bold">{todayRisk}%</p>
                <span className={`font-medium ${riskLevel.color}`}>
                  {riskLevel.text}
                </span>
              </div>
              <p className="max-w-sm text-gray-600">{dailyTip}</p>
            </div>
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { value: todayRisk },
                      { value: 100 - todayRisk }
                    ]}
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={25}
                    outerRadius={45}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    <Cell 
                      fill={
                        riskLevel.color === 'text-green-500' ? '#22c55e' :
                        riskLevel.color === 'text-yellow-500' ? '#eab308' : '#ef4444'
                      } 
                    />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xl font-bold"
                    fill={
                      riskLevel.color === 'text-green-500' ? '#22c55e' :
                      riskLevel.color === 'text-yellow-500' ? '#eab308' : '#ef4444'
                    }
                  >
                    {todayRisk}%
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Risk Trend Chart */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="mb-4 text-2xl font-semibold">📈 Weekly Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={riskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="risk" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Log Section */}
      <div className="p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="flex items-center gap-2 mb-6 text-2xl font-semibold">
          <span>📝</span> Quick Log
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            to="/log/meals"
            className="flex flex-col items-center p-6 transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl hover:shadow-xl group"
          >
            <div className="p-4 mb-3 transition-transform bg-white rounded-full group-hover:scale-110">
              <span className="text-3xl">🍽️</span>
            </div>
            <span className="font-semibold text-white">Log Meals</span>
            <span className="mt-1 text-sm text-blue-100">Track your nutrition</span>
          </Link>

          <Link
            to="/log/activity"
            className="flex flex-col items-center p-6 transition-all duration-300 shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl hover:shadow-xl group"
          >
            <div className="p-4 mb-3 transition-transform bg-white rounded-full group-hover:scale-110">
              <span className="text-3xl">🏃</span>
            </div>
            <span className="font-semibold text-white">Log Activity</span>
            <span className="mt-1 text-sm text-green-100">Monitor exercise</span>
          </Link>

          <Link
            to="/log/sleep-stress"
            className="flex flex-col items-center p-6 transition-all duration-300 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl hover:shadow-xl group"
          >
            <div className="p-4 mb-3 transition-transform bg-white rounded-full group-hover:scale-110">
              <span className="text-3xl">🛌</span>
            </div>
            <span className="font-semibold text-white">Sleep & Stress</span>
            <span className="mt-1 text-sm text-purple-100">Track your rest</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;