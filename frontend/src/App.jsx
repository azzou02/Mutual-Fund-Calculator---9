// src/App.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    initialInvestment: "",
    duration: "",
    mutualFund: "",
  });
  const [errors, setErrors] = useState({});
  const [calculatedData, setCalcuatedData] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.initialInvestment || formData.initialInvestment <= 0) {
      newErrors.initialInvestment = "Please enter a valid initial investment amount.";
    }
    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = "Please enter a valid duration in years.";
    }
    if (!formData.mutualFund) {
      newErrors.mutualFund = "Please select a mutual fund.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mx-auto px-4 py-8 grid grid-cols-3 gap-10">


        {/* Form Section */}
        <div className=" col-span-1 space-y-6">
          <h1 className="text-3xl font-bold mb-6">Mutual Fund Calculator</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Input for Initial Investment */}
            <div>
              <label htmlFor="initial-investment" className="block font-semibold mb-2">
                Initial Investment Amount
              </label>
              <input
                type="number"
                id="initial-investment"
                name="initialInvestment"
                value={formData.initialInvestment}
                onChange={handleInputChange}
                placeholder="Enter initial amount"
                className={`w-full p-3 rounded-lg ${
                  errors.initialInvestment ? "border-red-500" : "border-gray-300"
                } border-b-2 focus:outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-black`}
              />
              {errors.initialInvestment && (
                <p className="text-red-500 text-sm mt-1">{errors.initialInvestment}</p>
              )}
            </div>

            {/* Input for Duration */}
            <div>
              <label htmlFor="duration" className="block font-semibold mb-2">
                Duration (years)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="Enter duration in years"
                className={`w-full p-3 rounded-lg ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                } border-b-2 focus:outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-black`}
              />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>

            {/* Dropdown for Mutual Fund */}
            <div>
              <label htmlFor="mutual-fund" className="block font-semibold mb-2">
                Select Mutual Fund
              </label>
              <select
                id="mutual-fund"
                name="mutualFund"
                value={formData.mutualFund}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg ${
                  errors.mutualFund ? "border-red-500" : "border-gray-300"
                } border-b-2 focus:outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-black`}
              >
                <option value="">Select a fund</option>
                <option value="fund1">Fund 1</option>
                <option value="fund2">Fund 2</option>
                <option value="fund3">Fund 3</option>
              </select>
              {errors.mutualFund && <p className="text-red-500 text-sm mt-1">{errors.mutualFund}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-40 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring focus:ring-indigo-500"
            >
              Calculate
            </button>
          </form>
        </div>


        {/* Result Section */}
        <div className="col-span-2 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Result Summary</h2>
          <p className="text-gray-500 dark:text-gray-300 mt-4">
            Your calculated results will appear here after submitting the form.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
