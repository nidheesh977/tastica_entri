import { useState } from "react";
import { FaDollarSign, FaTimes } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";

export const PayDialogueBox = ({
  message,
  onPayNow,
  onOnlinePay,
  onCancel,
  invoice,
}) => {
  const [receivedAmount, setReceivedAmount] = useState("");
  return (
    <div
      className={`fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  p-10 rounded-lg shadow-lg z-50 min-w-[500px] h-96 text-center bg-tertiary text-black `}
    >
      <ul className="font-semibold flex flex-col gap-1 ">
        <li className="border  p-2 shadow">Subtotal: MVR{invoice?.subTotal}</li>
        <li className="border  p-2 shadow">Tax: 0</li>
        <li className="border p-2 shadow">Total: MVR{invoice?.totalAmount}</li>
        <li className="border p-2 shadow">{message}</li>
        <ul className="flex items-center gap-4">
          <li>
            <input
              type="text"
              className="py-2 text-base outline-primary text-center border placeholder:p-3 shadow"
              placeholder="Received Amount"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(e.target.value)}
            />
          </li>
          <li className="border flex items-center justify-between p-2 w-full shadow">
            Balance: {receivedAmount ? Number(receivedAmount) - invoice?.totalAmount : 0}
          </li>
        </ul>
      </ul>

      <div className="flex justify-center gap-4 mb-4 mt-5">
        <button
          onClick={onPayNow}
          className="flex items-center justify-center  gap-2 px-6 py-3 bg-primary text-sm font-semibold rounded text-white hover:bg-opacity-90"
        >
          <FaDollarSign />
          Cash
        </button>
        <button
          onClick={onOnlinePay}
          className=" flex items-center justify-center gap-2 px-6 py-3 bg-primary text-sm font-semibold rounded text-white hover:bg-opacity-90"
        >
          <FaMoneyCheckAlt />
          Pay
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 flex items-center justify-center gap-2 bg-yellow-400 text-sm font-semibold rounded text-white hover:bg-opacity-90"
        >
          <FaTimes />
          Cancel
        </button>
      </div>
    </div>
  );
};
