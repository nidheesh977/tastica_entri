import React, { useEffect } from 'react'
import { TextAreaComponent } from '../DaisyUiComponent/TextAreaComponent'
import { IoMdClose } from 'react-icons/io'
import { Controller, useForm } from 'react-hook-form'
import { useExpenseAccount } from '../../../hooks/expense/useExpenseAccount'

export const ExpenseStatusForm = ({ openStatusForm, setOpenStatusForm, dispatch, addBackgroundBlur }) => {

    const { handleSubmit, control } = useForm({
        defaultValues: {
            reason: "",
        }
    })

    const { changeExpenseAccStatus, expenseAccStatusSuccess, statusUploadLoading } = useExpenseAccount()

    const handleCloseStatusForm = () => {
        setOpenStatusForm(prev => ({ openCom: false }))
    }

    const onsubmit = (data) => {
        const { isActive, expenseAccountId } = openStatusForm;
        data = { ...data, isActive, expenseAccountId }
        changeExpenseAccStatus(data)
    }

    useEffect(() => {
        if (!expenseAccStatusSuccess) return;
        setOpenStatusForm(prev => ({ openCom: false }))
    }, [expenseAccStatusSuccess])

    return (
        <div className="fixed w-96 p-5 shadow-md bg-white top-[50%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md" >
            <div className="mb-2 flex justify-between items-center">
                <h2 className=" font-semibold">Expense Account Status</h2>
                <button className="btn btn-ghost btn-sm" onClick={handleCloseStatusForm}>
                    <IoMdClose size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onsubmit)}>
                <label className="label">Reason</label>
                <Controller name="reason" control={control} render={({ field }) => (
                    <TextAreaComponent field={field} regexVal={/\b\w/g} placeholder={"Optional"} />
                )} />
                <button disabled={statusUploadLoading === true} className="btn btn-primary btn-md w-full mt-3 rounded-md">{statusUploadLoading ? `${openStatusForm?.isActive ? "Activating" : "Deactivating"}` : `${openStatusForm?.isActive ? "Activate" : "Deactivate"}`}</button>
            </form>

        </div>
    )
}
