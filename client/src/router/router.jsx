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
import { AddProductCard } from "../components/shared/AddProdutCard/AddProductCard";
import { StaffHome } from "../pages/staff/StaffHome/StaffHome";
import { SignupAndLogin } from "../pages/shared/SignupAndLogin/SignupAndLogin";
import { AddNewCategory } from "../pages/shared/AddNewCategory/AddNewCategory";
import { ListStaffs } from "../pages/admin/ListStaffs/ListStaffs";

export const router = createBrowserRouter([
  // Shop rotes
  {
    path: "",
    element: <ShopLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <ShopLogin action="Login" /> },
      // { path: "", element: <ListStaffs /> },

      {
        path: "shop",
        element: <ProtectedRouteShop />,
        children: [
          { path: "", element: <Home /> },

          {
            path: "admin/login",
            element: <Login role="Admin" action="Login" />,
          },
          {
            path: "staff/login",
            element: <Login role="Staff" action="Login" />,
          },
        ],
      },
    ],
  },

  // Admin routes
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
            path: "shop/signup",
            element: <ShopSignup role="Admin" action="Signup" />,
          },
          {
            path: "signup",
            element: <Login role="Admin" action="Signup" />,
          },
          {
            path: "add/product",
            element: <AddProductCard />,
          },
          {
            path: "add/category",
            element: <AddNewCategory />,
          },
          {
            path: "staff/signup",
            element: <SignupAndLogin role="Staff" action="Signup" />,
          },
          {
            path: "staff/view",
            element: <ListStaffs />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
    ],
  },

  // Staff routes
  {
    path: "staff",
    element: <StaffLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ProtectedRouteStaff />,
        children: [{ path: "", element: <StaffHome /> }],
      },
      {
        path: "add/product",
        element: <AddProductCard />,
      },
      {
        path: "add/category",
        element: <AddNewCategory />,
      },
    ],
  },
]);
