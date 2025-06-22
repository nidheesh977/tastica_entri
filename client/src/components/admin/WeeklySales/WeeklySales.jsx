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
import { dark } from "../../../utils/constants";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const WeeklySales = ({ invoices, method }) => {
  const [chart, setChart] = useState(null);
  const [cash, setCash] = useState(false);
  const [swipe, setSwipe] = useState(false);
  const [stripe, setStripe] = useState(false);
  const [all, setAll] = useState(true);

  useEffect(() => {
    if (!invoices) return;
    const limitedData = invoices.slice(-7);

    const labels = limitedData.map((item) => item.day);
    const data = limitedData.map((item) => item.roundedTotalAmount);

    setChart({
      labels,
      datasets: [
        {
          label: "Weekly Sales ₹",
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
      <h1 className="font-semibold text-sm xl:hidden mb-2">
        Weekly Sales Trends:
      </h1>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold hidden xl:block">Weekly Sales Trends:</h1>
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
              method("all");
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
              method("cash");
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
              method("internal-device");
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
              method("digital");
            }}
          >
            Stripe
          </span>
        </div>
      </div>

      <div className="relative -z-40 w-full h-60 px-2 py-4 flex-1 flex items-center justify-center">
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
