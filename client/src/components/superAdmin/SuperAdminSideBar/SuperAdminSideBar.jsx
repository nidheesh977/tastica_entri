import {
  FaHome,
  FaUsers,
  FaBoxOpen,
  FaUserTie,
  FaStoreAlt,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { HiChevronDown } from "react-icons/hi";
import {
  MdGroups,
  MdCategory,
  MdDashboard,
  MdStorefront,
} from "react-icons/md";

import { useNavigate } from "react-router-dom";

import { toggleSideBar } from "../../../redux/features/sidebarSlice";
import { useState } from "react";

export const SuperAdminSideBar = () => {
  const sidebar = useSelector((state) => state.sidebar.sideBar);
  const [home, setHome] = useState(false);
  const [shopManagement, setShopManagement] = useState(false);
  const [staffManagement, setStaffManagement] = useState(false);
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
            {" "}
            <li
              onClick={() => {
                handleSideBar("/super/admin");
                dispatch(toggleSideBar());
              }}
              className="bg-tertiary rounded 
              flex items-center hover:bg-orange-50  cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
            >
              <MdDashboard />
              Dashboard
            </li>
            <li
              onClick={() => {
                handleSideBar("/super/admin/shops");
                dispatch(toggleSideBar());
              }}
              className="bg-tertiary rounded 
              flex items-center hover:bg-orange-50  cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
            >
              <FaStoreAlt />
              Shops
            </li>
            <li
              onClick={() => {
                handleSideBar("/super/admin/staffs");
                dispatch(toggleSideBar());
              }}
              className="bg-tertiary rounded 
               
             flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
            >
              <MdGroups />
              Employees
            </li>
          </>
        )}

        <li
          onClick={() => setShopManagement(!shopManagement)}
          className=" bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdStorefront />
          Shop Management
          <HiChevronDown
            className={`transform transition-transform duration-300 ${
              shopManagement ? "rotate-180" : ""
            }`}
          />
        </li>
        {shopManagement && (
          <>
            {" "}
            <li
              onClick={() => {
                handleSideBar("/super/admin/create/shop");
                dispatch(toggleSideBar());
              }}
              className="bg-tertiary
              
              rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
            >
              <MdStorefront />
              Create Shop
            </li>
          </>
        )}

        <li
          onClick={() => setStaffManagement(!staffManagement)}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaUserTie />
          Employee Management
          <HiChevronDown
            className={`transform transition-transform duration-300 ${
              staffManagement ? "rotate-180" : ""
            }`}
          />
        </li>

        {staffManagement && (
          <>
            <li
              onClick={() => {
                handleSideBar("/super/admin/create/staff");
                dispatch(toggleSideBar());
              }}
              className="bg-tertiary rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
            >
              <MdGroups />
              Add Employee
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
