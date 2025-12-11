import { useState } from "react";
import {
  FaDollarSign,
  FaTimes,
  FaCreditCard,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux"


export const PayDialogueBox = ({
  message,
  cashPay,
  swipePay,
  stripePay,
  onCancel,
  invoice,
}) => {
  const [receivedAmount, setReceivedAmount] = useState("");

  const { shopData } = useSelector((state) => state.auth);



  const calculateBalance = () => {
    const received = parseFloat(receivedAmount);
    const total = parseFloat(invoice?.totalAmount || 0);
    if (isNaN(received)) return 0;
    return (received - total).toFixed(2);
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    p-10 rounded-lg shadow-lg z-50 min-w-[500px]  text-center bg-tertiary text-black"
    >
      <div className="font-semibold flex flex-col gap-2">
        <div className="flex justify-end items-center gap-2 text-[#060303]">
          <p className=" w-fit px-2 py-1 rounded-md bg-gray-200 text-lg shadow-md ">Currency </p>
          <p className=" w-fit px-2 py-1 rounded-md bg-gray-200 text-lg shadow-md">{shopData.currencyCode}</p>
        </div>
        <div className="border p-2 shadow">
          Subtotal: {invoice?.subTotal || 0}
        </div>
        <div className="border p-2 shadow">Tax:  0</div>
        <div className="border p-2 shadow">
          Total: {invoice?.totalAmount || 0}
        </div>
        <div className="border p-2 shadow">{message}</div>

        <div className="flex gap-2 items-center mt-2">
          <input
            type="number"
            className="py-2 text-base outline-primary text-center border placeholder:p-3 shadow w-1/2"
            placeholder="Received Amount"
            value={receivedAmount}
            onChange={(e) => setReceivedAmount(e.target.value)}
          />
          <div className="border p-2 w-1/2 text-center shadow font-semibold">
            Balance: {""} {calculateBalance()}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={cashPay}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-sm font-semibold rounded text-white hover:bg-opacity-90"
        >
          <FaDollarSign />
          Cash
        </button>
        <button
          onClick={swipePay}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-sm font-semibold rounded text-white hover:bg-opacity-90"
        >
          <FaCreditCard />
          Swipe
        </button>
        <button
          onClick={stripePay}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-sm font-semibold rounded text-white hover:bg-opacity-90"
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
