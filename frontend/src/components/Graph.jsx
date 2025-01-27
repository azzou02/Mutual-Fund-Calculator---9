import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch market return data for the past 5 years
    const fetchMarketData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/market-return/5");
        const data = response.data; // Assumes API returns { returnRate }
        setMarketData((prev) => [
          ...prev,
          { date: `${5} years ago`, returnRate: data.returnRate },
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch market return data:", error);
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  // Prepare data for the graph
  const graphData = {
    labels: marketData.map((entry) => entry.date), // X-axis labels
    datasets: [
      {
        label: "Market Return (%)",
        data: marketData.map((entry) => entry.returnRate * 100), // Y-axis data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Market Returns Over Time",
      },
    },
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg dark: ">
      {loading ? (
        <p className="text-gray-500 dark:text-gray-100">Loading graph...</p>
      ) : (
        <Line data={graphData} options={options} />
      )}
    </div>
  );
};

export default Graph;

