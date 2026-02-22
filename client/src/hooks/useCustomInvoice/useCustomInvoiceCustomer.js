import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useCustomInvoiceCustomer = (page = 1) => {

    const { pathname } = useLocation()

    const queryClient = useQueryClient();

    const isValidPage = pathname === "/admin/custom/invoice/customer"



    const { data: customCuspaginatedData, refetch, isLoading: customCusDataisLoading, isFetching: customCusDataRefreshing, isPlaceholderData } = useQuery({
        queryKey: ["customInvoiceCustomerPagination", page],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: `/custom-invoice/customer?page=${page}&limit=${6}`,
                withCredentials: true
            })

            return response?.data


        },
        enabled: !!isValidPage,
        placeholderData: keepPreviousData,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    })


    const { mutate: createnewCustomCustomer, isPending: customCustomerIsPending, isSuccess: customCustomerIsSuccess } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "POST",
                url: "/custom-invoice/customer/create",
                withCredentials: true,
                data
            })
        }, onSuccess: (data) => {
            toast.success("Customer create successfully")
            queryClient.invalidateQueries({ queryKey: ["customInvoiceCustomerPagination"] });
        },
        onError: (error) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Somethings went wrong");
        },
    })

    return {
        customCuspaginatedData,
        customCusDataisLoading,
        customCusDataRefreshing,
        isPlaceholderData,
        refetch,


        createnewCustomCustomer,
        customCustomerIsPending,
        customCustomerIsSuccess
    }
}
