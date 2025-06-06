import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addShopData, removeShopData } from "../redux/features/authSlice";

export const useShops = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: login } = useMutation({
    mutationFn: async ({ email, password }) => {
      const data = {
        email,
        password,
      };

      const response = await axiosInstance({
        method: "POST",
        url: "/shop/login",
        withCredentials: true,
        data,
      });
      dispatch(addShopData(response?.data?.data));

      
    },
    onSuccess: () => {
      toast.success("Login success!");
      navigate("/shop");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to login.");
      dispatch(removeShopData());
    },
  });

  return { login };
};
