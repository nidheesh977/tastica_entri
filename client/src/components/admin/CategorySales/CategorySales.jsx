import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategorySales = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const dummyResponse = {
          data: {
            categories: {
              "Curry Powder": 1200,
              Oil: 950,
              Detergents: 780,
              Vegetables: 1340,
              Fruits: 890,
              Cosmetics: 900,
            },
          },
        };

        const categories = dummyResponse.data.categories;

        setChartData({
          labels: Object.keys(categories),
          datasets: [
            {
              label: "Sales by Category ₹",
              data: Object.values(categories),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(113, 102, 255, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(113, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div className="w-full h-96 shadow border rounded p-10">
      <h1 className="font-semibold ">Category Sales Trends</h1>
      {chartData ? (
        <Doughnut
          options={{
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
              },
            },
          }}
          data={chartData}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
