import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdminData, removeAdminData } from "../redux/features/authSlice";

export const useAdmins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: login } = useMutation({
    mutationFn: async ({ phoneNumber, password }) => {
      const data = {
        phoneNumber,
        password,
      };

      const response = await axiosInstance({
        method: "POST",
        url: "/admin/login",
        withCredentials: true,
        data,
      });
      dispatch(addAdminData(response?.data?.data));
    },
    onSuccess: () => {
      toast.success("Login success!");
      navigate("/admin");
    },
    onError: () => {
      toast.error("Failed to login.");
      dispatch(removeAdminData());
    },
  });

  return { login };
};
