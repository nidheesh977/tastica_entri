import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useCategories = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
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

  const { mutate: deleteCategory } = useMutation({
    mutationFn: async (categoryId) => {
      await axiosInstance({
        method: "DELETE",
        url: `/categories/${categoryId}`,
        withCredentials: true,
      });
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
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: () => {
      toast.error("Failed to update category.");
    },
  });

  return { categories: data, updateCategory, deleteCategory };
};
