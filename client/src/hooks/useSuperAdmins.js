import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { removeStaffData } from "../redux/features/authSlice";

export const useSuperAdmins = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const selectedShopId = useSelector((state) => state?.selectedShopId);

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
    queryKey: ["shopStaffs", selectedShopId],
    queryFn: async () => {
      if (!selectedShopId) return [];
      const response = await axiosInstance({
        method: "GET",
        url: `/super-admin/employee/list?shop=${selectedShopId}`,
        withCredentials: true,
      });
      return response?.data?.data;
    },
  });

  const { mutate: createStaff } = useMutation({
    mutationFn: async ({
      userName,
      email,
      phoneNumber,
      password,
      shopId,
      role,
    }) => {
      const data = {
        userName,
        email,
        phoneNumber,
        password,
        shopId,
        role,
      };

      const response = await axiosInstance({
        method: "POST",
        url: "/super-admin/create-employee",
        withCredentials: true,
        data,
      });

      return response?.data?.data;
    },
    onSuccess: () => {
      toast.success("Employee created successfully");

      queryClient.invalidateQueries(["shopStaffs", selectedShopId]);
    },
    onError: (error) => {
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
        countryName: countryName.charAt(0).toUpperCase() + countryName.slice(1),
        currencyCode: currencyCode.toUpperCase(),
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
      toast.success("Shop created successfully");
      queryClient.invalidateQueries(["shops"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create shop!.");

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
        url: `super-admin/employee/${staffId}/update`,
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Staff updated successfully!");
      queryClient.invalidateQueries(["shopDStaffs"]);
    },
    onError: (error) => {
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
      queryClient.invalidateQueries(["shopStaffs"]);
      queryClient.invalidateQueries(["shops", selectedShopId]);
    },
    onError: (error) => {
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
