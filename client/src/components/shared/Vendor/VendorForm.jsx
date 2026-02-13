import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io'
import { InputComponent } from '../DaisyUiComponent/InputComponent'
import { TextAreaComponent } from '../DaisyUiComponent/TextAreaComponent'
import { useVendor } from '../../../hooks/useVendor'

export const VendorForm = ({ setopenCreateForm, dispatch, removeBackgroundBlur }) => {

    const { handleSubmit, control } = useForm({
        defaultValues: {
            vendorName: "",
            email: "",
            phoneNumber: "",
            address: "",
        }
    })

    const { createVendor, createVendorSuccess, vendorPending } = useVendor()

    const onSubmit = (data) => {
        console.log(data);

        createVendor(data)
    }

    const handleVendorFormCancel = () => {
        setopenCreateForm(false)
        dispatch(removeBackgroundBlur(false))
    }

    useEffect(() => {
        if (!createVendorSuccess) return;

        setopenCreateForm(false)
    }, [createVendorSuccess])

    return (
        <div className="fixed w-96 md:w-[750px] p-5 shadow-md bg-white top-[50%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md" >
            <div className="mb-5 flex justify-between items-center">
                <h2 className=" font-semibold">Create Vendor</h2>
                <button className="btn btn-ghost btn-sm" onClick={handleVendorFormCancel}>
                    <IoMdClose size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-3 flex-col lg:flex-row items-center'>
                    <div className='flex-col flex-1 w-full'>
                        <label className="label flex-block">Vendor Name</label>
                        <Controller name="vendorName" control={control} render={({ field }) => (
                            <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Vendor Name"} />
                        )} />
                    </div>

                    <div className='flex flex-col flex-1 w-full'>
                        <label className="label ">Email</label>
                        <Controller name="email" control={control} render={({ field }) => (
                            <InputComponent field={field} regexVal={/[a-z]/g} placeholder={"Enter email"} lowerCase={true} />
                        )} />
                    </div>
                </div>

                <label className="label mt-2">Phone Number</label>
                <Controller name="phoneNumber" control={control} render={({ field }) => (
                    <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Enter Phone number"} />
                )} />
                <label className="label mt-2">Address</label>
                <Controller name="address" control={control} render={({ field }) => (
                    <TextAreaComponent field={field} regexVal={/\b\w/g} placeholder={"Enter address"} />
                )} />
                <button disabled={vendorPending === true} className="btn btn-primary btn-md w-full mt-3 rounded-md">{vendorPending ? "Creating..." : "Create Vendor"}</button>
            </form>
        </div >
    )
}
