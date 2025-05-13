import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useCategories = () => {
  const queryClient = useQueryClient();
  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: "/categories",
        withCredentials: true,
      });
      return response?.data?.data;
    },
  });

  const { mutate: addCategory } = useMutation({
    mutationFn: async ({ categoryName, description, discountRate }) => {
      const data = { categoryName, description, discountRate };
      await axiosInstance({
        method: "POST",
        url: "/categories",
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Category added successfully!");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: () => {
      toast.error("Failed to add category.");
    },
  });
  const { mutate: deleteCategory } = useMutation({
    mutationFn: async (categoryId) => {
      await axiosInstance({
        method: "DELETE",
        url: `/categories/${categoryId}`,
        withCredentials: true,
      });
    },
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: () => {
      toast.error("Failed to delete category.");
    },
  });

  const { mutate: updateCategory } = useMutation({
    mutationFn: async ({ categoryId, categoryName, description }) => {
      const data = {
        categoryName,
        description,
      };

      await axiosInstance({
        method: "PUT",
        url: `/categories/${categoryId}`,
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: () => {
      toast.error("Failed to update category.");
    },
  });

  return {
    categories: categoryData,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
