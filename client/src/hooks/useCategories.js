import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useState } from "react";

export const useCategories = () => {
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);
  const [categoryId, setCategoryId] = useState("");
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

  const { data: categoryProductData } = useQuery({
    queryKey: ["categoryProducts"],
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/product/category-search?categoryId=${categoryId}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },
    enabled: isCategoryClicked,
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

  return {
    categories: categoryData,
    categoryProducts: categoryProductData,
    updateCategory,
    deleteCategory,
    setIsCategoryClicked,
    setCategoryId,
    isCategoryClicked,
  };
};
