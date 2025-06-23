import { FaHome, FaUsers, FaFileCsv, FaBoxOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronDown } from "react-icons/hi";
import { MdPersonAdd, MdCategory, MdReceipt } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { toggleSideBar } from "../../../redux/features/sidebarSlice";
import { useState } from "react";

export const StaffSideBar = () => {
  const sidebar = useSelector((state) => state.sidebar.sideBar);
  const permissions = useSelector(
    (state) => state?.auth?.staffData?.permissions
  );
  const [home, setHome] = useState(false);
  const [productManagement, setProductManagement] = useState(false);
  const [customerManagement, setCustomerManagement] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSideBar = (route) => {
    navigate(route);
  };

  return (
    <div
      className={`
      fixed top-15 md:top-[77px]  left-0 h-[81%] md:h-[77%] xl:h-[83%] md:w-96 bg-tertiary backdrop-blur  shadow-2xl text-primary
      transform ${sidebar ? "translate-x-0" : "-translate-x-full"}
      transition-transform duration-300 ease-in-out
      z-50
    `}
    >
      <ul className="w-full flex flex-col bg-tertiary gap-1 text-lg font-bold p-2 transition-all duration-1000">
        <li
          onClick={() => {
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
            {permissions?.includes("product_read") && (
              <li
                onClick={() => {
                  handleSideBar("/staff/product/view");
                  dispatch(toggleSideBar());
                }}
                className="bg-tertiary rounded 
              flex items-center hover:bg-orange-50  cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
              >
                <FaBoxOpen />
                Products
              </li>
            )}
            {permissions?.includes("category_read") && (
              <li
                onClick={() => {
                  handleSideBar("/staff/category/view");
                  dispatch(toggleSideBar());
                }}
                className="bg-tertiary rounded flex items-center  hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
              >
                <MdCategory />
                Categories
              </li>
            )}

            {permissions?.includes("customer_read") && (
              <li
                onClick={() => {
                  handleSideBar("/staff/customer/view");
                  dispatch(toggleSideBar());
                }}
                className="bg-tertiary
              rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
              >
                <FaUsers />
                Customers
              </li>
            )}
          </>
        )}

        {permissions?.includes("customer_create") && (
          <>
            <li
              onClick={() => setCustomerManagement(!customerManagement)}
              className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
            >
              <FaUsers />
              Customer Management
              <HiChevronDown
                className={`transform transition-transform duration-300 ${
                  customerManagement ? "rotate-180" : ""
                }`}
              />
            </li>

            {customerManagement && (
              <>
                <li
                  onClick={() => {
                    handleSideBar("/staff/customer/add");
                    dispatch(toggleSideBar());
                  }}
                  className="bg-tertiary rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
                >
                  <MdPersonAdd />
                  Add Customer
                </li>
              </>
            )}
          </>
        )}

        <li
          onClick={() => setProductManagement(!productManagement)}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaBoxOpen />
          Product Management
          <HiChevronDown
            className={`transform transition-transform duration-300  ${
              productManagement ? "rotate-180" : ""
            }`}
          />
        </li>

        {productManagement && (
          <>
            {permissions?.includes("product_create") && (
              <>
                <li
                  onClick={() => {
                    handleSideBar("/staff/add/product");
                    dispatch(toggleSideBar());
                  }}
                  className="bg-tertiary rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
                >
                  <FaBox />
                  Add Product
                </li>
                <li
                  onClick={() => {
                    handleSideBar("/staff/upload/products/csv");
                    dispatch(toggleSideBar());
                  }}
                  className="bg-tertiary  rounded flex items-center text-sm md:text-lg hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
                >
                  <FaFileCsv />
                  Upload Products CSV File
                </li>
              </>
            )}
            {permissions?.includes("category_create") && (
              <>
                <li
                  onClick={() => {
                    handleSideBar("/staff/add/category");
                    dispatch(toggleSideBar());
                  }}
                  className="bg-tertiary  rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
                >
                  <BiCategory />
                  Add Category
                </li>
                <li
                  onClick={() => {
                    handleSideBar("/staff/upload/categories/csv");
                    dispatch(toggleSideBar());
                  }}
                  className="bg-tertiary 
                
              rounded flex text-xs md:text-lg items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
                >
                  <FaFileCsv />
                  Upload Categories CSV File
                </li>
              </>
            )}
          </>
        )}

        <li
          onClick={() => {
            handleSideBar("/staff");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 "
        >
          <FaShoppingCart />
          Shopping Cart
        </li>

        <li
          onClick={() => {
            handleSideBar("/staff/open/orders");
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
