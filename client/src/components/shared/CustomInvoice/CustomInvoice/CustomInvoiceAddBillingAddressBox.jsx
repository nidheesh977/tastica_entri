import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { CustomInvoiceAddressForm } from '../CustomInvoiceCustomer/CustomInvoiceAddressForm'
import { useForm } from 'react-hook-form'
import { useCustomInvoiceCustomer } from '../../../../hooks/useCustomInvoice/useCustomInvoiceCustomer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeBackgroundBlur } from "../../../../redux/features/commonSlice"

export const CustomInvoiceAddBillingAddressBox = ({ handleBillingFormCancel, setOpenBillingAddressForm }) => {

    const { handleSubmit, watch, register, setValue, control } = useForm({
        defaultValues: {
            billingLabel: "",
            billingAddress: "",
            billingCity: "",
            billingState: "",
            billingPostalCode: "",
            billingCountry: "",
        }
    })
    const { createBillingAddress, createBillingAddressIsPending, createBillingAddressIsSuccess } = useCustomInvoiceCustomer()

    const dispatch = useDispatch()

    const onsubmit = (data) => {
        createBillingAddress(data)
    }

    useEffect(() => {
        if (!createBillingAddressIsSuccess) return
        setOpenBillingAddressForm(false)
        dispatch(removeBackgroundBlur(false))
    }, [createBillingAddressIsSuccess])


    return (
        <div className='fixed w-96 md:w-[750px] p-5 shadow-md bg-white top-[45%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md'>
            <div className='flex justify-between items-center'>
                <p className='font-medium'>Create Billing Address</p>
                <button className="btn btn-ghost btn-sm" onClick={handleBillingFormCancel}>
                    <IoMdClose size={20} />
                </button>

            </div>
            <form onSubmit={handleSubmit(onsubmit)}>
                {<CustomInvoiceAddressForm control={control} />}
                <button disabled={createBillingAddressIsPending === true} className="btn btn-primary btn-md w-full mt-3 rounded-md">{createBillingAddressIsPending ? "Billing Address Adding..." : "Create Billing Address"}</button>
            </form>
        </div>
    )
}
