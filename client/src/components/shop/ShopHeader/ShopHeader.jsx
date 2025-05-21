import { FaHome } from "react-icons/fa";
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
import Logo from '../../../assets/logo.png'

export const ShopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shopname = useSelector((state) => state.auth?.shopData?.shopName);
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
      <div className="flex mx-auto py-4 px-5  justify-between items-center bg-primary text-white font-bold md:px-10 ">
        <div className="flex justify-between items-center w-full md:w-1/2">
          <div className="cursor-pointer flex items-center gap-4">
            <img className="w-36 bg-white rounded" src={Logo} alt="logo" />
          </div>
        </div>
        <div className="flex items-center font-thin gap-5">
          {shopname && (
            <FaHome
              className="cursor-pointer hover:text-orange-100"
              title="Home"
              onClick={() => navigate("/shop")}
              size={20}
            />
          )}
          {shopname && <p className="text-xl">{shopname}</p>}
          {shopname && (
            <MdLogout
              size={20}
              title="Logout"
              onClick={() => {
                dispatch(removeShopData());
                dispatch(removeAdminData());
                dispatch(removeStaffData());
                shopLogout();
                navigate("/");
              }}
              className="cursor-pointer hover:text-secondary"
            />
          )}
        </div>
      </div>
    </nav>
  );
};
