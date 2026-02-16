import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextAreaComponent } from '../DaisyUiComponent/TextAreaComponent'
import { IoMdClose } from 'react-icons/io'
import { useExpenseAccount } from '../../../hooks/expense/useExpenseAccount'
import { useDispatch } from "react-redux"
import { removeBackgroundBlur } from "../../../redux/features/commonSlice"

export const ExpenseAccountSingleStatusForm = ({ openStatusForm, setOpenStatusForm }) => {

    const { handleSubmit, control } = useForm({
        defaultValues: {
            reason: "",
        }
    })

    const dispatch = useDispatch()

    const { changeStatusExpenseSingleAccount, expenseSingStatusAccSuccess, expenseSingStatusAccSuccessLoading } = useExpenseAccount()

    const handleCloseStatusForm = () => {
        setOpenStatusForm(prev => ({ openCom: false }))
        dispatch(removeBackgroundBlur(false))
    }

    const onsubmit = (data) => {
        const { isActive, titleId } = openStatusForm;
        data = { ...data, isActive, titleId }
        changeStatusExpenseSingleAccount(data)
    }

    useEffect(() => {
        if (!expenseSingStatusAccSuccess) return;
        setOpenStatusForm(prev => ({ openCom: false }))
    }, [expenseSingStatusAccSuccess])


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
                <button disabled={expenseSingStatusAccSuccessLoading === true} className="btn btn-primary btn-md w-full mt-3 rounded-md">{expenseSingStatusAccSuccessLoading ? `${openStatusForm?.isActive ? "Activating" : "Deactivating"}` : `${openStatusForm?.isActive ? "Activate" : "Deactivate"}`}</button>
            </form>

        </div>
    )
}
