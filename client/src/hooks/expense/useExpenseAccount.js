import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../../config/axiosInstance"
import toast from "react-hot-toast"
import { useLocation } from "react-router-dom"



export const useExpenseAccount = () => {

    const { pathname } = useLocation()

    const isValidPage = pathname === "/admin/expense/list/create"


    const queryClient = useQueryClient();

    const { data: expenseAccountDataExpenseForm } = useQuery({
        queryKey: ["expenseAccountForm"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/expense-account/form",
                withCredentials: true
            })

            return response?.data?.data ?? []
        },
        enabled: !!isValidPage,
    })

    const { data: expenseAccount } = useQuery({
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


    const { mutate: createExpenseAccount, isSuccess: expenseAccountCreated } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "POST",
                url: "/expense-account",
                withCredentials: true,
                data: data
            })
            console.log(response)
            return response?.data

        }, onSuccess: (data) => {
            toast.success("Expense Account Create successfully!");
            queryClient.invalidateQueries({ queryKey: ["expenseAccount"] });
        }, onError: (error) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Somethings went wrong");
        }
    })

    return {
        expenseAccountDataExpenseForm,
        expenseAccount,
        createExpenseAccount,
        expenseAccountCreated
    }

}