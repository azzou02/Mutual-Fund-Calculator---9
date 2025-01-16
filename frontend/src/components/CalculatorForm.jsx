import React, { useState } from "react";

const CalculatorForm = ({ onCalculate }) => {
  const [mutualFund, setMutualFund] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mutualFund || !initialAmount || !duration) {
      alert("Please fill out all fields");
      return;
    }
    onCalculate({
      mutualFund,
      initialAmount: parseFloat(initialAmount),
      duration: parseInt(duration),
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="calculator-form">
        {/* Mutual Fund Input */}
        <div className="form-group">
          <label className="form-label">
            Mutual Fund
            <input
              type="text"
              className="form-input"
              value={mutualFund}
              onChange={(e) => setMutualFund(e.target.value)}
              placeholder="Enter Mutual Fund"
            />
          </label>
        </div>

        {/* Initial Investment Amount Input */}
        <div className="form-group">
          <label className="form-label">
            Initial Investment Amount
            <input
              type="number"
              className="form-input"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              placeholder="Enter Initial Investment Amount"
            />
          </label>
        </div>

        {/* Duration Input */}
        <div className="form-group">
          <label className="form-label">
            Duration (years)
            <input
              type="number"
              className="form-input"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter Duration in years"
            />
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="form-button">
          Calculate
        </button>
      </form>
    </div>
  );
};

export default CalculatorForm;
