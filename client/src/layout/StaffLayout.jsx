import { Outlet } from "react-router-dom";
import { Header } from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";
import { ShopHeader } from "../components/shop/ShopHeader/ShopHeader";

export const StaffLayout = () => {
  const staff = true;

  return (
    <div className="min-h-screen flex flex-col">
      <header>

      {staff ? <Header /> : <ShopHeader />}
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
