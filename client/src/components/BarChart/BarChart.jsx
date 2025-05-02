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

export const BarChart = ({ role = "admin" }) => {
  
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchDummyData = () => {
      // Dummy weekly data
      const dummyOrders = [
        { createdAt: "2025-04-26", totalPrice: 1200 },
        { createdAt: "2025-04-27", totalPrice: 1500 },
        { createdAt: "2025-04-28", totalPrice: 900 },
        { createdAt: "2025-04-29", totalPrice: 1100 },
        { createdAt: "2025-04-30", totalPrice: 1700 },
        { createdAt: "2025-05-01", totalPrice: 2000 },
        { createdAt: "2025-05-02", totalPrice: 1400 },
      ];

      const labels = dummyOrders.map((order) =>
        new Date(order.createdAt).toLocaleDateString("en-IN", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );

      const totalPrices = dummyOrders.map((order) => order.totalPrice);

      setChart({
        labels,
        datasets: [
          {
            label: "Order Total ₹",
            data: totalPrices,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      });
    };

    fetchDummyData();
  }, []);

  return (
    <div className="w-full h-full border p-4 rounded shadow">
      <h1 className="font-semibold"> Weekly Sales Trends</h1>
      {chart ? <Bar data={chart} options={{ responsive: true }} /> : <p>Loading...</p>}
    </div>
  );
};
