import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSignInAlt } from "react-icons/fa";
import { axiosInstance } from "../../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAdminData, removeAdminData } from "../../../redux/features/authSlice";

export const AdminLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (params) => {
    const data = { phoneNumber, password };
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/admin/login",
        withCredentials: true,
        data,
      });
      toast.success("Login success");
      dispatch(addAdminData(response?.data?.data))
      navigate("/admin");
    } catch (error) {
      toast.error("Failed to login");
      dispatch(removeAdminData());
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-2
          my-20 md:my-28
         max-w-[500px] px-4 py-10 md:px-10 bg-tertiary text-primary shadow-2xl rounded-lg"
      >
        <h1 className="text-3xl py-4 font-thin text-center text-primary ">
          Admin Login
        </h1>

        <input
          type="text"
          value={phoneNumber}
          placeholder="Mobile"
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
        />

        <button
          className="p-4  bg-primary mt-2 hover:opacity-90 w-full text-white rounded-lg"
          onClick={() => {
            handleLogin();
            setPhoneNumber("");
            setPassword("");
          }}
        >
          <span className="flex items-center justify-center gap-2 font-bold">
            Login In <FaSignInAlt />
          </span>
        </button>
      </form>
    </div>
  );
};
