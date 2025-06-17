import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useState } from "react";
import { validateCustomerData } from "../../utils/validateCustomerData";

export const useCustomers = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const { data } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: "/customer",
        withCredentials: true,
      });
      return response?.data?.data;
    },
  });

  const { mutate: addCustomer } = useMutation({
    mutationFn: async ({ customerName, phoneNumber }) => {
      const error = validateCustomerData(customerName, phoneNumber);

      setError(error);

      const data = {
        customerName,
        phoneNumber,
      };
      await axiosInstance({
        method: "POST",
        url: "/customer/create",
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Customer added successfully!");
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to add new customer!",
      );
    },
  });

  const { mutate: deleteCustomer } = useMutation({
    mutationFn: async (customerId) => {
      await axiosInstance({
        method: "DELETE",
        url: `/customer/${customerId}`,
        withCredentials: true,
      });
    },
    onSuccess: () => {
      toast.success("Customer deleted successfully!");
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete customer.",
      );
    },
  });

  const { mutate: updateCustomer } = useMutation({
    mutationFn: async ({ customerId, customerName, phoneNumber }) => {
      const data = {
        customerName,
        phoneNumber,
      };
      await axiosInstance({
        method: "PUT",
        url: `/customer/${customerId}`,
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Customer updated successfully!");
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update customer.",
      );
    },
  });

  return { customers: data, addCustomer, updateCustomer, deleteCustomer };
};
