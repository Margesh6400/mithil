import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const MealsLog = () => {
  const mealOptions = {
    breakfast: [
      "Oats with milk",
      "Eggs and toast",
      "Fruit and yogurt",
      "Idli/Dosa",
      "Paratha",
      "Cereal with milk",
      "Smoothie bowl",
      "Poha",
      "Upma",
      "Other"
    ],
    lunch: [
      "Rice and dal",
      "Roti and sabzi",
      "Salad bowl",
      "Sandwich",
      "Rice bowl",
      "Khichdi",
      "Pasta/Noodles",
      "Meal prep",
      "Outside food",
      "Other"
    ],
    dinner: [
      "Light soup",
      "Roti and sabzi",
      "Salad",
      "Rice and dal",
      "Khichdi",
      "Grilled protein",
      "Outside food",
      "Leftovers",
      "Skip dinner",
      "Other"
    ]
  };

  const [meals, setMeals] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    notes: "",
    foodType: "healthy",
    oilUsage: "light",
    mealTiming: "regular",
    portionSize: "moderate",
    waterIntake: "sufficient",
    snacking: "minimal",
    saltIntake: "moderate",
    sugarIntake: "low",
  });

  const handleChange = (e) => {
    setMeals({ ...meals, [e.target.name]: e.target.value });
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
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                <span className="text-xl">✓</span>
              </div>
            </div>
            <div className="flex-1 ml-3">
              <p className="text-sm font-medium text-gray-900">
                Meal Log Saved!
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Your meal information has been recorded successfully.
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex items-center justify-center w-full p-4 text-sm font-medium text-blue-600 border border-transparent rounded-none rounded-r-xl hover:text-blue-500 focus:outline-none"
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

    const loadingToast = toast.loading('Saving your meal log...', {
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
      setMeals({
        breakfast: "",
        lunch: "",
        dinner: "",
        notes: "",
        foodType: "healthy",
        oilUsage: "light",
        mealTiming: "regular",
        portionSize: "moderate",
        waterIntake: "sufficient",
        snacking: "minimal",
        saltIntake: "moderate",
        sugarIntake: "low",
      });
    }, 1000);
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white shadow mt-14 rounded-2xl">
      {/* Add Toaster component at the top level */}
      <Toaster />
      
      <h2 className="mb-4 text-2xl font-bold">🍽️ Log Your Meals</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-2 font-medium">
            🍳 Breakfast
          </label>
          <select
            name="breakfast"
            value={meals.breakfast}
            onChange={handleChange}
            className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select breakfast</option>
            {mealOptions.breakfast.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {meals.breakfast === "Other" && (
            <input
              type="text"
              name="breakfastOther"
              value={meals.breakfastOther || ""}
              onChange={handleChange}
              placeholder="Specify your breakfast..."
              className="w-full px-4 py-2 mt-2 border rounded-xl"
            />
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            🥗 Lunch
          </label>
          <select
            name="lunch"
            value={meals.lunch}
            onChange={handleChange}
            className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select lunch</option>
            {mealOptions.lunch.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {meals.lunch === "Other" && (
            <input
              type="text"
              name="lunchOther"
              value={meals.lunchOther || ""}
              onChange={handleChange}
              placeholder="Specify your lunch..."
              className="w-full px-4 py-2 mt-2 border rounded-xl"
            />
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            🍛 Dinner
          </label>
          <select
            name="dinner"
            value={meals.dinner}
            onChange={handleChange}
            className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select dinner</option>
            {mealOptions.dinner.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {meals.dinner === "Other" && (
            <input
              type="text"
              name="dinnerOther"
              value={meals.dinnerOther || ""}
              onChange={handleChange}
              placeholder="Specify your dinner..."
              className="w-full px-4 py-2 mt-2 border rounded-xl"
            />
          )}
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
              <option value="junk">Mostly processed/junk food</option>
              <option value="restaurant">Restaurant/Outside food</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              🛢️ How much oil was used in your food today?
            </label>
            <select
              name="oilUsage"
              value={meals.oilUsage}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="light">Light (1-2 tsp per meal)</option>
              <option value="medium">Medium (3-4 tsp per meal)</option>
              <option value="heavy">Heavy (>4 tsp per meal)</option>
              <option value="unknown">Don't know (outside food)</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              ⏰ How regular were your meal timings?
            </label>
            <select
              name="mealTiming"
              value={meals.mealTiming}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="regular">Regular (Fixed times)</option>
              <option value="slightly-irregular">Slightly irregular (±1 hour)</option>
              <option value="irregular">Very irregular (>2 hours difference)</option>
              <option value="skipped">Skipped meals</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              🍱 How were your portion sizes today?
            </label>
            <select
              name="portionSize"
              value={meals.portionSize}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="small">Small (Less than usual)</option>
              <option value="moderate">Moderate (Regular portions)</option>
              <option value="large">Large (More than needed)</option>
              <option value="varying">Varying (Different for each meal)</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              💧 How was your water intake today?
            </label>
            <select
              name="waterIntake"
              value={meals.waterIntake}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="insufficient">Less than 4 glasses</option>
              <option value="moderate">4-6 glasses</option>
              <option value="sufficient">7-8 glasses</option>
              <option value="excellent">More than 8 glasses</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              🍪 How much did you snack between meals?
            </label>
            <select
              name="snacking"
              value={meals.snacking}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="minimal">No snacks</option>
              <option value="moderate">1-2 healthy snacks</option>
              <option value="frequent">Frequent healthy snacks</option>
              <option value="unhealthy">Unhealthy snacks</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              🧂 How was your salt intake today?
            </label>
            <select
              name="saltIntake"
              value={meals.saltIntake}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low salt diet</option>
              <option value="moderate">Normal/Moderate salt</option>
              <option value="high">High salt content</option>
              <option value="unknown">Not sure (Outside food)</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              💡 Tip: High salt intake can increase blood pressure
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              🍯 How was your sugar intake today?
            </label>
            <select
              name="sugarIntake"
              value={meals.sugarIntake}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Minimal sugar/desserts</option>
              <option value="moderate">1-2 sweet items</option>
              <option value="high">Multiple sweet items</option>
              <option value="unknown">Not sure (Hidden sugars)</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              💡 Tip: Limiting sugar intake helps manage weight and diabetes risk
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
