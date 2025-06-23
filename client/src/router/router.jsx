import { createBrowserRouter } from "react-router-dom";
import { ShopLayout } from "../layout/ShopLayout";
import { ErrorPage } from "../pages/shared/ErrorPage/ErrorPage";
import { AdminHome } from "../pages/admin/AdminHome/AdminHome";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import { ProtectedRouteStaff } from "./ProtectedRouteStaff";
import { ProtectedRouteShop } from "./ProtectedRouteShop";
import { ProtectedRouteSuperAdmin } from "./ProtectedRouteSuperAdmin";
import { Home } from "../pages/shop/Home/Home";
import { AdminLayout } from "../layout/AdminLayout";
import { StaffLayout } from "../layout/StaffLayout";
import { SuperAdminLayout } from "../layout/SuperAdminLayout";
import { Cart } from "../pages/shared/Cart/Cart";
import { AddProductCard } from "../components/shared/AddProductCard/AddProductCard";
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
import { ListInvoices } from "../pages/shared/ListInvoices/ListInvoices";
import { OpenOrders } from "../pages/shared/OpenOrders/OpenOrders";
import { AddNewCustomProduct } from "../pages/shared/AddNewCustomProduct/AddNewCustomProduct";
import { AddCustomProduct } from "../components/shared/AddCustomProduct/AddCustomProduct";
import { UploadProductsCSV } from "../pages/admin/UploadProductsCSV/UploadProductsCSV";
import { UploadCategoriesCSV } from "../pages/admin/UploadCategoriesCSV/UploadCategoriesCSV";
import { PaymentSuccess } from "../pages/shared/PaymentSuccess/PaymentSuccess";
import { PaymentCancel } from "../pages/shared/PaymentCancel/PaymentCancel";
import { InvoiceData } from "../pages/shared/InvoiceData/InvoiceData";
import { ListCustomerInvoices } from "../pages/shared/ListCustomerInvoices/ListCustomerInvoices";
import { OpenOrderCartView } from "../pages/shared/OpenOrderCartView/OpenOrderCartView";
import { LoyaltyPoints } from "../pages/admin/LoyaltyPoints/LoyaltyPoints";
import { SuperAdminLoginPage } from "../pages/superAdmin/SuperAdminLoginPage/SuperAdminLoginPage";
import { CreateShop } from "../pages/superAdmin/CreateShop/CreateShop";
import { SuperAdminHome } from "../pages/superAdmin/SuperAdminHome/SuperAdminHome";
import { CreateStaff } from "../pages/superAdmin/CreateStaff/CreateStaff";
import { ListShops } from "../pages/superAdmin/ListShops/ListShops";
import { ListStaffsSuperAdmin } from "../pages/superAdmin/ListStaffsSuperAdmin/ListStaffsSuperAdmin";
import { AdminPasswordReset } from "../pages/admin/AdminPasswordReset/AdminPasswordReset";
import { AdminForgotPasswordMail } from "../pages/admin/AdminForgotPasswordEmail/AdminForgotPasswordEmail";
import { SuperAdminPasswordReset } from "../pages/superAdmin/SuperAdminPasswordReset/SuperAdminPasswordReset";
import { Permissions } from "../pages/admin/Permissions/Permissions";
import { SuperAdminPermissions } from "../pages/superAdmin/SuperAdminPermissions/SuperAdminPermissions";
import { SuperAdminForgotPasswordMail } from "../pages/superAdmin/superAdminForgotPasswordMail/SuperAdminForgotPasswordMail";
import { StaffPasswordReset } from "../pages/admin/StaffResetPassword/StaffResetPassword";
import { EmployeeResetPassword } from "../pages/superAdmin/EmployeeResetPassword/EmployeeResetPassword";
import { AddCategoryStaff } from "../pages/staff/AddCategoryStaff/AddCategoryStaff";
import { ListCategoriesStaff } from "../pages/staff/ListCategoriesStaff/ListCategoriesStaff";
import { UploadCategoriesStaff } from "../pages/staff/UploadCategoriesStaff/UploadCategoriesStaff";
import { AddProductStaff } from "../pages/staff/AddProductStaff/AddProductStaff";
import { ListProductsStaff } from "../pages/staff/ListProductsStaff/ListProductsStaff";
import { UploadProductsStaff } from "../pages/staff/UploadProductsStaffs/UploadProductsStaff";
import { AddCustomerStaff } from "../pages/staff/AddCustomerStaff/AddCustomerStaff";
import { ListCustomersStaff } from "../pages/staff/ListCustomersStaff/ListCustomersStaff";
import { ShopPasswordReset } from "../pages/superAdmin/ShopResetPassword/ShopResetPassword";
import { CustomInvoice } from "../pages/admin/CustomInvoice/CustomInvoice";

