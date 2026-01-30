import { useMutation, useQuery, keepPreviousData } from '@tanstack/react-query'
import React, { useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import toast from 'react-hot-toast'

export const useExpense = (page) => {


    const { data: paginatedData, isFetching, isPlaceholderData } = useQuery({
        queryKey: ["expenses", page],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: `/expense?page=${page}&limit=${7}`,
                withCredentials: true
            })
            return response?.data
        },
        placeholderData: keepPreviousData
    })

    const { data: customerData } = useQuery({
        queryKey: ["customerExpense"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/expense/customer",
                withCredentials: true
            })
            return response?.data?.data
        }
    })


    const { mutate: createExpense } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "POST",
                url: "/expense",
                withCredentials: true,
                data
            })

            console.log(response);

        }, onSuccess: (data) => {
            toast.success("Expense Create successfully!");

        },
        onError: (error) => {

            toast.error(error?.response?.data?.message || "Failed to Credit");
        },
    })



    return {
        createExpense,
        customerData,
        paginatedData,
        isFetching,
        isPlaceholderData
    }
}
