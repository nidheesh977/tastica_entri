import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  addSuperAdminData,
  removeSuperAdminData,
} from "../redux/features/authSlice";
import { axiosInstance } from "../config/axiosInstance";
import { SuperAdminSideBar } from "../components/superAdmin/SuperAdminSideBar/SuperAdminSideBar";
import { storeError } from "../redux/features/errorSlice";

export const ProtectedRouteSuperAdmin = () => {
  const isSuperAdmin = useSelector((state) => state?.auth?.superAdminData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkAdmin = async () => {
    if (isSuperAdmin) return;
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/super-admin/check-logged",
      });
      dispatch(addSuperAdminData(response?.data?.data));
    } catch (error) {
      dispatch(removeSuperAdminData());
      dispatch(storeError(error?.response?.data?.message));
      navigate("/super/admin/login");
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <>
      <SuperAdminSideBar />
      <Outlet />
    </>
  );
};
