import { WeeklySales } from "../../../components/admin/WeeklySales/WeeklySales";
import { CategorySales } from "../../../components/admin/CategorySales/CategorySales";
import { MonthlySales } from "../../../components/admin/MonthlySales/MonthlySales";
import { SalesPerformance } from "../../../components/admin/SalesPerformance/SalesPerformance";
import { YearlySales } from "../../../components/admin/YearlySales/YearlySales";
import { SalesChart } from "../../../components/admin/SalesChart/SalesChart";

export const AdminHome = () => {
  return (
    <>
      <div className="lg:h-[650px] p-1">
        <section className="grid grid-cols-12 gap-2">
          <div className="col-span-12 lg:col-span-4">
            <CategorySales />
          </div>
          <div className="col-span-12 lg:col-span-5 xl:col-span-4">
            <SalesPerformance />
          </div>
          <div className="col-span-12 lg:col-span-3 xl:col-span-4">
            <SalesChart />
          </div>
        </section>
        <section className="grid grid-cols-12 gap-2 mt-2">
          <div className="col-span-12 lg:col-span-4">
            <WeeklySales />
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
  )
}
