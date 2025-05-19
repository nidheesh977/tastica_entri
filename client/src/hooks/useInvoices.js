import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  saveInvoiceData,
  clearInvoiceData,
} from "../redux/features/invoiceSlice";
import { loadStripe } from "@stripe/stripe-js";
import { saveOrderData } from "../redux/features/orderSlice";

export const useInvoices = () => {
  const invoiceId = useSelector((state) => state?.invoice?._id);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["invoice", invoiceId],
    enabled: !!invoiceId,
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/invoice/${invoiceId}`,
        withCredentials: true,
      });
      return response?.data?.data;
    },

    onError: (error) => {
      toast.error("Failed to fetch invoice");
      console.error(error);
    },
  });
  const { data: invoices } = useQuery({
    queryKey: ["invoices"],

    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: "/invoice",
        withCredentials: true,
      });
      return response?.data?.data;
    },

    onError: (error) => {
      toast.error("Failed to fetch invoices");
      console.error(error);
    },
  });

  const { mutate: saveInvoice } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance({
        method: "PATCH",
        url: `/invoice/${invoiceId}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast.success("Saved to open orders");
      dispatch(saveOrderData(data));
      dispatch(clearInvoiceData());
    },
    onError: (error) => {
      console.error(error?.response?.data?.message);
    },
  });

  const { data: savedInvoices } = useQuery({
    queryKey: ["savedInvoices"],

    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: "/invoice/save/status-saved",
        withCredentials: true,
      });

      return response?.data?.data;
    },

    onSuccess: (data) => {
      dispatch(saveOrderData(data));
    },

    onError: (error) => {
      toast.error("Failed to fetch saved invoice");
      console.error(error);
    },
  });

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
      toast.success("Invoice created");
    },
    onError: (error) => {
      toast.error("Failed to create invoice");
    },
  });

  const { mutate: addProductToInvoice } = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const data = {
        productId,
        quantity,
      };
      const response = await axiosInstance({
        method: "POST",
        url: `/invoice/${invoiceId}/products`,
        withCredentials: true,
        data,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast.success("Product added to invoice");
      dispatch(saveInvoiceData(data));
      queryClient.invalidateQueries(["invoice"]);
    },
    onError: (error) => {
      toast.error("Failed to add product to invoice");
      console.error(error?.response?.data?.message);
    },
  });

  const { mutate: removeProductFromInvoice } = useMutation({
    mutationFn: async (productId) => {
      const response = await axiosInstance({
        method: "PUT",
        url: `/invoice/${invoiceId}/product/${productId}`,
        withCredentials: true,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      dispatch(saveInvoiceData(data));
      queryClient.invalidateQueries(["invoice"]);
      toast.success("Product removed from invoice");
    },
    onError: (error) => {
      toast.error("Failed to remove product from invoice");
      console.error(error);
    },
  });

  const { mutate: makeCashPayment } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/cash/invoice/${invoiceId}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast.success("Payment successful.");
      dispatch(clearInvoiceData());
    },
    onError: (error) => {
      console.error(error?.response?.data?.message);
    },
  });

  const { mutate: makeOnlinePayment } = useMutation({
    mutationFn: async () => {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );

      const session = await axiosInstance({
        url: `/payment/card/invoice/${invoiceId}`,
        method: "POST",
        withCredentials: true,
      });
      return stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      dispatch(clearInvoiceData());
    },
    onError: (error) => {
      console.error(error?.response?.data?.message);
    },
  });

  return {
    createInvoice,
    addProductToInvoice,
    removeProductFromInvoice,
    invoice: data,
    makeCashPayment,
    makeOnlinePayment,
    saveInvoice,
    savedInvoices,
    invoices,
  };
};
