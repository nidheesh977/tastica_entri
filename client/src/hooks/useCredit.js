import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance"
import { addCreditBookData, removeCreditBookData, openPaymentCreditbox } from "../redux/features/creditSlice"
import { removeBackgroundBlur } from "../redux/features/commonSlice"
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const useCredit = () => {

    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const { creditBookObjectId } = useSelector((state) => state.credit);
    const bookid = useParams().id

    const { data: creditData } = useQuery({
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

    const { data: creditDataForPay } = useQuery({
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

    const { data: creditDataDisplay, refetch: creditDataDisplayRefetch } = useQuery({
        queryKey: ["creditbookid", bookid],
        queryFn: async () => {
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
            console.log(error);

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
            console.log(error);

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
            toast.success("Credit added successfully!");
            queryClient.invalidateQueries(["credit"]);
            creditDataDisplayRefetch()
            dispatch(openPaymentCreditbox(false))
            dispatch(removeBackgroundBlur(false))
            // dispatch(removeCreditBookData())
            // dispatch(removeBackgroundBlur(false))
        },
        onError: (error) => {
            console.log(error);

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
        creditDataForPay,
        payCredit,
        payCreditSuccess,
        isPaycreditLoading,
        creditDataDisplay,
        creditDataDisplayRefetch
    }

}

