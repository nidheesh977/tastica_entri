import toast from "react-hot-toast";
import { useEffect, useCallback } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { addProductData } from "../redux/features/productSlice";

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/product",
        withCredentials: true,
      });
      dispatch(addProductData(response?.data?.data));
      
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (products === null) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  const deleteProduct = async (productId) => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/product/delete/${productId}`,
        withCredentials: true,
      });
      toast.success("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      toast('Something went wrong!')
    }
  };

  const updateProduct = async (
    productId,
    productName,
    category,
    quantity,
    costPrice,
    sellingPrice,
    discount
  ) => {
    const data = {
      productName,
      quantity,
      costPrice,
      sellingPrice,
      discount,
      category: category?._id,
    };

    try {
      await axiosInstance({
        method: "PUT",
        url: `/product/update/${productId}/category/${category._id}`,
        withCredentials: true,
        data,
      });
      toast.success("Product updated successfully");

      fetchProducts();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };
  return { products, deleteProduct, updateProduct, fetchProducts };
};
