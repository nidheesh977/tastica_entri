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


ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

import {medium} from '../../../../utils/constants'

export const MonthlySales = ({invoices}) => {
  const [chart, setChart] = useState(null);
  

  useEffect(() => {
    if (!invoices || invoices.length === 0) return;

    const monthlyTotals = {};

    invoices.forEach((invoice) => {
      const date = new Date(invoice.createdAt);
      const month = date.toLocaleDateString("en-IN", {
        month: "long",
      });

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
      monthlyTotals[month] += invoice.totalAmount || 0;
    });

    const monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const labels = monthOrder.filter((m) => monthlyTotals[m] !== undefined);
    const data = labels.map((month) => monthlyTotals[month]);

    setChart({
      labels,
      datasets: [
        {
          label: "Monthly Sales ₹",
          data,
          backgroundColor: `${medium}`,
          borderColor: `${medium}`,
          borderWidth: 1,
        },
      ],
    });
  }, [invoices]);

  return (
    <div className="w-full h-full border p-4 rounded shadow">
      <h1 className="font-semibold text-lg mb-4">Monthly Sales Trends</h1>
      {chart ? (
        <Bar data={chart} options={{ responsive: true }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
