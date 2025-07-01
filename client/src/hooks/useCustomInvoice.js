import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useState } from "react";

export const useCustomInvoice = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const invoiceId = invoiceData?._id;

  const addProductToInvoice = useMutation({
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
      setInvoiceData(data);
      toast.success("Product added to custom invoice");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add product!");
    },
  });

  const removeProductFromInvoice = useMutation({
    mutationFn: async ({ productsId }) => {
      const response = await axiosInstance({
        method: "PUT",
        url: `/invoice/custom/${invoiceId}/product/${productsId}`,
        withCredentials: true,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast.success("Product removed successfully");
      setInvoiceData(data);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove product!"
      );
    },
  });

  const createCustomInvoice = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance({
        method: "POST",
        url: "/invoice/custom/create",
        withCredentials: true,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      if (data?._id) {
        setInvoiceData(data);
        toast.success("Invoice created successfully");
      } else {
        toast.error("Invoice creation failed: no ID returned");
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to create invoice!"
      );
    },
  });

  const deleteCustomInvoice = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance({
        method: "DELETE",
        url: `/invoice/custom/${id}`,
        withCredentials: true,
      });
      return response?.data?.data;
    },
    onSuccess: () => {
      setInvoiceData(null);
      toast.success("Invoice deleted successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete invoice!"
      );
    },
  });
  const createCustomerCustomInvoice = useMutation({
    mutationFn: async ({ userName, email, address, phoneNumber }) => {
      const data = {
        userName,
        email,
        address,
        phoneNumber,
      };
      const response = await axiosInstance({
        method: "PUT",
        url: `/invoice/custom/${invoiceData?._id}/customer`,
        withCredentials: true,
        data,
      });

      return response?.data?.data;
    },
    onSuccess: () => {
      toast.success("Customer data added successfully");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add customer!");
    },
  });

  return {
    invoiceData,
    addProductToInvoice,
    removeProductFromInvoice,
    createCustomInvoice,
    deleteCustomInvoice,
    createCustomerCustomInvoice,
  };
};
