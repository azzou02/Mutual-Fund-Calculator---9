import React, { useState } from "react";
import Graph from "./Graph";

const ResultSummary = ({ result }) => {
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">

      {/* Toggle Change */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {showGraph ? "Graph" : "Result Summary"}
        </h1>
        <button
          className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded shadow"
          onClick={() => setShowGraph(!showGraph)}
        >
          {showGraph ? "Show Summary" : "Graphs"}
        </button>
      </div>
      {/* Main Content */}
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

          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Field</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Initial Investment (USD)</td>
                <td className="border border-gray-300 px-4 py-2">${result.initialAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Time Horizon</td>
                <td className="border border-gray-300 px-4 py-2">{result.duration} years</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Return Rate</td>
                <td className="border border-gray-300 px-4 py-2">{result.rate.toFixed(4) * 100}%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Risk Free Rate</td>
                <td className="border border-gray-300 px-4 py-2">{result.risk * 100}%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Mutual Fund Beta</td>
                <td className="border border-gray-300 px-4 py-2">{result.beta.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default ResultSummary;
