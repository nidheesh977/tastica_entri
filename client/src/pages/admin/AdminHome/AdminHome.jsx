import { BarChart } from "../../../components/BarChart/BarChart";
import { DoughnutChart } from "../../../components/DoughnutCart/DoughnutChart";
import { ExpenseProfitChart } from "../../../components/ExpenseProfitChart/ExpenseProfitChart";
import { MonthlySales } from "../../../components/MonthlySales/MonthlySales";
import { SalesPerformance } from "../../../components/SalesPerformance/SalesPerformance";
import { SideBar } from "../../../components/shared/SideBar/SideBar";

import { YearlySales } from "../../../components/YearlySales/YearlySales";

export const AdminHome = () => {
  return (
    <>
      <SideBar />
      <div className="p-3 lg:h-[710px]">
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
        <section className="grid grid-cols-12 gap-2 my-2">
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
