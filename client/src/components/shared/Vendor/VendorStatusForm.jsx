import React, { useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import { TextAreaComponent } from '../DaisyUiComponent/TextAreaComponent'
import { Controller, useForm } from 'react-hook-form'
import { useVendor } from '../../../hooks/useVendor'

export const VendorStatusForm = ({ openStatusForm, setOpenStatusForm, dispatch, removeBackgroundBlur }) => {

    const { handleSubmit, control } = useForm({
        defaultValues: {
            reason: "",
        }
    })

    const { changeVendorStatus, statusUploadLoading, vendorStatusSuccess } = useVendor()

    const handleCloseStatusForm = () => {
        setOpenStatusForm(false)
        dispatch(removeBackgroundBlur(false))
    }

    const onSubmit = (data) => {
        const { vendorId, isActive } = openStatusForm
        data = { ...data, vendorId, isActive }
        changeVendorStatus(data)
    }

    useEffect(() => {
        if (!vendorStatusSuccess) return;
        setOpenStatusForm(false)
    }, [vendorStatusSuccess])

    return (
        <div className="fixed w-96 p-5 shadow-md bg-white top-[50%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md" >
            <div className="mb-2 flex justify-between items-center">
                <h2 className=" font-semibold">Vendor Status</h2>
                <button className="btn btn-ghost btn-sm" onClick={handleCloseStatusForm}>
                    <IoMdClose size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="label">Reason</label>
                <Controller name="reason" control={control} render={({ field }) => (
                    <TextAreaComponent field={field} regexVal={/\b\w/g} placeholder={"Optional"} />
                )} />
                <button disabled={statusUploadLoading === true} className="btn btn-primary btn-md w-full mt-3 rounded-md">{statusUploadLoading ? `${openStatusForm?.isActive ? "Activating" : "Deactivating"}` : `${openStatusForm?.isActive ? "Activate" : "Deactivate"}`}</button>
            </form>

        </div>
    )
}
