import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../config/axiosInstance"

export const useCustomerExpense = () => {

    const { data: customerData } = useQuery({
        queryKey: ["customerExpense"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/expense/customer",
                withCredentials: true
            })
            return response?.data?.data ?? []
        },
    })

    return {
        customerData
    }
}
