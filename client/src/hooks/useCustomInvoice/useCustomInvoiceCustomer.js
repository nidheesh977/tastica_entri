import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export const useCustomInvoiceCustomer = (page = 1) => {

    const { pathname } = useLocation()

    const queryClient = useQueryClient();

    const { customCustomerId } = useSelector(state => state.common)




    const isValidPage = pathname === "/admin/custom/invoice/customer"
    const isValidCustomInvoiceCreate = pathname === "/admin/custom/invoice/create"

    const { data: customInvoiceCustomerDataForm } = useQuery({
        queryKey: ["customInvoiceCustomerFormData"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/custom-invoice/customer/form",
                withCredentials: true
            })

            return response?.data?.data ?? []
        },
        enabled: !!isValidCustomInvoiceCreate
    })


    const { data: customCustomerAddressData, isLoading: customCustomerAddressIsLoading } = useQuery({
        queryKey: ["customInvoiceCustomerAddressData", customCustomerId],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: `/custom-invoice/customer/${customCustomerId}`,
                withCredentials: true
            })

            return response?.data?.data
        },
        enabled: !!customCustomerId
    })

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


    const { mutate: createShippingAddress, isPending: createShippingAddressIsPending, isSuccess: createShippingAddressIsSuccess } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "POST",
                url: `/custom-invoice/customer/${customCustomerId}/shipping`,
                withCredentials: true,
                data
            })
        }, onSuccess: (data) => {
            toast.success("Shipping address create successfully")
            queryClient.invalidateQueries({ queryKey: ["customInvoiceCustomerAddressData"] });
        },
        onError: (error) => {

            toast.error(error?.response?.data?.message || "Somethings went wrong");
        },
    })

    const { mutate: createBillingAddress, isPending: createBillingAddressIsPending, isSuccess: createBillingAddressIsSuccess } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "POST",
                url: `/custom-invoice/customer/${customCustomerId}/billing`,
                withCredentials: true,
                data
            })
        }, onSuccess: (data) => {
            toast.success("billing address create successfully")
            queryClient.invalidateQueries({ queryKey: ["customInvoiceCustomerAddressData"] });
        },
        onError: (error) => {

            toast.error(error?.response?.data?.message || "Somethings went wrong");
        },
    })



    return {
        customInvoiceCustomerDataForm,


        customCustomerAddressData,
        customCustomerAddressIsLoading,

        customCuspaginatedData,
        customCusDataisLoading,
        customCusDataRefreshing,
        isPlaceholderData,
        refetch,


        createnewCustomCustomer,
        customCustomerIsPending,
        customCustomerIsSuccess,

        createShippingAddress,
        createShippingAddressIsPending,
        createShippingAddressIsSuccess,

        createBillingAddress,
        createBillingAddressIsPending,
        createBillingAddressIsSuccess
    }
}
