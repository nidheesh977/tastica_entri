import { MdAdd, MdRemove } from "react-icons/md";
import { FaSave, FaMoneyCheckAlt } from "react-icons/fa";
import { useCustomers } from "../../../hooks/useCustomers";
import { useState } from "react";

export const ShoppingCart = () => {
  const { customers } = useCustomers();
  const [name, setName] = useState("");

  return (
    <div className="p-5 border">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Cart</h1>
        <div>
          <select
            className="lg:w-52 h-10 rounded p-2 font-semibold border"
            onChange={(e) => {
              const selectedCustomer = customers?.find(
                (c) => c._id === e.target.value,
              );
              setName(selectedCustomer?.customerName || "");
            }}
          >
            <option value="">Select a customer</option>
            {customers?.map((customer) => (
              <option key={customer?._id} value={customer?._id}>
                {customer?.phoneNumber}
              </option>
            ))}
          </select>
        </div>

        <div>{name}</div>
      </div>

      <ul className="flex flex-col mt-4 w-full">
        <li className="border flex justify-between items-center gap-8 w-full px-2 py-2">
          <div className="flex-1">
            <p>onion</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              onClick={() => decreaseQuantity(product.product_id)}
              className="rounded flex cursor-pointer justify-center items-center text-white w-5 h-5 font-bold bg-[#BF3131] hover:bg-opacity-90"
            >
              <MdRemove />
            </div>
            <div>1</div>
            <div className="rounded flex cursor-pointer justify-center items-center text-white w-5 h-5 font-bold bg-[#155E95] hover:bg-opacity-90">
              <MdAdd />
            </div>
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
