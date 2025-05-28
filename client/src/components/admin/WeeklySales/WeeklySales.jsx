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
import { useAdmins } from "../../../hooks/useAdmins";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

import {dark} from '../../../utils/constants'

export const WeeklySales = () => {
  const [chart, setChart] = useState(null);
  const { invoices } = useAdmins();

  useEffect(() => {
    if (!invoices || invoices.length === 0) return;

    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);

    const dailyTotals = {};

    invoices.forEach((invoice) => {
      const date = new Date(invoice.createdAt);
      if (date >= sevenDaysAgo && date <= now) {
        const label = date.toLocaleDateString("en-IN", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });

        if (!dailyTotals[label]) {
          dailyTotals[label] = 0;
        }
        dailyTotals[label] += invoice.totalAmount || 0;
      }
    });

    const sortedLabels = Object.keys(dailyTotals).sort((a, b) => {
      return new Date(a) - new Date(b);
    });

    const data = sortedLabels.map((label) => dailyTotals[label]);

    setChart({
      labels: sortedLabels,
      datasets: [
        {
          label: "Order Total ₹",
          data,
          backgroundColor: `${dark}`,
          borderColor: `${dark}`,
          borderWidth: 1,
        },
      ],
    });
  }, [invoices]);

  return (
    <div className="w-full h-full border p-4 rounded shadow">
      <h1 className="font-semibold">Weekly Sales Trends</h1>
      {chart ? (
        <Bar data={chart} options={{ responsive: true }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
