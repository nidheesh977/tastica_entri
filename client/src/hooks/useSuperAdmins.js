import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { validateData } from "../utils/validateData";
import { useState } from "react";
import { removeStaffData } from "../redux/features/authSlice";

export const useSuperAdmins = () => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const [error, setError] = useState(null);
  const { data: shops } = useQuery({
    queryKey: ["shops"],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: "/super-admin/shop",
        withCredentials: true,
      });
      return response?.data?.data;
    },
  });
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

  const { mutate: createStaff } = useMutation({
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
        url: "/super-admin/create-employee",
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Staff created successfully");
    },
    onError: () => {
      toast.error(error?.response?.data?.message || "Failed to create staff!.");

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

  return {
    shops,
    staffs: data,
    createStaff,
    updateStaff,
    deleteStaff,
  };
};
