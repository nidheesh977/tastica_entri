import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteShop = () => {
  const isShop = useSelector((state) => state?.auth?.shopData);
  const navigate = useNavigate();

  useEffect(() => {
    if (isShop === null) return;
    if (!isShop) {
      navigate("/");
    }
  }, [isShop, navigate]);

  if (!isShop) {
    return null;
  }

  return isShop && <Outlet />;
};
