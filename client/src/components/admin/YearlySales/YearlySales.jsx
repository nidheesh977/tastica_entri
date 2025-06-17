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
import {light} from '../../../../utils/constants'
export const YearlySales = () => {
  const [chart, setChart] = useState(null);
  const { invoices } = useAdmins();

  useEffect(() => {
    if (!invoices || invoices.length === 0) return;

    const salesByYear = invoices.reduce((acc, invoice) => {
      const year = new Date(invoice.createdAt).getFullYear();
      acc[year] = (acc[year] || 0) + invoice.subTotal;
      return acc;
    }, {});

    const sortedYears = Object.keys(salesByYear).sort();
    const totals = sortedYears.map(year => salesByYear[year]);

    setChart({
      labels: sortedYears,
      datasets: [
        {
          label: "Yearly Sales ₹",
          data: totals,
          backgroundColor:`${light}`,
          borderColor: `${light}`,
          borderWidth: 1,
        },
      ],
    });
  }, [invoices]);

  return (
    <div className="w-full h-full border p-4 rounded shadow">
      <h1 className="font-semibold text-lg mb-4">Yearly Sales Trends</h1>
      {chart ? (
        <Bar data={chart} options={{ responsive: true }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
