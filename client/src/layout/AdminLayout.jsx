import { Outlet } from "react-router-dom";
import { ShopHeader } from "../components/shop/ShopHeader/ShopHeader";
import { Footer } from "../components/shared/Footer/Footer";
import { AdminHeader } from "../components/admin/AdminHeader/AdminHeader";


export const AdminLayout = () => {
  const admin = true;

  return (
    <div className="min-h-screen flex flex-col">
      <header>

      {admin ? <AdminHeader /> : <ShopHeader />}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
