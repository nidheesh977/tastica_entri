import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useCustomInvoiceCustomer } from '../../../../hooks/useCustomInvoice/useCustomInvoiceCustomer'
import { CustomInvoiceCustomerAddForm } from './CustomInvoiceCustomerAddForm'
import { IoMdClose } from 'react-icons/io'
import { removeBackgroundBlur } from '../../../../redux/features/commonSlice'
import { CustomInvoiceAddressForm } from './CustomInvoiceAddressForm'
import { CustomInvoiceShippingAddressForm } from './CustomInvoiceShippingAddressForm'
import { useEffect } from 'react'

const CustomInvoiceCustomerFormBox = ({ setOpenForm }) => {

    const { createnewCustomCustomer, customCustomerIsPending, customCustomerIsSuccess } = useCustomInvoiceCustomer()
    const dispatch = useDispatch()
    const [addressOpen, setAddressOpen] = useState(false)

    const { handleSubmit, watch, control, setValue } = useForm({
        defaultValues: {
            customerName: "",
            email: "",
            phoneNumber: "",
            customerType: "individual",
            businessName: "",
            displayName: "",
            salutation: "",
            firstName: "",
            lastName: "",
            billingLabel: "",
            billingAddress: "",
            billingCity: "",
            billingState: "",
            billingPostalCode: "",
            billingCountry: "",
            shippingLabel: "",
            shippingAddress: "",
            shippingCity: "",
            shippingState: "",
            shippingPostalCode: "",
            shippingCountry: "",
        }
    })

    const customerTypeSelect = watch("customerType")
    const onsubmit = (data) => {
        createnewCustomCustomer(data)

    }
    const handleViewAddress = () => {
        setAddressOpen((prev) => !prev)
    }

    const handleCancelForm = () => {
        setOpenForm(false)
        dispatch(removeBackgroundBlur(false))
    }

    useEffect(() => {
        if (!customCustomerIsSuccess) return
        setOpenForm(false)
        dispatch(removeBackgroundBlur(false))


    }, [customCustomerIsSuccess])

    useEffect(() => {
        if (customerTypeSelect === "individual") {
            setValue("businessName", "")
            setValue("salutation", "")
            setValue("firstName", "")
            setValue("lastName", "")
            setValue("displayName", "")
        } else if (customerTypeSelect === "business") {
            setValue("customerName", "")
            setValue("displayName", "")
        }

    }, [customerTypeSelect])

    return (
        <div className="fixed  w-96 md:w-[700px] lg:w-[900px] p-5 shadow-md bg-white top-[50%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md overflow-y-auto" >
            <div className="mb-5 flex justify-between items-center">
                <h2 className=" font-semibold">Create Customer</h2>
                <button className="btn btn-ghost btn-sm" onClick={handleCancelForm} >
                    <IoMdClose size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onsubmit)} >
                {addressOpen === false ? <CustomInvoiceCustomerAddForm control={control} customerTypeSelect={customerTypeSelect} /> : null}
                {addressOpen ? <div className='flex gap-3'>
                    <div className='w-full'>

                        <p className='mb-2'>Billing Address</p>
                        <CustomInvoiceAddressForm control={control} />
                    </div>
                    <div className="divider divider-horizontal "></div>
                    <div className='w-full'>
                        <p className='mb-2'>Shipping Address</p>
                        <CustomInvoiceShippingAddressForm control={control} />
                    </div>
                </div> : null}
                <div className='mt-10 mb-5 btn btn-sm btn-outline rounded-md btn-primary'>
                    <button type="button" onClick={handleViewAddress} >
                        {addressOpen ? "Back" : "Address"}
                    </button>
                </div>
                <button disabled={customCustomerIsPending === true} className="btn btn-primary btn-md w-full mt-3 rounded-md">{customCustomerIsPending ? "Creatimg customer" : "Create customer"}</button>
            </form>
        </div>
    )
}

export default CustomInvoiceCustomerFormBox