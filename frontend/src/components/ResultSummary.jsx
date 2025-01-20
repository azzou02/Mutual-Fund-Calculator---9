import React, { useState } from "react";
import Graph from "./Graph"; 

const ResultSummary = ({ result }) => {
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-lg">
     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Result Summary</h1>
        <button
          className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded shadow"
          onClick={() => setShowGraph(!showGraph)}
        >
          {showGraph ? "Show Summary" : "Graphs"}
        </button>
      </div>

      {showGraph ? (
        <Graph />
      ) : (
        <div>
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
                <td>Initial Investment (USD)</td>
                <td>${result.initialAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Time Horizon</td>
                <td>{result.duration} years</td>
              </tr>
              <tr>
                <td>Return Rate</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>Risk Free Rate</td>
                <td>5%</td>
              </tr>
              <tr>
                <td>Mutual Fund Beta</td>
                <td>1.2</td>
              </tr>
              <tr>
                <td>Earnings (USD)</td>
                <td>${result.earnings.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Total Balance (USD)</td>
                <td>${result.totalBalance.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResultSummary;
