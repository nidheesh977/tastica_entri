import { MdAdd, MdRemove, MdPersonAdd } from "react-icons/md";
import { FaSave, FaMoneyCheckAlt } from "react-icons/fa";
import { useCustomers } from "../../../hooks/useCustomers";
import { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useInvoices } from "../../../hooks/useInvoices";
import { MdShoppingCart } from 'react-icons/md';

export const ShoppingCart = () => {
  const { customers, addCustomer } = useCustomers();
  const { createInvoice } = useInvoices();
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const findCustomer = () => {
    const isTenDigits = /^\d{10}$/.test(searchQuery);

    if (!isTenDigits) {
      setIsNewCustomer(false);
      return;
    }
    const matchedCustomer = customers?.find(
      (customer) =>
        customer?.phoneNumber?.toString().toLowerCase() ===
        searchQuery.toLowerCase(),
    );

    if (matchedCustomer && matchedCustomer._id) {
      setName(matchedCustomer.customerName);
      setMobile(matchedCustomer.phoneNumber);
      setCustomerId(matchedCustomer._id);
      setIsNewCustomer(false);
    } else {
      setName("");
      setIsNewCustomer(true);
    }
  };

  useEffect(() => {
    findCustomer();
  }, [searchQuery, customers]);

  useEffect(() => {
    createInvoice(customerId);
  }, [customerId]);

  return (
    <div className="p-5 border">
      {!isNewCustomer && name === "" && (
        <div className="flex items-center justify-between gap-4">
          {!isNewCustomer && <h1 className="font-bold flex gap-2 text-xl items-center"><MdShoppingCart className="text-primary"  size={35}/> Cart</h1>}
          <input
            className="rounded shadow md:col-span-4 outline-primary h-10 p-5 w-full "
            type="text"
            placeholder="Enter customer mobile number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* {!isNewCustomer && (
            <MdArrowBack
              size={20}
              onClick={() => {
                setIsNewCustomer(false);
              }}
              title="Back"
              className="bg-secondary text-white  p-1 cursor-pointer rounded hover:bg-opacity-90"
            ></MdArrowBack>
          )} */}
        </div>
      )}

      {isNewCustomer && (
        <div className="flex flex-col gap-2 my-2">
          <div className="flex items-center justify-between my-2">
            <p className="font-bold">Add New Customer</p>
            {isNewCustomer && (
              <div className="flex justify-between items-center mt-2">
                {/* <MdArrowBack
                  onClick={() => setIsNewCustomer(false)}
                  size={20}
                  title="Back"
                  className="bg-secondary cursor-pointer text-white p-1 rounded hover:bg-opacity-90"
                ></MdArrowBack> */}
              </div>
            )}
          </div>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Full Name"
            className="rounded shadow outline-primary h-10 p-5"
          />

          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onFocus={() => setPhoneNumber(searchQuery)}
            placeholder="Mobile"
            className="rounded shadow outline-primary h-10 p-5"
          />

          <button
            onClick={() => {
              addCustomer({
                customerName,
                phoneNumber,
              });

              setCustomerName("");
              setPhoneNumber("");
            }}
            className="bg-primary flex items-center justify-center gap-2  text-white py-2 px-2 rounded hover:bg-opacity-90"
          >
            <MdPersonAdd /> Add
          </button>
        </div>
      )}

      <div className="flex items-center justify-between w-full">
        {!isNewCustomer && name && <h1 className="font-bold flex gap-2 text-xl items-center"><MdShoppingCart className="text-primary"  size={35}/> Cart</h1>}
        {!isNewCustomer && <div className="font-bold ">{name}</div>}
        {!isNewCustomer && name !== "" && (
          <div>
            <p className="text-sm font-bold ">{mobile}</p>
          </div>
        )}
        {/* {!isNewCustomer && name && (
          <MdArrowBack
            size={20}
            onClick={() => {
              setIsNewCustomer(true);
            }}
            title="Back"
            className="bg-secondary text-white  p-1 cursor-pointer rounded hover:bg-opacity-90"
          ></MdArrowBack>
        )} */}
      </div>

      <ul className="flex flex-col mt-4 w-full">
        <li className="border flex justify-between items-center gap-8 w-full px-2 py-2">
          <div className="flex-1">
            <p>onion</p>
          </div>
          <div className="flex items-center gap-2">
            {Number.isInteger(quantity) && (
              <div
                onClick={() => setQuantity((p) => Math.max(0, parseInt(p) - 1))}
                className="rounded flex cursor-pointer justify-center items-center text-white w-5 h-5 font-bold bg-[#BF3131] hover:bg-opacity-90"
              >
                <MdRemove />
              </div>
            )}
            <div className="mx-2 text-center">
              <input
                className="w-14 h-8 text-center rounded"
                value={quantity}
                type="number"
                step="any"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setQuantity(Number.isNaN(value) ? 0 : value);
                }}
              />
            </div>
            {Number.isInteger(quantity) && (
              <div
                onClick={() => setQuantity((p) => parseInt(p) + 1)}
                className="rounded flex cursor-pointer justify-center items-center text-white w-5 h-5 font-bold bg-[#155E95] hover:bg-opacity-90"
              >
                <MdAdd />
              </div>
            )}
          </div>
          <div className="w-10 text-right">₹100</div>
        </li>
      </ul>

      <div className="mt-2 w-full font-bold">
        <div className="flex justify-between items-center border px-2 py-2">
          <div>Subtotal</div>
          <div>₹subtotal</div>
        </div>
        <div className="flex justify-between items-center border px-2 py-2">
          <div>Tax</div>
          <div>₹tax</div>
        </div>
        <div className="flex justify-between items-center font-semibold border px-2 py-2">
          <div>Total</div>
          <div>₹total</div>
        </div>
      </div>

      <div className="flex gap-2 mt-2 justify-between">
        <button className="flex items-center justify-center gap-2 px-6 py-3 w-1/2 bg-[#BF3131] hover:bg-opacity-90 text-white rounded-lg">
          <FaSave /> Save
        </button>
        <button className="flex items-center justify-center gap-2 px-6 py-3 w-1/2 bg-[#155E95] hover:bg-opacity-90 text-white rounded-lg">
          <FaMoneyCheckAlt /> Pay
        </button>
      </div>
    </div>
  );
};
