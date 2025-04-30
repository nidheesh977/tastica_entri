import { Outlet, useLocation } from "react-router-dom";
import { ShopHeader } from "../components/shop/ShopHeader/ShopHeader";
import { Footer } from "../components/shared/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addShopData, removeShopData } from "../redux/features/authSlice";
import { axiosInstance } from "../config/axiosInstance";

export const ShopLayout = () => {
  const location = useLocation();

  const isShop = useSelector((state) => state?.auth?.shopData);
  const dispatch = useDispatch();

  const checkShop = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/shop/check-logged",
      });
      console.log("check shop: ", response);
      dispatch(addShopData());
    } catch (error) {
      dispatch(removeShopData());
    }
  };

  useEffect(() => {
    checkShop();
  }, [location.pathname]);
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
