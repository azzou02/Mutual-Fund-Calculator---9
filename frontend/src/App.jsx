import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CalculatorForm from "./components/CalculatorForm";
import ResultSummary from "./components/ResultSummary";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [calculatedData, setCalculatedData] = useState(null);

  const handleCalculation = (formData) => {
    const earnings = (
      formData.initialInvestment *
      (1 + Math.random() * 0.1) ** formData.duration
    ).toFixed(2);

    const totalBalance = (
      Number(formData.initialInvestment) + Number(earnings)
    ).toFixed(2);

    setCalculatedData({
      totalBalance: parseFloat(totalBalance),
      earnings: parseFloat(earnings),
      initialAmount: parseFloat(formData.initialInvestment),
      duration: parseInt(formData.duration),
    });
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
