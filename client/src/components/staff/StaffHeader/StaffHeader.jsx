import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../../redux/features/sidebarSlice";
import { CgMenuLeft } from "react-icons/cg";
import { FaUserTie, FaRegStickyNote, FaPlus } from "react-icons/fa";
import { MdLogout, MdReceipt } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { saveSearchQuery } from "../../../redux/features/searchSlice";
import { useStaffs } from "../../../hooks/useStaffs";

export const StaffHeader = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const staffName = useSelector((state) => state?.auth?.staffData?.userName);
  const searchQuery = useSelector((state) => state.search);
  const { logout } = useStaffs();
  const openNewInvoice = () => {
    window.open("/staff", "_blank");
  };

  return (
    <nav className="w-full">
      <div className="md:flex mx-auto py-4 px-5  justify-between items-center bg-primary text-white font-bold md:px-10 ">
        <div className="flex justify-between items-center w-full md:w-1/2">
          <div
            onClick={() => dispatch(toggleSideBar())}
            className="cursor-pointer flex items-center gap-4"
          >
            <span className="border rounded p-2 bg-primary hover:opacity-70">
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
          <ul className="md:flex items-center justify-center  font-thin  gap-10 bg-primary p-5 md:p-0 w-full text-center">
            {location.pathname === "/staff" && (
              <>
                <li className=" mb-2 md:border-none cursor-pointer rounded-md py-2 md:py-0">
                  <input
                    className="bg-[#E8F9FF] px-8 py-2 outline-[#155E95] rounded text-black w-full"
                    placeholder="Search Here"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => dispatch(saveSearchQuery(e.target.value))}
                  />
                </li>
                <li
                  className="border cursor-pointer rounded-md py-2 md:py-0   mb-2 md:border-none"
                  title="Add Custom Product"
                >
                  <FaRegStickyNote className="hover:text-blue-100" size={20} />
                </li>
                <li
                  className="cursor-pointer rounded-md py-2 md:py-0 mb-2 "
                  title="Open Orders"
                >
                  <MdReceipt
                    className="hover:text-blue-100"
                    size={20}
                  />
                  
                </li>
                <li
                  onClick={openNewInvoice}
                  className="border md:border-none  cursor-pointer font-bold text-3xl rounded-md  md:py-0   mb-2 "
                  title="Create New Invoice"
                >
                  <FaPlus size={20} />
                </li>
              </>
            )}
            <li className="flex items-center mb-2 gap-5">
              {staffName && <p className="text-xl">{staffName}</p>}
              {staffName && <FaUserTie size={20} />}
              {staffName && (
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
