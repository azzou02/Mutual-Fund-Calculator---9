import React from "react";

const ResultSummary = ({ result }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4">
      <h1 className="text-3xl font-bold mb-6">Result Summary</h1>
      <div className="result-overview">
        <p>
          <strong>Total Balance (USD):</strong>{" "}
          <span className="total-balance">${result.totalBalance.toFixed(2)}</span>
        </p>
        <p>
          <strong>Earnings (USD):</strong>{" "}
          <span className="earnings">${result.earnings.toFixed(2)}</span>
        </p>
      </div>
      <table className="result-table">
        <tbody>
          <tr>
            <td>Initial Investment (USD):</td>
            <td>${result.initialAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Time Horizon</td>
            <td>{result.duration} years</td>
          </tr>
          <tr>
            <td>Return Rate</td>
            <td>{result.rate.toFixed(4) * 100}%</td>
          </tr>
          <tr>
            <td>Risk Free Rate</td>
            <td>{result.risk * 100}%</td>
          </tr>
          <tr>
            <td>Mutual Fund Beta</td>
            <td>{result.beta.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResultSummary;
