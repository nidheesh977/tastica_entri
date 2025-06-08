import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useFileUploads = () => {
  const uploadProductsMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post("/file/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response?.data?.data;
    },
    onSuccess: () => {
      toast.success("File uploaded successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to upload file");
    },
  });

  const uploadCategoriesMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post(
        "/file/upload/category",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response?.data?.data;
    },
    onSuccess: () => {
      toast.success("File uploaded successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to upload file");
    },
  });

  return {
    uploadProductsCSVFile: uploadProductsMutation,
    uploadCategoriesCSVFile: uploadCategoriesMutation,
  };
};
