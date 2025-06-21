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
import { light } from "../../../../utils/constants";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const YearlySales = ({ invoices }) => {
  const [chart, setChart] = useState(null);
  const [cash, setCash] = useState(true);
  const [swipe, setSwipe] = useState(false);
  const [stripe, setStripe] = useState(false);

  useEffect(() => {
    if (!invoices || invoices.length === 0) return;

    const salesByYear = invoices.reduce((acc, invoice) => {
      const year = new Date(invoice.createdAt).getFullYear();
      acc[year] = (acc[year] || 0) + invoice.subTotal;
      return acc;
    }, {});

    const sortedYears = Object.keys(salesByYear).sort();
    const totals = sortedYears.map((year) => salesByYear[year]);

    setChart({
      labels: sortedYears,
      datasets: [
        {
          label: "Yearly Sales ₹",
          data: totals,
          backgroundColor: light,
          borderColor: light,
          borderWidth: 1,
        },
      ],
    });
  }, [invoices]);

  return (
    <div className="w-full h-[400px] border p-4 rounded shadow flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-semibold text-sm md:text-base">Yearly Sales Trends:</h1>
        <div className="flex gap-3">
          <span
            className={`cursor-pointer text-sm ${cash ? "border-b-2 border-black" : ""}`}
            onClick={() => {
              setCash(true);
              setSwipe(false);
              setStripe(false);
            }}
          >
            cash
          </span>
          <span
            className={`cursor-pointer text-sm ${swipe ? "border-b-2 border-black" : ""}`}
            onClick={() => {
              setSwipe(true);
              setCash(false);
              setStripe(false);
            }}
          >
            swipe
          </span>
          <span
            className={`cursor-pointer text-sm ${stripe ? "border-b-2 border-black" : ""}`}
            onClick={() => {
              setStripe(true);
              setSwipe(false);
              setCash(false);
            }}
          >
            stripe
          </span>
        </div>
      </div>

      <div className="flex-1">
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
