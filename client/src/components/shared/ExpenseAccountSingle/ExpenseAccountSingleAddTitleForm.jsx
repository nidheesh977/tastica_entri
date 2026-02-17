import React, { useEffect } from 'react'
import { Controller, useForm, } from 'react-hook-form'
import { InputComponent } from '../DaisyUiComponent/InputComponent'
import { useExpenseAccount } from '../../../hooks/expense/useExpenseAccount'
import { IoMdClose, IoMdSearch } from 'react-icons/io'
import { useDispatch, } from 'react-redux';
import { removeBackgroundBlur, addExpenseAccountId, setCloseExpenseSubTitleForm } from '../../../redux/features/commonSlice'
import { SelectOptionComponent } from '../DaisyUiComponent/SelectOptionComponent'
import { useLocation } from 'react-router-dom'


export const ExpenseAccountSingleAddTitleForm = () => {

    const { pathname } = useLocation()

    const { addTitleToExpenseAccount, expenseAccountTitleData, addTitleToExpenseAccountSuccess, addTitleLoading } = useExpenseAccount()

    const { handleSubmit, watch, control, setValue } = useForm({
        defaultValues: {
            title: ""
        }
    })

    const selectedExpenseAccount = watch("expenseTitleDis")

    const isValidPage = pathname === "/admin/expense/create"

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        const { expenseAccountId } = data;
        dispatch(addExpenseAccountId(expenseAccountId))
        addTitleToExpenseAccount(data)

    }


    const handleTitleAddCancel = () => {
        dispatch(setCloseExpenseSubTitleForm(false))
        dispatch(removeBackgroundBlur(false))
    }


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
                {isValidPage ? <div className='flex flex-col my-3 justify-start items-start lg:items-start gap-2 relative'>
                    <label htmlFor="paid-through" >Expense Account</label>
                    <SelectOptionComponent
                        selectPlaceholder={"Select an account"}
                        selectedExpenseAccount={selectedExpenseAccount}
                    >
                        <div className="relative">
                            <div className="h-56 overflow-y-auto">

                                {expenseAccountTitleData.map((expense, index) => (
                                    <div key={expense?._id}>
                                        <button type="button" key={expense?._id}
                                            onClick={() => {
                                                setValue("expenseAccountId", expense._id)
                                                setValue("expenseTitleDis", expense.expenseTitle)
                                            }}

                                            className="w-full text-start rounded-md px-2 py-1 my-2 hover:bg-blue-500 hover:text-white block text-sm text-gray-500">
                                            {expense.expenseTitle}
                                        </button>

                                    </div>
                                ))
                                }

                            </div>
                        </div>
                    </SelectOptionComponent >
                </div> : null}

                <button disabled={addTitleLoading === true || !selectedExpenseAccount} className="btn btn-primary btn-md w-full mt-3 rounded-md">{addTitleLoading ? "Addding" : "Add"}</button>
            </form>
        </div>
    )
}
