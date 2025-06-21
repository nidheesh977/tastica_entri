import { WeeklySales } from "../../../components/admin/WeeklySales/WeeklySales";
import { CategorySales } from "../../../components/admin/CategorySales/CategorySales";
import { MonthlySales } from "../../../components/admin/MonthlySales/MonthlySales";
import { SalesPerformance } from "../../../components/admin/SalesPerformance/SalesPerformance";
import { YearlySales } from "../../../components/admin/YearlySales/YearlySales";
import { SalesChart } from "../../../components/admin/SalesChart/SalesChart";
import { useAdmins } from "../../../hooks/useAdmins";

export const AdminHome = () => {
  const { invoices } = useAdmins();
  return (
    <>
      <div className="p-2 gap-2 grid grid-cols-12">
        <div className="col-span-12 md:col-span-6  lg:col-span-4">
          <CategorySales invoices={invoices} />
        </div>
        <div className="col-span-12 md:col-span-6  lg:col-span-4">
          <SalesPerformance />
        </div>
        <div className="col-span-12 md:col-span-6  lg:col-span-4 ">
          <SalesChart invoices={invoices} />
        </div>

        <div className="col-span-12 md:col-span-6  lg:col-span-4">
          <WeeklySales invoices={invoices} />
        </div>
        <div className="col-span-12 md:col-span-6  lg:col-span-4">
          <MonthlySales invoices={invoices} />
        </div>
        <div className="col-span-12 md:col-span-6  lg:col-span-4">
          <YearlySales invoices={invoices} />
        </div>
      </div>
    </>
  );
};
