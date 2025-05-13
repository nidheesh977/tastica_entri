import { useDispatch, useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";
import { toggleSideBar } from "../../../redux/features/sidebarSlice";
import { CgMenuLeft } from "react-icons/cg";
import { FaUserShield, FaRegStickyNote, FaPlus } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { saveSearchQuery } from "../../../redux/features/searchSlice";
import { useAdmins } from "../../../hooks/useAdmins";

export const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const adminName = useSelector((state) => state?.auth?.adminData?.userName);
  const searchQuery = useSelector((state) => state?.search);
  const { logout } = useAdmins();

  const openNewInvoice = () => {
    window.open("/admin/cart", "_blank");
  };

  return (
    <nav className="w-full">
      <div className="md:flex mx-auto py-4 px-5 justify-between items-center bg-primary text-white font-bold md:px-10">
        <div className="flex justify-between items-center w-full md:w-1/2">
          <div
            onClick={() => dispatch(toggleSideBar())}
            className="cursor-pointer flex items-center gap-4"
          >
            <span className="border rounded p-2 bg-[#155E95] hover:opacity-70">
              <CgMenuLeft size={20} />
            </span>
            <span className="text-xl font-thin">Tastica</span>
          </div>

          <div className="md:hidden">
            <IoMenu size={20} onClick={() => setOpen(!open)} />
          </div>
        </div>

        <div
          className={`flex w-full md:w-auto md:block mt-14 md:mt-0 justify-end ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="md:flex items-center justify-center font-thin gap-10 bg-primary p-5 md:p-0 w-full text-center">
            {location.pathname === "/admin/cart" && (
              <>
                <li className="mb-2 md:border-none cursor-pointer rounded-md py-2 md:py-0">
                  <input
                    className="bg-[#E8F9FF] px-8 py-2 outline-[#155E95] rounded text-black w-full"
                    placeholder="Search Here"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => dispatch(saveSearchQuery(e.target.value))}
                  />
                </li>
                <li
                  className="border cursor-pointer rounded-md py-2 md:py-0 mb-2 md:border-none"
                  title="Add Custom Product"
                >
                  <FaRegStickyNote className="hover:text-blue-100" size={20} />
                </li>
                <li
                  onClick={openNewInvoice}
                  title="Create New Invoice"
                  className="border md:border-none hover:text-blue-100 cursor-pointer font-bold  rounded-md md:py-0 mb-2"
                >
                  <FaPlus size={20} />
                </li>
              </>
            )}
            <li className="flex items-center mb-2 gap-5">
              {adminName && <p className="text-xl">{adminName}</p>}
              {adminName && <FaUserShield size={20} />}
              {adminName && (
                <MdLogout
                  title="Logout"
                  size={20}
                  onClick={() => logout()}
                  className="cursor-pointer hover:text-secondary"
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
