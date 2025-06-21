import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { dark, medium, light } from "../../../../utils/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategorySales = ({ invoices }) => {
  const [chartData, setChartData] = useState(null);
  const [cash, setCash] = useState(true);
  const [swipe, setSwipe] = useState(false);
  const [stripe, setStripe] = useState(false);

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
          backgroundColor: [dark, medium, light],
          borderColor: [dark, medium, light],
          borderWidth: 1,
        },
      ],
    });
  }, [invoices]);

  return (
    <div className="w-full h-[332px] shadow border rounded p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-sm md:text-base">
          Category Sales Trends:
        </h1>
        <div className="flex gap-3">
          <span
            className={`cursor-pointer text-sm px-2 pb-1 ${
              cash ? "border-b-2 border-black" : ""
            }`}
            onClick={() => {
              setCash(true);
              setSwipe(false);
              setStripe(false);
            }}
          >
            Cash
          </span>
          <span
            className={`cursor-pointer text-sm px-2 pb-1 ${
              swipe ? "border-b-2 border-black" : ""
            }`}
            onClick={() => {
              setSwipe(true);
              setCash(false);
              setStripe(false);
            }}
          >
            Swipe
          </span>
          <span
            className={`cursor-pointer text-sm px-2 pb-1 ${
              stripe ? "border-b-2 border-black" : ""
            }`}
            onClick={() => {
              setStripe(true);
              setSwipe(false);
              setCash(false);
            }}
          >
            Stripe
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-2">
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
    </div>
  );
};
