import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdReceipt, MdShoppingCart } from "react-icons/md";
import { toggleSideBar } from "../../../redux/features/sidebarSlice";
import { CgMenuLeft } from "react-icons/cg";
import { FaUserTie, FaRegStickyNote, FaPlus } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { saveSearchQuery } from "../../../redux/features/searchSlice";
import { useStaffs } from "../../../hooks/useStaffs";

export const StaffHeader = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const staffName = useSelector((state) => state?.auth?.staffData?.userName);
  const searchQuery = useSelector((state) => state?.search);
  const { logout } = useStaffs();

  const openNewInvoice = () => {
    window.open("/staff", "_blank");
  };

  return (
    <nav className="w-full">
      <div className="md:flex mx-auto py-4 px-5 justify-between items-center bg-primary text-white font-bold md:px-10">
        <div className="flex justify-between items-center">
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
          className={`flex w-full md:w-auto md:block mt-2 md:mt-0 justify-end ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row items-center font-thin gap-2 bg-primary w-full text-center md:gap-5">
            <li className="md:border-none cursor-pointer rounded-md">
              <input
                className="bg-[#E8F9FF] px-8 py-2 outline-[#155E95] rounded text-black w-[275px] md:w-44 lg:w-96"
                placeholder="Search Here"
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(saveSearchQuery(e.target.value))}
              />
            </li>

            <li
              className="cursor-pointer rounded shadow-xl w-full p-2"
              title="Shopping Cart"
            >
              <MdShoppingCart
                className="hover:text-blue-100 mx-auto"
                size={20}
                onClick={() => navigate("/staff")}
              />
            </li>

            <li
              className="cursor-pointer rounded-md shadow-xl w-full p-2"
              title="Add Custom Product"
            >
              <FaRegStickyNote
                className="hover:text-blue-100 mx-auto"
                size={20}
              />
            </li>

            <li
              className="cursor-pointer rounded-md shadow-xl p-2 w-full"
              title="Open Orders"
            >
              <MdReceipt
                className="hover:text-blue-100 mx-auto"
                size={20}
                onClick={() => navigate("/staff/open/orders")}
              />
            </li>

            <li
              onClick={openNewInvoice}
              title="Create New Invoice"
              className="hover:text-blue-100 cursor-pointer font-bold w-full rounded-md shadow-xl p-2"
            >
              <FaPlus size={20} className="mx-auto cursor-pointer" />
            </li>

            <li className="flex items-center w-full rounded-md shadow-xl p-2">
              {staffName && <p className="text-xl mx-auto">{staffName}</p>}
            </li>
            <li className="w-full rounded-md shadow-xl p-2">
              {staffName && (
                <FaUserTie
                  size={20}
                  className="hover:text-secondary cursor-pointer mx-auto"
                  onClick={() => logout()}
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
