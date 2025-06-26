import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector } from "react-redux";

export const useDashboardSuperAdmin = ({
  year,
  month,
  day,
  customMonth,
  customYear,
  selectedMethodMonth,
  selectedMethodWeek,
  selectedMethodYear,
}) => {
  const superAdmin = useSelector((state) => state?.auth?.superAdminData);
  const shopId = useSelector((state) => state?.selectedShopId);
  const queryClient = useQueryClient();
  const { data: categoriesSalesDataSuperAdmin } = useQuery({
    queryKey: ["categoriesSalesDataSuperAdmin", shopId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/super-admin/dashboard/invoices/categories?shop=${shopId}`,
        { withCredentials: true }
      );
      return response?.data?.data;
    },
    enabled: !!superAdmin && !!shopId,
    onSuccess: () => {
      toast.success("Sales data fetched successfully"),
        queryClient.invalidateQueries([
          "categoriesSalesDataSuperAdmin",
          shopId,
        ]);
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const { data: dateSalesSuperAdmin } = useQuery({
    queryKey: ["dateSalesSuperAdmin", shopId, year, month, day],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/super-admin/dashboard/invoices/payment-method?shop=${shopId}&year=${year}&month=${month}&day=${day}`,
        { withCredentials: true }
      );
      return response?.data?.data;
    },
    enabled: !!superAdmin && !!shopId && !!year && !!month && !!day,
    onSuccess: () => {
      toast.success("Sales data fetched successfully");
      queryClient.invalidateQueries(["dateSalesSuperAdmin", shopId]);
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const { data: yearSalesSuperAdmin } = useQuery({
    queryKey: ["yearSalesSuperAdmin", shopId, customYear],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/super-admin/dashboard/invoices/payment-method?shop=${shopId}&year=${customYear}`,
        { withCredentials: true }
      );
      return response?.data?.data;
    },
    enabled: !!superAdmin && !!shopId && !!customYear,
    onSuccess: () => {
      toast.success("Sales data fetched successfully");
      queryClient.invalidateQueries(["yearSalesSuperAdmin", shopId]);
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const { data: monthSalesSuperAdmin } = useQuery({
    queryKey: ["monthSalesSuperAdmin", shopId, year, customMonth],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/super-admin/dashboard/invoices/payment-method?shop=${shopId}&year=${year}&month=${customMonth}`,
        { withCredentials: true }
      );
      return response?.data?.data;
    },
    enabled: !!superAdmin && !!shopId && !!year && !!customMonth,
    onSuccess: () => {
      toast.success("Sales data fetched successfully");
      queryClient.invalidateQueries(["monthSalesSuperAdmin", shopId]);
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });

  const { data: monthSalesBarChartDataSuperAdmin } = useQuery({
    queryKey: ["monthSalesBarChartDataSuperAdmin", shopId, selectedMethodMonth],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/super-admin/dashboard/invoices/month?shop=${shopId}&methods=${selectedMethodMonth}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },

    enabled: !!superAdmin && !!shopId && !!selectedMethodMonth,
    onSuccess: () => {
      toast.success("Sales data fetched successfully");
      queryClient.invalidateQueries([
        "monthSalesBarChartDataSuperAdmin",
        shopId,
      ]);
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const { data: weeklySalesBarChartDataSuperAdmin } = useQuery({
    queryKey: ["weeklySalesBarChartDataSuperAdmin", shopId, selectedMethodWeek],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/super-admin/dashboard/invoices/week?shop=${shopId}&methods=${selectedMethodWeek}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },

    enabled: !!superAdmin && !!shopId && !!selectedMethodWeek,
    onSuccess: () => {
      toast.success("Sales data fetched successfully");
      queryClient.invalidateQueries([
        "weeklySalesBarChartDataSuperAdmin",
        shopId,
      ]);
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const { data: yearlySalesBarChartDataSuperAdmin } = useQuery({
    queryKey: ["yearlySalesBarChartDataSuperAdmin", shopId, selectedMethodYear],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/super-admin/dashboard/invoices/year?shop=${shopId}&methods=${selectedMethodYear}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },

    enabled: !!superAdmin && !!shopId && !!selectedMethodYear,
    onSuccess: () => {
      toast.success("Sales data fetched successfully");
      queryClient.invalidateQueries([
        "yearlySalesBarChartDataSuperAdmin",
        shopId,
      ]);
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });
  const { data: monthSalesLineChartDataSuperAdmin } = useQuery({
    queryKey: ["monthSalesLineChartDataSuperAdmin", shopId, selectedMethodYear],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/super-admin/dashboard/invoices/days?shop=${shopId}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },

    enabled: !!superAdmin && !!shopId,
    onSuccess: () => {
      toast.success("Sales data fetched successfully");
      queryClient.invalidateQueries([
        "monthSalesLineChartDataSuperAdmin",
        shopId,
      ]);
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales data!"
      ),
  });

  return {
    dateSalesSuperAdmin,
    yearSalesSuperAdmin,
    monthSalesSuperAdmin,
    monthSalesBarChartDataSuperAdmin,
    weeklySalesBarChartDataSuperAdmin,
    yearlySalesBarChartDataSuperAdmin,
    categoriesSalesDataSuperAdmin,
    monthSalesLineChartDataSuperAdmin,
  };
};
