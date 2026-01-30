import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../config/axiosInstance"


export const usePaymentAccount = () => {
    const { data: paymentAccountData } = useQuery({
        queryKey: ["paymentAccount"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/payment-account",
                withCredentials: true
            })
            return response?.data?.data ?? []
        }
    })

    return { paymentAccountData }
}