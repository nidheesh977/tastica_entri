import toast from "react-hot-toast";
import { useEffect, useCallback } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { addCategoryData } from "../redux/features/categorySlice";

export const useCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/categories",
        withCredentials: true,
      });
      dispatch(addCategoryData(response?.data?.data));
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  const deleteCategory = async (categoryId) => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/categories/${categoryId}`,
        withCredentials: true,
      });
      toast.success("Category deleted successfully");

      fetchCategories();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateCategory = async (
    categoryId,
    categoryname,
    description,
    discount
  ) => {
    const data = {
      categoryname,
      description,
    };

    try {
      await axiosInstance({
        method: "PUT",
        url: `/categories/${categoryId}`,
        withCredentials: true,
        data,
      });
      toast.success("Category updated successfully");

      fetchCategories();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };
  return { categories, updateCategory, deleteCategory, fetchCategories };
};
