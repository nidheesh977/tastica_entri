import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { validateData } from "../utils/validateData";
import { useState } from "react";
import { removeStaffData } from "../redux/features/authSlice";

export const useAdmins = (status) => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const invoiceId = useSelector((state) => state?.invoice?._id);
  const [error, setError] = useState(null);
  const { data } = useQuery({
    queryKey: ["staffs"],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/staff/list",
        withCredentials: true,
      });
      return response?.data?.data;
    },
  });

  const { mutate: staffSignup, isSuccess, isPending } = useMutation({
    mutationFn: async ({ userName, email, phoneNumber, password }) => {
      const error = validateData(userName, email, phoneNumber, password);

      setError(error);
      const data = {
        userName,
        email,
        phoneNumber,
        password,
      };

      await axiosInstance({
        method: "POST",
        url: "/admin/create-employee",
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Signup success!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to signup.");

      dispatch(removeStaffData());
    },
  });

  const { mutate: updateStaff } = useMutation({
    mutationFn: async ({ staffId, userName, email, phoneNumber }) => {
      const data = {
        userName,
        email,
        phoneNumber,
      };

      await axiosInstance({
        method: "PUT",
        url: `admin/staff/${staffId}`,
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Staff updated successfully!");
      queryClient.invalidateQueries(["staffs"]);
    },
    onError: () => {
      toast.error(
        error?.response?.data?.message || "Failed to update staff data!"
      );
    },
  });

  const { mutate: deleteStaff } = useMutation({
    mutationFn: async (staffId) => {
      axiosInstance({
        method: "DELETE",
        url: `/admin/staff/${staffId}`,
        withCredentials: true,
      });
    },
    onSuccess: () => {
      toast.success("Staff deleted successfully!");
      queryClient.invalidateQueries(["staffs"]);
    },
    onError: () => {
      toast.error(error?.response?.data?.message || "Failed to delete staff.");
    },
  });
  const { data: invoice } = useQuery({
    queryKey: ["invoice", invoiceId],
    enabled: !!invoiceId,
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/invoice/${invoiceId}`,
        withCredentials: true,
      });
      return response?.data?.data;
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to fetch invoice");
    },
  });

  const { data: invoices } = useQuery({
    queryKey: ["invoices", status],

    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/invoice?status=${status}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["invoices", status]);

    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to fetch invoices");
    },
  });

  return {
    staffs: data,
    invoice,
    invoices,
    staffSignup,
    updateStaff,
    deleteStaff,
    isSuccess,
    isPending
  };
};
