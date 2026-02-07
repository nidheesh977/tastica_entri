import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../../config/axiosInstance"
import toast from "react-hot-toast"
import { useLocation, useParams } from "react-router-dom"



export const useExpenseAccount = () => {

    const { pathname } = useLocation()

    const { id: expenseAccountId } = useParams()
    console.log(expenseAccountId);


    const isValidPage = pathname === "/admin/expense/create"

    const isExpenseAccountPage = pathname === "/admin/expense/account"

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
        },
        enabled: !!isExpenseAccountPage,
        staleTime: 2 * 60 * 1000
    })

    const { data: expenseAccountSingleData, isFetching: singleExpenseAccountLoading } = useQuery({
        queryKey: ["expenseAccountId", expenseAccountId],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: `/expense-account/${expenseAccountId}`,
                withCredentials: true
            })

            return response?.data?.data ?? []
        },
        enabled: !!expenseAccountId,
        staleTime: 60 * 1000
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

    const { mutate: addTitleToExpenseAccount, isSuccess: addTitleToExpenseAccountCreated } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "POST",
                url: `/expense-account/${expenseAccountId}`,
                withCredentials: true,
                data: data
            })
            return response?.data

        }, onSuccess: (data) => {
            toast.success("Expense Account Title Create successfully!");
            queryClient.invalidateQueries({ queryKey: ["expenseAccountId"] });
        }, onError: (error) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Somethings went wrong");
        }
    })

    const { mutate: softDeleTitleExpenseAccount, isSuccess: TitleExpenseAccountDeleted } = useMutation({
        mutationFn: async (titleId) => {
            const response = await axiosInstance({
                method: "PATCH",
                url: `/expense-account/${expenseAccountId}/title/${titleId}`,
                withCredentials: true,
            })
            return response?.data

        },
        onMutate: async (id) => {
            await queryClient.cancelQueries(["expenseAccountId", expenseAccountId])
            const previousData = queryClient.getQueryData(["expenseAccountId", expenseAccountId])

            queryClient.setQueryData(["expenseAccountId", expenseAccountId], (old) => ({
                ...old,
                subTitle: old.subTitle.filter(item => item._id !== id)
            }))

            return { previousData }
        },
        onSuccess: (data) => {
            toast.success(" Title Delete successfully!");
        }, onError: (error, id, context) => {
            console.log(error)
            queryClient.setQueryData(
                ['expenseAccountId', expenseAccountId],
                context.previousData
            )
            toast.error(error?.response?.data?.message || "Somethings went wrong");
        }
    })

    return {
        expenseAccountDataExpenseForm,
        expenseAccount,
        createExpenseAccount,
        expenseAccountCreated,
        expenseAccountSingleData,
        singleExpenseAccountLoading,
        addTitleToExpenseAccount,
        addTitleToExpenseAccountCreated,
        softDeleTitleExpenseAccount,
        TitleExpenseAccountDeleted
    }

}