import { MdPersonAdd } from "react-icons/md";
import { FaSave, FaMoneyCheckAlt, FaTrash } from "react-icons/fa";
import { useCustomers } from "../../../hooks/useCustomers";
import { useState, useEffect } from "react";
import { useInvoices } from "../../../hooks/useInvoices";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

export const ShoppingCart = () => {
  const { customers, addCustomer } = useCustomers();
  const { createInvoice } = useInvoices();
  const products = useSelector((state) => state?.invoice?.products);
  const invoice = useSelector((state) => state?.invoice);
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [quantities, setQuantities] = useState({});

  const findCustomer = () => {
    const isTenDigits = /^\d{10}$/.test(searchQuery);

    if (!isTenDigits) {
      setIsNewCustomer(false);
      return;
    }
    const matchedCustomer = customers?.find(
      (customer) =>
        customer?.phoneNumber?.toString().toLowerCase() ===
        searchQuery.toLowerCase()
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
          {!isNewCustomer && (
            <h1 className="font-bold flex gap-2 text-xl items-center">
              <MdShoppingCart className="text-primary" size={35} /> Cart
            </h1>
          )}
          <input
            className="rounded shadow md:col-span-4 outline-primary h-10 p-5 w-full "
            type="text"
            placeholder="Enter customer mobile number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {isNewCustomer && (
        <div className="flex flex-col gap-2 my-2">
          <div className="flex items-center justify-between my-2">
            <p className="font-bold">Add New Customer</p>
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
        {!isNewCustomer && name && (
          <h1 className="font-bold flex gap-2 text-xl items-center">
            <MdShoppingCart className="text-primary" size={35} /> Cart
          </h1>
        )}
        {!isNewCustomer && <div className="font-bold ">{name}</div>}
        {!isNewCustomer && name !== "" && (
          <div>
            <p className="text-sm font-bold ">{mobile}</p>
          </div>
        )}
      </div>

      <ul className="flex flex-col mt-4 h-[387px] overflow-y-auto w-full">
        {products?.map((product, index) => (
          <li
            key={product?._id}
            className="grid grid-cols-12 border my-1 p-2 items-center"
          >
            <span className=" col-span-12 xl:col-span-6 my-1 xl:my-0 text-center xl:text-start">
              <span className="me-2 font-semibold">{index + 1}.</span>
              {product?.productName}
            </span>
            <div className="flex items-center gap-2 col-span-12 xl:col-span-4 my-2 xl:my-0 mx-auto xl:mx-0">
              <input
                value={quantities[product?._id] || 1}
                className="w-14 h-8 text-center rounded bg-tertiary "
                type="number"
                onChange={(e) => {
                  setQuantities((prev) => ({
                    ...prev,
                    [product._id]: e.target.value,
                  }));
                }}
              />
              <FaTrash className="text-secondary hover:text-red-600 cursor-pointer" />
            </div>
            <span className=" col-span-12 xl:col-span-2 mx-auto xl:mx-0 text-right my-2 xl:my-0  ">
              MVR{product?.price}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-2 w-full font-bold">
        <div className="flex justify-between items-center border px-2 py-2">
          <div>Subtotal</div>
          <div>MVR{invoice?.subTotal}</div>
        </div>
        <div className="flex justify-between items-center border px-2 py-2">
          <div>Tax</div>
          <div>0</div>
        </div>
        <div className="flex justify-between items-center font-semibold border px-2 py-2">
          <div>Total</div>
          <div>MVR{invoice?.totalAmount}</div>
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
