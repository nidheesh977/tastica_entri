import { useDispatch, useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";
import { toggleSideBar } from "../../../redux/features/sidebarSlice";
import { CgMenuLeft } from "react-icons/cg";
import { FaUserShield } from "react-icons/fa";
import { removeAdminData } from "../../../redux/features/authSlice";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminName = useSelector((state) => state?.auth?.adminData?.username);
  const adminLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/admin/logout",
        withCredentials: true,
      });
      toast.success("Logout success");
      console.log(response);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <nav className="w-full">
      <div className="flex mx-auto py-4 px-5  justify-between items-center bg-[#155E95] text-white font-bold md:px-10 ">
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
        </div>
        <div className="flex items-center gap-5  font-thin">
          {adminName && <FaUserShield size={20} />}
          {adminName && <h1 className="text-xl">{adminName}</h1>}
          {adminName && (
            <MdLogout size={20}
              onClick={() => {
                adminLogout();
                dispatch(removeAdminData());
                navigate("admin/login");
              }}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </nav>
  );
};
