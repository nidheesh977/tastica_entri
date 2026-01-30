import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../config/axiosInstance"



export const useExpenseAccount = () => {

    const { data: expenseAccountData } = useQuery({
        queryKey: ["expenseAccount"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/expense-account",
                withCredentials: true
            })

            return response?.data?.data ?? []
        }
    })


    return { expenseAccountData }

}