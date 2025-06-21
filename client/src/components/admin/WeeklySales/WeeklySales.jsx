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
import { dark } from "../../../../utils/constants";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const WeeklySales = ({ invoices }) => {
  const [chart, setChart] = useState(null);
  const [cash, setCash] = useState(false);
  const [swipe, setSwipe] = useState(false);
  const [stripe, setStripe] = useState(false);
  const [all, setAll] = useState(true);

  useEffect(() => {
    if (!invoices || invoices.length === 0) return;

    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);

    const dailyTotals = {};

    invoices.forEach((invoice) => {
      const date = new Date(invoice.createdAt);
      if (date >= sevenDaysAgo && date <= now) {
        const dayKey = date.toISOString().split("T")[0];

        if (!dailyTotals[dayKey]) {
          dailyTotals[dayKey] = { date, amount: 0 };
        }

        dailyTotals[dayKey].amount += invoice.totalAmount || 0;
      }
    });

    const sortedEntries = Object.entries(dailyTotals).sort(
      (a, b) => new Date(a[1].date) - new Date(b[1].date)
    );

    const labels = sortedEntries.map(([_, { date }]) =>
      date.toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    );

    const data = sortedEntries.map(([_, { amount }]) => amount);

    setChart({
      labels,
      datasets: [
        {
          label: "Order Total ₹",
          data,
          backgroundColor: dark,
          borderColor: dark,
          borderWidth: 1,
        },
      ],
    });
  }, [invoices]);

  return (
    <div className="w-full h-full xl:h-[332px] border p-4 rounded shadow flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-sm md:text-base">
          Weekly Sales Trends:
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
              setAll(false);
            }}
          >
            Stripe
          </span>
        </div>
      </div>

      <div className="relative w-full h-60 px-2 py-4 flex-1 flex items-center justify-center">
        {chart ? (
          <Bar
            data={chart}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
              layout: {
                padding: {
                  top: 10,
                  bottom: 10,
                  left: 0,
                  right: 0,
                },
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
