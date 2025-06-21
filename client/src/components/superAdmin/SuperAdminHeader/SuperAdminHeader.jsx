import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAdminPanelSettings, MdClose } from "react-icons/md";
import { toggleSideBar } from "../../../redux/features/sidebarSlice";
import { CgMenuLeft } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { saveSearchQuery } from "../../../redux/features/searchSlice";
import Logo from "../../../assets/logo.png";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";
import { removeSuperAdminData } from "../../../redux/features/authSlice";
import { FaArrowLeft } from "react-icons/fa";

export const SuperAdminHeader = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const superAdminName = useSelector(
    (state) => state?.auth?.superAdminData?.userName
  );
  const searchQuery = useSelector((state) => state?.search);

  const handleLogout = async () => {
    try {
      await axiosInstance({
        method: "POST",
        url: "/super-admin/logout",
        withCredentials: true,
      });
      dispatch(removeSuperAdminData());
      toast.success("Logout success");
      navigate("/super/admin/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <nav className="w-full shadow-xl fixed bg-tertiary">
      <div className="md:flex mx-auto py-4 px-5 justify-between items-center bg-tertiary text-primary font-bold md:px-10">
        <div className="flex justify-between items-center">
          <div
            onClick={() => dispatch(toggleSideBar())}
            className="cursor-pointer flex items-center gap-4"
          >
            <span className="border border-primary text-primary rounded p-2 bg-tertiary hover:bg-orange-50 hover:border-orange-600 ">
              <CgMenuLeft size={20} />
            </span>
            <img
              className="w-36 md:hidden lg:block rounded"
              src={Logo}
              alt="logo"
            />
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
                className="border border-primary px-8 py-2 outline-primary rounded text-primary w-[275px] md:w-52 lg:w-80 xl:w-96"
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
              className="hidden xl:block cursor-pointer rounded shadow-xl w-full   p-2"
              title="Back"
            >
              <FaArrowLeft
                className="hover:text-orange-600 mx-auto"
                size={20}
                onClick={() => {
                  location.pathname !== "/super/admin" && navigate(-1);
                }}
              />
            </li>

            <li className="flex items-center w-full rounded-md shadow-xl p-2 text-primary">
              {superAdminName && (
                <p className="text-md w-24 mx-auto">{superAdminName}</p>
              )}
            </li>
            <li className="w-full rounded-md shadow-xl p-2">
              {superAdminName && (
                <MdAdminPanelSettings
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
