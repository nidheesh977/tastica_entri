import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { saveInvoiceData } from "../redux/features/invoiceSlice";

export const useInvoices = () => {
  const invoice = useSelector((state) => state.invoice);
  const dispatch = useDispatch();
  // const queryClient = useQueryClient();
  // const { data } = useQuery({
  //   queryKey: ["invoices"],
  //   queryFn: async () => {
  //     const response = await axiosInstance({
  //       method: "GET",
  //       url: "/invoice",
  //       withCredentials: true,
  //     });
  //     return response?.data?.data;
  //   },
  // });

  const { mutate: createInvoice } = useMutation({
    mutationFn: async (customerId) => {
      const response = await axiosInstance({
        method: "POST",
        url: `/invoice/${customerId}`,
        withCredentials: true,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      dispatch(saveInvoiceData(data));
    },
  });

  const { mutate: addProductToInvoice } = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const data = { productId, quantity };
      const response = await axiosInstance({
        method: "POST",
        url: `/invoice/${invoice?._id}/products`,
        withCredentials: true,
        data,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      dispatch(saveInvoiceData(data));
    },
  });

  return { createInvoice, addProductToInvoice };
};
