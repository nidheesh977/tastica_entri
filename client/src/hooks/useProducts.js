import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: "/product",
        withCredentials: true,
      });
      return response?.data?.data;
    },
  });

  const { mutate: addProduct } = useMutation({
    mutationFn: async ({
      productName,
      quantity,
      costPrice,
      costPriceProfit,
      sellingPrice,
      discount,
      category,
      discountType,
      unit,
    }) => {
      const data = {
        productName,
        quantity,
        costPrice,
        costPriceProfit,
        sellingPrice,
        discount,
        category,
        discountType,
        unit,
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
  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (productId) => {
      await axiosInstance({
        method: "DELETE",
        url: `/product/delete/${productId}`,
        withCredentials: true,
      });
    },
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete product."
      );
    },
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: async ({
      productId,
      productName,
      quantity,
      costPrice,
      sellingPrice,
      costPriceProfit,
      discount,
      category,
      productTax,
      loyaltyRate,
    }) => {
      const data = {
        productName,
        quantity,
        costPrice,
        costPriceProfit,
        sellingPrice,
        discount,
        category,
        productTax,
        loyaltyRate,
      };

      await axiosInstance({
        method: "PUT",
        url: `/product/update/${productId}`,
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries(["products"]);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update product."
      );
    },
  });

  return { products: data, addProduct, updateProduct, deleteProduct };
};
