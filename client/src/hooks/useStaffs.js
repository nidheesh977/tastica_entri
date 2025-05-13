import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStaffData, removeStaffData } from "../redux/features/authSlice";
import { validateData } from "../utils/validateData";
import { useState } from "react";

export const useStaffs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
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

  const { mutate: signup } = useMutation({
    mutationFn: async ({
      userName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    }) => {
      const error = validateData(
        userName,
        email,
        phoneNumber,
        password,
        confirmPassword
      );
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
    onError: () => {
      toast.error(error || "Failed to signup.");
      dispatch(removeStaffData());
    },
  });
  const { mutate: login } = useMutation({
    mutationFn: async ({ phoneNumber, password }) => {
      const data = {
        phoneNumber,
        password,
      };

      const response = await axiosInstance({
        method: "POST",
        url: "/staff/login",
        withCredentials: true,
        data,
      });
      dispatch(addStaffData(response?.data?.data));
    },
    onSuccess: () => {
      toast.success("Login success!");
      navigate("/staff");
    },
    onError: () => {
      toast.error("Failed to login.");
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
      toast.error("Failed to update staff.");
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
      toast.error("Failed to delete staff.");
    },
  });

  return { staffs: data, signup, login, updateStaff, deleteStaff };
};
