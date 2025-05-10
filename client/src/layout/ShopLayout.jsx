import { Outlet } from "react-router-dom";
import { ShopHeader } from "../components/shop/ShopHeader/ShopHeader";
import { Footer } from "../components/shared/Footer/Footer";

export const ShopLayout = () => {
  
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <ShopHeader />
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
