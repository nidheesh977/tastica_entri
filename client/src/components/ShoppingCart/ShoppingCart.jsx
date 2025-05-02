import { MdMoreVert } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdRemove } from "react-icons/md";
import { FaSave, FaMoneyCheckAlt } from "react-icons/fa";
import { useState } from "react";

export const ShoppingCart = ({ products }) => {
  const [selectedUser, setSelectedUser] = useState("User");
  return (
    <div className=" p-5 border">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Cart</h1>

        <select
          className="lg:w-52 h-10 rounded p-2 font-semibold border"
          defaultValue=''
         
        >
          <option value="" disabled hidden>Select a user</option>
          <option value="arjun">Arjun</option>
          <option value="ashay">Ashay</option>
          <option value="john">John</option>
        </select>
        <MdMoreVert className="cursor-pointer " size={20} />
      </div>
      <ul className=" flex flex-col mt-4 w-full font-thin">
        {products.map((product) => (
          <li className="border flex justify-between items-center gap-8 w-full px-2  py-2">
            <div className="flex-1">
              <p>{product.title}</p>
            </div>

            <div className="flex items-center  gap-2">
              <div
                className="rounded flex cursor-pointer justify-center items-center  text-white w-5 h-5  font-bold 
              bg-[#BF3131] hover:bg-opacity-90"
              >
                {" "}
                <MdRemove />
              </div>
              <div>{product.quantity}</div>
              <div className="rounded flex cursor-pointer justify-center items-center text-center text-white w-5 h-5 font-bold bg-[#155E95] hover:bg-opacity-90">
                <MdAdd />
              </div>
            </div>
            <div className="w-10 text-right">₹{product.price}</div>
          </li>
        ))}
      </ul>
      <div className="mt-2 w-full">
        <div className="flex justify-between items-center border px-2 py-2">
          <div>Subtotal</div>
          <div>₹145</div>
        </div>
        <div className="flex justify-between items-center border px-2 py-2">
          <div>Tax</div>
          <div>₹5</div>
        </div>
        <div className="flex justify-between items-center font-semibold border px-2 py-2">
          <div>Total</div>
          <div>₹338</div>
        </div>
      </div>
      <div className="flex gap-2 mt-2 justify-between">
        <button className=" flex items-center justify-center gap-2 px-6 py-3 w-1/2 bg-[#BF3131] hover:bg-opacity-90 text-white rounded-lg">
          <FaSave /> Save
        </button>
        <button className="flex items-center justify-center gap-2 px-6 py-3 w-1/2 bg-[#155E95] hover:bg-opacity-90 text-white rounded-lg">
          <FaMoneyCheckAlt /> Pay
        </button>
      </div>
    </div>
  );
};
