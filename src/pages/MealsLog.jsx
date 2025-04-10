import React, { useState } from "react";

const MealsLog = () => {
  const [meals, setMeals] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    notes: "",
    foodType: "healthy", // new
    oilUsage: "light",  // new
  });

  const handleChange = (e) => {
    setMeals({ ...meals, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can send this to Firebase or localStorage later
    console.log("Meal logged:", meals);

    alert("Meals logged successfully!");
    setMeals({ breakfast: "", lunch: "", dinner: "", notes: "", foodType: "healthy", oilUsage: "light" });
  };

  return (
    <div className="max-w-2xl p-6 mx-auto mt-4 bg-white shadow rounded-2xl">
      <h2 className="mb-4 text-2xl font-bold">🍽️ Log Your Meals</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">🍳 Breakfast</label>
          <input
            type="text"
            name="breakfast"
            value={meals.breakfast}
            onChange={handleChange}
            placeholder="e.g., Oats, eggs, toast..."
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">🥗 Lunch</label>
          <input
            type="text"
            name="lunch"
            value={meals.lunch}
            onChange={handleChange}
            placeholder="e.g., Rice, dal, salad..."
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">🍛 Dinner</label>
          <input
            type="text"
            name="dinner"
            value={meals.dinner}
            onChange={handleChange}
            placeholder="e.g., Light khichdi, soup..."
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <div className="py-4 space-y-6 border-t border-gray-100">
          <div>
            <label className="block mb-2 font-medium">
              🍽️ What kind of food did you eat today?
            </label>
            <select
              name="foodType"
              value={meals.foodType}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="healthy">Healthy home food</option>
              <option value="mixed">Mix of healthy + junk</option>
              <option value="junk">Junk or oily food</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              🛢️ How much oil was used in your home food?
            </label>
            <select
              name="oilUsage"
              value={meals.oilUsage}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="light">Light oil</option>
              <option value="medium">Medium oil</option>
              <option value="heavy">Heavy oil</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              💡 Tip: Less oil consumption is better for heart health
            </p>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">📝 Notes</label>
          <textarea
            name="notes"
            value={meals.notes}
            onChange={handleChange}
            placeholder="Any snacks, cheat meals, or water intake..."
            className="w-full px-4 py-2 border rounded-xl"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 mt-6 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all transform hover:scale-[1.02] focus:scale-[0.98] shadow-lg"
        >
          Save Meal Log
        </button>
      </form>
    </div>
  );
};

export default MealsLog;
