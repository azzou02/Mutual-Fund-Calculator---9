import React, { useState } from "react";
import Navbar from "./Navbar";
import InvestmentForm from "./InvestmentForm";
import TempGraph from "./TempGraph";

const PastInvestment = () => {
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const holdings = 7;
  const amountInvested = 16582.32;
  const profit = 6582.32;
  const returnAmount = 65.82;

  return (
    <div className="bg-gray-100 text-black min-h-screen">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex flex-col container mx-auto px-4 py-8 gap-4">
        <div className="flex flex-row justify-between gap-4 h-96">
          <div className="border border-gray-300 rounded-lg w-full bg-white px-4 py-4">
            <TempGraph />
          </div>

          <div className="w-1/3 flex flex-col justify-between items-center border border-gray-300 rounded-lg p-4 bg-white">
            <h2 className="text-xl font-semibold pt-2">Account Summary</h2>

            <div className="flex flex-col w-full overflow-hidden rounded-lg border">
              <table className="">
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="px-6 py-4 text-sm font-medium text-gray-500">Holdings</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{holdings.toLocaleString()}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="px-6 py-4 text-sm font-medium text-gray-500">Amount</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">${amountInvested.toLocaleString()}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="px-6 py-4 text-sm font-medium text-gray-500">Profit</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">${profit.toLocaleString()}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="px-6 py-4 text-sm font-medium text-gray-500">Return</td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{returnAmount.toLocaleString()}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              className="text-white bg-indigo-600 py-2 px-4 w-full rounded-md transition-colors duration-300 hover:bg-indigo-700"
              onClick={handleOpenForm}
            >
              Add Investment
            </button>
          </div>
        </div>

        {showForm && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center transition-opacity duration-300 ease-in-out"
          >
            <div
              className="absolute inset-0"
              onClick={handleCloseForm}
            ></div>
            <div
              className="relative z-50 w-96 bg-white rounded-lg shadow-xl opacity-100"
            >
              <InvestmentForm onClose={handleCloseForm} />
            </div>
          </div>
        )}

        <div className="flex flex-col w-full overflow-hidden rounded-lg border border-gray-300 bg-white">
          <table className="divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-4 text-left">Company</th>
                <th className="px-4 py-4 text-right">Shares</th>
                <th className="px-4 py-4 text-right">Price</th>
                <th className="px-4 py-4 text-right">Profit/Loss</th>
                <th className="px-4 py-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-4">Starbucks Corp</td>
                <td className="px-4 py-4 text-right">17</td>
                <td className="px-4 py-4 text-right">${108.76.toLocaleString()}</td>
                <td className="px-4 py-4 text-right text-green-600">+${380.92.toLocaleString()}</td>
                <td className="px-4 py-4">2023-11-21</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-4">Advanced Micro Devices Inc.</td>
                <td className="px-4 py-4 text-right">10</td>
                <td className="px-4 py-4 text-right">${116.79.toLocaleString()}</td>
                <td className="px-4 py-4 text-right text-red-600">-${176.76.toLocaleString()}</td>
                <td className="px-4 py-4">2023-12-14</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-4">Walt Disney Co.</td>
                <td className="px-4 py-4 text-right">15</td>
                <td className="px-4 py-4 text-right">${113.39.toLocaleString()}</td>
                <td className="px-4 py-4 text-right text-green-600">+${1230.65.toLocaleString()}</td>
                <td className="px-4 py-4">2023-11-29</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-4">Chipotle Mexican Grill, Inc.</td>
                <td className="px-4 py-4 text-right">25</td>
                <td className="px-4 py-4 text-right">${58.30.toLocaleString()}</td>
                <td className="px-4 py-4 text-right text-green-600">+${82.21.toLocaleString()}</td>
                <td className="px-4 py-4">2023-12-04</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-4">iShares Bitcoin Trust ETF</td>
                <td className="px-4 py-4 text-right">10</td>
                <td className="px-4 py-4 text-right">${57.91.toLocaleString()}</td>
                <td className="px-4 py-4 text-right text-green-600">+${440.04.toLocaleString()}</td>
                <td className="px-4 py-4">2023-12-08</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-4">Discover Financial Services</td>
                <td className="px-4 py-4 text-right">10</td>
                <td className="px-4 py-4 text-right">${200.55.toLocaleString()}</td>
                <td className="px-4 py-4 text-right text-green-600">+${2760.40.toLocaleString()}</td>
                <td className="px-4 py-4">2023-11-30</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-4">PayPal Holdings Inc.</td>
                <td className="px-4 py-4 text-right">15</td>
                <td className="px-4 py-4 text-right">${88.48.toLocaleString()}</td>
                <td className="px-4 py-4 text-right text-green-600">+${1107.40.toLocaleString()}</td>
                <td className="px-4 py-4">2023-12-01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PastInvestment;