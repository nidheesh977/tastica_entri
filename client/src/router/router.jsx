import { createBrowserRouter } from "react-router-dom";
import { ShopLayout } from "../layout/ShopLayout";
import { ErrorPage } from "../pages/shared/ErrorPage/ErrorPage";
import { ShopSignup } from "../pages/shop/ShopSignup/ShopSignup";
import { AdminHome } from "../pages/admin/AdminHome/AdminHome";
import { ShopLogin } from "../pages/shop/ShopLogin/ShopLogin";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import { ProtectedRouteStaff } from "./ProtectedRouteStaff";
import { ProtectedRouteShop } from "./ProtectedRouteShop";
import { Home } from "../pages/shared/Home/Home";
import { AdminLayout } from "../layout/AdminLayout";
import { StaffLayout } from "../layout/StaffLayout";
import { Login } from "../components/shared/Login/Login";
import { Cart } from "../pages/shared/Cart/Cart";

export const router = createBrowserRouter([
  {
    path: "",
    element: <ShopLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <ShopLogin action="Login" /> },

      {
        path: "shop",
        element: <ProtectedRouteShop />,
        children: [
          { path: "", element: <Home /> },

          {
            path: "login",
            element: <Login role="Admin" action="Login" />,
          },
          {
            path: "login",
            element: <Login role="Staff" action="Login" />,
          },
        ],
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ProtectedRouteAdmin />,
        children: [
          { path: "", element: <AdminHome /> },
          {
            path: "signup",
            element: <ShopSignup action="Signup" />,
          },
          {
            path: "staff/signup",
            element: <Login role="Staff" action="Signup" />,
          },
        ],
      },
    ],
  },
  {
    path: "staff",
    element: <StaffLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ProtectedRouteStaff />,
        children: [{ path: "cart", element: <Cart /> }],
      },
    ],
  },
]);
