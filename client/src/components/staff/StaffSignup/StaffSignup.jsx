import { useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import { useAdmins } from "../../../hooks/useAdmins";

export const StaffSignup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { staffSignup } = useAdmins();

  return (
    <div className="flex justify-center my-10">
      <form
        onSubmit={(e) => e.preventDefault()}
        className='mx-2
          my-10"
        max-w-[500px] px-4 py-10 md:px-10 bg-tertiary text-primary shadow-2xl rounded-lg'
      >
        <h1 className="text-3xl py-4 font-thin text-center text-primary ">
          Staff Sign Up
        </h1>

        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Full Name"
          className="p-4 my-1  w-full  bg-white shadow-2xl outline-primary"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
        />

        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Mobile"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
        />

        <button
          className="p-4  bg-primary mt-2 hover:opacity-90 w-full text-white rounded-lg"
          onClick={() => {
            staffSignup({
              userName,
              email,
              phoneNumber,
              password,
              confirmPassword,
            });
            setUserName("");
            setEmail("");
            setPhoneNumber("");
            setPassword("");
            setConfirmPassword("");
          }}
        >
          <span className="flex items-center justify-center gap-2 font-semibold">
            Sign Up <MdPersonAdd />
          </span>
        </button>
      </form>
    </div>
  );
};
