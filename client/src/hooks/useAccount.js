import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";

export const useAccount = () => {

    const { pathname } = useLocation()

    const isValidPage = pathname === "/admin/custom/invoice/create" || pathname === "/staff/custom/invoice/create"

    const { data: accountsSalesAndPurchaseData } = useQuery({
        queryKey: ["accountsCustomInvoiceProduct"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/account/sales/purchase/customInvoice/form",
                withCredentials: true
            })
            return response?.data?.data ?? []
        },
        enabled: !!isValidPage
    })

    return { accountsSalesAndPurchaseData }
}
