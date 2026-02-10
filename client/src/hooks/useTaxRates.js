import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../config/axiosInstance"
import { useLocation } from "react-router-dom"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { removeBackgroundBlur } from "../redux/features/commonSlice"

export const useTaxRates = () => {

    const queryClient = useQueryClient()

    const { pathname } = useLocation()

    const dispatch = useDispatch()


    const isValidPage = pathname === "/admin/expense/create"
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


    const { data: getTaxRateData, isFetching: getTaxRateDataFetched } = useQuery({
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
            toast.success("Taxrate book create successfully")
            queryClient.invalidateQueries({ queryKey: ["taxRate"] });
        }
    })

    const { mutate: addTaxToAccount, isPending: addTaxToAccountLoaded } = useMutation({
        mutationFn: async ({ shopTaxId, data }) => {
            console.log(data);

            console.log(shopTaxId);

            const res = await axiosInstance({
                method: "POST",
                url: `/tax-rate/${shopTaxId}`,
                withCredentials: true,
                data: data
            });

            return res?.data?.data

        },


        onSuccess: (data) => {
            toast.success("Tax rate Added successfully")
            dispatch(removeBackgroundBlur(false))
            queryClient.invalidateQueries({ queryKey: ["taxRate"] });
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message || "Something error"
            );
        },
    })


    const { mutate: deleteTaxFromAccount, isPending: deleteTaxAccountLoaded } = useMutation({
        mutationFn: async ({ taxAccountId, taxRateId }) => {

            const res = await axiosInstance({
                method: "DELETE",
                url: `/tax-rate/${taxAccountId}/rate/${taxRateId}`,
                withCredentials: true,
            });

            return res?.data?.data

        },


        onSuccess: (data) => {
            toast.success("Tax rate Added successfully")
            dispatch(removeBackgroundBlur(false))
            queryClient.invalidateQueries({ queryKey: ["taxRate"] });
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message || "Something error"
            );
        },
    })
    return {
        taxRatesDataForExpenseForm,
        getTaxRateData,
        getTaxRateDataFetched,
        createTaxRateBook,
        taxRateLoaded,
        addTaxToAccount,
        addTaxToAccountLoaded,


        deleteTaxFromAccount,
        deleteTaxAccountLoaded
    }
}