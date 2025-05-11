import toast from "react-hot-toast";
import { useEffect, useCallback, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
// import { useSelector, useDispatch } from "react-redux";
// import { addStaffData } from "../redux/features/authSlice";

export const useStaffs = () => {
  // const dispatch = useDispatch();
  // const staffs = useSelector((state) => state.auth.staffData);
  const [staffs, setStaffs] = useState(null);
  const fetchStaffs = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/staff/list",
        withCredentials: true,
      });
      // dispatch(addStaffData(response?.data?.data));
      setStaffs(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  }, [staffs]);

  useEffect(() => {
    if (staffs === null) {
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
      toast.success("Staff data deleted successfully");

      fetchStaffs();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateStaff = async (staffId, userName, email, phoneNumber) => {
    const data = {
      userName,
      email,
      phoneNumber,
    };

    try {
      await axiosInstance({
        method: "PUT",
        url: `admin/staff/${staffId}`,
        withCredentials: true,
        data,
      });
      toast.success("Staff data updated successfully");

      fetchStaffs();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };
  return { staffs, updateStaff, deleteStaff, fetchStaffs };
};
