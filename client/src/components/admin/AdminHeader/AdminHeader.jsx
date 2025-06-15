import { useDispatch, useSelector } from "react-redux";
import { MdReceipt, MdShoppingCart, MdClose, MdRefresh } from "react-icons/md";
import { toggleSideBar } from "../../../redux/features/sidebarSlice";
import { CgMenuLeft } from "react-icons/cg";
import { FaUserShield, FaRegStickyNote, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { saveSearchQuery } from "../../../redux/features/searchSlice";
import { useInvoices } from "../../../hooks/useInvoices";
import Logo from "../../../assets/logo.png";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";
import { removeAdminData } from "../../../redux/features/authSlice";
import { toggleCustomProductHandler } from "../../../redux/features/customProductSlice";

export const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const adminName = useSelector((state) => state?.auth?.adminData?.userName);
  const searchQuery = useSelector((state) => state?.search);
  const { clearInvoice } = useInvoices();

  const handleLogout = async () => {
    try {
      await axiosInstance({
        method: "POST",
        url: "/admin/logout",
        withCredentials: true,
      });
      dispatch(removeAdminData());
      toast("Logout success");
      navigate("/shop/admin/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to logout");
    }
  };

  const openNewInvoice = () => {
    window.open("/admin/cart", "_blank");
  };
  const { savedInvoices } = useInvoices();

  return (
    <nav className="w-full shadow-xl">
      <div className="md:flex mx-auto py-4 px-5 justify-between items-center bg-tertiary text-primary font-bold md:px-10">
        <div className="flex justify-between items-center">
          <div className="cursor-pointer flex items-center gap-4">
            <span
              onClick={() => dispatch(toggleSideBar())}
              className="border border-primary rounded p-2 bg-tertiary hover:bg-orange-50 hover:border-orange-600 "
            >
              <CgMenuLeft size={20} />
            </span>
            <img
              className="w-36 rounded md:hidden lg:block"
              src={Logo}
              alt="logo"
            />
            {(location.pathname === "/admin/cart" ||
              location.pathname.startsWith("/admin/open/orders/data/")) && (
              <span className="rounded-md shadow-xl items-center p-2 w-full">
                <MdRefresh
                  onClick={()=> clearInvoice()}
                  className=" hover:text-orange-600 mx-auto "
                  size={20}
                  title="Reset"
                />
              </span>
            )}
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
          <ul className="flex flex-col md:flex-row items-center font-thin gap-2 bg-tertiary  w-full  text-center md:gap-5">
            <li className=" md:border-none cursor-pointer rounded-md relative">
              <input
                className="border border-primary px-8 py-2 outline-primary rounded text-black w-[275px] md:w-52 lg:w-72 xl:w-96"
                placeholder="Smart Search"
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(saveSearchQuery(e.target.value))}
              />
              {searchQuery && (
                <MdClose
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-800 hover:text-red-500 cursor-pointer font-thin"
                  onClick={() => dispatch(saveSearchQuery(""))}
                />
              )}
            </li>

            <li
              className="cursor-pointer rounded shadow-xl w-full   p-2"
              title="Shopping Cart"
            >
              <MdShoppingCart
                className="hover:text-orange-600 mx-auto"
                size={20}
                onClick={() => navigate("/admin/cart")}
              />
            </li>

            {(location.pathname === "/admin/cart" ||
              location.pathname.startsWith("/admin/open/orders/data/")) && (
              <li
                className="cursor-pointer rounded-md shadow-xl w-full  p-2 "
                title="Add Custom Product"
              >
                <FaRegStickyNote
                  className="hover:text-orange-600 mx-auto"
                  size={20}
                  onClick={() => dispatch(toggleCustomProductHandler())}
                />
              </li>
            )}
            <li
              className="cursor-pointer rounded-md shadow-xl flex items-center  p-2 w-full  "
              title="Open Orders"
            >
              <MdReceipt
                className="hover:text-orange-600 mx-auto"
                size={20}
                onClick={() => navigate("/admin/open/orders")}
              />
              {savedInvoices?.length !== 0 && (
                <span className="flex items-center justify-center w-4 h-4 text-white text-xs  font-bold bg-primary border border-primary rounded-full">
                  {savedInvoices?.length}
                </span>
              )}
            </li>

            {(location.pathname === "/admin/cart" ||
              location.pathname.startsWith("/admin/open/orders/data/")) && (
              <li
                onClick={openNewInvoice}
                title="Create New Invoice"
                className=" hover:text-orange-600 cursor-pointer font-bold w-full  rounded-md  shadow-xl  p-2  "
              >
                <FaPlus size={20} className="mx-auto cursor-pointer" />
              </li>
            )}

            <li className="flex items-center w-full rounded-md  shadow-xl p-2">
              {adminName && <p className="text-xl mx-auto">{adminName}</p>}
            </li>
            <li className="w-full rounded-md shadow-xl p-2">
              {adminName && (
                <FaUserShield
                  size={20}
                  className="hover:text-orange-600 cursor-pointer mx-auto"
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
