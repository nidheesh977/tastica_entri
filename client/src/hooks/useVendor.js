import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../config/axiosInstance"
import toast from "react-hot-toast"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { removeBackgroundBlur } from "../redux/features/commonSlice"

export const useVendor = () => {

    const { pathname } = useLocation()

    const isValidPage = pathname === "/admin/expense/create"

    const queryClient = useQueryClient();

    const dispatch = useDispatch()

    const { data: vendorDataForm } = useQuery({
        queryKey: ["vendorform"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/vendor/form",
                withCredentials: true
            })

            return response?.data?.data ?? []
        },
        enabled: !!isValidPage
    })

    const { data: vendorData, isLoading: vendorDataLoading, isFetching: vendorDataRefreshing } = useQuery({
        queryKey: ["vendor"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/vendor",
                withCredentials: true
            })
            return response?.data?.data ?? []
        },
        staleTime: 3 * 60 * 1000
    })

    const { mutate: createVendor, isSuccess: createVendorSuccess, isPending: vendorPending } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "POST",
                url: "vendor",
                withCredentials: true,
                data: data
            })
        }, onSuccess(data) {
            dispatch(removeBackgroundBlur(false))
            toast.success("Vendor create successfully")
            queryClient.invalidateQueries({ queryKey: ["vendor"] });

        },
        onError(error) {
            toast.error(
                error?.response?.data?.message || "Something error"
            );
        }

    })


    const { mutate: changeVendorStatus, isPending: statusUploadLoading, isSuccess: vendorStatusSuccess } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "PATCH",
                url: "/vendor",
                withCredentials: true,
                data
            })

            return response?.data
        }, onSuccess(data) {
            dispatch(removeBackgroundBlur(false))

            console.log(data)
            toast.success(data?.message)
            queryClient.invalidateQueries({ queryKey: ["vendor"] });

        },
        onError(error) {
            toast.error(
                error?.response?.data?.message || "Something error"
            );
        }
    })

    return {
        vendorDataForm,
        vendorData,
        vendorDataLoading,
        vendorDataRefreshing,
        createVendor,
        createVendorSuccess,
        vendorPending,

        changeVendorStatus,
        statusUploadLoading,
        vendorStatusSuccess
    }
}