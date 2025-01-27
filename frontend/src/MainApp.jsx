import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CalculatorForm from "./components/CalculatorForm";
import ResultSummary from "./components/ResultSummary";
import axios from "axios";

const MainApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [calculatedData, setCalculatedData] = useState([]);

  const handleCalculation = async (formData) => {
    try {
      const results = await Promise.all(
        formData.mutualFund.map(async (fund) => {
          const response = await axios.post("http://localhost:5001/api/calculate", {
            ticker: fund,
            amount: formData.initialInvestment,
            duration: formData.duration,
          });
          const { beta, rate, futureValue, riskFreeRate } = response.data.result;
          const earnings = futureValue - formData.initialInvestment;

          return {
            mutualFund: fund, // Include mutual fund name
            totalBalance: futureValue,
            earnings: earnings,
            initialAmount: parseFloat(formData.initialInvestment),
            duration: parseInt(formData.duration),
            beta: beta,
            rate: rate,
            risk: riskFreeRate,
          };
        })
      );

      setCalculatedData(results); // Store results array
    } catch (error) {
      console.error("Error calculating future values:", error);
    }
  };

   // Find the fund with the highest earnings
  const highestEarningFund =
    calculatedData.length > 0
      ? calculatedData.reduce((max, fund) => (fund.earnings > max.earnings ? fund : max), calculatedData[0])
      : null;

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mx-auto px-4 py-8 grid grid-cols-3 gap-10">
        
        {/* Form Section */}
        <div className="col-span-1">
          <h1 className="text-3xl font-bold mb-6">Mutual Fund Calculator</h1>
          <CalculatorForm onCalculate={handleCalculation} />
        </div>

        {/* Result Summaries */}
        <div className="col-span-2">
          {calculatedData.length > 0
            ? calculatedData.map((data, index) => (
                <div key={index} className={`my-8 p-4 rounded-lg shadow-lg ${
                  highestEarningFund && data.mutualFund === highestEarningFund.mutualFund
                    ? "bg-gray-50 border-4 border-green-300 dark:bg-gray-800 dark:border-green-500" // Highlight the highest earning fund
                    : "bg-gray-50 dark:bg-gray-700"
                }`}
                >
                  <ResultSummary
                    result={data}
                    hasGraphToggle={index == 0}
                    mutualFund={data.mutualFund} // Pass mutual fund name as a prop
                  />
                </div>
              ))
            : (
              <p className="text-gray-500 dark:text-gray-300">
                Results will appear here after calculation.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
