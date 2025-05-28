import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdReceipt, MdShoppingCart, MdClose } from "react-icons/md";
import { toggleSideBar } from "../../../redux/features/sidebarSlice";
import { CgMenuLeft } from "react-icons/cg";
import { FaUserTie, FaRegStickyNote, FaPlus } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { saveSearchQuery } from "../../../redux/features/searchSlice";
import { useInvoices } from "../../../hooks/useInvoices";
import Logo from "../../../assets/logo.png";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";
import { removeStaffData } from "../../../redux/features/authSlice";

export const StaffHeader = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const staffName = useSelector((state) => state?.auth?.staffData?.userName);
  const searchQuery = useSelector((state) => state?.search);
  const { savedInvoices } = useInvoices();
  

  const handleLogout = async () => {
    try {
      await axiosInstance({
        method: "POST",
        url: "/staff/logout",
        withCredentials: true,
      });
      dispatch(removeStaffData);
      toast.success("Logout success");
      navigate("/shop/staff/login")

    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const openNewInvoice = () => {
    window.open("/staff", "_blank");
  };

  return (
    <nav className="w-full shadow-xl">
      <div className="md:flex mx-auto py-4 px-5 justify-between items-center bg-tertiary text-white font-bold md:px-10">
        <div className="flex justify-between items-center">
          <div
            onClick={() => dispatch(toggleSideBar())}
            className="cursor-pointer flex items-center gap-4"
          >
            <span className="border border-primary text-primary rounded p-2 bg-tertiary hover:bg-orange-50 hover:border-orange-600 ">
              <CgMenuLeft size={20} />
            </span>
            <img className="w-36 rounded" src={Logo} alt="logo" />
          </div>

          <div className="md:hidden">
            <IoMenu size={20} onClick={() => setOpen(!open)} />
          </div>
        </div>

        <div
          className={`flex w-full md:w-auto md:block mt-2 md:mt-0 justify-end ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row items-center font-thin gap-2 bg-tertiary w-full text-center md:gap-5">
            <li className="md:border-none cursor-pointer rounded-md relative">
              <input
                className="border border-primary px-8 py-2 outline-primary rounded text-primary w-[275px] md:w-44 lg:w-96"
                placeholder="Smart Search"
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(saveSearchQuery(e.target.value))}
              />
              {searchQuery && (
                <MdClose
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-red-500 cursor-pointer font-thin"
                  onClick={() => dispatch(saveSearchQuery(""))}
                />
              )}
            </li>

            <li
              className="cursor-pointer rounded shadow-xl w-full p-2 text-primary"
              title="Shopping Cart"
            >
              <MdShoppingCart
                className="hover:text-orange-600 mx-auto"
                size={20}
                onClick={() => navigate("/staff")}
              />
            </li>

            <li
              className="cursor-pointer rounded-md shadow-xl w-full p-2 text-primary"
              title="Add Custom Product"
            >
              <FaRegStickyNote
                className="hover:text-orange-600 mx-auto"
                size={20}
                onClick={() => navigate("/staff/add/custom/product")}
              />
            </li>

            <li
              className="cursor-pointer flex items-center rounded-md shadow-xl p-2 w-full text-primary"
              title="Open Orders"
            >
              <MdReceipt
                className="hover:text-orange-600 mx-auto text-primary"
                size={20}
                onClick={() => navigate("/staff/open/orders")}
              />
              {savedInvoices?.length !== 0 && (
                <span className="flex items-center justify-center text-tertiary text-xs w-4 h-4  font-bold  bg-primary border border-primary rounded-full">
                  {savedInvoices?.length}
                </span>
              )}
            </li>

            <li
              onClick={openNewInvoice}
              title="Create New Invoice"
              className="hover:text-orange-600 cursor-pointer font-bold w-full rounded-md text-primary shadow-xl p-2"
            >
              <FaPlus size={20} className="mx-auto cursor-pointer" />
            </li>

            <li className="flex items-center w-full rounded-md shadow-xl p-2 text-primary">
              {staffName && <p className="text-xl mx-auto">{staffName}</p>}
            </li>
            <li className="w-full rounded-md shadow-xl p-2">
              {staffName && (
                <FaUserTie
                  size={20}
                  className="hover:text-orange-600 cursor-pointer mx-auto text-primary"
                  onClick={() => handleLogout()}
                  title="Logout"
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
