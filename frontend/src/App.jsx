import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CalculatorForm from "./components/CalculatorForm";
import ResultSummary from "./components/ResultSummary";
import axios from "axios";

const App = () => {
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
                <div key={index} className="my-8 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
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

export default App;
