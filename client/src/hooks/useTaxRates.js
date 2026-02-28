import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../config/axiosInstance"
import { useLocation } from "react-router-dom"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { removeBackgroundBlur, setCloseTaxRateForm, } from "../redux/features/commonSlice"

export const useTaxRates = () => {

    const queryClient = useQueryClient()

    const { pathname } = useLocation()

    const dispatch = useDispatch()


    const isValidPage = pathname === "/admin/expense/create" || pathname === "/staff/expense/create"

    const { data: taxRatesDataForExpenseForm } = useQuery({
        queryKey: ["taxrateForForm"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/tax-rate/expense-form",
                withCredentials: true
            })
            return response?.data?.data ?? []
        },
        enabled: !!isValidPage
    })


    const { data: getTaxRateData, isLoading: getTaxRateDataLoading, isFetching: getTaxDataRefreshing } = useQuery({
        queryKey: ["taxRate"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/tax-rate",
                withCredentials: true
            })
            return response?.data?.data
        },
        staleTime: 3 * 60 * 1000
    })


    const { mutate: createTaxRateBook, isPending: taxRateLoaded } = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance({
                method: "POST",
                url: `/tax-rate`,
                withCredentials: true,
            });

            return res?.data?.data

        }, onSuccess: (data) => {
            toast.success("Tax rate book create successfully")
            queryClient.invalidateQueries({ queryKey: ["taxRate"] });
        },
        onError: (error) => {


            toast.error(
                error?.response?.data?.message || "Something error"
            );
        },



    })

    const { mutate: addTaxToAccount, isPending: addTaxToAccountLoaded } = useMutation({
        mutationFn: async (data) => {


            const res = await axiosInstance({
                method: "POST",
                url: `/tax-rate/add`,
                withCredentials: true,
                data: data
            });

            return res?.data?.data

        },


        onSuccess: async () => {
            toast.success("Tax rate Added successfully")
            dispatch(removeBackgroundBlur(false))
            dispatch(setCloseTaxRateForm(false))
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["taxRate"] }),
                queryClient.invalidateQueries({ queryKey: ["taxrateForForm"] })

            ])
        },
        onError: (error) => {


            toast.error(
                error?.response?.data?.message || "Something error"
            );
        },
    })


    const { mutate: changeTaxRateStatus, isPending: statusUploadLoading, isSuccess: taxRateStatusSuccess } = useMutation({
        mutationFn: async (data) => {
            const { taxAccountId: accountTaxId, ...payload } = data;

            const response = await axiosInstance({
                method: "PATCH",
                url: `/tax-rate/${accountTaxId}`,
                withCredentials: true,
                data: payload
            })

            return response?.data
        }, onSuccess(data) {
            dispatch(removeBackgroundBlur(false))
            toast.success(data?.message)
            queryClient.invalidateQueries({ queryKey: ["taxRate"] });

        },
        onError(error) {
            toast.error(
                error?.response?.data?.message || "Something error"
            );
        }
    })
    return {
        taxRatesDataForExpenseForm,
        getTaxRateData,
        getTaxRateDataLoading,
        getTaxDataRefreshing,
        createTaxRateBook,
        taxRateLoaded,
        addTaxToAccount,
        addTaxToAccountLoaded,


        changeTaxRateStatus,
        statusUploadLoading,
        taxRateStatusSuccess
    }
}