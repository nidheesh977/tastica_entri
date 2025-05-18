import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useFileUploads = () => {
  const { mutate: uploadCSVFile } = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance({
        method: "POST",
        url: "/file/upload",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response?.data?.data;
    },
    onSuccess: () => {
      toast.success("File uploaded successfully");
    },
    onError: (error) => {
      toast.error("Failed to upload file");
      console.log(error);
    },
  });

  return {
    uploadCSVFile,
  };
};
