import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../config/axiosInstance"

export const useTaxRates = () => {
    const { data: taxRatesData } = useQuery({
        queryKey: ["taxrate"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/tax-rate",
                withCredentials: true
            })
            return response?.data?.data ?? []
        }
    })



    return { taxRatesData }
}