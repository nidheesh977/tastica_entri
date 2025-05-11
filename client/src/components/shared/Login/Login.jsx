import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { validateData } from "../../../utils/validateData";
import { FaSignInAlt } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { axiosInstance } from "../../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAdminData, addStaffData } from "../../../redux/features/authSlice";

export const Login = ({ role, action }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useRef(null);
  const email = useRef(null);
  const phoneNumber = useRef(null);
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
        userName?.current?.value,
        email?.current?.value,
        phoneNumber?.current.value,
        password?.current?.value,
        confirmPassword?.current?.value,
      );
      if (message) {
        setErrorMessage(message);
        return;
      }
      const data = {
        userName: userName?.current?.value,
        email: email?.current?.value,
        phoneNumber: phoneNumber?.current?.value,
        password: password?.current?.value,
      };

      try {
        // Api call
        await axiosInstance({
          method: "POST",
          url: api,
          withCredentials: true,
          data,
        });

        userName.current.value = "";
        email.current.value = "";
        phoneNumber.current.value = "";
        password.current.value = "";
        confirmPassword.current.value = "";
        toast.success("Signup success");
      } catch (error) {
        toast.error("Something went wrong!");

        console.log(error);
      }
    } else {
      const data = {
        phoneNumber: phoneNumber?.current?.value,
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

        if (role === "Admin") dispatch(addAdminData(response?.data?.data));
        if (role === "Staff") dispatch(addStaffData(response?.data?.data));
        phoneNumber.current.value = null;
        password.current.value = null;
        if (role === "Admin") navigate("/admin");
        if (role === "Staff") navigate("/staff");
      } catch (error) {
        toast.error("Invalid credentials!");
      }
    }
  };
  return (
    <div className="flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`mx-2 ${
          action === "Login" ? "my-20 md:my-28" : "my-10"
        }  max-w-[500px] px-4 py-10 md:px-10 bg-tertiary text-primary shadow-2xl rounded-lg `}
      >
        <h1 className="text-3xl py-4 font-thin text-center text-[#155E95] ">
          {action === "Login" ? `${role} Login In` : `${role} Sign Up`}
        </h1>
        {action === "Signup" && (
          <input
            type="text"
            ref={userName}
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
          ref={phoneNumber}
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
        {errorMessage && (
          <p className="text-secondary font-bold text-lg py-2">
            {errorMessage}
          </p>
        )}
        <button
          className="p-4  bg-primary mt-2 hover:opacity-90 w-full text-white rounded-lg"
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
