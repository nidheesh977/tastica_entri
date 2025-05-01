import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ShopHeader } from "../components/shop/ShopHeader/ShopHeader";
import { Footer } from "../components/shared/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { removeAdminData, removeShopData } from "../redux/features/authSlice";
import { axiosInstance } from "../config/axiosInstance";

export const ShopLayout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const checkShop = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/shop/check-logged",
      });
    } catch (error) {
      dispatch(removeShopData());

      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkShop();
  }, [location.pathname]);

  if (loading) <div className="text-black">Loading...</div>;

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
