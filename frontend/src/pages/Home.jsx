import React, { useEffect, useState } from "react";
import CalculatorForm from "../components/CalculatorForm";
import ResultSummary from "../components/ResultSummary";

const Home = () => {
  const [result, setResult] = useState(null);

  const handleCalculate = ({ mutualFund, initialAmount, duration }) => {
    const returnRate = 0.1;
    const riskFreeRate = 0.05;
    const earnings =
      initialAmount * Math.pow(1 + returnRate, duration) - initialAmount;

    setResult({
      mutualFund,
      initialAmount,
      duration,
      earnings,
      totalBalance: initialAmount + earnings,
    });
  };

  useEffect(() => {
    console.log("Home component mounted");
    console.log("result is here", result);
  }, []);

  return (
    <div className="home-container">
      <div className="form-container">
        <CalculatorForm onCalculate={handleCalculate} />
      </div>
      <div className="result-container">
        {result && <ResultSummary result={result} />}
      </div>
    </div>
  );
};

export default Home;
