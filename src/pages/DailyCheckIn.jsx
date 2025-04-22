// pages/DailyCheckIn.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const Select = ({ name, value, onChange, placeholder, options }) => (
  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 transition-all border rounded-lg text-slate-700 bg-slate-50 border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
    >
      <option value="">{placeholder}</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  </motion.div>
);

const DailyCheckIn = () => {
  const [formData, setFormData] = useState({
    water: "",
    exercise: "",
    food: "",
    oil: "",
    smoke: "",
    mood: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Daily Check-In Data:", formData);
  };

  return (
    <motion.div
      className="max-w-xl p-8 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-800">📝 Daily Check-In</h2>
      <div className="space-y-6">
        <Select
          name="water"
          value={formData.water}
          onChange={handleChange}
          placeholder="💧 How much water?"
          options={[
            { value: "<8", label: "< 8 glasses" },
            { value: "8-10", label: "8-10 glasses" },
            { value: ">10", label: "10+ glasses" }
          ]}
        />

        <Select
          name="exercise"
          value={formData.exercise}
          onChange={handleChange}
          placeholder="🏃‍♀️ Exercise?"
          options={[
            { value: "none", label: "No exercise" },
            { value: "light", label: "10-20 min walk" },
            { value: "full", label: "30+ min workout" }
          ]}
        />

        <Select
          name="food"
          value={formData.food}
          onChange={handleChange}
          placeholder="🍛 What did you eat?"
          options={[
            { value: "healthy", label: "Healthy home food" },
            { value: "junk", label: "Unhealthy / Outside" },
            { value: "mix", label: "Mixed food" }
          ]}
        />

        <Select
          name="oil"
          value={formData.oil}
          onChange={handleChange}
          placeholder="🛢️ Oil Content?"
          options={[
            { value: "light", label: "Light oil" },
            { value: "medium", label: "Medium oil" },
            { value: "heavy", label: "Heavy oil / Fried" }
          ]}
        />

        <Select
          name="smoke"
          value={formData.smoke}
          onChange={handleChange}
          placeholder="🚬 Smoked today?"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ]}
        />

        <Select
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          placeholder="🧠 Mood?"
          options={[
            { value: "happy", label: "😄 Happy" },
            { value: "ok", label: "🙂 Okay" },
            { value: "sad", label: "😔 Sad" },
            { value: "stress", label: "😵‍💫 Stressed" }
          ]}
        />

        <motion.button
          onClick={handleSubmit}
          className="w-full px-6 py-3 text-lg font-semibold text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit & View Report
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DailyCheckIn;