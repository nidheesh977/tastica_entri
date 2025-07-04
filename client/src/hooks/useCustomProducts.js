import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useInvoices } from "./useInvoices";
import { useLocation } from "react-router-dom";

export const useCustomProducts = () => {
  const { addProductToInvoice, addProductToInvoiceOpenOrder } = useInvoices();

  const location = useLocation();
  const { mutate: addCustomProduct } = useMutation({
    mutationFn: async ({ productName, quantity, unit, sellingPrice }) => {
      const data = { productName, quantity, unit, sellingPrice };
      const response = await axiosInstance({
        method: "POST",
        url: "/custom-product/create",
        withCredentials: true,
        data,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast.success("Custom product added successfully");

      if (
        location.pathname === "/admin/cart" ||
        location.pathname === "/staff"
      ) {
        addProductToInvoice({ productId: data?._id, quantity: data?.quantity });
      } else {
        addProductToInvoiceOpenOrder({
          productId: data?._id,
          quantity: data?.quantity,
        });
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to add custom product!",
      );
    },
  });
  return { addCustomProduct };
};
