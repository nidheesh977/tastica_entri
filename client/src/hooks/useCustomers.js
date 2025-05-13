import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useCustomers = () => {
  const queryClient = useQueryClient();
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
    onError: () => {
      toast.error("Failed to add customer.");
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
    onError: () => {
      toast.error("Failed to delete customer.");
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
    onError: () => {
      toast.error("Failed to update customer.");
    },
  });

  return { customers: data, addCustomer, updateCustomer, deleteCustomer };
};
