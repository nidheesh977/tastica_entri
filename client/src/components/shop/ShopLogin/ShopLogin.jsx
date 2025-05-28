import { useState } from "react";
import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useShops } from "../../../hooks/useShops";

export const ShopLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const { login } = useShops();

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" my-20
          w-full md:w-[500px] pb-10 md:pb-20 px-4 md:px-10 bg-tertiary text-primary shadow-2xl border rounded-lg"
      >
        <h1 className="text-3xl py-10 font-thin text-center text-primary ">
          Shop login
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
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
            {passwordShow ? <FaEye className={passwordShow ? 'text-primary': 'text-gray-400'} /> : <FaEyeSlash />}
          </button>
        </div>

        <button
          className="p-4  bg-primary my-2 hover:opacity-90 w-full text-white rounded-lg"
          onClick={() => {
            login({ email, password });
            setEmail("");
            setPassword("");
          }}
        >
          <span className="flex items-center justify-center gap-2 font-bold">
            Login In <FaSignInAlt />
          </span>
        </button>
      </form>
    </>
  );
};
