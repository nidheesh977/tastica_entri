import React from 'react'
import { TextAreaComponent } from '../DaisyUiComponent/TextAreaComponent'
import { Controller, useForm } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io'
import { useEffect } from 'react'
import { usePaymentAccount } from '../../../hooks/usePaymentAccount'
import { useDispatch } from 'react-redux'
import { removeBackgroundBlur } from '../../../redux/features/commonSlice'

export const PaymentAccountStatus = ({ openStatusForm, setOpenStatusForm }) => {


    const { handleSubmit, control } = useForm({
        defaultValues: {
            reason: "",
        }
    })

    const dispatch = useDispatch()

    const handleCloseStatusForm = () => {
        setOpenStatusForm(prev => ({ openCom: false }))
        dispatch(removeBackgroundBlur(false))
    }

    const { paymentAccountStatusChange, paymentAccountstatusChangeLoading, paymentAccountStatusSuccess } = usePaymentAccount()

    const onsubmit = (data) => {

        const { isActive, paymentAccountId, } = openStatusForm;

        data = { ...data, isActive, paymentAccountId, }


        paymentAccountStatusChange(data)
    }

    useEffect(() => {
        if (!paymentAccountStatusSuccess) return
        setOpenStatusForm(prev => ({ openCom: false }))
    }, [paymentAccountStatusSuccess])

    return (
        <div className="fixed w-96 p-5 shadow-md bg-white top-[50%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md" >
            <div className="mb-2 flex justify-between items-center">
                <h2 className=" font-semibold">Vendor Status</h2>
                <button className="btn btn-ghost btn-sm" onClick={handleCloseStatusForm}>
                    <IoMdClose size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onsubmit)}>
                <label className="label">Reason</label>
                <Controller name="reason" control={control} render={({ field }) => (
                    <TextAreaComponent field={field} regexVal={/\b\w/g} placeholder={"Optional"} />
                )} />
                <button disabled={paymentAccountstatusChangeLoading === true} className="btn btn-primary btn-md w-full mt-3 rounded-md">{paymentAccountstatusChangeLoading ? `${openStatusForm?.isActive ? "Activating" : "Deactivating"}` : `${openStatusForm?.isActive ? "Activate" : "Deactivate"}`}</button>
            </form>

        </div>
    )
}
