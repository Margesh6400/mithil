import React, { useState } from "react";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    age: 28,
    gender: "male",
    height: 175,
    weight: 70,
    familyHistory: "",
    bpProblems: "",
    diabetes: "",
    smoking: "no",
    unhealthyDiet: "no",
    physicalInactivity: "no",
    excessiveAlcohol: "no",
    highBP: "no",
    highCholesterol: "no",
    obesity: "no",
    chronicStress: "no",
    socialSupport: "yes",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", userInfo);
    alert("Profile saved!");
  };

  return (
    <div className="max-w-3xl p-8 mx-auto mt-14">
      {/* Profile Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 text-4xl text-white rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
          {userInfo.name.charAt(0)}
        </div>
        <h2 className="text-3xl font-bold">👤 My Profile</h2>
        <p className="text-gray-600">Manage your health information</p>
      </div>
      
      {/* Basic Information Card */}
      <div className="mb-8 overflow-hidden bg-white shadow-lg rounded-2xl">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
            <span>📝</span> Basic Information
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={userInfo.age}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={userInfo.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="male">👨 Male</option>
                <option value="female">👩 Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={userInfo.height}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={userInfo.weight}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Health Questionnaire Card */}
      <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
        <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-600">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
            <span>👩‍⚕️</span> Health Questionnaire
          </h3>
        </div>
        <div className="p-6 space-y-6">
          {/* Health questions with enhanced styling */}
          <div className="grid gap-6">
            <div className="p-4 bg-purple-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                Family history of heart problems or diabetes?
              </label>
              <select
                name="familyHistory"
                value={userInfo.familyHistory}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="not_sure">Not sure</option>
              </select>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                Do you have BP (blood pressure) problems?
              </label>
              <select
                name="bpProblems"
                value={userInfo.bpProblems}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="dont_know">I don't know</option>
              </select>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                Do you have diabetes?
              </label>
              <select
                name="diabetes"
                value={userInfo.diabetes}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="dont_know">I don't know</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Risk Assessment Card */}
      <div className="mt-8 overflow-hidden bg-white shadow-lg rounded-2xl">
        <div className="p-6 bg-gradient-to-r from-red-500 to-red-600">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
            <span>🏥</span> Medical Risk Assessment
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid gap-6">
            <div className="p-4 bg-red-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                🔴 Do you have high blood pressure?
                <span className="ml-2 text-sm text-red-500">(+15% risk)</span>
              </label>
              <select
                name="highBP"
                value={userInfo.highBP}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
                <option value="unknown">Don't Know</option>
              </select>
            </div>

            <div className="p-4 bg-red-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                🧈 Do you have high cholesterol/fatty diet?
                <span className="ml-2 text-sm text-red-500">(+10% risk)</span>
              </label>
              <select
                name="highCholesterol"
                value={userInfo.highCholesterol}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
                <option value="unknown">Don't Know</option>
              </select>
            </div>

            <div className="p-4 bg-red-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                🍬 Do you have diabetes?
                <span className="ml-2 text-sm text-red-500">(+8% risk)</span>
              </label>
              <select
                name="diabetes"
                value={userInfo.diabetes}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
                <option value="unknown">Don't Know</option>
              </select>
            </div>

            <div className="p-4 bg-red-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                ⚖️ Are you obese (BMI > 30)?
                <span className="ml-2 text-sm text-red-500">(+5% risk)</span>
              </label>
              <select
                name="obesity"
                value={userInfo.obesity}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-xl">
            <h4 className="mb-2 text-lg font-semibold text-gray-700">
              Total Medical Risk
            </h4>
            <p className="text-gray-600">
              Maximum possible risk: 38%
              <br />
              <span className="text-sm">
                Based on: High BP (15%), High Cholesterol (10%), Diabetes (8%), Obesity (5%)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Lifestyle Risk Assessment Card */}
      <div className="mt-8 overflow-hidden bg-white shadow-lg rounded-2xl">
        <div className="p-6 bg-gradient-to-r from-green-500 to-green-600">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
            <span>❤️</span> Lifestyle Risk Assessment
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid gap-6">
            <div className="p-4 bg-green-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                🚬 Do you smoke?
                <span className="ml-2 text-sm text-red-500">(+20% risk)</span>
              </label>
              <select
                name="smoking"
                value={userInfo.smoking}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div className="p-4 bg-green-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                🍟 Do you frequently eat unhealthy/oily food?
                <span className="ml-2 text-sm text-red-500">(+15% risk)</span>
              </label>
              <select
                name="unhealthyDiet"
                value={userInfo.unhealthyDiet}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div className="p-4 bg-green-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                🛋️ Are you physically inactive?
                <span className="ml-2 text-sm text-red-500">(+10% risk)</span>
              </label>
              <select
                name="physicalInactivity"
                value={userInfo.physicalInactivity}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="no">No (Regular Exercise)</option>
                <option value="yes">Yes (Sedentary Lifestyle)</option>
              </select>
            </div>

            <div className="p-4 bg-green-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                🍷 Do you drink alcohol excessively?
                <span className="ml-2 text-sm text-red-500">(+3% risk)</span>
              </label>
              <select
                name="excessiveAlcohol"
                value={userInfo.excessiveAlcohol}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-xl">
            <h4 className="mb-2 text-lg font-semibold text-gray-700">
              Total Lifestyle Risk
            </h4>
            <p className="text-gray-600">
              Maximum possible risk: 48%
              <br />
              <span className="text-sm">
                Based on: Smoking (20%), Unhealthy Diet (15%), Physical Inactivity (10%), Excessive Alcohol (3%)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Mental & Social Risk Assessment Card */}
      <div className="mt-8 overflow-hidden bg-white shadow-lg rounded-2xl">
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-600">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
            <span>🧠</span> Mental & Social Risk Assessment
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid gap-6">
            <div className="p-4 bg-indigo-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                😓 Do you experience chronic stress or depression?
                <span className="ml-2 text-sm text-red-500">(up to +5% risk)</span>
              </label>
              <select
                name="chronicStress"
                value={userInfo.chronicStress}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="no">No</option>
                <option value="occasional">Occasional</option>
                <option value="chronic">Yes, Chronic</option>
              </select>
            </div>

            <div className="p-4 bg-indigo-50 rounded-xl">
              <label className="block mb-2 font-medium text-gray-700">
                👥 Do you have good social support?
                <span className="ml-2 text-sm text-red-500">(+1% risk if no)</span>
              </label>
              <select
                name="socialSupport"
                value={userInfo.socialSupport}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-xl">
            <h4 className="mb-2 text-lg font-semibold text-gray-700">
              Total Mental & Social Risk
            </h4>
            <p className="text-gray-600">
              Maximum possible risk: 6%
              <br />
              <span className="text-sm">
                Based on: Chronic Stress (5%), Poor Social Support (1%)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Non-Modifiable Risk Assessment Card */}
      <div className="mt-8 overflow-hidden bg-white shadow-lg rounded-2xl">
        <div className="p-6 bg-gradient-to-r from-gray-600 to-gray-700">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
            <span>🧬</span> Non-Modifiable Risk Factors
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid gap-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-700">
                    👨 Age > 45 or Male Gender
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Risk contribution: 4%
                  </p>
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {(userInfo.age > 45 || userInfo.gender === 'male') ? '+4%' : '0%'}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-700">
                    🧬 Family History
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Risk contribution: 4%
                  </p>
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {userInfo.familyHistory === 'yes' ? '+4%' : '0%'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-xl">
            <h4 className="mb-2 text-lg font-semibold text-gray-700">
              Total Non-Modifiable Risk
            </h4>
            <p className="text-gray-600">
              Maximum possible risk: 8%
              <br />
              <span className="text-sm">
                Based on: Age/Gender (4%), Family History (4%)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full px-6 py-4 mt-8 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all transform hover:scale-[1.02] focus:scale-[0.98] shadow-lg"
      >
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
