import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { useAdmins } from "../../../hooks/useAdmins";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategorySales = () => {
  const [chartData, setChartData] = useState(null);
  const { invoices } = useAdmins();

  useEffect(() => {
    if (!invoices || invoices.length === 0) return;

    const categoryTotals = {};

    invoices.forEach((invoice) => {
      invoice.products?.forEach((product) => {
        const category = product.category || "Uncategorized";
        const amount = product.price * product.quantity;

        categoryTotals[category] = (categoryTotals[category] || 0) + amount;
      });
    });

    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    setChartData({
      labels,
      datasets: [
        {
          label: "Sales by Category ₹",
          data: values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(113, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(113, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [invoices]);

  return (
    <div className="w-full h-96 shadow border rounded p-10">
      <h1 className="font-semibold">Category Sales Trends</h1>
      {chartData ? (
        <Doughnut
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
              },
            },
          }}
          data={chartData}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
