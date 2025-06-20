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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);
import { dark } from "../../../../utils/constants";

export const SalesChart = ({ invoices }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!invoices || invoices.length === 0) return;

    const salesByMonth = {};

    invoices.forEach(({ createdAt, totalAmount }) => {
      if (!createdAt || totalAmount == null) return;

      const date = new Date(createdAt);

      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}`;

      if (!salesByMonth[monthYear]) {
        salesByMonth[monthYear] = 0;
      }
      salesByMonth[monthYear] += totalAmount;
    });

    const sortedMonths = Object.keys(salesByMonth).sort();

    const labels = sortedMonths.map((my) => {
      const [year, month] = my.split("-");
      const date = new Date(year, month - 1);
      return date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
    });

    const sales = sortedMonths.map((my) => salesByMonth[my]);

    setChartData({
      labels,
      datasets: [
        {
          label: "Monthly Sales ₹",
          data: sales,
          fill: false,
          borderColor: `${dark}`,
          backgroundColor: `${dark}`,
          tension: 0.4,
        },
      ],
    });
  }, [invoices]);

  return (
    <div className="w-full p-2 md:h-96 md:p-10 lg:p-2 border rounded shadow">
      <h1 className="font-semibold mb-4 lg:p-10">Monthly Sales</h1>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: { position: "top" },
              title: { display: false },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
