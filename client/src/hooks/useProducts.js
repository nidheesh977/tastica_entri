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

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (productId) => {
      await axiosInstance({
        method: "DELETE",
        url: `/product/delete/${productId}`,
        withCredentials: true,
      });
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Failed to delete product.");
    },
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: async ({
      productId,
      productName,
      quantity,
      costPrice,
      sellingPrice,
      discount,
      category,
    }) => {
      const data = {
        productName,
        quantity,
        costPrice,
        sellingPrice,
        discount,
        category,
      };

      await axiosInstance({
        method: "PUT",
        url: `/product/update/${productId}/category/${category}`,
        withCredentials: true,
        data,
      });
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries(["products"]);
    },

    onError: () => {
      toast.error("Failed to update product.");
    },
  });

  return { products: data, updateProduct, deleteProduct };
};
