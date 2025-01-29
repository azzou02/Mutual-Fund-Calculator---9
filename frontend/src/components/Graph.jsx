import React, { useEffect, useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const COLORS = ["#4A90E2", "#50E3C2", "#F5A623", "#BD10E0", "#D0021B"];

const Graph = ({ funds }) => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        setError(null);
        if (!funds || funds.length === 0) {
          setError("No funds provided to fetch data.");
          return;
        }

        const results = await Promise.all(
          funds.map(async (fund, index) => {
            const response = await axios.post("http://localhost:5001/api/earnings", {
              ticker: fund.mutualFund,
              duration: fund.duration,
              amount: fund.initialAmount,
            });
            // Map years and earnings for the dataset
            const { earnings } = response.data;

            return {
              label: fund.mutualFund,
              data: earnings.map((point) => point.earnings),
              borderColor: COLORS[index % COLORS.length],
              backgroundColor: COLORS[index % COLORS.length] + "33",
              fill: true,
            };
          })
        );

        // X-axis labels (Years)
        const labels = Array.from({ length: funds[0].duration }, (_, index) => `${index + 1} Year`);

        setChartData({ labels, datasets: results });
      } catch (err) {
        console.error("Error fetching graph data:", err);
        setError("Unable to load graph data.");
      }
    };

    fetchEarningsData();
  }, [funds]);

  if (!chartData) {
    return <p>Loading graph...</p>;
  }

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          x: { title: { display: true, text: "Years" } },
          y: { title: { display: true, text: "Earnings (USD)" }, beginAtZero: true },
        },
      }}
    />
  );
};

export default Graph;