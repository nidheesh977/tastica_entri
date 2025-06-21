import { Outlet } from "react-router-dom";
import { Footer } from "../components/shared/Footer/Footer";
import { ShopHeader } from "../components/shop/ShopHeader/ShopHeader";
import { useSelector } from "react-redux";
import { StaffHeader } from "../components/staff/StaffHeader/StaffHeader";

export const StaffLayout = () => {
  const isStaff = useSelector((state) => state?.auth?.staffData);

  return (
    <div className="min-h-screen flex flex-col">
      <header>{isStaff ? <StaffHeader /> : <ShopHeader />}</header>
      <main className="flex-grow pt-20 pb-16">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
