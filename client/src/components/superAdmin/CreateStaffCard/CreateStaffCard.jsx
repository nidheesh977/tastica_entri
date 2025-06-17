import { useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSuperAdmins } from "../../../hooks/useSuperAdmins";

export const CreateStaffCard = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("staff");
  const [shopId, setShopId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  const { createStaff, shops } = useSuperAdmins();

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='
          my-20"
          mt-10
        w-full md:w-[500px] px-4 py-10 md:px-10 bg-tertiary text-primary shadow-2xl border rounded-lg'
    >
      <h1 className="text-3xl py-4 font-thin text-center text-primary ">
        Create Employ
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
        maxLength={7}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Mobile"
        className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
      />
      <select
        value={shopId}
        onChange={(e) => setShopId(e.target.value)}
        className="p-4 my-1 w-full bg-tertiary text-primary shadow-2xl outline-primary"
      >
        <option className="bg-white" value="">
          Select a shop
        </option>
        {shops?.map((shop) => (
          <option
            className="bg-tertiary text-primary"
            key={shop?._id}
            value={shop?._id}
          >
            {shop?.shopName}
          </option>
        ))}
      </select>

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
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={() => setPasswordShow((prev) => !prev)}
        >
          {passwordShow ? (
            <FaEye className={passwordShow ? "text-primary" : ""} />
          ) : (
            <FaEyeSlash />
          )}
        </button>
      </div>
      <span className="flex gap-4 px-4">
              <span className="flex gap-1">
              Staff
                <input
                  type="radio"
                  value='staff'
                  name="role"
                  className="accent-primary"
                  checked={role === 'staff'}
                  onChange={() => setRole('staff')}
                />
              </span>
              <span className="flex gap-1">
              Admin
                <input
                  type="radio"
                  value='admin'
                  name="role"
                  className="accent-primary"
                   checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                />
              </span>
            </span>

      <button
        className="p-4  bg-primary mt-2 hover:opacity-90 w-full text-white rounded-lg"
        onClick={() => {
          createStaff({
            userName,
            email,
            phoneNumber,
            password,
            confirmPassword,
            shopId,
            role,
          });
          setUserName("");
          setEmail("");
          setPhoneNumber("");
          setPassword("");
          setConfirmPassword("");
        }}
      >
        <span className="flex items-center justify-center gap-2 font-semibold">
          Add <MdPersonAdd />
        </span>
      </button>
    </form>
  );
};
