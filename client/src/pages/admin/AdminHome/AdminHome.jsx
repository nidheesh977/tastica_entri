import { WeeklySales } from "../../../components/admin/WeeklySales/WeeklySales";
import { CategorySales } from "../../../components/admin/CategorySales/CategorySales";
import { MonthlySales } from "../../../components/admin/MonthlySales/MonthlySales";
import { SalesPerformance } from "../../../components/admin/SalesPerformance/SalesPerformance";
import { YearlySales } from "../../../components/admin/YearlySales/YearlySales";
import { SalesChart } from "../../../components/admin/SalesChart/SalesChart";
import { useState } from "react";
import { useDashboard } from "../../../hooks/useDashboard";

export const AdminHome = () => {
  const [selectedMethodMonth, setSelectedMethodMonth] = useState("all");
  const [selectedMethodWeek, setSelectedMethodWeek] = useState("all");
  const [selectedMethodYear, setSelectedMethodYear] = useState("all");
  const [date, setDate] = useState("");
  const [year, setYear] = useState(0);
  const [customYear, setCustomYear] = useState(0);
  const [month, setMonth] = useState("");
  const [customMonth, setCustomMonth] = useState("");
  const [day, setDay] = useState("");
  const {
    categoriesSalesDataAdmin,
    monthSalesBarChartDataAdmin,
    weeklySalesBarChartDataAdmin,
    yearlySalesBarChartDataAdmin,
    dateSalesAdmin,
    monthSalesAdmin,
    yearSalesAdmin,
    monthSalesLineChartDataAdmin,
  } = useDashboard({
    selectedMethodMonth,
    selectedMethodWeek,
    selectedMethodYear,
    year,
    month,
    day,
    customMonth,
    customYear,
  });

  return (
    <>
      <div className="p-2 gap-2 grid grid-cols-12">
        <div className="col-span-12 md:col-span-6  lg:col-span-4">
          <CategorySales invoices={categoriesSalesDataAdmin} />
        </div>
        <div className="col-span-12 md:col-span-6  lg:col-span-4">
          <SalesPerformance
            date={date}
            customMonth={customMonth}
            customYear={customYear}
            setYear={setYear}
            setDate={setDate}
            setMonth={setMonth}
            setCustomMonth={setCustomMonth}
            setCustomYear={setCustomYear}
            setDay={setDay}
            dateSales={dateSalesAdmin}
            yearSales={yearSalesAdmin}
            monthSales={monthSalesAdmin}
          />
        </div>
        <div className="col-span-12 md:col-span-6  lg:col-span-4 ">
          <SalesChart invoices={monthSalesLineChartDataAdmin} />
        </div>

        <div className="col-span-12 md:col-span-6  lg:col-span-4">
          <WeeklySales
            invoices={weeklySalesBarChartDataAdmin}
            method={setSelectedMethodWeek}
          />
        </div>
        <div className="col-span-12 md:col-span-6  lg:col-span-4">
          <MonthlySales
            invoices={monthSalesBarChartDataAdmin}
            method={setSelectedMethodMonth}
          />
        </div>
        <div className="col-span-12 md:col-span-6  lg:col-span-4">
          <YearlySales
            invoices={yearlySalesBarChartDataAdmin}
            method={setSelectedMethodYear}
          />
        </div>
      </div>
    </>
  );
};
