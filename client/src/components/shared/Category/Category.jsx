import { useState, useEffect } from "react";
import { axiosInstance } from "../../../config/axiosInstance";

export const Category = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/products/categories",
        withCredentials: true,
      });

      setCategories(response?.data?.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {categories.map((category) => (
        <div className="bg-[#E8F9FF] font-semibold border my-1 cursor-pointer hover:bg-opacity-50 shadow-2xl rounded-lg p-5">
          <p key={category?._id}>{category?.categoryname}</p>
        </div>
      ))}
    </>
  );
};
