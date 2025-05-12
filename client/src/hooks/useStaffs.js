import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStaffData, removeStaffData } from "../redux/features/authSlice";

export const useStaffs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  return { staffs: data, updateStaff, deleteStaff, login };
};
