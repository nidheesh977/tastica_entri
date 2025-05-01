import { Outlet, useLocation } from "react-router-dom";
import { ShopHeader } from "../components/shop/ShopHeader/ShopHeader";
import { Footer } from "../components/shared/Footer/Footer";
import { AdminHeader } from "../components/admin/AdminHeader/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { removeAdminData } from "../redux/features/authSlice";
import { useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const AdminLayout = () => {
  const location = useLocation();

  const isAdmin = useSelector((state) => state?.auth?.adminData);

  const dispatch = useDispatch();

  const checkAdmin = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/check-logged",
      });
      
    } catch (error) {
      dispatch(removeAdminData());
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

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
