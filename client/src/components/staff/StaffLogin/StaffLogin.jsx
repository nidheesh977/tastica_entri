import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useStaffs } from "../../../hooks/useStaffs";

export const StaffLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useStaffs();

  return (
    <div className="flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-2
          my-20 md:my-28
         max-w-[500px] px-4 py-10 md:px-10 bg-tertiary text-primary shadow-2xl rounded-lg"
      >
        <h1 className="text-3xl py-4 font-thin text-center text-[#155E95] ">
          Staff Login
        </h1>

        <input
          type="text"
          value={phoneNumber}
          placeholder="Mobile"
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
        />

        <button
          className="p-4  bg-primary mt-2 hover:opacity-90 w-full text-white rounded-lg"
          onClick={() => {
            login({ phoneNumber, password });
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
