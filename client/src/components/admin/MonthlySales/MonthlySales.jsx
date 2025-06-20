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
import { medium } from "../../../../utils/constants";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const MonthlySales = ({ invoices }) => {
  const [chart, setChart] = useState(null);
  const [cash, setCash] = useState(false);
  const [swipe, setSwipe] = useState(false);
  const [stripe, setStripe] = useState(false);
  const [all, setAll] = useState(true);

  useEffect(() => {
    if (!invoices || invoices.length === 0) return;

    const monthlyTotals = {};

    invoices.forEach((invoice) => {
      const date = new Date(invoice.createdAt);

      // Optional: add filtering logic here if needed
      if (cash && invoice.paymentMethod !== "cash") return;
      if (swipe && invoice.paymentMethod !== "swipe") return;
      if (stripe && invoice.paymentMethod !== "stripe") return;

      const month = date.toLocaleDateString("en-IN", {
        month: "long",
      });

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
      monthlyTotals[month] += invoice.totalAmount || 0;
    });

    const monthOrder = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const labels = monthOrder.filter((m) => monthlyTotals[m] !== undefined);
    const data = labels.map((month) => monthlyTotals[month]);

    setChart({
      labels,
      datasets: [
        {
          label: "Monthly Sales ₹",
          data,
          backgroundColor: medium,
          borderColor: medium,
          borderWidth: 1,
        },
      ],
    });
  }, [invoices, cash, swipe, stripe, all]);

  return (
    <div className="w-full h-full xl:h-[332px] border p-4 rounded shadow flex flex-col">
      <h1 className="font-semibold text-sm xl:hidden mb-2">
          Monthly Sales Trends:
        </h1>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold hidden xl:block">
          Monthly Sales Trends:
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

      <div className="relative -z-40  w-full h-60 px-2 py-4 flex-1 flex items-center justify-center">
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
