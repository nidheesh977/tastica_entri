import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { saveCustomInvoiceData } from "../redux/features/customInvoiceSlice";

export const useCustomInvoice = () => {
  const invoiceId = useSelector((state) => state?.customInvoice?._id);
  const dispatch = useDispatch();

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
    onSuccess: (data) => {
      dispatch(saveCustomInvoiceData(data))
      toast.success("Product added to custom invoice");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to add product!"
      );
    },
  });
  const { mutate: removeProductFromInvoice } = useMutation({
    mutationFn: async ({ productsId }) => {
    
      const response = await axiosInstance({
        method: "PUT",
        url: `/invoice/custom/${invoiceId}/product/${productsId}` ,
        withCredentials: true,
      
      });
      return response?.data?.data;
    },
    onSuccess: () => {
      toast.success("Product removed successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove product!"
      );
    },
  });

  return {
    addProductToInvoice,
    removeProductFromInvoice
  };
};
