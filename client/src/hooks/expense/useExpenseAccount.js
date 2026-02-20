import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../../config/axiosInstance"
import toast from "react-hot-toast"
import { useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { removeBackgroundBlur, setCloseExpenseAccount, setCloseExpenseSubTitleForm } from "../../redux/features/commonSlice"

export const useExpenseAccount = () => {

    const { pathname } = useLocation()

    const { id: expenseAccountId } = useParams()

    const dispatch = useDispatch()

    const { expenseAccountId: idExpenseAccount } = useSelector((state) => state.common)

    const finalId = expenseAccountId ?? idExpenseAccount

    const isValidPage = pathname === "/admin/expense/create" || pathname === "/staff/expense/create"

    const isExpenseAccountPage = pathname === "/admin/expense/account" || pathname === "/staff/expense/account"

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
    const { data: expenseAccountTitleData } = useQuery({
        queryKey: ["expenseAccountTitle"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/expense-account/title",
                withCredentials: true
            })

            return response?.data?.data ?? []
        },
        enabled: !!isValidPage,
    })



    const { data: expenseAccount, isLoading: expenseAccountLoading, isFetching: expenseAccountRefreshing } = useQuery({
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

    const { data: expenseAccountSingleData, isLoading: singleExpenseAccountLoading, isFetching: singleExpenseRefreshing } = useQuery({
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

        }, onSuccess: async () => {
            dispatch(removeBackgroundBlur(false))
            dispatch(setCloseExpenseAccount(false))
            toast.success("Expense Account Create successfully!");

            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["expenseAccount"] }),
                queryClient.invalidateQueries({ queryKey: ["expenseAccountForm"] })
            ])

        }, onError: (error) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Somethings went wrong");
        }
    })

    const { mutate: addTitleToExpenseAccount, isPending: addTitleLoading, isSuccess: addTitleToExpenseAccountSuccess } = useMutation({
        mutationFn: async (data) => {

            const payload = {
                title: data.title
            }
            const response = await axiosInstance({
                method: "POST",
                url: `/expense-account/${finalId}`,
                withCredentials: true,
                data: payload
            })
            return response?.data

        }, onSuccess: async () => {
            dispatch(removeBackgroundBlur(false))
            dispatch(setCloseExpenseSubTitleForm(false))
            toast.success("Expense Account Title Create successfully!");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["expenseAccountId"] }),
                queryClient.invalidateQueries({ queryKey: ["expenseAccountForm"] })
            ])

        }, onError: (error) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Somethings went wrong");
        }
    })

    const { mutate: changeStatusExpenseSingleAccount, isSuccess: expenseSingStatusAccSuccess, isPending: expenseSingStatusAccSuccessLoading } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "PATCH",
                url: `/expense-account/${expenseAccountId}/title`,
                withCredentials: true,
                data
            })
            return response?.data

        },
        onSuccess: (data) => {
            toast.success(" Title status successfully!");
            dispatch(removeBackgroundBlur(false))
            queryClient.invalidateQueries({ queryKey: ["expenseAccountId", expenseAccountId], });
        }, onError: (error) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Somethings went wrong");
        }
    })

    const { mutate: changeExpenseAccStatus, isPending: statusUploadLoading, isSuccess: expenseAccStatusSuccess } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "PATCH",
                url: "/expense-account",
                withCredentials: true,
                data
            })

            return response?.data
        }, onSuccess(data) {
            dispatch(removeBackgroundBlur(false))

            queryClient.invalidateQueries({ queryKey: ["expenseAccount"] });

        },
        onError(error) {
            toast.error(
                error?.response?.data?.message || "Something error"
            );
        }
    })

    return {
        expenseAccountDataExpenseForm,
        expenseAccount,
        expenseAccountLoading,
        expenseAccountRefreshing,

        createExpenseAccount,
        expenseAccountCreated,
        expenseAccountSingleData,
        singleExpenseAccountLoading,
        singleExpenseRefreshing,

        changeExpenseAccStatus,
        expenseSingStatusAccSuccess,
        expenseSingStatusAccSuccessLoading,

        addTitleToExpenseAccount,
        addTitleToExpenseAccountSuccess,
        addTitleLoading,

        changeStatusExpenseSingleAccount,
        statusUploadLoading,
        expenseAccStatusSuccess,


        expenseAccountTitleData

    }

}