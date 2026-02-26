import React, { useEffect } from 'react'
import { CustomInvoiceShippingAddressForm } from '../CustomInvoiceCustomer/CustomInvoiceShippingAddressForm'
import { IoMdClose } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { useCustomInvoiceCustomer } from '../../../../hooks/useCustomInvoice/useCustomInvoiceCustomer'
import { useDispatch } from 'react-redux'
import { removeBackgroundBlur } from '../../../../redux/features/commonSlice'

export const CustomInvoiceCustomerAddShippingAddressBox = ({ setOpenShippingAddressForm, handleShippingAddressFormCancel }) => {

    const { handleSubmit, watch, register, setValue, control } = useForm({
        defaultValues: {
            shippingLabel: "",
            shippingAddress: "",
            shippingCity: "",
            shippingState: "",
            shippingPostalCode: "",
            shippingCountry: "",
        }
    })

    const dispatch = useDispatch()

    const { createShippingAddress, createShippingAddressIsPending, createShippingAddressIsSuccess } = useCustomInvoiceCustomer()

    const onsubmit = (data) => {
        createShippingAddress(data)
    }

    useEffect(() => {
        if (!createShippingAddressIsSuccess) return
        setOpenShippingAddressForm(false)
        dispatch(removeBackgroundBlur(false))
    }, [createShippingAddressIsSuccess])

    return (
        <div className='fixed w-96 md:w-[750px] p-5 shadow-md bg-white top-[45%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md'>
            <div className='flex justify-between items-center'>
                <p className='font-medium'>Create shipping Address</p>
                <button className="btn btn-ghost btn-sm" onClick={handleShippingAddressFormCancel}>
                    <IoMdClose size={20} />
                </button>

            </div>
            <form onSubmit={handleSubmit(onsubmit)}>
                {<CustomInvoiceShippingAddressForm control={control} />}
                <button disabled={createShippingAddressIsPending === true} className="btn btn-primary btn-md w-full mt-3 rounded-md">{createShippingAddressIsPending ? "Shipping Address Adding..." : "Create Shipping Address"}</button>
            </form>
        </div>
    )
}
