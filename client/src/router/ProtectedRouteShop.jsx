import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { addShopData, removeShopData } from "../redux/features/authSlice";
import { storeError } from '../redux/features/errorSlice'

export const ProtectedRouteShop = () => {
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

  useEffect(() => {
    checkShop();
  }, []);

  return <Outlet />;
};
