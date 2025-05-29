import {
  FaHome,
  FaUsers,
  FaFileCsv,
  FaBoxOpen,
  FaUserTie,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronDown, HiOutlinePlusCircle } from "react-icons/hi";
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
import { toggleSideBar } from "../../../redux/features/sidebarSlice";
import { useState } from "react";

export const AdminSideBar = () => {
  const sidebar = useSelector((state) => state.sidebar.sideBar);
  const [home, setHome] = useState(false);
  const [add, setAdd] = useState(false);
  const [csv, setCsv] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSideBar = (route) => {
    navigate(route);
  };

  return (
    <div
      className={`
      fixed top-15 md:top-[99px]  left-0 h-[81%] md:h-[77%] xl:h-[81%] w-60 bg-tertiary backdrop-blur  shadow-2xl text-primary
      transform ${sidebar ? "translate-x-0" : "-translate-x-full"}
      transition-transform duration-300 ease-in-out
      z-50
    `}
    >
      <ul className="w-full flex flex-col bg-tertiary gap-1 text-lg font-bold p-2 transition-all duration-1000">
        <li
          onClick={() => {
            handleSideBar("/admin");
            setHome(!home);
          }}
          className={
            " bg-tertiary rounded  border flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
          }
        >
          <FaHome />
          Home
          <HiChevronDown
            className={`transform transition-transform duration-300 ${
              home ? "rotate-180" : ""
            }`}
          />
        </li>
        {home && (
          <>
            {" "}
            <li
              onClick={() => {
                handleSideBar("/admin/product/view");
                dispatch(toggleSideBar());
              }}
              className={`bg-tertiary rounded ${home ? "border border-primary" : "border"} flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 `}
            >
              <FaBoxOpen />
              Products
            </li>
            <li
              onClick={() => {
                handleSideBar("/admin/category/view");
                dispatch(toggleSideBar());
              }}
              className={`bg-tertiary rounded ${home ? "border border-primary" : "border"} flex items-center  hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10`}
            >
              <MdCategory />
              Categories
            </li>
            <li
              onClick={() => {
                handleSideBar("/admin/staff/view");
                dispatch(toggleSideBar());
              }}
              className={` bg-tertiary rounded ${home ? "border border-primary" : "border"} flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10`}
            >
              <MdGroups />
              Staffs
            </li>
            <li
              onClick={() => {
                handleSideBar("/admin/customer/view");
                dispatch(toggleSideBar());
              }}
              className={`bg-tertiary ${home ? "border border-primary" : "border"} rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10`}
            >
              <FaUsers />
              Customers
            </li>
          </>
        )}

        <li
          onClick={() => setAdd(!add)}
          className=" bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <HiOutlinePlusCircle />
          Add
          <HiChevronDown
            className={`transform transition-transform duration-300 ${add ? "rotate-180" : ""}`}
          />
        </li>
        {add && (
          <>
            {" "}
            <li
              onClick={() => {
                handleSideBar("/admin/staff/signup");
                dispatch(toggleSideBar());
              }}
              className={` bg-tertiary ${add ? "border border-primary" : "border"} rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10`}
            >
              <FaUserTie />
              Add Staff
            </li>
            <li
              onClick={() => {
                handleSideBar("/admin/customer/add");
                dispatch(toggleSideBar());
              }}
              className={`bg-tertiary ${add ? "border border-primary" : "border"} rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10`}
            >
              <MdPersonAdd />
              Add Customer
            </li>
            <li
              onClick={() => {
                handleSideBar("/admin/add/product");
                dispatch(toggleSideBar());
              }}
              className={`bg-tertiary ${add ? "border border-primary" : "border"} rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10`}
            >
              <FaBox />
              Add Product
            </li>
            <li
              onClick={() => {
                handleSideBar("/admin/add/category");
                dispatch(toggleSideBar());
              }}
              className={`bg-tertiary ${add ? "border border-primary" : "border"} rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10`}
            >
              <BiCategory />
              Add Category
            </li>
          </>
        )}

        <li
          onClick={() => setCsv(!csv)}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaFileCsv />
          Upload CSV
          <HiChevronDown
            className={`transform transition-transform duration-300 ${csv ? "rotate-180" : ""}`}
          />
        </li>
        {csv && (
          <>
            <li
              onClick={() => {
                handleSideBar("/admin/upload/products/csv");
                dispatch(toggleSideBar());
              }}
              className={`bg-tertiary ${csv ? "border border-primary" : "border"} rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10`}
            >
              <FaBox />
              Products CSV
            </li>
            <li
              onClick={() => {
                handleSideBar("/admin/upload/categories/csv");
                dispatch(toggleSideBar());
              }}
              className={`bg-tertiary ${csv ? "border border-primary" : "border"} rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10`}
            >
              <BiCategory />
              Categories CSV
            </li>
          </>
        )}

        <li
          onClick={() => {
            handleSideBar("/admin/cart");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaShoppingCart />
          Shopping Cart
        </li>

        <li
          onClick={() => {
            handleSideBar("/admin/invoices");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdEventNote />
          Invoices
        </li>

        <li
          onClick={() => {
            handleSideBar("/admin/open/orders");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdReceipt />
          Open Orders
        </li>
      </ul>
    </div>
  );
};
