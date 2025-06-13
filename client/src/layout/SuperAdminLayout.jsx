import { Outlet } from "react-router-dom";
import { ShopHeader } from "../components/shop/ShopHeader/ShopHeader";
import { Footer } from "../components/shared/Footer/Footer";
import { useSelector } from "react-redux";
import { SuperAdminHeader } from "../components/superAdmin/SuperAdminHeader/SuperAdminHeader";

export const SuperAdminLayout = () => {
  const isSuperAdmin = useSelector((state) => state?.auth?.superAdminData);

  return (
    <div className="min-h-screen flex flex-col">
      <header>{isSuperAdmin ? <SuperAdminHeader/> : <ShopHeader />}</header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
