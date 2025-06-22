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
import { dark } from "../../../utils/constants";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const SalesChart = ({ invoices }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!invoices) return;

    const sorted = [...invoices].sort((a, b) => a.day - b.day);

    const month = sorted[0]?.month || 1;
    const year = sorted[0]?.year || 2025;

    const monthLabel = new Date(year, month - 1).toLocaleString("default", {
      month: "short",
    });

    const labels = sorted.map(() => monthLabel);
    const tooltipLabels = sorted.map((inv) =>
      new Date(year, month - 1, inv.day).toLocaleDateString("default", {
        day: "numeric",
        month: "short",
      })
    );
    const sales = sorted.map((inv) => inv.roundedTotalAmount);

    setChartData({
      labels,
      datasets: [
        {
          label: "Daily Sales ₹",
          data: sales,
          pointBackgroundColor: dark,
          borderColor: dark,
          backgroundColor: dark,
          tension: 0.4,
        },
      ],
      tooltipLabels,
    });
  }, [invoices]);

  return (
    <div className="w-full h-full xl:h-[332px] border p-4 rounded shadow flex flex-col">
      <h1 className="font-semibold text-sm xl:hidden mb-2">Daily Sales:</h1>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold hidden xl:block">
          This Month Sales Trend:
        </h1>
      </div>

      <div className="relative -z-40 w-full h-60 px-2 py-4 flex-1 flex items-center justify-center">
        {chartData ? (
          <Line
            data={{
              labels: chartData.labels,
              datasets: chartData.datasets,
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const index = context.dataIndex;
                      const dateLabel = chartData.tooltipLabels?.[index];
                      const value = context.formattedValue;
                      return `${dateLabel}: ₹${value}`;
                    },
                  },
                },
              },
              layout: {
                padding: { top: 10, bottom: 10, left: 0, right: 0 },
              },
              scales: {
                x: {
                  ticks: {
                    font: { size: 10 },
                  },
                },
                y: {
                  ticks: {
                    font: { size: 10 },
                  },
                },
              },
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
