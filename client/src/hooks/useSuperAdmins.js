import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { validateData } from "../utils/validateData";
import { useState } from "react";
import { removeStaffData } from "../redux/features/authSlice";

export const useSuperAdmins = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const selectedShopId = useSelector((state) => state?.selectedShopId);

  const [error, setError] = useState(null);
  const { data: shops } = useQuery({
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
  const { data: shopStaffs } = useQuery({
    queryKey: ["shopStaffs"],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/super-admin/employee/list?shop=${selectedShopId}`,
        withCredentials: true,
      });
      return response?.data?.data;
    },
  });

  const { mutate: createStaff } = useMutation({
    mutationFn: async ({ userName, email, phoneNumber, password }) => {
      const error = validateData(userName, email, phoneNumber, password);

      setError(error);
      const data = {
        userName,
        email,
        phoneNumber,
        password,
      };

      await axiosInstance({
        method: "POST",
        url: "/super-admin/create-employee",
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Staff created successfully");
    },
    onError: () => {
      toast.error(error?.response?.data?.message || "Failed to create staff!.");

      dispatch(removeStaffData());
    },
  });
  const { mutate: createShop } = useMutation({
    mutationFn: async ({
      shopName,
      email,
      countryName,
      currencyCode,
      password,
    }) => {
      const data = {
        shopName,
        email,
        countryName,
        currencyCode,
        password,
      };

      await axiosInstance({
        method: "POST",
        url: "/super-admin/create-shop",
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Staff created successfully");
    },
    onError: () => {
      toast.error(error?.response?.data?.message || "Failed to create staff!.");

      dispatch(removeStaffData());
    },
  });

  const { mutate: updateStaff } = useMutation({
    mutationFn: async ({ staffId, userName, email, phoneNumber }) => {
      const data = {
        userName,
        email,
        phoneNumber,
      };

      await axiosInstance({
        method: "PUT",
        url: `super-admin/employee/${staffId}id/update`,
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Staff updated successfully!");
      queryClient.invalidateQueries(["shopDStaffs"]);
    },
    onError: () => {
      toast.error(error?.response?.data?.message || "Failed to update staff!");
    },
  });

  const { mutate: deleteStaff } = useMutation({
    mutationFn: async (staffId) => {
      axiosInstance({
        method: "DELETE",
        url: `/super-admin/employee/${staffId}/delete`,
        withCredentials: true,
      });
    },
    onSuccess: () => {
      toast.success("Staff deleted successfully!");
      queryClient.invalidateQueries(["staffs"]);
    },
    onError: () => {
      toast.error(error?.response?.data?.message || "Failed to delete staff.");
    },
  });

  return {
    createShop,
    shops,
    shopStaffs,
    createStaff,
    updateStaff,
    deleteStaff,
  };
};
