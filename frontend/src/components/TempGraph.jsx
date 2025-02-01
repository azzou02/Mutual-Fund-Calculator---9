import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { format, subYears } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Expanded mock data (edit these arrays)
const portfolioDates = [
    "2020-01-05", "2020-07-10", "2021-01-15", "2021-07-20", 
    "2022-01-25", "2022-07-05", "2023-01-10", "2023-07-15",
    "2024-01-20", "2024-04-05", "2024-06-10"
];
const portfolioPrices = [
    10000.00, 10750.45, 9500.67, 12300.89, 
    11800.12, 12700.34, 12200.56, 14300.78,
    14800.90, 16200.11, 16582.32
];

const Graph = () => {
  const [selectedRange, setSelectedRange] = useState('max');
  
  const { filteredDates, filteredPrices } = useMemo(() => {
    const today = new Date();
    let cutoffDate = new Date(0); // Default to all time
    
    switch(selectedRange) {
      case '1Y': cutoffDate = subYears(today, 1); break;
      case '5Y': cutoffDate = subYears(today, 5); break;
      // 'max' uses default cutoffDate (1970)
    }
    
    const filteredData = portfolioDates.reduce((acc, dateStr, index) => {
      const date = new Date(dateStr);
      if (date >= cutoffDate) {
        acc.dates.push(dateStr);
        acc.prices.push(portfolioPrices[index]);
      }
      return acc;
    }, { dates: [], prices: [] });

    return {
      filteredDates: filteredData.dates,
      filteredPrices: filteredData.prices
    };
  }, [selectedRange]);

  // Chart configuration
  const chartData = {
    labels: filteredDates.map(date => format(new Date(date), 'MMM yyyy')),
    datasets: [{
      label: "Portfolio Value",
      data: filteredPrices,
      borderColor: "#4A90E2",
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(74, 144, 226, 0.4)");
        gradient.addColorStop(1, "rgba(74, 144, 226, 0.01)");
        return gradient;
      },
      fill: true,
      tension: 0.3,
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 6,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#4A90E2",
    }]
  };

return (
    <div className="relative h-full w-full">
        <Line
            data={chartData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255,255,255,0.1)',
                        callbacks: {
                            title: ([item]) => format(new Date(filteredDates[item.dataIndex]), 'MMM d, yyyy'),
                            label: (ctx) => ` $${ctx.raw.toLocaleString()}`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: '#666',
                            maxRotation: 0,
                            autoSkip: true,
                            callback: (value) => {
                                const date = new Date(filteredDates[value]);
                                return selectedRange === '1Y' 
                                    ? format(date, 'MMM') 
                                    : format(date, 'MMM yyyy');
                            }
                        }
                    },
                    y: {
                        position: 'right',
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: {
                            color: '#666',
                            callback: (value) => `$${value.toLocaleString()}`,
                            padding: 10
                        },
                        border: { display: false }
                    }
                },
                elements: {
                    line: { cubicInterpolationMode: 'monotonic' }
                }
            }}
        />
    </div>
);
};

export default Graph;