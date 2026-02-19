import { useMutation, useQuery, keepPreviousData, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { useLocation, useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setTaxAmountShow } from "../../redux/features/expenseSlice"
import { useNavigate } from 'react-router-dom'

export const useExpense = (page, imageQuery,) => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    const { data: expenseSingleData, isLoading: expenseSingleDataLoading, isFetching: expenseSingleDataRefresh } = useQuery({
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

    const { data: expenseImageData, isLoading: fetchImageLoading } = useQuery({
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

    const { mutate: calculateExpenseTaxRate, isPending: calculateExpenseTaxLoading } = useMutation({
        mutationFn: async (taxData) => {
            const response = await axiosInstance({
                method: "POST",
                url: `/expense/tax`,
                withCredentials: true,
                data: taxData
            })


            return response?.data?.data
        },
        onSuccess: (data) => {
            dispatch(setTaxAmountShow(data))

        },
        onError: (error) => {

            toast.error(error?.response?.data?.message || "Failed to Credit");
        },

    })

    const { mutate: uploadImage, isPending: uploadImageLoading, isSuccess: imageUploadSuccess } = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance({
                method: "PATCH",
                url: `/expense/${expenseId}`,
                withCredentials: true,
                data
            })

            console.log(response)
        },
        onSuccess: (data) => {
            toast.success("Image Upload successfully")
            queryClient.invalidateQueries({ queryKey: ["expenseId", expenseId] });

        },
        onError: (error) => {

            toast.error(error?.response?.data?.message || "Failed to Credit");
        },
    })

    const { mutate: getExpensePdf } = useMutation({
        mutationFn: async (payload) => {
            const response = await axiosInstance({
                method: "GET",
                responseType: "blob",
                url: `/expense/download/${expenseId}`,
                withCredentials: true
            })


            return response
        }, onSuccess: (response, payload) => {
            console.log(payload);

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${payload.expenseDocId}-${payload.expenseFileTitle}-${payload.expenseFileDate}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success("Pdf download successfully")

        },
        onError: (error) => {
            console.log(error);

            toast.error(error?.response?.data?.message || "Failed to Credit");
        },
    })



    const { mutate: createExpense, isPending, isSuccess: creationExpenseSuccess } = useMutation({
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
            navigate("/admin/expense/list")
        },
        onError: (error) => {

            toast.error(error?.response?.data?.message || "Failed to Credit");
        },
    })



    return {
        createExpense,
        creationExpenseSuccess,
        paginatedData,
        isFetching,
        isPending,
        isPlaceholderData,
        expenseSingleData,
        expenseSingleDataLoading,
        expenseSingleDataRefresh,
        expenseImageData,
        fetchImageLoading,
        calculateExpenseTaxRate,
        calculateExpenseTaxLoading,

        uploadImage,
        uploadImageLoading,
        imageUploadSuccess,
        getExpensePdf
    }
}
