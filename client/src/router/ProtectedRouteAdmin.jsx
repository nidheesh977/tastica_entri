import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
  const isAdmin = useSelector((state) => state?.auth?.adminData);
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate("/shop/admin/login");
    return;
  }
  return <Outlet />;
};
