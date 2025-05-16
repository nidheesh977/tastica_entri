import { BarChart } from "../../../components/admin/BarChart/BarChart";
import { DoughnutChart } from "../../../components/admin/DoughnutCart/DoughnutChart";
import { ExpenseProfitChart } from "../../../components/admin/ExpenseProfitChart/ExpenseProfitChart";
import { MonthlySales } from "../../../components/admin/MonthlySales/MonthlySales";
import { SalesPerformance } from "../../../components/admin/SalesPerformance/SalesPerformance";
import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { YearlySales } from "../../../components/admin/YearlySales/YearlySales";

export const AdminHome = () => {
  return (
    <>
      <SideBar />
      <div className="lg:h-[700px] p-1">
        <section className="grid grid-cols-12 gap-2">
          <div className="col-span-12 lg:col-span-4">
            <DoughnutChart />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <SalesPerformance />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <ExpenseProfitChart />
          </div>
        </section>
        <section className="grid grid-cols-12 gap-2 mt-2">
          <div className="col-span-12 lg:col-span-4">
            <BarChart />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <MonthlySales />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <YearlySales />
          </div>
        </section>
      </div>
    </>
  );
};
