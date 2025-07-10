import { useState } from "react";
import { MdElectricBolt } from "react-icons/md";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";

export const RechargeCard = ({ walletData }) => {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState("");

  const recharge = async (amount) => {
    const data = { amount };
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/wallet/recharge",
        withCredentials: true,
        data,
      });
      setBalance(response?.data?.data?.balance);
      console.log("Recharge response: ", response?.data?.data);

      toast.success("Recharge successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="flex justify-center md:mt-20">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-2
                        my-10  md:w-[500px] md:h-72 p-4 md:p-10   md:px-10 bg-tertiary text-primary shadow-2xl rounded-lg"
        >
          <h1 className="md:text-3xl mb-6 font-thin text-center text-primary flex justify-between items-center ">
            <span>Recharge Wallet </span>
            <span className="text-sm flex flex-col items-start">
              <span>name: {walletData?.customerName}</span>
              <span>mobile: {walletData?.phoneNumber}</span>
              <span>
                loyalty points:{" "}
                {balance ? balance : walletData?.loyalityPoint || 0}
              </span>
            </span>
          </h1>

          <div className=" flex items-center gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
            />
            <button
              onClick={() => {
                recharge(amount);
                setAmount("");
              }}
              className="p-4 w-26   bg-primary hover:opacity-90  text-white rounded"
            >
              <span className="flex items-center justify-center gap-1 font-semibold">
                Recharge
                <MdElectricBolt />
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
