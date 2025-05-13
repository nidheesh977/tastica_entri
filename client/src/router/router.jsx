import { createBrowserRouter } from "react-router-dom";
import { ShopLayout } from "../layout/ShopLayout";
import { ErrorPage } from "../pages/shared/ErrorPage/ErrorPage";
import { AdminHome } from "../pages/admin/AdminHome/AdminHome";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import { ProtectedRouteStaff } from "./ProtectedRouteStaff";
import { ProtectedRouteShop } from "./ProtectedRouteShop";
import { Home } from "../pages/shop/Home/Home";
import { AdminLayout } from "../layout/AdminLayout";
import { StaffLayout } from "../layout/StaffLayout";
import { Cart } from "../pages/shared/Cart/Cart";
import { AddProductCard } from "../components/shared/AddProdutCard/AddProductCard";
import { StaffHome } from "../pages/staff/StaffHome/StaffHome";
import { AddNewCategory } from "../pages/shared/AddNewCategory/AddNewCategory";
import { ListStaffs } from "../pages/admin/ListStaffs/ListStaffs";
import { ListCustomers } from "../pages/shared/ListCustomers/ListCustomers";
import { AddNewCustomer } from "../pages/shared/AddNewCustomer/AddNewCustomer";
import { ListCategories } from "../pages/shared/ListCategories/ListCategories";
import { ListProducts } from "../pages/shared/ListProducts/ListProducts";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage/AdminLoginPage";
import { StaffSignupPage } from "../pages/staff/StaffSignupPage/StaffSignupPage";
import { StaffLoginPage } from "../pages/staff/StaffLoginPage/StaffLoginPage";
import { ShopLoginPage } from "../pages/shop/ShopLoginPage/ShopLoginPage";
import { ShopSignupPage } from "../pages/shop/ShopSignupPage/ShopSignupPage";

export const router = createBrowserRouter([
  // Shop rotes
  {
    path: "",
    element: <ShopLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <ShopLoginPage /> },

      {
        path: "shop",
        element: <ProtectedRouteShop />,
        children: [
          { path: "", element: <Home /> },

          {
            path: "admin/login",
            element: <AdminLoginPage />,
          },
          {
            path: "staff/login",
            element: <StaffLoginPage />,
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
            element: <ShopSignupPage />,
          },
          {
            path: "signup",
            // element: <Login role="Admin" action="Signup" />,
          },
          {
            path: "add/product",
            element: <AddProductCard />,
          },
          {
            path: "product/view",
            element: <ListProducts />,
          },
          {
            path: "category/view",
            element: <ListCategories />,
          },
          {
            path: "add/category",
            element: <AddNewCategory />,
          },
          {
            path: "staff/signup",
            element: <StaffSignupPage />,
          },
          {
            path: "staff/view",
            element: <ListStaffs />,
          },
          {
            path: "customer/view",
            element: <ListCustomers />,
          },
          {
            path: "customer/add",
            element: <AddNewCustomer />,
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
        path: "product/view",
        element: <ListProducts />,
      },
      {
        path: "category/view",
        element: <ListCategories />,
      },
      {
        path: "add/category",
        element: <AddNewCategory />,
      },
      {
        path: "customer/view",
        element: <ListCustomers />,
      },
      {
        path: "customer/add",
        element: <AddNewCustomer />,
      },
    ],
  },
]);
