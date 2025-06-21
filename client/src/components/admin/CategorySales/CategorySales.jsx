import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { dark, medium, light } from "../../../../utils/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategorySales = ({ invoices }) => {
  const [chartData, setChartData] = useState(null);
  const [cash, setCash] = useState(false);
  const [swipe, setSwipe] = useState(false);
  const [stripe, setStripe] = useState(false);
  const [all, setAll] = useState(true);

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
    <div className="w-full h-full xl:h-[332px] shadow border rounded p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-sm md:text-base">
          Category Sales Trends:
        </h1>
        <div className="flex gap-3">
          <span
            className={`cursor-pointer text-sm px-2 pb-1 ${
              all ? "border-b-2 border-black" : ""
            }`}
            onClick={() => {
              setAll(true);
              setCash(false);
              setSwipe(false);
              setStripe(false);
            }}
          >
            All
          </span>
          <span
            className={`cursor-pointer text-sm px-2 pb-1 ${
              cash ? "border-b-2 border-black" : ""
            }`}
            onClick={() => {
              setCash(true);
              setSwipe(false);
              setStripe(false);
              setAll(false);
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
              setAll(false);
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
              setAll(false); // Fixed here
            }}
          >
            Stripe
          </span>
        </div>
      </div>

      <div className="relative w-full h-60 px-2 py-4 flex-1 flex items-center justify-center">
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
