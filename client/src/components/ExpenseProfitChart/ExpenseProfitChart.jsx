import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

// Register components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const ExpenseProfitChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Dummy monthly data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const expenses = [1200, 1500, 1000, 1300, 1400, 1100];
    const profits = [800, 1200, 900, 1500, 1700, 1600];

    setChartData({
      labels: months,
      datasets: [
        {
          label: "Expenses ₹",
          data: expenses,
          fill: false,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.4,
        },
        {
          label: "Profit ₹",
          data: profits,
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.4,
        },
      ],
    });
  }, []);

  return (
    <div className="w-full p-2 md:h-96 md:p-10 lg:p-2  border rounded shadow">
      <h1 className="font-semibold mb-4 lg:p-10">Monthly Expenses vs Profit</h1>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: false,
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
