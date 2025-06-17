import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosInstance } from "../../../config/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addAdminData,
  removeAdminData,
} from "../../../redux/features/authSlice";

export const AdminLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    const data = { phoneNumber, password };
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/admin/login",
        withCredentials: true,
        data,
      });
      toast.success("Login success");
      dispatch(addAdminData(response?.data?.data));
      navigate("/admin");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to login");
      dispatch(removeAdminData());
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="my-20
          w-full md:w-[500px] py-10 md:pb-20 px-4 md:px-10 bg-tertiary text-primary shadow-2xl border rounded-lg"
    >
      <h1 className="text-3xl py-4 font-thin text-center text-primary ">
        Admin Login
      </h1>

      <input
        type="text"
        value={phoneNumber}
        placeholder="Mobile"
        maxLength={7}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
      />

      <div className="relative w-full my-1">
        <input
          type={passwordShow ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-4 pr-10 w-full bg-white shadow-2xl outline-primary "
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          onClick={() => setPasswordShow((prev) => !prev)}
        >
          {passwordShow ? (
            <FaEye
              className={passwordShow ? "text-primary" : "text-gray-400"}
            />
          ) : (
            <FaEyeSlash />
          )}
        </button>
      </div>
      <Link
        className="hover:text-orange-600 "
        to={`/shop/admin/reset/password/${123}`}
      >
        Forgot Password?
      </Link>
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
  );
};
