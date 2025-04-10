import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const mockData = {
  heartRiskScore: 36,
  riskFactors: [
    { name: "Physical Activity", value: 30 },
    { name: "Diet", value: 25 },
    { name: "Sleep", value: 20 },
    { name: "Stress", value: 25 },
  ],
  recommendations: [
    "Increase physical activity to at least 30 mins/day",
    "Reduce sugar intake and avoid fried foods",
    "Try mindfulness meditation for stress",
  ],
  activityTrend: [
    { date: "Apr 1", minutes: 20 },
    { date: "Apr 2", minutes: 0 },
    { date: "Apr 3", minutes: 30 },
    { date: "Apr 4", minutes: 40 },
    { date: "Apr 5", minutes: 25 },
  ],
  sleepTrend: [
    { date: "Apr 1", hours: 7 },
    { date: "Apr 2", hours: 6 },
    { date: "Apr 3", hours: 8 },
    { date: "Apr 4", hours: 5.5 },
    { date: "Apr 5", hours: 7.5 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const HealthReport = () => {
  const { heartRiskScore, recommendations, activityTrend, sleepTrend, riskFactors } = mockData;

  return (
    <div className="max-w-6xl px-6 mx-auto pt-14">
      <h2 className="mb-6 text-3xl font-bold">📊 Health Report</h2>

      {/* Top Grid: Risk Score and Contributing Factors */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
        {/* Heart Risk Score with Pie Chart */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h3 className="mb-4 text-xl font-semibold">❤️ Heart Risk Score</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-5xl font-bold text-blue-600">{heartRiskScore}%</p>
              <p className="mt-2 text-gray-600">Overall Risk Level</p>
            </div>
            <div className="w-32 h-32">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { value: heartRiskScore },
                      { value: 100 - heartRiskScore }
                    ]}
                    innerRadius={25}
                    outerRadius={45}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill="#3B82F6" />
                    <Cell fill="#E5E7EB" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Risk Factors Distribution */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h3 className="mb-4 text-xl font-semibold">📊 Contributing Factors</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              {riskFactors.map((factor, index) => (
                <div key={factor.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span>{factor.name}: {factor.value}%</span>
                </div>
              ))}
            </div>
            <div className="w-32 h-32">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={riskFactors}
                    innerRadius={25}
                    outerRadius={45}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskFactors.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Card */}
      <div className="p-6 mb-6 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
        <h3 className="mb-4 text-xl font-semibold text-white">✅ Recommendations</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 text-white bg-white/10 backdrop-blur-sm rounded-xl">
              <p>{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trends Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Activity Trend */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h3 className="mb-4 text-xl font-semibold">🏃 Activity Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={activityTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="minutes" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sleep Trend */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h3 className="mb-4 text-xl font-semibold">😴 Sleep Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sleepTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ fill: '#8B5CF6' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HealthReport;
