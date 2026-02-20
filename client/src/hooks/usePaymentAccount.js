import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../config/axiosInstance"
import { useLocation } from "react-router-dom"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeBackgroundBlur } from "../redux/features/commonSlice"

export const usePaymentAccount = () => {

    const queryClient = useQueryClient();

    const { pathname } = useLocation()

    const isValidPage = pathname === "/admin/expense/create" || pathname === "/staff/expense/create"
    const isPaymentAccount = pathname === "/admin/payment/account" || pathname === "/staff/payment/account"

    const dispatch = useDispatch()

    const { data: paymentAccountDataForExpForm } = useQuery({
        queryKey: ["paymentAccountForForm"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/payment-account/form",
                withCredentials: true
            })
            return response?.data?.data ?? []
        },
        enabled: !!isValidPage
    })

    const { data: paymentAccountData, isLoading, isFetching: paymentAccountRefreshing } = useQuery({
        queryKey: ["paymentAccount"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/payment-account",
                withCredentials: true
            })
            return response?.data?.data ?? []
        }, enabled: !!isPaymentAccount,
        staleTime: 3 * 60 * 1000
    })

    const { data: paymentTypeData, isFetching: paymentTypeFetched } = useQuery({
        queryKey: ["paymentTypeAccount"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/payment-account/type",
                withCredentials: true
            })

            return response?.data?.data ?? []
        }, enabled: !!isPaymentAccount
    })


    const { mutate: createPaymentAccount, isSuccess: accountCreateSuccess } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "POST",
                url: "/payment-account",
                withCredentials: true,
                data: data
            })


        },
        onSuccess(data) {
            dispatch(removeBackgroundBlur(false))
            toast.success("Payment Account create successfully")
            queryClient.invalidateQueries({ queryKey: ["paymentAccount"] });

        },
        onError(error) {
            toast.error(
                error?.response?.data?.message || "Something error"
            );
        }
    })

    const { mutate: paymentAccountStatusChange, isPending: paymentAccountstatusChangeLoading, isSuccess: paymentAccountStatusSuccess } = useMutation({
        mutationFn: async (data) => {

            const response = await axiosInstance({
                method: "PATCH",
                url: `/payment-account/`,
                withCredentials: true,
                data: data
            })

            return response?.data
        }, onSuccess(data) {
            dispatch(removeBackgroundBlur(false))
            toast.success(data?.message)
            queryClient.invalidateQueries({ queryKey: ["paymentAccount"] });
        },
        onError(error) {
            toast.error(
                error?.response?.data?.message || "Something error"
            );
        }
    })



    return {
        paymentAccountDataForExpForm,
        paymentAccountData,
        paymentAccountRefreshing,
        isLoading,
        paymentTypeData,
        createPaymentAccount,
        accountCreateSuccess,

        paymentAccountStatusChange,
        paymentAccountstatusChangeLoading,
        paymentAccountStatusSuccess

    }
}

