import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../config/axiosInstance"
import toast from "react-hot-toast"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { removeBackgroundBlur, setCloseVendorForm } from "../redux/features/commonSlice"
import { setVendorPhoneNumberDecrypt } from "../redux/features/vendorSlice"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"

export const useVendor = () => {
    const [visiblePhone, setVisiblePhone] = useState({
        isDecrypt: false,
        decryptPhoneNumber: null
    })
    const { pathname } = useLocation()

    const isValidPage = pathname === "/admin/expense/create" || pathname === "/staff/expense/create"
    const isValidVendorPage = pathname === "/admin/vendor" || pathname === "/staff/vendor"

    const queryClient = useQueryClient();

    const dispatch = useDispatch();

    const timeoutRef = useRef(null)

    useEffect(() => {
        if (!visiblePhone?.isDecrypt) return

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            setVisiblePhone({
                isDecrypt: false,
                decryptPhoneNumber: null
            })
        }, 10000)

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }

    }, [visiblePhone?.isDecrypt])

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
        enabled: !!isValidVendorPage,
        staleTime: 3 * 60 * 1000
    })

    const { mutate: getDecryptPhoneNumber } = useMutation({

        mutationFn: async (vendorId) => {


            const response = await axiosInstance({
                method: "GET",
                url: `/vendor/${vendorId}`,
                withCredentials: true
            })
            return response?.data?.data
        }, onSuccess: async (data) => {
            setVisiblePhone((prev) => ({
                isDecrypt: data?.isDecrypt,
                decryptPhoneNumber: data?.decryptPhoneNumber
            }))
        },
        onError(error) {
            toast.error(
                error?.response?.data?.message || "Something error"
            );
        }

    })

    const { mutate: createVendor, isSuccess: createVendorSuccess, isPending: vendorPending } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "POST",
                url: "/vendor",
                withCredentials: true,
                data: data
            })
        }, onSuccess: async (data) => {
            dispatch(removeBackgroundBlur(false))
            dispatch(setCloseVendorForm(false))
            toast.success("Vendor create successfully")
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["vendorform"] }),
                queryClient.invalidateQueries({ queryKey: ["vendor"] }),
            ])

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
        }, onSuccess: async (data) => {
            dispatch(removeBackgroundBlur(false))
            queryClient.invalidateQueries({ queryKey: ["vendor"] }),
                toast.success(data?.message)

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
        vendorStatusSuccess,

        getDecryptPhoneNumber,
        visiblePhone
    }
}