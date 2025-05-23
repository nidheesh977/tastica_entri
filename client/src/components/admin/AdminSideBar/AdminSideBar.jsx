import { FaHome, FaUsers, FaFileCsv } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaBoxOpen, FaUserTie } from "react-icons/fa";
import {
  MdPersonAdd,
  MdGroups,
  MdCategory,
  MdReceipt,
  MdEventNote,
} from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiCategory } from "react-icons/bi";

export const AdminSideBar = () => {
  const sidebar = useSelector((state) => state.sidebar.sideBar);
  const navigate = useNavigate();
  const handleSideBar = (route) => {
    navigate(route);
  };

  return (
    <div
      className={`
      fixed top-15 md:top-[99px]  left-0 h-[81%] md:h-[77%] xl:h-[81%] w-60 bg-tertiary backdrop-blur  shadow-2xl text-white
      transform ${sidebar ? "translate-x-0" : "-translate-x-full"}
      transition-transform duration-300 ease-in-out
      z-50
    `}
    >
      <ul className="w-full flex flex-col gap-1 text-lg font-bold p-2">
        <li
          onClick={() => handleSideBar("/admin")}
          className={
            " bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
          }
        >
          <FaHome />
          Home
        </li>

        <li
          onClick={() => handleSideBar("/admin/staff/view")}
          className=" bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdGroups />
          Staffs
        </li>

        <li
          onClick={() => handleSideBar("/admin/staff/signup")}
          className=" bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaUserTie />
          Add Staff
        </li>

        <li
          onClick={() => handleSideBar("/admin/customer/view")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaUsers />
          Customers
        </li>

        <li
          onClick={() => handleSideBar("/admin/customer/add")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdPersonAdd />
          Add Customer
        </li>

        <li
          onClick={() => handleSideBar("/admin/product/view")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaBoxOpen />
          Products
        </li>

        <li
          onClick={() => handleSideBar("/admin/add/product")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaBox />
          Add Product
        </li>

        <li
          onClick={() => handleSideBar("/admin/category/view")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdCategory />
          Categories
        </li>

        <li
          onClick={() => handleSideBar("/admin/add/category")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <BiCategory />
          Add Category
        </li>

        <li
          onClick={() => handleSideBar("/admin/upload/products/csv")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaFileCsv />
           Products
          
        </li>

        <li
          onClick={() => handleSideBar("/admin/upload/categories/csv")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaFileCsv />
          Categories
         
        </li>

        <li
          onClick={() => handleSideBar("/admin/cart")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaShoppingCart />
          Shopping Cart
        </li>

        <li
          onClick={() => handleSideBar("/admin/invoices")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdEventNote />
          Invoices
        </li>

        <li
          onClick={() => handleSideBar("/admin/open/orders")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdReceipt />
          Open Orders
        </li>
      </ul>
    </div>
  );
};
