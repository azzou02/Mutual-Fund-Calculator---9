import React from "react";

const ResultSummary = ({ result }) => {
  return (
    <div className="result-container">
      <h2 className="result-title">Result Summary</h2>
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
  );
};

export default ResultSummary;
