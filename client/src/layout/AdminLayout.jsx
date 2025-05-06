import { Outlet } from "react-router-dom";
import { ShopHeader } from "../components/shop/ShopHeader/ShopHeader";
import { Footer } from "../components/shared/Footer/Footer";
import { AdminHeader } from "../components/admin/AdminHeader/AdminHeader";
import { useSelector } from "react-redux";

export const AdminLayout = () => {
  const isAdmin = useSelector((state) => state?.auth?.adminData);

  return (
    <div className="min-h-screen flex flex-col">
      <header>{isAdmin ? <AdminHeader /> : <ShopHeader />}</header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
