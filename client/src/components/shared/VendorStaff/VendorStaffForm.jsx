import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IoMdClose, IoMdSearch } from 'react-icons/io'
import { InputComponent } from '../DaisyUiComponent/InputComponent'
import { SelectOptionComponent } from '../DaisyUiComponent/SelectOptionComponent'
import { useParams } from 'react-router-dom'
import { useVendorStaff } from '../../../hooks/useVendorStaff'

export const VendorStaffForm = ({ setOpenCreateForm }) => {

    const { handleSubmit, control, register } = useForm({
        defaultValues: {
            staffName: "",
            email: "",
            phoneNumber: "",
        }
    })

    const { id: vendorId } = useParams()

    const { createStaff, vendorStaffPending, vendorStaffSuccess } = useVendorStaff()


    const handleCancelForm = () => {
        setOpenCreateForm(false)
    }

    const onsubmit = (data) => {
        const staffData = { ...data, vendorId: vendorId }
        createStaff(staffData);

    }

    useEffect(() => {
        if (!vendorStaffSuccess) return
        setOpenCreateForm(false)
    }, [vendorStaffSuccess])

    return (
        <div className="fixed w-96  p-5 shadow-md bg-white top-[50%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md" >
            <div className="mb-5 flex justify-between items-center">
                <h2 className=" font-semibold">Create Vendor</h2>
                <button className="btn btn-ghost btn-sm" onClick={handleCancelForm} >
                    <IoMdClose size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onsubmit)}>

                <label className="label flex-block">Staff Name</label>
                <Controller name="staffName" control={control} render={({ field }) => (
                    <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Staff Name"} />
                )} />

                <label className="label ">Email</label>
                <Controller name="email" control={control} render={({ field }) => (
                    <InputComponent field={field} regexVal={/[a-z]/g} placeholder={"Enter email"} lowerCase={true} />
                )} />

                <label className="label ">Phone Number</label>
                <Controller name="phoneNumber" control={control} render={({ field }) => (
                    <InputComponent field={field} regexVal={/[a-z]/g} placeholder={"Enter phone number"} lowerCase={true} />
                )} />
                <button disabled={vendorStaffPending === true} className="btn btn-primary btn-md w-full mt-3 rounded-md">{vendorStaffPending ? "Creating..." : "Create Staff"}</button>
            </form>
        </div>
    )
}