export const router = createBrowserRouter([
  // Shop rotes
  {
    path: "",
    element: <ShopLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <ShopLoginPage /> },
      // { path: "", element: <CustomInvoice /> },

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
            path: "admin/reset/password/send/mail",
            element: <AdminForgotPasswordMail />,
          },
          {
            path: "admin/reset/password/:token",
            element: <AdminPasswordReset />,
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
          },
          {
            path: "add/product",
            element: <AddProductCard />,
          },
          {
            path: "add/custom/product",
            element: <AddNewCustomProduct />,
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
            path: "upload/products/csv",
            element: <UploadProductsCSV />,
          },
          {
            path: "upload/categories/csv",
            element: <UploadCategoriesCSV />,
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
            path: "staff/reset/password/:staffId",
            element: <StaffPasswordReset />,
          },
          {
            path: "customer/view",
            element: <ListCustomers />,
          },
          {
            path: "customer/view/invoice/:id",
            element: <ListCustomerInvoices />,
          },
          {
            path: "customer/add",
            element: <AddNewCustomer />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "open/orders",
            element: <OpenOrders />,
          },
          {
            path: "open/orders/data/:id",
            element: <OpenOrderCartView />,
          },
          {
            path: "invoices",
            element: <ListInvoices />,
          },
          {
            path: "invoice/data/:id",
            element: <InvoiceData />,
          },
          {
            path: "loyalty/points",
            element: <LoyaltyPoints />,
          },
          {
            path: "payment/success",
            element: <PaymentSuccess />,
          },
          {
            path: "payment/cancel",
            element: <PaymentCancel />,
          },
          {
            path: "permissions/:id",
            element: <Permissions />,
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
        children: [
          { path: "", element: <StaffHome /> },

          {
            path: "open/orders",
            element: <OpenOrders />,
          },
          {
            path: "open/orders/data/:id",
            element: <OpenOrderCartView />,
          },
          {
            path: "invoice/data/:id",
            element: <InvoiceData />,
          },

          {
            path: "add/product",
            element: <AddProductStaff />,
          },
          {
            path: "view/product",
            element: <ListProductsStaff />,
          },
          {
            path: "add/custom/product",
            element: <AddCustomProduct />,
          },
          {
            path: "product/view",
            element: <ListProductsStaff />,
          },
          {
            path: "category/view",
            element: <ListCategoriesStaff />,
          },
          {
            path: "add/category",
            element: <AddCategoryStaff />,
          },
          {
            path: "customer/view",
            element: <ListCustomersStaff />,
          },
          {
            path: "customer/add",
            element: <AddCustomerStaff />,
          },
          {
            path: "upload/products/csv",
            element: <UploadProductsStaff />,
          },
          {
            path: "upload/categories/csv",
            element: <UploadCategoriesStaff />,
          },
          {
            path: "customer/view/invoice/:id",
            element: <ListCustomerInvoices />,
          },
          {
            path: "payment/success",
            element: <PaymentSuccess />,
          },
          {
            path: "payment/cancel",
            element: <PaymentCancel />,
          },
        ],
      },
    ],
  },
  // Super Admin
  {
    path: "",
    element: <SuperAdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "super/admin/login", element: <SuperAdminLoginPage /> },
      {
        path: "super/admin/reset/password/send/mail",
        element: <SuperAdminForgotPasswordMail />,
      },
      {
        path: "super/admin/reset/password/:token",
        element: <SuperAdminPasswordReset />,
      },

      {
        path: "super/admin",
        element: <ProtectedRouteSuperAdmin />,
        children: [
          { path: "", element: <SuperAdminHome /> },

          {
            path: "create/shop",
            element: <CreateShop />,
          },
          {
            path: "shop/reset/password/:shopId",
            element: <ShopPasswordReset />,
          },
          {
            path: "create/staff",
            element: <CreateStaff />,
          },
          {
            path: "staffs",
            element: <ListStaffsSuperAdmin />,
          },
          {
            path: "employee/reset/password/:employeeId",
            element: <EmployeeResetPassword />,
          },

          {
            path: "permissions/:id",
            element: <SuperAdminPermissions />,
          },
          {
            path: "shops",
            element: <ListShops />,
          },
        ],
      },
    ],
  },
]);
