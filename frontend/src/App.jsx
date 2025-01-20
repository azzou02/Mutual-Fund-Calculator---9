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
      // Call the API or calculate the future value
      const response = await axios.post('http://localhost:5000/api/calculate', {
        ticker: formData.mutualFund,
        amount: formData.initialInvestment,
        duration: formData.duration,
      });
  
      // The result from the response should be an object containing beta, rate, and futureValue
      const { beta, rate, futureValue, riskFreeRate } = response.data.result;
  
      // Calculate earnings based on initial investment and future value (totalBalance)
      const earnings = futureValue - formData.initialInvestment;
  
      // Set the calculated data
      setCalculatedData({
        totalBalance: futureValue, // futureValue is the total balance
        earnings: earnings,
        initialAmount: parseFloat(formData.initialInvestment),
        duration: parseInt(formData.duration),
        beta: beta,  // Include beta in the result
        rate: rate,   // Include rate in the result
        risk: riskFreeRate, // Include riskFreeRate in the result
      });
  
    } catch (error) {
      console.error('Error calculating future value:', error);
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

        {/* Result Section */}
        <div className="col-span-2 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          {calculatedData ? (
            <ResultSummary result={calculatedData} />
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              Your calculated results will appear here after submitting the form.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
