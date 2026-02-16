import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputComponent } from '../DaisyUiComponent/InputComponent'
import { useExpenseAccount } from '../../../hooks/expense/useExpenseAccount'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux';
import { removeBackgroundBlur } from '../../../redux/features/commonSlice'


export const ExpenseAccountSingleAddTitleForm = ({ setopenCreateForm, dipatch, add }) => {


    const { addTitleToExpenseAccount, addTitleToExpenseAccountSuccess, addTitleLoading } = useExpenseAccount()

    const { handleSubmit, reset, register, control } = useForm({
        defaultValues: {
            title: ""
        }
    })

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        addTitleToExpenseAccount(data)

    }

    const handleTitleAddCancel = () => {
        setopenCreateForm(false)
        dispatch(removeBackgroundBlur(false))
    }

    useEffect(() => {
        if (!addTitleToExpenseAccountSuccess) return
        setopenCreateForm(false)
    }, [addTitleToExpenseAccountSuccess])

    return (
        <div className="fixed w-96 p-5 shadow-md bg-white top-[45%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
            <div className="mb-5 flex justify-between items-center">
                <h2 className="font-semibold">Add Title</h2>
                <button onClick={handleTitleAddCancel} className="btn btn-ghost btn-sm">
                    <IoMdClose size={20} />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <label className="label">Title</label>
                <Controller name="title" control={control} render={({ field }) => (
                    <InputComponent field={field} placeholder="Add Expense Title" />
                )} />

                <button disabled={addTitleLoading === true} className="btn btn-primary btn-md w-full mt-3 rounded-md">{addTitleLoading ? "Addding" : "Add"}</button>
            </form>
        </div>
    )
}
