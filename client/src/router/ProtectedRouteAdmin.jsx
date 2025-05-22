import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { addAdminData, removeAdminData } from "../redux/features/authSlice";
import { axiosInstance } from "../config/axiosInstance";
import { AdminSideBar } from "../components/admin/AdminSideBar/AdminSideBar";

export const ProtectedRouteAdmin = () => {
  const isAdmin = useSelector((state) => state?.auth?.adminData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkAdmin = async () => {
    if (isAdmin) return;
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/check-logged",
      });
      dispatch(addAdminData(response?.data?.data));
    } catch (error) {
      dispatch(removeAdminData());
      navigate("/shop/admin/login");
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <>
      <AdminSideBar />
      <Outlet />;
    </>
  );
};
