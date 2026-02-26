import React from 'react'
import { SelectOptionComponent } from '../../DaisyUiComponent/SelectOptionComponent'
import { IoMdClose, IoMdSearch } from 'react-icons/io'
import { useCustomInvoiceCustomer } from '../../../../hooks/useCustomInvoice/useCustomInvoiceCustomer'
import { Controller, useForm } from 'react-hook-form'
import { filterDataArr } from '../../../../utils/filterDataArr'
import { MdOutlineEmail } from "react-icons/md";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { setCustomCustomerId } from "../../../../redux/features/commonSlice"
import { FaCalendarAlt, FaPen } from "react-icons/fa";
import { useState } from 'react'
import { CustomInvoiceAddressForm } from '../CustomInvoiceCustomer/CustomInvoiceAddressForm'
import { addBackgroundBlur } from '../../../../redux/features/commonSlice'
import { CustomInvoiceShippingAddressForm } from '../CustomInvoiceCustomer/CustomInvoiceShippingAddressForm'
import { CustomInvoiceCustomerAddShippingAddressBox } from './CustomInvoiceCustomerAddShippingAddressBox'
import { CustomInvoiceAddBillingAddressBox } from './CustomInvoiceAddBillingAddressBox'
import { IoIosAddCircle } from "react-icons/io";
import { InputComponent } from '../../DaisyUiComponent/InputComponent'
import { SimpleSelectOption } from '../../DaisyUiComponent/SimpleSelectOption'
import { TextAreaComponent } from '../../DaisyUiComponent/TextAreaComponent'
import { CustomInvoiceProductTable } from './CustomInvoiceProductTable'



