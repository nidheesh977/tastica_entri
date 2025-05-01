import { useEffect, useRef, useState } from "react";
import { validateData } from "../../../utils/validateData";
import { FaSignInAlt } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addAdminData,
  addStaffData,
  removeAdminData,
  removeStaffData,
} from "../../../redux/features/authSlice";

export const Login = ({ role, action }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(removeAdminData());
  //   dispatch(removeStaffData());
  // }, []);

  const username = useRef(null);
  const email = useRef(null);
  const phonenumber = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  // Set api
  let api;
  if (role === "Admin" && action === "Signup") api = "/admin/signup";
  if (role === "Admin" && action === "Login") api = "/admin/login";
  if (role === "Staff" && action === "Signup") api = "/admin/create-employee";
  if (role === "Staff" && action === "Login") api = "/staff/login";

  const handleSubmit = async () => {
    if (action === "Signup") {
      const message = validateData(
        username?.current?.value,
        email?.current?.value,
        password?.current?.value,
        confirmPassword?.current?.value
      );

      const data = {
        username: username?.current?.value,
        email: email?.current?.value,
        phonenumber: phonenumber?.current?.value,
        password: password?.current?.value,
      };

      try {
        // Api call
        const response = await axiosInstance({
          method: "POST",
          url: api,
          withCredentials: true,
          data,
        });
        toast.success("Signup success");
        if (role === "Staff") navigate("/shop/staff/login");

        console.log(response);
      } catch (error) {
        toast.error(error?.response?.data?.message);

        console.log(error);
      }
    } else {
      const data = {
        phonenumber: phonenumber?.current?.value,
        password: password?.current?.value,
      };

      try {
        // Api call
        const response = await axiosInstance({
          method: "POST",
          url: api,
          withCredentials: true,
          data,
        });
        toast.success("Login success");
        console.log(response);
        if (role === "Admin") dispatch(addAdminData(response?.data?.data));
        if (role === "Staff") dispatch(addStaffData(response?.data?.data));
        phonenumber.current.value = null;
        password.current.value = null;
        if (role === "Admin") navigate("/admin");
        if (role === "Staff") navigate("/staff");
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    }
  };
  return (
    <div className="flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`mx-2 ${
          action === "Login" ? "my-20 md:my-28" : "my-10"
        }  max-w-[500px] px-4 py-10 md:px-10 bg-[#E8F9FF] text-[#155E95] shadow-2xl rounded-lg `}
      >
        <h1 className="text-3xl py-4 font-thin text-center text-[#155E95] ">
          {action === "Login" ? `${role} Login In` : `${role} Sign Up`}
        </h1>
        {action === "Signup" && (
          <input
            type="text"
            ref={username}
            placeholder="Full Name"
            className="p-4 my-1  w-full  bg-white shadow-2xl outline-[#155E95]"
          />
        )}
        {action === "Signup" && (
          <input
            type="email"
            ref={email}
            placeholder="Email Address"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />
        )}
        <input
          type="text"
          ref={phonenumber}
          placeholder="Mobile"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
        />

        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
        />
        {action === "Signup" && (
          <input
            type="password"
            ref={confirmPassword}
            placeholder="Confirm password"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />
        )}
        <p className="text-[#BF3131] font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4  bg-[#155E95] hover:opacity-90 w-full text-white rounded-lg"
          onClick={handleSubmit}
        >
          {action === "Login" ? (
            <span className="flex items-center justify-center gap-2 font-bold">
              Login In <FaSignInAlt />
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2 font-semibold">
              Sign Up <MdPersonAdd />
            </span>
          )}
        </button>
      </form>
    </div>
  );
};
