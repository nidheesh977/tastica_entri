import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance"
import { addCreditBookData, removeCreditBookData, openPaymentCreditbox, removeCreditObjectId } from "../redux/features/creditSlice"
import { removeBackgroundBlur } from "../redux/features/commonSlice"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const useCredit = () => {

    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const { creditBookObjectId } = useSelector((state) => state.credit);
    const bookid = useParams().id




    const { data: creditData, isPending: isCreditDataPending } = useQuery({
        queryKey: ["credit"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/payment/credits",
                withCredentials: true
            })
            return response?.data?.data
        }
    })

    const { data: creditDataForPay, } = useQuery({
        queryKey: ["creditid", creditBookObjectId],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: `/payment/credit/pay/${creditBookObjectId}`,
                withCredentials: true
            })
            return response?.data?.data
        },
        enabled: !!creditBookObjectId,

    })

    const { data: creditDataDisplay, isFetching: iscreditDataDisplay, refetch: creditDataDisplayRefetch } = useQuery({
        queryKey: ["creditbookid", bookid],
        queryFn: async () => {

            if (!bookid) return null
            const response = await axiosInstance({
                method: "GET",
                url: `/payment/credit/${bookid}`,
                withCredentials: true
            })
            return response?.data?.data
        },
        enabled: false,
    })

    const { mutate: createCreditBook, isSuccess: isRegisterSuccess, isPending: isRegisterLoading } = useMutation({
        mutationFn: async ({ invoiceId, creditRegisterData, setCreditAddData }) => {


            const res = await axiosInstance({
                method: "POST",
                url: `/payment/create/credit/invoice/${invoiceId}`,
                withCredentials: true,
                data: creditRegisterData,
            });

            return res?.data?.data

        },
        onSuccess: (data) => {
            dispatch(addCreditBookData(data))
            dispatch(removeBackgroundBlur(false))
            toast.success("Credit Book Create successfully!");

        },
        onError: (error) => {

            toast.error(error?.response?.data?.message || "Failed to Credit");
        },
    });



    const { mutate: addCredit, isSuccess, isPending } = useMutation({
        mutationFn: async ({ invoiceId, creditAddData, setCreditAddData }) => {


            const res = await axiosInstance({
                method: "POST",
                url: `/payment/credit/invoice/${invoiceId}`,
                withCredentials: true,
                data: creditAddData,
            });
        },
        onSuccess: () => {
            toast.success("Credit added successfully!");
            dispatch(removeCreditBookData())
            dispatch(removeBackgroundBlur(false))
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {


            toast.error(error?.response?.data?.message || "Failed to Credit");
        },
    });

    const { mutate: payCredit, isPending: isPaycreditLoading, isSuccess: payCreditSuccess } = useMutation({
        mutationFn: async (creditPayData) => {
            const { bookDocId, ...rest } = creditPayData


            const res = await axiosInstance({
                method: "PUT",
                url: `payment/pay-credit/${creditPayData?.bookDocId}`,
                withCredentials: true,
                data: rest
            })

        }, onSuccess: () => {
            toast.success("Credit paid successfully!");
            queryClient.invalidateQueries(["credit"]);
            creditDataDisplayRefetch()
            dispatch(openPaymentCreditbox(false))
            dispatch(removeBackgroundBlur(false))
            dispatch(removeCreditObjectId())
            // dispatch(removeCreditBookData())
            // dispatch(removeBackgroundBlur(false))
        },
        onError: (error) => {


            toast.error(error?.response?.data?.message || "Failed to Credit");
        },
    });


    const { mutate: advanceAmtClear, isPending: isadvanceLoading, isSuccess: isAdvanceSuccess } = useMutation({
        mutationFn: async (creditBookId) => {


            const res = await axiosInstance({
                method: "PATCH",
                url: `payment/credit/${creditBookId}`,
                withCredentials: true,
            })

        }, onSuccess: () => {
            toast.success("Credit advance Amount clear successfully!");
            queryClient.invalidateQueries(["credit"]);
            creditDataDisplayRefetch()
            // dispatch(removeCreditBookData())
            // dispatch(removeBackgroundBlur(false))
        },
        onError: (error) => {


            toast.error(error?.response?.data?.message || "Failed to Credit");
        },
    });


    return {
        addCredit,
        isSuccess,
        isPending,
        createCreditBook,
        isRegisterSuccess,
        isRegisterLoading,
        creditData,
        isCreditDataPending,
        creditDataForPay,
        iscreditDataDisplay,
        payCredit,
        payCreditSuccess,
        isPaycreditLoading,
        creditDataDisplay,
        creditDataDisplayRefetch,
        advanceAmtClear
    }

}

