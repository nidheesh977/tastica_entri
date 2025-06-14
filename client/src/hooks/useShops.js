import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useShops = () => {
  const { data } = useQuery({
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
  return { shops: data };
};
