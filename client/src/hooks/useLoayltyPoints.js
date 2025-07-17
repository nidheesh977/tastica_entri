import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useLoyaltyPoints = () => {
  const { mutate: addLoyaltyPoints } = useMutation({
    mutationFn: async ({ loyaltyRate }) => {
      const data = { loyaltyRate };
      await axiosInstance({
        method: "PUT",
        url: "/loyalty/products",
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Loyalty point set successfully to products.");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to set loyalty points!"
      );
    },
  });
  const { mutate: setPointRecharge } = useMutation({
    mutationFn: async ({ loyalityRate }) => {
      const data = { loyalityRate };
      await axiosInstance({
        method: "POST",
        url: "/loyalty",
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Set card loyalty point successfully.");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to set card loyalty points!"
      );
    },
  });

  return {
    addLoyaltyPoints,
    setPointRecharge
  };
};
