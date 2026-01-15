import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";

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
import { saveLatestPaidInvoiceData } from "../redux/features/latestPaidInvoiceSlice";

export const useInvoices = (customerId = null) => {
  const invoiceId = useSelector((state) => state?.invoice?._id);
  const singleInvoiceId = useSelector((state) => state?.singleInvoiceOpenOrder);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

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

    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to fetch invoice");
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
      toast.error(
        error?.response?.data?.message || "Failed to fetch customer invoice"
      );
    },
  });

  const { mutate: saveInvoice } = useMutation({
    mutationFn: async () => {
      if (!invoiceId) return;
      const response = await axiosInstance({
        method: "PATCH",
        url: `/invoice/${invoiceId}`,
        withCredentials: true,
      });

      return response?.data?.data;
    },
    onSuccess: () => {
      toast.success("Saved to open orders");
      dispatch(clearInvoiceData());
      dispatch(clearSingleInvoice());
      queryClient.invalidateQueries(["savedInvoices"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
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

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to fetch saved invoice"
      );
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
      toast.error(error?.response?.data?.message || "Failed to create invoice");
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
      toast.error(error?.response?.data?.message || "Failed to fetch invoice");
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
      toast.error(
        error?.response?.data?.message || "Failed to add product to invoice"
      );
    },
  });
  const { mutate: updateProductQuantity } = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const data = {
        productId,
        quantity,
      };
      const response = await axiosInstance({
        method: "PUT",
        url: `/invoice/${invoiceId}/products/quantity`,
        withCredentials: true,
        data,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast.success("Product quantity updated");
      dispatch(saveInvoiceData(data));
      queryClient.invalidateQueries(["invoice"]);
      queryClient.invalidateQueries(["savedInvoices"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update product quantity"
      );
    },
  });
  const { mutate: updateProductQuantityOpenOrder } = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const data = {
        productId,
        quantity,
      };
      const response = await axiosInstance({
        method: "PUT",
        url: `/invoice/${singleInvoiceId}/products/quantity`,
        withCredentials: true,
        data,
      });
      return response?.data?.data;
    },
    onSuccess: (data) => {
      toast.success("Product quantity updated");
      dispatch(saveInvoiceData(data));
      queryClient.invalidateQueries(["invoice"]);
      queryClient.invalidateQueries(["savedInvoices"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update product quantity"
      );
    },
  });
  const { mutate: clearInvoice } = useMutation({
    mutationFn: async () => {
      const idToClear = invoiceId || singleInvoiceId;
      if (!idToClear) return;

      await axiosInstance({
        method: "PUT",
        url: `/invoice/${idToClear}/clear`,
        withCredentials: true,
      });
    },
    onSuccess: () => {
      toast.success("Invoice cleared");
      queryClient.invalidateQueries(["invoice"]);
      queryClient.invalidateQueries(["savedInvoices"]);
      queryClient.invalidateQueries([
        "singleInvoiceOpenOrder",
        singleInvoiceId,
      ]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to clear invoice");
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
      toast.error(error?.response?.data?.message || "Something went wrong!");
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
      toast.error(error?.response?.data?.message || "Failed to fetch invoice");
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
      toast.error(
        error?.response?.data?.message ||
        "Failed to remove product from invoice"
      );
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
      toast.error(
        error?.response?.data?.message ||
        "Failed to remove product from invoice"
      );
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
      dispatch(saveLatestPaidInvoiceData(data));

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
      dispatch(saveLatestPaidInvoiceData(data));
      queryClient.invalidateQueries(["savedInvoices"]);
      queryClient.invalidateQueries(["singleInvoiceOpenOrder"]);
      dispatch(clearInvoiceData());
      dispatch(clearSingleInvoice());
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed fetch open order!");
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
      dispatch(saveLatestPaidInvoiceData(data));
      dispatch(clearInvoiceData());
      dispatch(clearSingleInvoice());
      dispatch(clearSingleInvoiceOpenOrder());
      queryClient.invalidateQueries(["savedInvoices"]);
      queryClient.invalidateQueries(["singleInvoiceOpenOrder"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Payment failed!");
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
      dispatch(saveLatestPaidInvoiceData(data));
      dispatch(clearInvoiceData());
      dispatch(clearSingleInvoice());
      dispatch(clearSingleInvoiceOpenOrder());
      queryClient.invalidateQueries(["savedInvoices"]);
      queryClient.invalidateQueries(["singleInvoiceOpenOrder"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Payment failed!");
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
      dispatch(saveLatestPaidInvoiceData(data));
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Payment failed!");
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
      dispatch(saveLatestPaidInvoiceData(data));
      dispatch(clearInvoiceData());
      dispatch(clearSingleInvoice());
      dispatch(clearSingleInvoiceOpenOrder());
      queryClient.invalidateQueries(["savedInvoices"]);
      queryClient.invalidateQueries(["singleInvoiceOpenOrder"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Payment failed!");
    },
  });
  const { mutate: redeemPoints } = useMutation({
    mutationFn: async ({ redeemAmountAdd }) => {
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

      queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to redeem points!");
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
    onSuccess: () => {
      toast("Points amount added!");
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to redeem points!");
    },
  });

  const { mutate: deleteOpenOrder } = useMutation({
    mutationFn: async (id) => {
      await axiosInstance({
        method: "DELETE",
        url: `/invoice/status-saved/${id}`,
        withCredentials: true,
      });
    },
    onSuccess: () => {
      dispatch(clearSingleInvoiceOpenOrder());
      queryClient.invalidateQueries(["savedInvoices"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete open order!"
      );
    },
  });
  const { mutate: refund } = useMutation({
    mutationFn: async ({ id, amount }) => {
      const data = { amount };
      await axiosInstance({
        method: "PUT",
        url: `/payment/${id}/invoice`,
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["singleInvoice"]);
      toast.success("Refund accepted");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to submit refund!");
    },
  });
  const { mutate: handleInvoiceDelete } = useMutation({
    mutationFn: async ({ actions, invoiceId, archiveReason }) => {
      const data = { actions, archiveReason };
      await axiosInstance({
        method: "PUT",
        url: `/invoice/${invoiceId}/toggle-archived`,
        withCredentials: true,
        data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices"]);
      toast.success("Success");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
  const { mutate: addDiscount } = useMutation({
    mutationFn: async ({ productId, manualDiscount }) => {
      const data = { productId, manualDiscount };
      await axiosInstance({
        method: "PUT",
        url: `/invoice/${invoiceId}/discount/product`,
        withCredentials: true,
        data,
      });
    },
    onSuccess: (data) => {
      dispatch(saveInvoiceData(data));
      queryClient.invalidateQueries(["invoice"]);
      queryClient.invalidateQueries(["savedInvoices"]);
      toast.success("Discount added");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add discount!");
    },
  });
  const { mutate: addDiscountOpenOrder } = useMutation({
    mutationFn: async ({ productId, manualDiscount }) => {
      const data = { productId, manualDiscount };
      await axiosInstance({
        method: "PUT",
        url: `/invoice/${singleInvoiceId}/discount/product`,
        withCredentials: true,
        data,
      });
    },
    onSuccess: (data) => {
      dispatch(saveInvoiceData(data));
      queryClient.invalidateQueries(["invoice"]);
      queryClient.invalidateQueries(["savedInvoices"]);
      toast.success("Discount added");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add discount!");
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
    deleteOpenOrder,
    clearInvoice,
    refund,
    handleInvoiceDelete,
    addDiscount,
    addDiscountOpenOrder,
    updateProductQuantity,
    updateProductQuantityOpenOrder,
  };
};
