import { FaStore } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  removeAdminData,
  removeStaffData,
  removeShopData,
} from "../../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../config/axiosInstance";

export const ShopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shopname = useSelector((state) => state.auth?.shopData?.shopname);
  const shopLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/shop/logout",
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
          <div className="cursor-pointer flex items-center gap-4">
            <span className="text-xl font-thin">Tastica</span>
          </div>
        </div>
        <div className="flex items-center font-thin gap-3">
          {shopname && (
            <FaStore
              className="cursor-pointer"
              title="Home"
              onClick={() => navigate("/shop")}
              size={20}
            />
          )}
          {shopname && <p>{shopname}</p>}
          {shopname && (
            <MdLogout
              onClick={() => {
                dispatch(removeShopData());
                dispatch(removeAdminData());
                dispatch(removeStaffData());
                shopLogout();
                navigate("/");
              }}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </nav>
  );
};
