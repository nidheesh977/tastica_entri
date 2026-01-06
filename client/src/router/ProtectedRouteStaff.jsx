import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  addShopData,
  addStaffData,
  removeShopData,
  removeStaffData,
  addAuthPermissions,
  removeAuthPermissions
} from "../redux/features/authSlice";
import { axiosInstance } from "../config/axiosInstance";
import { StaffSideBar } from "../components/staff/StaffSideBar/StaffSideBar";
import { storeError } from "../redux/features/errorSlice";
export const ProtectedRouteStaff = () => {
  const isStaff = useSelector((state) => state?.auth?.staffData);
  const isShop = useSelector((state) => state?.auth?.shopData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation()

  const checkShop = async () => {
    if (isShop) return;
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/shop/check-login",
      });
      dispatch(addShopData(response?.data?.data));
    } catch (error) {
      dispatch(storeError(error?.response?.data?.message));
      dispatch(removeShopData());
      navigate("/");
    }
  };

  const checkStaff = async () => {
    if (isStaff) return;
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/staff/check-logged",
      });
      dispatch(addStaffData(response?.data?.data));
      dispatch(addAuthPermissions(response?.data?.data?.permissions));
    } catch (error) {
      dispatch(removeStaffData());
      dispatch(storeError(error?.response?.data?.message));
      dispatch(removeAuthPermissions());
      navigate("/shop/staff/login");
    }
  };

  useEffect(() => {
    checkShop();
    checkStaff();
  }, []);

  return (
    <>
      <StaffSideBar />
      <Outlet />
    </>
  );
};
