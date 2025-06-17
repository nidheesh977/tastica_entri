import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useDashboard = (year, month, day, customMonth, customYear) => {
  const {
    data: dateSales,
    
  } = useQuery({
    queryKey: ["dateSales", year, month, day],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/dashboard/invoice/payment-method?year=${year}&month=${month}&day=${day}`,
        { withCredentials: true }
      );
      return response?.data?.data;
    },
    enabled: !!year && !!month && !!day,
    onSuccess: () => toast.success("Sales data fetched successfully"),
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const {
    data: yearSales,
    
  } = useQuery({
    queryKey: ["yearSales", customYear],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/dashboard/invoice/payment-method?year=${customYear}`,
        { withCredentials: true }
      );
      return response?.data?.data;
    },
    enabled: !!customYear ,
    onSuccess: () => toast.success("Sales data fetched successfully"),
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const {
    data: monthSales,
    
  } = useQuery({
    queryKey: ["monthSales", year, customMonth],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/dashboard/invoice/payment-method?year=${year}&month=${customMonth}`,
        { withCredentials: true }
      );
      return response?.data?.data;
    },
    enabled: !!year && !!customMonth ,
    onSuccess: () => toast.success("Sales data fetched successfully"),
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });

  return { dateSales, yearSales, monthSales };
};
