import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveInvoiceData,
  clearInvoiceData,
} from "../redux/features/invoiceSlice";
import {
  clearSingleInvoice,
  saveSingleInvoice,
} from "../redux/features/singleInvoiceSlice";

import { loadStripe } from "@stripe/stripe-js";
import { clearSingleInvoiceOpenOrder } from "../redux/features/singleInvoiceOpenOrderSlice";

export const useInvoices = (customerId = null) => {
  const invoiceId = useSelector((state) => state?.invoice?._id);
  const singleInvoiceId = useSelector((state) => state?.singleInvoiceOpenOrder);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const admin = useSelector((state) => state?.auth?.adminData);

  const { data: singleInvoiceOpenOrder } = useQuery({
    queryKey: ["singleInvoiceOpenOrder", singleInvoiceId],
    enabled: !!singleInvoiceId,
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/invoice/${singleInvoiceId}`,
        withCredentials: true,
      });
      return response?.data?.data;
    },

    onSuccess: (data) => {
      dispatch(saveSingleInvoice(data));
      console.log(data);
    },

    onError: (error) => {
      toast.error("Failed to fetch invoice");
      console.error(error);
    },
  });
  const { data: customerInvoices } = useQuery({
    queryKey: ["customerInvoices", customerId],
    enabled: !!customerId,
    queryFn: async () => {
      const response = await axiosInstance({
        method: "GET",
        url: `/customer/${customerId}`,
        withCredentials: true,
      });
      return response?.data?.data;
    },

    onError: (error) => {
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
      dispatch(clearInvoiceData());
      dispatch(clearSingleInvoice());
      queryClient.invalidateQueries(["savedInvoices"]);
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

    onSuccess: (data) => {},

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
  const { mutate: singleInvoice } = useMutation({
    mutationFn: async ({ singleInvoiceId }) => {
      const data = { id: singleInvoiceId };
      const response = await axiosInstance({
        method: "POST",
        url: "/invoice",
        withCredentials: true,
        data,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      dispatch(saveSingleInvoice(data));
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
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
      queryClient.invalidateQueries(["savedInvoices"]);
    },
    onError: (error) => {
      toast.error("Failed to add product to invoice");
      console.error(error?.response?.data?.message);
    },
  });
  const { mutate: addProductToInvoiceOpenOrder } = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const data = {
        productId,
        quantity,
      };
      const response = await axiosInstance({
        method: "POST",
        url: `/invoice/${singleInvoiceId}/products`,
        withCredentials: true,
        data,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast.success("Product added to invoice");
      dispatch(saveSingleInvoice(data));
      queryClient.invalidateQueries(["invoice"]);
      queryClient.invalidateQueries(["savedInvoices"]);
    },
    onError: (error) => {
      toast.error("Failed to add product to invoice");
      console.error(error?.response?.data?.message);
    },
  });

const { data: invoice } = useQuery({
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
      queryClient.invalidateQueries(["savedInvoices"]);

      toast.success("Product removed from invoice");
    },
    onError: (error) => {
      toast.error("Failed to remove product from invoice");
      console.error(error);
    },
  });
  const { mutate: removeProductFromInvoiceOpenOrder } = useMutation({
    mutationFn: async (productId) => {
      const response = await axiosInstance({
        method: "PUT",
        url: `/invoice/${singleInvoiceId}/product/${productId}`,
        withCredentials: true,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      dispatch(saveSingleInvoice(data));
      queryClient.invalidateQueries(["invoice"]);
      queryClient.invalidateQueries(["savedInvoices"]);

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
      queryClient.invalidateQueries(["savedInvoices"]);
      queryClient.invalidateQueries(["singleInvoiceOpenOrder"]);
      dispatch(clearInvoiceData());
      dispatch(clearSingleInvoice());
    },
    onError: (error) => {
      console.error(error?.response?.data?.message);
    },
  });
  const { mutate: makeSwipePayment } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/internal-device/invoice/${invoiceId}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast.success("Payment successful.");
      queryClient.invalidateQueries(["savedInvoices"]);
      queryClient.invalidateQueries(["singleInvoiceOpenOrder"]);
      dispatch(clearInvoiceData());
      dispatch(clearSingleInvoice());
    },
    onError: (error) => {
      console.error(error?.response?.data?.message);
    },
  });
  const { mutate: makeSwipePaymentOpenOrder } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/internal-device/invoice/${id}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast.success("Payment successful.");
      dispatch(clearInvoiceData());
      dispatch(clearSingleInvoice());
      dispatch(clearSingleInvoiceOpenOrder());
      queryClient.invalidateQueries(["savedInvoices"]);
      queryClient.invalidateQueries(["singleInvoiceOpenOrder"]);
    },
    onError: (error) => {
      console.error(error?.response?.data?.message);
    },
  });
  const { mutate: makeCashPaymentOpenOrder } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/cash/invoice/${id}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast.success("Payment successful.");
      dispatch(clearInvoiceData());
      dispatch(clearSingleInvoice());
      dispatch(clearSingleInvoiceOpenOrder());
      queryClient.invalidateQueries(["savedInvoices"]);
      queryClient.invalidateQueries(["singleInvoiceOpenOrder"]);
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
    },
    onError: (error) => {
      console.error(error?.response?.data?.message);
    },
  });
  const { mutate: makeOnlinePaymentOpenOrder } = useMutation({
    mutationFn: async (id) => {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );

      const session = await axiosInstance({
        url: `/payment/card/invoice/${id}`,
        method: "POST",
        withCredentials: true,
      });
      return stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      });
    },
    onSuccess: (data) => {
      dispatch(clearInvoiceData());
      dispatch(clearSingleInvoice());
      dispatch(clearSingleInvoiceOpenOrder());
      queryClient.invalidateQueries(["savedInvoices"]);
      queryClient.invalidateQueries(["singleInvoiceOpenOrder"]);
    },
    onError: (error) => {
      console.error(error?.response?.data?.message);
    },
  });
  const { mutate: redeemPoints } = useMutation({
    mutationFn: async (redeemAmountAdd) => {
      const data = { redeemAmountAdd };
      const response = await axiosInstance({
        method: "PUT",
        url: `/redeem/${invoiceId}`,
        withCredentials: true,
        data,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast("Points amount added!");
      console.log(data);
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      console.error(error?.response?.data?.message);
    },
  });
  const { mutate: redeemPointsOpenOrder } = useMutation({
    mutationFn: async ({ redeemAmountAdd, id }) => {
      const data = { redeemAmountAdd };
      const response = await axiosInstance({
        method: "PUT",
        url: `/redeem/${id}`,
        withCredentials: true,
        data,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast("Points amount added!");
       queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    createInvoice,
    addProductToInvoice,
    addProductToInvoiceOpenOrder,
    removeProductFromInvoice,
    removeProductFromInvoiceOpenOrder,
    singleInvoice,
    singleInvoiceOpenOrder,
    makeCashPayment,
    makeSwipePayment,
    makeSwipePaymentOpenOrder,
    makeCashPaymentOpenOrder,
    makeOnlinePayment,
    makeOnlinePaymentOpenOrder,
    saveInvoice,
    savedInvoices,
    customerInvoices,
    redeemPoints,
    invoice,
    redeemPointsOpenOrder,
  };
};
