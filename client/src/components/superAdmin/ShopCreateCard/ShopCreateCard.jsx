import { useState } from "react";
import { MdStorefront } from "react-icons/md";
import { SuperAdminSideBar } from "../../superAdmin/SuperAdminSideBar/SuperAdminSideBar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSuperAdmins } from "../../../hooks/useSuperAdmins";

export const ShopCreateCard = () => {
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryName, setCountryName] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const { createShop, addCustomer } = useSuperAdmins();

  return (
    <>
      <SuperAdminSideBar />
      <div className="flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-2
                my-10  max-w-[500px] p-4 py-10  md:px-10 bg-tertiary text-primary shadow-2xl rounded-lg"
        >
          <h1 className="text-3xl mb-6 font-thin text-center text-primary ">
            Create Shop
          </h1>

          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="Shop Name"
            className="p-4 my-1  w-full  bg-white shadow outline-primary"
          />
          <div className="flex items-center justify-between bg-white w-full shadow my-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="p-4 w-full bg-white outline-primary"
            />
          </div>
          <div className="flex items-center justify-between bg-white w-full shadow mt-2 my-1">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="p-4 w-full bg-white outline-primary"
            />
          </div>

          <div className="flex items-center justify-between  w-full  my-1">
            <input
              type="text"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              placeholder="Country Name"
              className="p-4 my-1 w-full bg-white shadow outline-primary"
            />
            <input
              type="text"
              value={currencyCode}
              onChange={(e) => setCurrencyCode(e.target.value)}
              placeholder="Currency Code"
              className="p-4 my-1 w-full bg-white shadow outline-primary"
            />
          </div>

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
              {passwordShow ? (
                <FaEye
                  className={passwordShow ? "text-primary" : "text-gray-400"}
                />
              ) : (
                <FaEyeSlash />
              )}
            </button>
          </div>

          <button
            onClick={() => {
              createShop({
                shopName,
                email,
                currencyCode,
                countryName,
                password,
                phoneNumber,
              });
              addCustomer({ customerName: shopName, phoneNumber });
              setCountryName("");
              setCurrencyCode("");
              setPassword("");
              setEmail("");
              setShopName("");
              setPhoneNumber("");
            }}
            className="p-4 my-4  bg-primary hover:opacity-90 w-full text-white rounded-lg"
          >
            <span className="flex items-center justify-center gap-2 font-semibold">
              Create Shop <MdStorefront />
            </span>
          </button>
        </form>
      </div>
    </>
  );
};
