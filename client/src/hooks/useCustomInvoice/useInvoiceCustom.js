import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setRows } from '../../redux/features/customInvoiceProductTable'
import { setOpenCustomProductAddForm, removeBackgroundBlur } from "../../redux/features/commonSlice"

export const useInvoiceCustom = () => {

    const dispatch = useDispatch()

    const { mutate: createCustomProductInCustomInvoice } = useMutation({
        mutationFn: async (data) => {
            const { purchaseAccountDis: pur, salesAccountDis: sal, ...payload } = data
            console.log(payload);

            const response = await axiosInstance({
                method: "POST",
                url: "/custom-invoice/product/create",
                withCredentials: true,
                data: payload
            })

            return response?.data?.data
        }, onSuccess: (data) => {
            console.log(data);

            dispatch(setRows({ selectProduct: data }))
            dispatch(setOpenCustomProductAddForm(false))
            dispatch(removeBackgroundBlur(false))
            toast.success("billing address create successfully")
        },
        onError: (error) => {
            console.log(error);

            toast.error(error?.response?.data?.message || "Somethings went wrong");
        },
    })

    return {
        createCustomProductInCustomInvoice
    }
}
