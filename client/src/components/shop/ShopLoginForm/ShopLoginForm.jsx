import React, { useEffect, useRef, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addShopData, removeShopData } from "../../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

export const ShopLoginForm = ({ action }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(removeShopData());
  }, []);

  let api = null;
  if (action === "Signup") api = "/shop/create-shop";
  if (action === "Login") api = "/shop/login-shop";

  const shopname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async () => {
    if (action === "Signup") {
      const data = {
        shopname: shopname.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        // Api call
        const response = await axiosInstance({
          method: "POST",
          url: api,
          withCredentials: true,
          data,
        });
        toast.success("Shop created");
      } catch (error) {
        toast.error('Something went wrong!');
        log;
      }
    } else {
      const data = {
        email: email.current.value,
        password: password.current.value,
      };
      try {
        // Api call
        const response = await axiosInstance({
          method: "POST",
          url: api,
          withCredentials: true,
          data,
        });
        console.log(response?.data?.data);

        dispatch(addShopData(response?.data?.data));
        toast.success("Login success");
        navigate("/shop");
      } catch (error) {
        toast.error('Invalid credentials!');
      }
    }
  };
  return (
    <div className="flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-2 my-20 
        }  max-w-[500px] pb-10 md:pb-20 px-4 md:px-10 bg-[#E8F9FF] text-[#155E95] shadow-2xl rounded-lg"
      >
        <h1 className="text-3xl py-10 font-thin text-center text-[#155E95] ">
          Shop {action}
        </h1>

        {action === "Signup" && (
          <input
            type="text"
            ref={shopname}
            placeholder="Shop Name"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />
        )}
        <input
          type="email"
          ref={email}
          placeholder="Email Address"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
        />

        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
        />

        {errorMessage && (
          <p className="text-[#BF3131] font-bold text-lg py-2">
            {errorMessage}
          </p>
        )}
        <button
          className="p-4  bg-[#155E95] my-2 hover:opacity-90 w-full text-white rounded-lg"
          onClick={handleSubmit}
        >
          <span className="flex items-center justify-center gap-2 font-bold">
            Login In <FaSignInAlt />
          </span>
        </button>
      </form>
    </div>
  );
};
