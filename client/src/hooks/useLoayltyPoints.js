import toast from "react-hot-toast";
import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useLoyaltyPoints = () => {
  const queryClient = useQueryClient();
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
    mutationFn: async ({ loyaltyRate }) => {
      const data = { loyaltyRate };
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

  const { data: loyaltyData } = useQuery({
    queryKey: ["loyaltyData"],
    queryFn: async () => {
      const response = await axiosInstance.get("/loyalty", {
        withCredentials: true,
      });
      return response?.data?.data;
    },

    onSuccess: () => toast.success("Loyalty data fetched successfully"),
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch loyalty data!"
      ),
  });

  const { mutate: updateLoyaltyData } = useMutation({
    mutationFn: async ({ loyaltyRate, id }) => {
      const data = { loyaltyRate };
      await axiosInstance({
        method: "PATCH",
        url: `/loyalty/${id}`,
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Data updated.");
      queryClient.invalidateQueries(["loyaltyData"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update data!");
    },
  });
  const { mutate: deleteLoyaltyData } = useMutation({
    mutationFn: async ({ id }) => {
      await axiosInstance({
        method: "DELETE",
        url: `/loyalty/${id}`,
        withCredentials: true,
      });
    },
    onSuccess: () => {
      toast.success("Data deleted.");
      queryClient.invalidateQueries(["loyaltyData"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete data!");
    },
  });

  return {
    addLoyaltyPoints,
    setPointRecharge,
    loyaltyData,
    updateLoyaltyData,
    deleteLoyaltyData,
  };
};
