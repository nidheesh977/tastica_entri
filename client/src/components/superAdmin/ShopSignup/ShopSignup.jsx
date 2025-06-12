import { useState } from "react";
import { MdStore } from "react-icons/md";

export const ShopSignup = () => {
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-2 my-20
        }  max-w-[500px] pb-10 md:pb-20 px-4 md:px-10 bg-[#E8F9FF] text-[#155E95] shadow-2xl rounded-lg"
      >
        <h1 className="text-3xl py-10 font-thin text-center text-[#155E95] ">
          Shop Signup
        </h1>

        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Shop Name"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Password"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
        />

        <button className="p-4  bg-[#155E95] my-2 hover:opacity-90 w-full text-white rounded-lg">
          <span className="flex items-center justify-center gap-2 font-bold">
            Sign Up <MdStore />
          </span>
        </button>
      </form>
    </div>
  );
};
