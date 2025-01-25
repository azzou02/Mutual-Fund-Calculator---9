import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CalculatorForm from "./components/CalculatorForm";
import ResultSummary from "./components/ResultSummary";
import axios from "axios";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [calculatedData, setCalculatedData] = useState(null);

  const handleCalculation = async (formData) => {
    try {
      const response = await axios.post("http://localhost:5001/api/calculate", {
        ticker: formData.mutualFund,
        amount: formData.initialInvestment,
        duration: formData.duration,
      });

      const { beta, rate, futureValue, riskFreeRate } = response.data.result;
      const earnings = futureValue - formData.initialInvestment;

      setCalculatedData({
        totalBalance: futureValue,
        earnings: earnings,
        initialAmount: parseFloat(formData.initialInvestment),
        duration: parseInt(formData.duration),
        beta: beta,
        rate: rate,
        risk: riskFreeRate,
      });
    } catch (error) {
      console.error("Error calculating future value:", error);
    }
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mx-auto px-4 py-8 space-y-10">
        
        {/* Form Section */}
        <div>
          <h1 className="text-3xl font-bold mb-6">Mutual Fund Calculator</h1>
          <CalculatorForm onCalculate={handleCalculation} />
        </div>

        {/* Result Summaries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Result Summary with Graph Toggle */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            {calculatedData ? (
              <ResultSummary result={calculatedData} hasGraphToggle={true} />
            ) : (
              <p className="text-gray-500 dark:text-gray-300">
                First result summary will appear here after calculation.
              </p>
            )}
          </div>

          {/* Second Result Summary without Graph Toggle */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            {calculatedData ? (
              <ResultSummary result={calculatedData} hasGraphToggle={false} />
            ) : (
              <p className="text-gray-500 dark:text-gray-300">
                Second result summary will appear here after calculation.
              </p>
            )}
          </div>

          {/* Third Result Summary without Graph Toggle */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            {calculatedData ? (
              <ResultSummary result={calculatedData} hasGraphToggle={false} />
            ) : (
              <p className="text-gray-500 dark:text-gray-300">
                Third result summary will appear here after calculation.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
