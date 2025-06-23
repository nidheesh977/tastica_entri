import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector } from "react-redux";

export const useDashboardAdmin = ({
  year,
  month,
  day,
  customMonth,
  customYear,
  selectedMethodMonth,
  selectedMethodWeek,
  selectedMethodYear,
}) => {
  const admin = useSelector((state) => state?.auth?.adminData);

  const { data: categoriesSalesDataAdmin } = useQuery({
    queryKey: ["categoriesSalesDataAdmin"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/admin/dashboard/invoices/categories",
        { withCredentials: true }
      );
      return response?.data?.data;
    },
    enabled: !!admin,
    onSuccess: () => toast.success("Sales data fetched successfully"),
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const { data: dateSalesAdmin } = useQuery({
    queryKey: ["dateSales", year, month, day],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/dashboard/invoices/payment-method?year=${year}&month=${month}&day=${day}`,
        { withCredentials: true }
      );
      return response?.data?.data;
    },
    enabled: !!admin && !!year && !!month && !!day,
    onSuccess: () => toast.success("Sales data fetched successfully"),
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const { data: yearSalesAdmin } = useQuery({
    queryKey: ["yearSales", customYear],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/dashboard/invoices/payment-method?year=${customYear}`,
        { withCredentials: true }
      );
      return response?.data?.data;
    },
    enabled: !!admin && !!customYear,
    onSuccess: () => toast.success("Sales data fetched successfully"),
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const { data: monthSalesAdmin } = useQuery({
    queryKey: ["monthSales", year, customMonth],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/dashboard/invoices/payment-method?year=${year}&month=${customMonth}`,
        { withCredentials: true }
      );
      return response?.data?.data;
    },
    enabled: !!admin && !!year && !!customMonth,
    onSuccess: () => toast.success("Sales data fetched successfully"),
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });

  const { data: monthSalesBarChartDataAdmin } = useQuery({
    queryKey: ["monthSalesBarChartDataAdmin", selectedMethodMonth],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/admin/dashboard/invoices/month?methods=${selectedMethodMonth}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },

    enabled: !!admin && !!selectedMethodMonth,
    onSuccess: () => toast.success("Sales data fetched successfully"),
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const { data: weeklySalesBarChartDataAdmin } = useQuery({
    queryKey: ["weeklySalesBarChartDataAdmin", selectedMethodWeek],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/admin/dashboard/invoices/week?methods=${selectedMethodWeek}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },

    enabled: !!admin && !!selectedMethodWeek,
    onSuccess: () => toast.success("Sales data fetched successfully"),
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const { data: yearlySalesBarChartDataAdmin } = useQuery({
    queryKey: ["yearlySalesBarChartDataAdmin", selectedMethodYear],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/admin/dashboard/invoices/year?methods=${selectedMethodYear}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },

    enabled: !!admin && !!selectedMethodYear,
    onSuccess: () => toast.success("Sales data fetched successfully"),
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const { data: monthSalesLineChartDataAdmin } = useQuery({
    queryKey: ["monthSalesLineChartDataAdmin", selectedMethodYear],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/dashboard/invoices/days",
        withCredentials: true,
      });

      return response?.data?.data;
    },

    enabled: !!admin,
    onSuccess: () => toast.success("Sales data fetched successfully"),
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });

  return {
    dateSalesAdmin,
    yearSalesAdmin,
    monthSalesAdmin,
    monthSalesBarChartDataAdmin,
    weeklySalesBarChartDataAdmin,
    yearlySalesBarChartDataAdmin,
    categoriesSalesDataAdmin,
    monthSalesLineChartDataAdmin,
  };
};
