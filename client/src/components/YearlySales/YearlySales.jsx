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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const YearlySales = () => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchDummyData = () => {
      const dummyOrders = [
        { createdAt: "2021-06-15", totalPrice: 64000 },
        { createdAt: "2022-04-10", totalPrice: 72000 },
        { createdAt: "2023-07-20", totalPrice: 81000 },
        { createdAt: "2024-01-05", totalPrice: 89000 },
        { createdAt: "2025-03-17", totalPrice: 95000 },
      ];

      const labels = dummyOrders.map((order) =>
        new Date(order.createdAt).getFullYear()
      );

      const totalPrices = dummyOrders.map((order) => order.totalPrice);

      setChart({
        labels,
        datasets: [
          {
            label: "Yearly Sales ₹",
            data: totalPrices,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      });
    };

    fetchDummyData();
  }, []);

  return (
    <div className="w-full h-full border p-4 rounded shadow">
      <h1 className="font-semibold text-lg mb-4">Yearly Sales Trends</h1>
      {chart ? (
        <Bar data={chart} options={{ responsive: true }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
