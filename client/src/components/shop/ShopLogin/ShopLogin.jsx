import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useShops } from "../../../hooks/useShops";

export const ShopLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useShops();

  return (
    <div className="flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-2 my-20
        }  max-w-[500px] pb-10 md:pb-20 px-4 md:px-10 bg-[#E8F9FF] text-primary shadow-2xl rounded-lg"
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

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
        />

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
    </div>
  );
};
