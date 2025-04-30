import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";
import { ShopHeader } from "../components/shop/ShopHeader/ShopHeader";
import { useDispatch } from "react-redux";
import { addStaffData, removeStaffData } from "../redux/features/authSlice";
import { axiosInstance } from "../config/axiosInstance";

export const StaffLayout = () => {
  const location = useLocation();

  const isStaff = useSelector((state) => state?.auth?.staffData);
  const dispatch = useDispatch();

  const checkStaff = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/staff/check-logged",
      });
      console.log("check staff: ", response);
      dispatch(addStaffData());
    } catch (error) {
      dispatch(removeStaffData());
    }
  };

  useEffect(() => {
    checkStaff();
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header>{isStaff ? <Header /> : <ShopHeader />}</header>

      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
