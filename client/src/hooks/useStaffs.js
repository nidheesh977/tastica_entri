import toast from "react-hot-toast";
import { useEffect, useCallback } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { addStaffData } from "../redux/features/authSlice";

export const useStaffs = () => {
  const dispatch = useDispatch();
  const staffs = useSelector((state) => state.auth.staffData);
  const fetchStaffs = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/staff/list",
        withCredentials: true,
      });
      dispatch(addStaffData(response?.data?.data));
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!staffs || staffs.length === 0) {
      fetchStaffs();
    }
  }, [staffs, fetchStaffs]);

  const deleteStaff = async (staffId) => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/admin/staff/${staffId}`,
        withCredentials: true,
      });
      toast.success("Staff deleted successfully");

      fetchStaffs();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateCategory = async (
    staffId,
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
