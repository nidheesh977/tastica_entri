import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { dark, medium, light } from "../../../utils/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategorySales = ({ invoices }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!invoices) return;

    const labels = invoices.map((item) => item.category);
    const values = invoices.map((item) => item.roundedTotalAmount);

    setChartData({
      labels,
      datasets: [
        {
          label: "Sales by Category ₹",
          data: values,
          backgroundColor: [dark, medium, light],
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    });
  }, [invoices]);

  return (
    <div className="w-full h-full xl:h-[332px] shadow border rounded p-4 flex flex-col">
      <h1 className="font-semibold text-sm xl:text-base mb-2">
        Category Sales Trends:
      </h1>

      <div className="relative -z-40 w-full h-60 px-2 py-4 flex-1 flex items-center justify-center">
        {chartData ? (
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                  labels: {
                    font: { size: 10 },
                  },
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.label || "";
                      const value = context.raw || 0;
                      return `${label}: ₹${value.toFixed(2)}`;
                    },
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
