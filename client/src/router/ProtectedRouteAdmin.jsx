import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
  const isAdmin = useSelector((state) => state?.auth?.adminData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/shop/admin/login");
      return;
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  return <Outlet />;
};
