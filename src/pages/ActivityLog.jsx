import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const ActivityLog = () => {
  const [activity, setActivity] = useState({
    exerciseStatus: "no",
    duration: "",
    type: "",
    intensity: "moderate",
    activityLevel: "sedentary",
    energyLevel: "moderate",
    exerciseType: "",
    challengeLevel: "moderate",
    recoveryQuality: "good",
    goalAchievement: "on_track",
    notes: "",
    smoking: "no",
    alcohol: "no",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActivity((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const showSuccessNotification = (message) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600">
                <span className="text-xl">✓</span>
              </div>
            </div>
            <div className="flex-1 ml-3">
              <p className="text-sm font-medium text-gray-900">
                Activity Logged!
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex items-center justify-center w-full p-4 text-sm font-medium text-green-600 border border-transparent rounded-none rounded-r-xl hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
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
    const loadingToast = toast.loading('Saving your activity...', {
      style: {
        borderRadius: '12px',
        background: '#333',
        color: '#fff',
      },
    });

    // Simulate API call
    setTimeout(() => {
      toast.dismiss(loadingToast);
      
      // Get appropriate message
      let message = "";
      switch(activity.exerciseStatus) {
        case "yes":
          message = "Great job on completing a full workout! 💪";
          break;
        case "little":
          message = "Some movement is better than none! 🎯";
          break;
        default:
          message = "Activity logged. Aim to exercise tomorrow! 🎯";
      }
      
      showSuccessNotification(message);
      
      // Reset form
      setActivity({
        exerciseStatus: "no",
        duration: "",
        type: "",
        intensity: "moderate",
        activityLevel: "sedentary",
        energyLevel: "moderate",
        exerciseType: "",
        challengeLevel: "moderate",
        recoveryQuality: "good",
        goalAchievement: "on_track",
        notes: "",
        smoking: "no",
        alcohol: "no",
      });
    }, 1000);
  };

  return (
    <div className="max-w-2xl p-6 mx-auto mt-12 bg-white shadow rounded-2xl">
      <Toaster />
      <h2 className="mb-4 text-2xl font-bold">🏃 Activity Log</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-2 font-medium">
            🏃‍♂️ Did you exercise today?
          </label>
          <select
            name="exerciseStatus"
            value={activity.exerciseStatus}
            onChange={handleChange}
            className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="no">No</option>
            <option value="little">Yes, a little (less than 30 mins)</option>
            <option value="yes">Yes, good session (30+ mins)</option>
          </select>
        </div>

        {/* Show additional fields only if they exercised */}
        {activity.exerciseStatus !== "no" && (
          <>
            <div>
              <label className="block mb-2 font-medium">
                ⏱️ Exact Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={activity.duration}
                onChange={handleChange}
                placeholder={activity.exerciseStatus === "little" ? "Less than 30" : "30 or more"}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                🧘‍♂️ Type of Exercise
              </label>
              <select
                name="exerciseType"
                value={activity.exerciseType}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select exercise type</option>
                <option value="walking">Walking</option>
                <option value="running">Running/Jogging</option>
                <option value="cycling">Cycling</option>
                <option value="swimming">Swimming</option>
                <option value="yoga">Yoga</option>
                <option value="gym">Gym/Weight Training</option>
                <option value="sports">Sports</option>
                <option value="dance">Dance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">🔥 Intensity</label>
              <select
                name="intensity"
                value={activity.intensity}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block mb-2 font-medium">
            📊 Overall Daily Activity Level
          </label>
          <select
            name="activityLevel"
            value={activity.activityLevel}
            onChange={handleChange}
            className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="sedentary">Mostly Sitting</option>
            <option value="light">Light Activity (Some Walking)</option>
            <option value="moderate">Moderately Active</option>
            <option value="very_active">Very Active</option>
            <option value="extremely_active">Extremely Active</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            ⚡ Energy Level Today
          </label>
          <select
            name="energyLevel"
            value={activity.energyLevel}
            onChange={handleChange}
            className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="very_low">Very Low (Exhausted)</option>
            <option value="low">Low (Tired)</option>
            <option value="moderate">Moderate (Normal)</option>
            <option value="high">High (Energetic)</option>
            <option value="very_high">Very High (Super Energetic)</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            🎯 How Challenging Was Your Workout?
          </label>
          <select
            name="challengeLevel"
            value={activity.challengeLevel}
            onChange={handleChange}
            className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="very_easy">Very Easy (Could talk easily)</option>
            <option value="easy">Easy (Comfortable)</option>
            <option value="moderate">Moderate (Slightly challenging)</option>
            <option value="hard">Hard (Challenging)</option>
            <option value="very_hard">Very Hard (Maximum effort)</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            🛏️ Recovery Quality
          </label>
          <select
            name="recoveryQuality"
            value={activity.recoveryQuality}
            onChange={handleChange}
            className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="poor">Poor (Feeling sore/tired)</option>
            <option value="fair">Fair (Slightly sore)</option>
            <option value="good">Good (Normal)</option>
            <option value="excellent">Excellent (Fresh & Ready)</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">📝 Notes</label>
          <textarea
            name="notes"
            value={activity.notes}
            onChange={handleChange}
            placeholder="How did you feel? Energy level?"
            className="w-full px-4 py-2 border rounded-xl"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 mt-6 text-lg font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl transition-all transform hover:scale-[1.02] focus:scale-[0.98] shadow-lg"
        >
          Save Activity Log
        </button>
      </form>
    </div>
  );
};

export default ActivityLog;
