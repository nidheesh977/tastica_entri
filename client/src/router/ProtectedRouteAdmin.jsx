import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  addAdminData,
  addShopData,
  removeAdminData,
  removeShopData,
} from "../redux/features/authSlice";
import { axiosInstance } from "../config/axiosInstance";
import { AdminSideBar } from "../components/admin/AdminSideBar/AdminSideBar";
import {storeError} from '../redux/features/errorSlice'

export const ProtectedRouteAdmin = () => {
  const isAdmin = useSelector((state) => state?.auth?.adminData);
  const isShop = useSelector((state) => state?.auth?.shopData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkShop = async () => {
    if (isShop) return;
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/shop/check-login",
      });
      dispatch(addShopData(response?.data?.data));
    } catch (error) {
      
      dispatch(storeError(error?.response?.data?.message))
      dispatch(removeShopData());
      navigate("/");
    }
  };

  const checkAdmin = async () => {
    if (isAdmin) return;
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/check-logged",
      });
      dispatch(addAdminData(response?.data?.data));
    } catch (error) {
      dispatch(storeError(error?.response?.data?.message))
      dispatch(removeAdminData());
      navigate("/shop/admin/login");
    }
  };
  

  useEffect(() => {
    checkShop();
    checkAdmin();
  }, []);

  return (
    <>
      <AdminSideBar />
      <Outlet />
    </>
  );
};
