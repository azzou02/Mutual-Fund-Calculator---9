import React, { useState } from "react";

const CalculatorForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    initialInvestment: "",
    duration: "",
    mutualFund: "",
  });
  const [errors, setErrors] = useState({});

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
      onCalculate(formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      
      {/* Initial Investment Section */}
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

      {/* Duration Section */}
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

      {/* Mutual Fund Section */}
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
          <option value="SPY">SPDR S&P 500 ETF Trust</option>
          <option value="VOO">Vanguard S&P 500 ETF</option>
          <option value="IVV">iShares Core S&P 500 ETF</option>
          <option value="VTI">Vanguard Total Stock Market ETF</option>
          <option value="QQQ">Invesco QQQ Trust Series I</option>
          <option value="VUG">Vanguard Growth ETF</option>
          <option value="VEA">Vanguard FTSE Developed Markets ETF</option>
          <option value="VTV">Vanguard Value ETF</option>
          <option value="BND">Vanguard Total Bond Market ETF</option>
          <option value="AGG">iShares Core U.S. Aggregate Bond ETF</option>
          <option value="IEFA">iShares Core MSCI EAFE ETF</option>
          <option value="IWF">iShares Russell 1000 Growth ETF</option>
          <option value="IJH">iShares Core S&P Mid-Cap ETF</option>
          <option value="IJR">iShares Core S&P Small-Cap ETF</option>
          <option value="VIG">Vanguard Dividend Appreciation ETF</option>
          <option value="VGT">Vanguard Information Technology ETF</option>
          <option value="VWO">Vanguard FTSE Emerging Markets ETF</option>
          <option value="IEMG">iShares Core MSCI Emerging Markets ETF</option>
          <option value="GLD">SPDR Gold Shares</option>
          <option value="VXUS">Vanguard Total International Stock ETF</option>
          <option value="VO">Vanguard Mid-Cap ETF</option>
          <option value="RSP">Invesco S&P 500® Equal Weight ETF</option>
          <option value="IWM">iShares Russell 2000 ETF</option>
          <option value="XLK">Technology Select Sector SPDR Fund</option>
          <option value="SCHD">Schwab US Dividend Equity ETF</option>
        </select>
        {errors.mutualFund && <p className="text-red-500 text-sm mt-1">{errors.mutualFund}</p>}
      </div>

      {/* Calculate Button */}
      <button
        type="submit"
        className="w-40 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring focus:ring-indigo-500"
      >
        Calculate
      </button>
    </form>
  );
};

export default CalculatorForm;