export const CustomInvoiceCreate = () => {

    const [openshippingAddress, setOpenShippingAddress] = useState(false)
    const [openBillingAddress, setOpenBillingAddress] = useState(false)
    const [openshippingAddressForm, setOpenShippingAddressForm] = useState(false)
    const [opensBillingAddressForm, setOpenBillingAddressForm] = useState(false)
    const [selectedAddressIndex, setSelectedAddressIndex] = useState({
        shipping: 0,
        billing: 0,
    });

    const [rows, setRows] = useState([{ id: 1, item: "", quantity: 1.00, rate: 0.00, discount: 0.00, tax: 0, amount: 0 }])



    const { handleSubmit, watch, register, setValue, control } = useForm({
        defaultValues: {
            invoiceNumber: ""
        }
    })


    const dispatch = useDispatch()

    const selectedCustomInvoiceCustomer = watch("customerDis")
    const customerNameSearch = watch("customerName")
    const customerSelectId = watch("customerId")

    const onsubmit = (data) => {
        console.log(data)
    }

    const salutation = [
        { id: 1, value: "", name: "Select Salutation" },
        { id: 2, value: "Mr.", name: "Mr." },
        { id: 3, value: "Mrs.", name: "Mrs." },
        { id: 4, value: "Ms.", name: "Ms." },
        { id: 5, value: "M/s.", name: "M/s." },
    ]



    const { customInvoiceCustomerDataForm, customCustomerAddressData, customCustomerAddressIsLoading } = useCustomInvoiceCustomer();

    const billingAddress = customCustomerAddressData?.billingAddresses[selectedAddressIndex.billing]
    const shippingAddress = customCustomerAddressData?.shippingAddresses[selectedAddressIndex.shipping]


    const handleAddNewRow = () => {
        setRows([
            ...rows,
            { id: Date.now(), item: "", quantity: 1.00, rate: 0.00, discount: 0.00, tax: 0, amount: 0 }
        ])
    }

    const handleOpenShippingAddresses = () => {
        setOpenShippingAddress((prev) => !prev)
    }
    const handleOpenBillingAddresses = () => {
        setOpenBillingAddress((prev) => !prev)
    }


    const handleNewShippingAddress = () => {
        setOpenShippingAddressForm(true)
        dispatch(addBackgroundBlur(true))
    }
    const handleNewBillingAddress = () => {
        setOpenBillingAddressForm(true)
        dispatch(addBackgroundBlur(true))
    }

    const handleShippingAddressFormCancel = () => {
        setOpenShippingAddressForm(false)
        dispatch(addBackgroundBlur(false))
    }
    const handleBillingFormCancel = () => {
        setOpenBillingAddressForm(false)
        dispatch(addBackgroundBlur(false))
    }

    const handleSelectShippingAddress = (indexNum, shippingAddressId) => {
        setSelectedAddressIndex((prev) => ({ ...prev, shipping: indexNum }))
        setOpenShippingAddress(false)
        setValue("shippingAddressId", shippingAddressId || "")
    }
    const handleSelectBillingAddress = (indexNum, billingAddressId) => {
        setSelectedAddressIndex((prev) => ({ ...prev, billing: indexNum }))
        setOpenBillingAddress(false)
        setValue("billingAddressId", billingAddressId || "")
    }

    useEffect(() => {
        if (!customerSelectId) return;

        dispatch(setCustomCustomerId(customerSelectId))



    }, [customerSelectId,])


    useEffect(() => {
        if (!customCustomerAddressData) return
        setValue("billingAddressId", billingAddress?._id || "")
        setValue("shippingAddressId", shippingAddress?._id || "")
    }, [customCustomerAddressData])



    const shippingAddressBox = (
        <div className="card w-96 bg-base-100 shadow-sm absolute border">
            <div className="card-body p-3">
                {customCustomerAddressData?.shippingAddresses.length === 0 ? <p>No data found</p> : null}
                {customCustomerAddressData?.shippingAddresses.map((address, index) => (
                    <div onClick={() => handleSelectShippingAddress(index, address._id)} key={address?._id} className='hover:bg-blue-500 hover:text-white p-2 rounded-md shadow'>
                        <p className='mt-1 text-sm font-medium'>{address?.address}</p>
                        <p className='mt-1 text-sm font-medium'>{address?.city}</p>
                        <p className='mt-1 text-sm font-medium'>{address?.state}</p>
                    </div>
                ))}
                <div className='border-t pt-1 flex gap-1 items-center'>
                    <IoIosAddCircle color='blue' />
                    <p className='text-blue text-sm font-semibold text-blue-500  cursor-pointer' onClick={handleNewShippingAddress}>

                        New address</p>
                </div>
            </div>
        </div>
    )

    const billingAddressBox = (
        <div className="card w-96 bg-base-100 shadow-sm absolute border">
            <div className="card-body p-3">
                {customCustomerAddressData?.billingAddresses.length === 0 ? <p>No data found</p> : null}
                {customCustomerAddressData?.billingAddresses.map((address, index) => (
                    <div onClick={() => handleSelectBillingAddress(index, address._id)} key={address?._id} className='hover:bg-blue-500 hover:text-white p-2 rounded-md shadow'>
                        <p className='mt-1 text-sm font-medium'>{address?.address}</p>
                        <p className='mt-1 text-sm font-medium'>{address?.city}</p>
                        <p className='mt-1 text-sm font-medium'>{address?.state}</p>
                    </div>
                ))}
                <div className='border-t pt-1 flex gap-1 items-center'>
                    <IoIosAddCircle color='blue' />
                    <p className='text-blue text-sm font-semibold text-blue-500  cursor-pointer' onClick={handleNewBillingAddress}>

                        New address</p>
                </div>
            </div>
        </div>
    )

    const customer = (
        filterDataArr(customInvoiceCustomerDataForm, customerNameSearch, "", "displayName", true)?.sort((a, b) => a.displayName.localeCompare(b.displayName))?.map((customer) => {

            const isBusinessEmail = customer?.businessName ? <span className='flex items-center gap-1'><MdOutlineEmail /> {customer?.email}</span> : null
            const isBusinessName = customer?.businessName ? <span className='flex items-center gap-1'><PiBuildingOfficeLight /> {customer?.businessName}</span> : null


            return (
                <div key={customer._id} role="button" className="my-2 rounded-md p-2 flex gap-2 items-center hover:bg-blue-500 hover:text-white" onClick={() => {
                    setValue("customerId", customer._id)
                    setValue("customerDis", customer?.displayName)
                }}>

                    <div className="w-12 h-12 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                        <span className="text-sm">{customer?.displayName.slice(0, 1)}</span>
                    </div>
                    <div>
                        <p>{customer?.displayName}</p>
                        <div className='flex gap-1  mt-1 text-xs '>
                            <p className='pr-2 border-r border-r-gray-600'> {isBusinessEmail}</p>
                            <p> {isBusinessName}</p>
                        </div>
                    </div>

                </div>
            )
        })
    )


    return (
        <div className='flex flex-col md:flex-row gap-1 px-4 xl:px-24 pt-16 pb-20 relative'>
            {openshippingAddressForm ? <CustomInvoiceCustomerAddShippingAddressBox setOpenShippingAddressForm={setOpenShippingAddressForm} handleShippingAddressFormCancel={handleShippingAddressFormCancel} /> : null}
            {opensBillingAddressForm ? <CustomInvoiceAddBillingAddressBox setOpenBillingAddressForm={setOpenBillingAddressForm} handleBillingFormCancel={handleBillingFormCancel} /> : null}

            <form onSubmit={handleSubmit(onsubmit)} className='relative w-full flex flex-col p-1 '>

                <div className='flex items-start  gap-10'>
                    <div className='w-[170px]'>
                        <label htmlFor="expense-account" className='text-red-500 block'>Customer Name*</label>
                    </div>
                    <div className='flex w-full flex-col'>
                        <SelectOptionComponent
                            selectPlaceholder={"Select a customer"}
                            selectedCustomInvoiceCustomer={selectedCustomInvoiceCustomer}
                            classNames={"max-w-lg "}

                        >
                            <div className="relative">
                                <div className="sticky top-3 bg-white ">
                                    <IoMdSearch className="absolute top-2 left-3" />
                                    <input type="text" {...register("customerName")} placeholder="search" className="pl-10 tracking-wider rounded-md input input-sm input-bordered w-[98%]" />
                                </div>
                                <div className="h-56 overflow-y-auto pb-2">
                                    <hr className="my-5" />
                                    {customer}
                                </div>

                            </div>

                        </SelectOptionComponent>
                        {customCustomerAddressIsLoading ? <p className='mt-5'>Loading</p> : null}
                        {customerSelectId && customCustomerAddressIsLoading === false ? <div className='mt-5 justify-between flex'>
                            <div className='w-1/3'>

                                <div className='flex gap-2'>
                                    <p className='text-sm'>BILLING ADDRESS </p>
                                    <FaPen color='gray' onClick={handleOpenBillingAddresses} />
                                </div>

                                {openBillingAddress ? billingAddressBox : null}
                                <div>
                                    <p className='mt-1 text-sm font-medium'>{billingAddress?.address}</p>
                                    <p className='mt-1 text-sm font-medium'>{billingAddress?.city}</p>
                                    <p className='mt-1 text-sm font-medium'>{billingAddress?.state}</p>

                                    {!billingAddress ? <p className='mt-5 text-sm text-blue-500 cursor-pointer' onClick={handleNewBillingAddress}>New Address</p> : null}
                                </div>
                            </div>
                            <div>

                                <div className='flex gap-2 relative'>
                                    <p className='text-sm'>SHIPPING ADDRESS</p>
                                    <FaPen color='gray' onClick={handleOpenShippingAddresses} />
                                </div>
                                {openshippingAddress ? shippingAddressBox : null}
                                <div >
                                    <p className='mt-1 text-sm font-medium'>{shippingAddress?.address}</p>
                                    <p className='mt-1 text-sm font-medium'>{shippingAddress?.city}</p>
                                    <p className='mt-1 text-sm font-medium'>{shippingAddress?.state}</p>
                                    {!shippingAddress ? <p className='mt-5 text-sm text-blue-500 cursor-pointer' onClick={handleNewShippingAddress}>New Address</p> : null}
                                </div>
                            </div>
                        </div> : null}
                    </div>
                </div>
                {/* invoice input */}
                <div className='flex items-start gap-10 mt-10 w-full'>
                    <div className='w-[145px]'>
                        <label htmlFor="expense-account" className='text-red-500 block'>Invoice#*</label>
                    </div>
                    <div className='w-full max-w-md'>
                        <Controller name="invoiceNumber" control={control} render={({ field }) => (
                            <InputComponent classNames={"input-sm"} field={field} regexVal={/\b\w/g} placeholder={""} />
                        )} />
                    </div>
                </div>

                <div className='flex items-start gap-10 mt-10 w-full'>
                    <div className='w-[145px]'>
                        <label htmlFor="expense-account" className='text-black block'>Order Number</label>
                    </div>
                    <div className='w-full max-w-md'>
                        <Controller name="invoiceNumber" control={control} render={({ field }) => (
                            <InputComponent classNames={"input-sm"} field={field} regexVal={/\b\w/g} placeholder={""} />
                        )} />
                    </div>
                </div>


                <div className='flex items-center gap-10 mt-10 '>
                    <div className='w-[145px]'>
                        <label htmlFor="expense-account" className='text-black block'>Invoice Date</label>
                    </div>

                    <div>
                        <div className="relative  w-fit">
                            <input type="date" {...register("date", { valueAsDate: true })} id='date' className=" z-50 rounded-md input input-sm input-bordered " />
                            <span className='absolute right-1  top-1/2 -translate-y-1/2 pointer-events-none'>
                                <FaCalendarAlt className="text-blue-400" />
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="expense-account" className='text-black block'>Terms</label>
                    </div>
                    <div className='w-[10%] '>
                        <Controller name="customerType" control={control} defaultValue='Select Customer Type' render={({ field }) => (
                            <SimpleSelectOption field={field} data={salutation} classNames="select-sm " />
                        )} />
                    </div>

                    <div>
                        <label htmlFor="expense-account" className='text-black block'>Due Date</label>
                    </div>

                    <div>
                        <div className="relative  w-fit">
                            <input type="date" {...register("date", { valueAsDate: true })} id='date' className=" z-50 rounded-md input input-sm input-bordered " />
                            <span className='absolute right-1  top-1/2 -translate-y-1/2 pointer-events-none'>
                                <FaCalendarAlt className="text-blue-400" />
                            </span>
                        </div>
                    </div>
                </div>

                <hr className="my-5" />

                <div className='flex items-start gap-10 mt-10 w-full'>
                    <div className='w-[145px]'>
                        <label htmlFor="expense-account" className='text-black block'>SalesPerson</label>
                    </div>
                    <SelectOptionComponent
                        selectPlaceholder={"Select an account"}
                        // selectedTaxRate={selectedTaxRate}
                        classNames={"max-w-sm"}
                    >
                        <div className="relative">
                            <div className="h-56 overflow-y-auto">
                                <hr className="my-5" />
                                <p className="text-sm font-semibold">Tax</p>
                                {/* {taxRates} */}
                            </div>

                            <div className="mt-2 flex justify-between items-center">
                                {/* <button type="button" onClick={handleClickOpenTaxRate} className="btn btn-ghost btn-sm text-blue-600">Add New Tax</button> */}
                                {/* <button type="button" onClick={handleClickOpenExpenseAccountTitle} className="btn btn-ghost btn-sm">Expense title</button> */}
                            </div>
                        </div>
                    </SelectOptionComponent>
                </div>

                <div className='flex items-start gap-10 mt-10 w-full'>
                    <div className='w-[145px]'>
                        <label htmlFor="expense-account" className='text-black block'>GST/HST #</label>
                    </div>
                    <div className='w-full max-w-md'>
                        <Controller name="invoiceNumber" control={control} render={({ field }) => (
                            <InputComponent classNames={"input-sm"} field={field} regexVal={/\b\w/g} placeholder={""} />
                        )} />
                    </div>
                </div>


                <hr className="my-5" />

                <div className='flex items-start gap-10  w-full'>
                    <div className='w-[145px]'>
                        <label htmlFor="expense-account" className='text-black block'>Subject</label>
                    </div>
                    <div className='w-full max-w-md'>
                        <Controller name="invoiceNumber" control={control} render={({ field }) => (
                            <InputComponent classNames={"input-sm"} field={field} regexVal={/\b\w/g} placeholder={""} />
                        )} />
                    </div>
                </div>

                {/* product table */}
                <div className='mt-10'>
                    <CustomInvoiceProductTable rows={rows} control={control} handleAddNewRow={handleAddNewRow} />
                </div>

                <button>submit</button>
            </form >
        </div >
    )
}
