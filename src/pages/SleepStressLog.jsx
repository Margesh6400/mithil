import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const SleepStressLog = () => {
  const moodOptions = [
    { emoji: "😊", value: "happy", label: "Happy" },
    { emoji: "😌", value: "calm", label: "Calm" },
    { emoji: "😴", value: "tired", label: "Tired" },
    { emoji: "😰", value: "anxious", label: "Anxious" },
    { emoji: "😢", value: "sad", label: "Sad" },
    { emoji: "😤", value: "frustrated", label: "Frustrated" },
    { emoji: "😐", value: "neutral", label: "Neutral" },
    { emoji: "🤗", value: "grateful", label: "Grateful" },
    { emoji: "😫", value: "stressed", label: "Stressed" },
    { emoji: "😕", value: "confused", label: "Confused" }
  ];

  const [log, setLog] = useState({
    sleepHours: "",
    sleepQuality: "good",
    stressLevel: "low",
    mood: "",
    notes: "",
    alcohol: "no",
    smoking: "no"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog({ ...log, [name]: value });
  };

  const showSuccessNotification = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
                <span className="text-xl text-white">✓</span>
              </div>
            </div>
            <div className="flex-1 ml-3">
              <p className="text-sm font-medium text-gray-900">
                Sleep & Stress Log Saved!
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {log.mood ? `You're feeling ${log.mood} today` : 'Your log has been recorded'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex items-center justify-center w-full p-4 text-sm font-medium text-purple-600 border border-transparent rounded-none rounded-r-xl hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Close
          </button>
        </div>
      </div>
    ), {
      position: 'top-center',
      duration: 4000,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show loading toast
    const loadingToast = toast.loading('Saving your log...', {
      style: {
        borderRadius: '12px',
        background: '#333',
        color: '#fff',
      },
    });

    // Simulate API call
    setTimeout(() => {
      toast.dismiss(loadingToast);
      showSuccessNotification();
      
      // Reset form
      setLog({
        sleepHours: "",
        sleepQuality: "good",
        stressLevel: "low",
        mood: "",
        notes: "",
        alcohol: "no",
        smoking: "no"
      });
    }, 1000);
  };

  return (
    <div className="max-w-2xl p-6 mx-auto mt-12 bg-white shadow rounded-2xl">
      <Toaster />
      <h2 className="mb-4 text-2xl font-bold">🛌 Sleep & 😥 Stress Log</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">⏰ Hours Slept</label>
          <input
            type="number"
            name="sleepHours"
            value={log.sleepHours}
            onChange={handleChange}
            placeholder="e.g., 7.5"
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">😴 Sleep Quality</label>
          <select
            name="sleepQuality"
            value={log.sleepQuality}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="poor">Poor</option>
            <option value="very poor">Very Poor</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">😓 Stress Level</label>
          <select
            name="stressLevel"
            value={log.stressLevel}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
            <option value="very high">Very High</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            🙂 How are you feeling today?
          </label>
          <select
            name="mood"
            value={log.mood}
            onChange={handleChange}
            className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Select your mood</option>
            {moodOptions.map(({ emoji, value, label }) => (
              <option key={value} value={value}>
                {emoji} {label}
              </option>
            ))}
          </select>
          {log.mood === "anxious" || log.mood === "stressed" && (
            <p className="mt-2 text-sm text-amber-600">
              💡 Tip: Try some deep breathing exercises to help manage your stress
            </p>
          )}
        </div>

        <div className="py-4 space-y-6 border-t border-gray-200">
          <div>
            <label className="block mb-2 font-medium">
              🍷 Did you drink alcohol today?
              <span className="ml-2 text-sm text-red-500">(affects sleep quality)</span>
            </label>
            <select
              name="alcohol"
              value={log.alcohol}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {log.alcohol === "yes" && (
              <p className="mt-2 text-sm text-amber-600">
                💡 Tip: Alcohol can disrupt your sleep cycle and reduce sleep quality
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              🚬 Did you smoke today?
              <span className="ml-2 text-sm text-red-500">(affects sleep & stress)</span>
            </label>
            <select
              name="smoking"
              value={log.smoking}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {log.smoking === "yes" && (
              <p className="mt-2 text-sm text-amber-600">
                💡 Tip: Nicotine can increase anxiety and disturb sleep patterns
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">📝 Notes</label>
          <textarea
            name="notes"
            value={log.notes}
            onChange={handleChange}
            placeholder="Any stress triggers, dreams, etc."
            className="w-full px-4 py-2 border rounded-xl"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 mt-6 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all transform hover:scale-[1.02] focus:scale-[0.98] shadow-lg"
        >
          Save Sleep & Stress Log
        </button>
      </form>
    </div>
  );
};

export default SleepStressLog;
