import toast from "react-hot-toast";
import { useEffect, useCallback } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { addCustomerData } from "../redux/features/customerSlice";

export const useCustomers = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers);
  const hasFetched = customers !== null;
  const fetchCustomers = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/customer",
        withCredentials: true,
      });
      dispatch(addCustomerData(response?.data?.data));
    } catch (error) {
      if (error?.response?.status === 404) {
        dispatch(addCustomerData([]));
      } else {
        console.error(error);
        toast.error("Failed to fetch customers");
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (!hasFetched) {
      fetchCustomers();
    }
  }, [customers, fetchCustomers]);

  const deleteCustomer = async (customerId) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: `/customer/${customerId}`,
        withCredentials: true,
      });
      toast.success("Customer deleted successfully");
      fetchCustomers();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateCustomer = async (customerId, customerName, phoneNumber) => {
    const data = {
      customerName,
      phoneNumber,
    };

    try {
      await axiosInstance({
        method: "PUT",
        url: `/customer/${customerId}`,
        withCredentials: true,
        data,
      });
      toast.success("Customer data updated successfully");

      fetchCustomers();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };
  return { customers, updateCustomer, deleteCustomer, fetchCustomers };
};
