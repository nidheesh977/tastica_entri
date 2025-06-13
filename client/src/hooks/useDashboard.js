import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useDashboard = () => {
  const queryClient = useQueryClient();

  const { mutate: getTodaySales } = useMutation({
    mutationFn: async ({ date }) => {
      const data = {
        date,
      };
      await axiosInstance({
        method: "POST",
        url: "/product/create",
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Product added successfully!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add product.");
    },
  });

  return { getTodaySales };
};
