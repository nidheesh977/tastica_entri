import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../config/axiosInstance'
import { useLocation, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useVendorStaff = () => {

    const { pathname } = useLocation()

    const queryClient = useQueryClient();

    const { id: vendorId } = useParams()

    const isValidPage = pathname === "/admin/expense/create"
    const isValidvendorStaffPage = pathname === `/admin/vendor/${vendorId}/staff`



    const { data: vendorStaffDataForForm } = useQuery({
        queryKey: ["vendorStaffForm"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/vendor/staff/form",
                withCredentials: true
            })
            return response?.data?.data ?? []
        },
        enabled: !!isValidPage
    })

    const { data: vendorStaffData, isLoading: vendorStaffDataLoding, isFetching: vendorStaffDataRefreshing } = useQuery({
        queryKey: ["vendorStaff", vendorId],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: `/vendor/${vendorId}/staff`,
                withCredentials: true
            })
            console.log(vendorStaffData);

            return response?.data?.data ?? []
        },
        enabled: !!vendorId && isValidvendorStaffPage,
        staleTime: 3 * 60 * 1000,


    })

    const { mutate: createStaff, isPending: vendorStaffPending, isSuccess: vendorStaffSuccess } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "POST",
                url: "/vendor/staff/create",
                withCredentials: true,
                data: data
            })

        },
        onSuccess(data) {
            // dispatch(removeBackgroundBlur(false))
            toast.success("staff create successfully")
            queryClient.invalidateQueries({ queryKey: ["vendorStaff"] });

        },
        onError(error) {
            toast.error(
                error?.response?.data?.message || "Something error"
            );
        }
    })

    return {
        vendorStaffDataForForm,
        vendorStaffData,
        vendorStaffDataLoding,
        vendorStaffDataRefreshing,

        createStaff,
        vendorStaffPending,
        vendorStaffSuccess
    }
}
