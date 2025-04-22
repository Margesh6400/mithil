// pages/DailyReport.jsx
import React from "react";
import { motion } from "framer-motion";

const calculateRisk = (data) => {
  let risk = 0;
  if (!data) return { risk: 0, score: 100 };

  if (data.smoke === "yes") risk += 20;

  if (data.food === "junk") risk += 15;
  else if (data.food === "mix") risk += 7.5;

  if (data.oil === "heavy") risk += 10;
  else if (data.oil === "medium") risk += 5;

  if (data.exercise === "none") risk += 10;
  else if (data.exercise === "walk") risk += 5;

  if (data.water === "<8") risk += 5;

  const score = 100 - risk;
  return { risk, score };
};

const FlashCard = ({ label, value, color, icon }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.5,
      repeat: 1,
      repeatType: "reverse"
    }}
    className={`p-4 mb-4 rounded-lg shadow-lg ${color}`}
  >
    <motion.div
      animate={{ opacity: [1, 0.7, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="text-lg font-semibold"
    >
      {icon} {label}: <strong>{value}%</strong>
    </motion.div>
  </motion.div>
);

const DailyReport = () => {
  const data = JSON.parse(localStorage.getItem("dailyCheckin"));
  const { risk, score } = calculateRisk(data);

  const getRiskColor = (risk) => {
    if (risk > 50) return "bg-red-100 text-red-700";
    if (risk > 30) return "bg-orange-100 text-orange-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <motion.div 
      className="max-w-xl p-6 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="mb-6 text-2xl font-bold text-slate-800"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        📊 Daily Heart Health Report
      </motion.h2>

      <FlashCard
        label="Heart Health Score"
        value={score}
        color="bg-blue-100 text-blue-700"
        icon="❤️"
      />

      <FlashCard
        label="Risk Level Today"
        value={risk}
        color={getRiskColor(risk)}
        icon="⚠️"
      />

      <motion.div
        className="p-4 mt-8 rounded-lg shadow-sm bg-slate-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-slate-800">🩺 Advice for You</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          {risk > 50 && (
            <motion.li
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="p-2 rounded bg-red-50"
            >
              ⚡ Today was a risky day — try to eat home food and reduce oil tomorrow.
            </motion.li>
          )}
          {data?.smoke === "yes" && (
            <motion.li
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="p-2 rounded bg-red-50"
            >
              🚭 Avoid smoking — it's the biggest heart risk.
            </motion.li>
          )}
          {data?.exercise === "none" && (
            <motion.li
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="p-2 rounded bg-yellow-50"
            >
              🏃‍♂️ Try walking 20 mins daily to stay active.
            </motion.li>
          )}
          {data?.water === "<8" && (
            <motion.li
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="p-2 rounded bg-yellow-50"
            >
              💧 Drink more water — your body needs it!
            </motion.li>
          )}
          {data?.mood === "stressed" && (
            <motion.li
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="p-2 rounded bg-yellow-50"
            >
              🧘‍♂️ Take deep breaths or walk to reduce stress.
            </motion.li>
          )}
          {risk <= 30 && (
            <motion.li
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="p-2 rounded bg-green-50"
            >
              🎯 You're doing great — keep the streak alive! 🔥
            </motion.li>
          )}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default DailyReport;
