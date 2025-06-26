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

  return {
    addLoyaltyPoints,
  };
};
