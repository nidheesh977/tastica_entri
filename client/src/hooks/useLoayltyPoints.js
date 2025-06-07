import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useLoyaltyPoints = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["loyaltyPoints"],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: "/loyality",
        withCredentials: true,
      });
      return response?.data?.data;
    },
  });

  const { mutate: addLoyaltyPoints } = useMutation({
    mutationFn: async ({ loyalityRate }) => {
      const data = {
        loyalityRate,
      };
      await axiosInstance({
        method: "POST",
        url: "/loyality",
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Loyalty point added successfully!");
      queryClient.invalidateQueries(["loyaltyPoints"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to add loyalty points."
      );
    },
  });
  const { mutate: deleteLoyaltyPoints } = useMutation({
    mutationFn: async ({id}) => {
      await axiosInstance({
        method: "DELETE",
        url: `/loyality/${id}`,
        withCredentials: true,
      });
    },
    onSuccess: () => {
      toast.success("Loyalty deleted successfully!");
      queryClient.invalidateQueries(["loyaltyPoints"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete loyalty point."
      );
    },
  });

  const { mutate: updateLoyaltyPoints } = useMutation({
    mutationFn: async ({ loyalityRate, id }) => {
      const data = {
        loyalityRate,
      };

      await axiosInstance({
        method: "PATCH",
        url: `/loyality/${id}`,
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Loyalty points updated successfully!");
      queryClient.invalidateQueries(["loyaltyPoints"]);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update loyalty points."
      );
    },
  });

  return {
    loyaltyPoints: data,
    addLoyaltyPoints,
    updateLoyaltyPoints,
    deleteLoyaltyPoints,
  };
};
