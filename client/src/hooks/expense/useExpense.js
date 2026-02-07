import { useMutation, useQuery, keepPreviousData, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { useLocation, useParams } from "react-router-dom"


export const useExpense = (page, imageQuery) => {


    console.log(imageQuery);


    const queryClient = useQueryClient();
    const { pathname } = useLocation()

    const isValidPage = pathname === "/admin/expense/list"

    const { id: expenseId } = useParams()


    const { data: paginatedData, isFetching, isPlaceholderData } = useQuery({
        queryKey: ["expensePagination", page],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: `/expense?page=${page}&limit=${7}`,
                withCredentials: true
            })
            return response?.data
        },
        enabled: !!isValidPage,
        placeholderData: keepPreviousData,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    const { data: expenseSingleData } = useQuery({
        queryKey: ["expenseId", expenseId],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: `/expense/${expenseId}`,
                withCredentials: true
            })
            return response?.data?.data
        },
        enabled: !!expenseId,
        refetchOnWindowFocus: false
    })

    const { data: expenseImageData } = useQuery({
        queryKey: ["expenseDocImg", imageQuery],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: `/expense/image?imagePublicId=${imageQuery}`,
                withCredentials: true
            })
            return response?.data?.data
        },
        enabled: !!imageQuery,
        refetchOnWindowFocus: false,
        keepPreviousData: false
    })



    const { mutate: createExpense, isPending } = useMutation({
        mutationFn: async (data) => {



            const response = await axiosInstance({
                method: "POST",
                url: "/expense",
                withCredentials: true,
                data: data
            })



        }, onSuccess: (data) => {
            toast.success("Expense Create successfully!");
            queryClient.invalidateQueries({ queryKey: ["expensePagination"] });
        },
        onError: (error) => {

            toast.error(error?.response?.data?.message || "Failed to Credit");
        },
    })



    return {
        createExpense,
        paginatedData,
        isFetching,
        isPending,
        isPlaceholderData,

        expenseSingleData,

        expenseImageData

    }
}
