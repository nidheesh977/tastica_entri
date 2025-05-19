import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useInvoices } from "./useInvoices";
import { useNavigate } from "react-router-dom";

export const useCustomProducts = () => {
  const { addProductToInvoice } = useInvoices();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

      addProductToInvoice({ productId: data?._id, quantity: data?.quantity });
      navigate('/admin/cart')
    },
    onError: () => {
      toast.error("Failed to add custom product!");
      console.log(error?.response?.data?.message);
    },
  });
  return { addCustomProduct };
};
