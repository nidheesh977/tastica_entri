import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { saveInvoiceData } from "../redux/features/invoiceSlice";

export const useInvoices = () => {
  const invoiceId = useSelector((state) => state?.invoice?._id);
  const dispatch = useDispatch();
  // const queryClient = useQueryClient();

  // const { data: invoice } = useQuery({
  //   queryKey: ["invoice", invoiceId],
  //   enabled: !!invoiceId,
  //   queryFn: async () => {
  //     const response = await axiosInstance.get(`/invoice/${invoiceId}`, {
  //       withCredentials: true,
  //     });
  //     return response?.data?.data;
  //   },
  //   onError: (error) => {
  //     toast.error("Failed to fetch invoice");
  //     console.error(error);
  //   },
  // });

  const { mutate: createInvoice } = useMutation({
    mutationFn: async (customerId) => {
      const response = await axiosInstance.post(
        `/invoice/${customerId}`,
        null,
        {
          withCredentials: true,
        },
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
      dispatch(saveInvoiceData(data));
      toast.success("Invoice created");
    },
    onError: (error) => {
      toast.error("Failed to create invoice");
      console.error(error);
    },
  });

  const { mutate: addProductToInvoice } = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const response = await axiosInstance.post(
        `/invoice/${invoiceId}/products`,
        { productId, quantity },
        { withCredentials: true },
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast.success("Product added to invoice");
      dispatch(saveInvoiceData(data))
    },
    onError: (error) => {
      toast.error("Failed to add product to invoice");
      console.error(error);
    },
  });

  const { mutate: removeProductFromInvoice } = useMutation({
    mutationFn: async (productId) => {
      const response = await axiosInstance.put(
        `/invoice/${invoiceId}/product/${productId}`,
        null,
        { withCredentials: true },
      );
      return response?.data?.data;
    },
    onSuccess: (data) => {
      dispatch(saveInvoiceData(data));
      toast.success("Product removed from invoice");
    },
    onError: (error) => {
      toast.error("Failed to remove product from invoice");
      console.error(error);
    },
  });

  return {
    createInvoice,
    addProductToInvoice,
    removeProductFromInvoice,
  };
};
