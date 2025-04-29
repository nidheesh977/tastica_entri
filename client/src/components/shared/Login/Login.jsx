import React, { useRef, useState } from "react";
import { validateData } from "../../../utils/validateData";
import { FaSignInAlt } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import {axiosInstance} from '../../../config/axiosInstance'

export const Login = ({role, action}) => {

  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const mobile = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);


  // Set api
  let api = null;
  if (role === 'Admin' && action === 'Signup') api = '/admin/signup';
  if (role === 'Admin' && action === 'Login') api = '/admin/login';
  if (role === 'Staff' && action === 'Signup') api = '/staff/login';
  if (role === 'Staff' && action === 'Login') api = '/staff/login';





  const handleSubmit = async() => {
    if (action === 'Signup') {
      const message = validateData(
        name?.current?.value,
        email?.current?.value,
        mobile?.current?.value,
        password?.current?.value,
        confirmPassword?.current?.value
      );
      setErrorMessage(message);
    }else{
      
      const data = 
        username?.current?.value,
        email?.current?.value,
        mob?.current?.value,
        password?.current?.value,
        confirmPassword?.current?.value
      );
      
      
      
      
      try {
            // Api call
            const response = await axiosInstance({
              method: "POST",
              url: api,
              withCredentials: true,
              data,
            });


    }catch(error){
      console.log(error)
    }
  };
  return (
    <div className="flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`mx-2 ${
          action === 'Login' ? "my-20 md:my-28" : "my-10"
        }  max-w-[500px] px-4 py-10 md:px-10 bg-[#E8F9FF] text-[#155E95] shadow-2xl rounded-lg `}
      >
        <h1 className="text-3xl py-4 font-thin text-center text-[#155E95] ">
          {action === 'Login' ? `${role} Login In` : `${role} Sign Up`}
        </h1>
        {action === 'Signup' && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-4 my-1  w-full  bg-white shadow-2xl outline-[#155E95]"
          />
        )}
        {action === 'Signup' && (
          <input
            type="email"
            ref={email}
            placeholder="Email Address"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />
        )}
        <input
          type="text"
          ref={mobile}
          placeholder="Mobile"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
        />

        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
        />
        {action === 'Signup' && (
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
          {action === 'Login' ? (
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
