import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const ProtectedRouteStaff = () => {
  const isStaff = useSelector((state) => state?.auth?.staffData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isStaff) {
      navigate("/shop/staff/login");
      return;
    }
  }, [isStaff, navigate]);

  if (!isStaff) {
    return null;
  }

  return <Outlet />;
};
