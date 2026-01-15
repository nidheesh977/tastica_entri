import { MdShoppingCart, MdCancel } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../config/axiosInstance";
import { useEffect } from "react";

export const PaymentCancel = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const invoiceId = useSelector((state) => state?.invoice?._id);
  const singleInvoiceId = useSelector((state) => state?.singleInvoiceOpenOrder);
  const params = new URLSearchParams(location.search);
  const id = params.get("invoice");
  const admin = useSelector((state) => state.auth?.adminData);

  const paymentCancel = async () => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: `/payment/card/failed/invoice/${id}`,
        withCredentials: true,
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    queryClient.invalidateQueries(["savedInvoices", invoiceId]);
    queryClient.invalidateQueries(["singleInvoiceOpenOrder", singleInvoiceId]);
    paymentCancel();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 mt-10 font-bold text-primary text-xl shadow-2xl w-96 h-96 mx-auto  rounded">
        <MdCancel size={50} className="text-red-600" />
        <p>Payment Cancelled</p>
        <button
          className="bg-primary flex gap-2 items-center cursor-pointer hover:bg-opacity-90 text-white px-2 text-base py-1 rounded"
          onClick={() => navigate(admin ? "/admin/cart" : "/staff")}
        >
          <MdShoppingCart /> Back to Home
        </button>
      </div>
    </>
  );
};
