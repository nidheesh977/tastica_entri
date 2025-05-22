import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addStaffData, removeStaffData } from "../redux/features/authSlice";
import { axiosInstance } from "../config/axiosInstance";
import { StaffSideBar } from "../components/staff/StaffSideBar/StaffSideBar";

export const ProtectedRouteStaff = () => {
  const isStaff = useSelector((state) => state?.auth?.staffData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkStaff = async () => {
    if (isStaff) return;
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/staff/check-logged",
      });
      dispatch(addStaffData(response?.data?.data));
      console.log(response);
      
    } catch (error) {
      dispatch(removeStaffData());
      navigate("/shop/staff/login");
      console.log(error);
      
    }
  };

  useEffect(() => {
    checkStaff();
  }, [location.pathname]);

  return <>
  <StaffSideBar/>
  <Outlet />;
  </>
};
