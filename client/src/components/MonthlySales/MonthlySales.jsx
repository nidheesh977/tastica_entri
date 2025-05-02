import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

// Register chartjs components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const MonthlySales = () => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchDummyData = () => {
      const dummyOrders = [
        { createdAt: "2025-01-15", totalPrice: 8000 },
        { createdAt: "2025-02-10", totalPrice: 9500 },
        { createdAt: "2025-03-20", totalPrice: 12000 },
        { createdAt: "2025-04-05", totalPrice: 11000 },
        { createdAt: "2025-05-01", totalPrice: 15000 },
        { createdAt: "2025-06-17", totalPrice: 9800 },
        { createdAt: "2025-07-09", totalPrice: 13400 },
        { createdAt: "2025-08-22", totalPrice: 14300 },
        { createdAt: "2025-09-11", totalPrice: 16000 },
        { createdAt: "2025-10-03", totalPrice: 17500 },
        { createdAt: "2025-11-26", totalPrice: 16200 },
        { createdAt: "2025-12-15", totalPrice: 19000 },
      ];

      const labels = dummyOrders.map((order) =>
        new Date(order.createdAt).toLocaleDateString("en-IN", {
          month: "long",
        })
      );

      const totalPrices = dummyOrders.map((order) => order.totalPrice);

      setChart({
        labels,
        datasets: [
          {
            label: "Monthly Sales ₹",
            data: totalPrices,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    };

    fetchDummyData();
  }, []);

  return (
    <div className="w-full h-full border p-4 rounded shadow">
      <h1 className="font-semibold text-lg mb-4">Monthly Sales Trends</h1>
      {chart ? (
        <Bar data={chart} options={{ responsive: true }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
