import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { useAdmins } from "../../../hooks/useAdmins";
import { dark, medium, light } from "../../../utils/constants";

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
          backgroundColor: [`${dark}`, `${medium}`, `${light}`],
          borderColor: [`${dark}`, `${medium}`, `${light}`],
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
