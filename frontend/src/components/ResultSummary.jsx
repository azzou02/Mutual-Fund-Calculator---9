import React, { useState } from "react";
import Graph from "./Graph";

const ResultSummary = ({ result, hasGraphToggle, mutualFund, allFunds }) => {
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
    
      {/* Show the graph toggle on first summary section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-between items-center gap-4">
          <h2 className="text-2xl font-bold">{mutualFund} Summary</h2>

          {/* Link to Yahoo Finance */}
          <h3 className="bg-violet-700 dark:bg-violet-600 text-white dark:text-white px-4 py-2 rounded-full shadow">
            <a 
              href={`https://finance.yahoo.com/quote/${mutualFund}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              YFinance
            </a>
          </h3>
        </div>
        
        {hasGraphToggle && (
          <button
            className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded"
            onClick={() => setShowGraph(!showGraph)}
          >
            {showGraph ? "Show Summary" : "Show Graph"}
          </button>
        )}
      </div>

      {/* Main Content */}
      {showGraph && hasGraphToggle ? (
        <Graph funds={allFunds}/>
      ) : (
        <div>
          <div className="result-overview">
            <p className="mb-2 text-lg">
              <strong>Total Balance (USD):</strong>{" "}
              <span className="total-balance">
                ${result.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </p>
            <p className="mb-4 text-lg">
              <strong>Earnings (USD):</strong>{" "}
              <span 
                className={result.earnings >= 0 ? "font-semibold text-green-600 dark:text-green-300" : "text-red-600"}
              >
                ${result.earnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </p>
          </div>

          <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200 text-left dark:bg-gray-900">Field</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200 text-left dark:bg-gray-900">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Initial Investment (USD)</td>
                <td className="border border-gray-300 px-4 py-2">${result.initialAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Time Horizon</td>
                <td className="border border-gray-300 px-4 py-2">{result.duration} years</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Return Rate</td>
                <td className="border border-gray-300 px-4 py-2">{(result.rate * 100).toFixed(2)}%</td>
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
