import { useState } from "react";
import { RechargeCard } from "../../../components/shared/RechargeCard/RechargeCard";
import { useEffect } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";

export const RechargeWallet = () => {
  const [buffer, setBuffer] = useState("");
  const [lastTime, setLastTime] = useState(null);
  const [walletData, setWalletData] = useState("");

  const login = async (buffer) => {
    const data = { barcodeNumber: buffer };
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/wallet/login",
        withCredentials: true,
        data,
      });

      setWalletData(response?.data?.data);


      toast.success("Login  successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const now = new Date().getTime();
      if (e.key === "Enter") {
        if (buffer.length > 2) {
          login(buffer);
        }
        setBuffer("");
        setLastTime(null);
        return;
      }
      if (lastTime && now - lastTime > 100) {
        setBuffer("");
      }
      setBuffer((prev) => prev + e.key);
      setLastTime(now);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [buffer, lastTime]);

  return (
    <>
      {walletData && <RechargeCard walletData={walletData} />}
      {!walletData && (
        <p className="text-center mt-10 font-bold text-primary text-xl">
          Scan barcode to continue...
        </p>
      )}
    </>
  );
};
