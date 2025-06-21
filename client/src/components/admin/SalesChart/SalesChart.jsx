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
import { dark } from "../../../../utils/constants";

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
  const [cash, setCash] = useState(false);
  const [swipe, setSwipe] = useState(false);
  const [stripe, setStripe] = useState(false);
  const [all, setAll] = useState(true);

  useEffect(() => {
    if (!invoices || invoices.length === 0) return;

    const salesByMonth = {};

    invoices.forEach(({ createdAt, totalAmount }) => {
      if (!createdAt || totalAmount == null) return;

      const date = new Date(createdAt);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
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
          borderColor: dark,
          backgroundColor: dark,
          tension: 0.4,
        },
      ],
    });
  }, [invoices]);

  return (
    <div className="w-full h-full xl:h-[332px] border p-4 rounded shadow flex flex-col">
      <h1 className="font-semibold text-sm xl:hidden mb-2">Monthly Sales:</h1>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold hidden xl:block">Monthly Sales:</h1>
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
              setAll(false);
            }}
          >
            Stripe
          </span>
        </div>
      </div>

      <div className="relative -z-40 w-full h-60 px-2 py-4 flex-1 flex items-center justify-center">
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
                title: { display: false },
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
