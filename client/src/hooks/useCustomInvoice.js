import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector } from "react-redux";

export const useCustomInvoice = () => {
  const invoiceId = useSelector((state) => state?.customInvoice?._id);

  const { mutate: addProductToInvoice } = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const data = { productId, quantity };
      const response = await axiosInstance({
        method: "POST",
        url: `/invoice/custom/${invoiceId}/product`,
        withCredentials: true,
        data,
      });
      return response?.data?.data;
    },
    onSuccess: () => {
      toast.success("Product added to custom invoice");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to to add product!"
      );
    },
  });
  const { mutate: updateProductQuantity } = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const data = { productId, quantity };
      const response = await axiosInstance({
        method: "PUT",
        url: `/invoice/custom/${invoiceId}/product/${productId}`,
        withCredentials: true,
        data,
      });
      return response?.data?.data;
    },
    onSuccess: () => {
      toast.success("Quantity updated.");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update quantity!"
      );
    },
  });

  return {
    addProductToInvoice,
    updateProductQuantity,
  };
};
