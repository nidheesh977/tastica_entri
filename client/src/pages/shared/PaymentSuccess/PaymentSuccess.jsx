import { FaCheckCircle } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../config/axiosInstance";

export const PaymentSuccess = ({ role }) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceId = useSelector((state) => state?.invoice?._id);
  const singleInvoiceId = useSelector((state) => state?.singleInvoiceOpenOrder);
  const params = new URLSearchParams(location.search);
  const id = params.get("invoice");

  const paymentSuccess = async () => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: `/payment/card/success/invoice/${id}`,
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    queryClient.invalidateQueries(["savedInvoices", invoiceId]);
    queryClient.invalidateQueries(["singleInvoiceOpenOrder", singleInvoiceId]);
    paymentSuccess();
  }, []);
  return (
    <>
      
      <div className="flex flex-col justify-center items-center gap-4 mt-10 font-bold text-primary text-xl  w-96 h-96 mx-auto shadow-2xl rounded">
        <FaCheckCircle size={50} className="text-green-600" />
        <p>Payment success</p>
        <button
          className="bg-primary flex gap-2 items-center cursor-pointer hover:bg-opacity-90 text-white px-2 text-base py-1 rounded"
          onClick={() => navigate("/admin/cart")}
        >
          <MdShoppingCart /> Back to Home
        </button>
      </div>
    </>
  );
};
