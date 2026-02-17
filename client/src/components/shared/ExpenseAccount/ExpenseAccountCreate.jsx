import { useEffect } from "react"
import { useExpenseAccount } from "../../../hooks/expense/useExpenseAccount"
import { InputComponent } from "../DaisyUiComponent/InputComponent"
import { TextAreaComponent } from "../DaisyUiComponent/TextAreaComponent"
import { useForm, Controller } from "react-hook-form"
import { removeBackgroundBlur, setCloseExpenseAccount } from "../../../redux/features/commonSlice"
import { useDispatch } from "react-redux"
import { IoMdClose } from "react-icons/io"


export const ExpenseAccountCreate = () => {

    const { handleSubmit, reset, register, control } = useForm({
        defaultValues: {
            expenseTitle: ""
        }
    })


    const dispatch = useDispatch()



    const { createExpenseAccount, expenseAccountCreated } = useExpenseAccount()

    const onSubmit = (data) => {
        createExpenseAccount(data)
    }
    const handleExpenseAddCancel = () => {
        dispatch(setCloseExpenseAccount(false))
        dispatch(removeBackgroundBlur(false))
    }


    return (
        <div className="fixed w-96 p-5 shadow-md bg-white top-[45%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
            <div className="flex justify-between items-center">
                <h2 className="mb-5 font-semibold">Create Expense Account</h2>
                <button onClick={handleExpenseAddCancel} className="btn btn-ghost btn-sm">
                    <IoMdClose size={20} />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <label className="label">Expense Title</label>
                <Controller name="expenseTitle" control={control} render={({ field }) => (
                    <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Eg. Meals"} />
                )} />

                <label className="label mt-5">Description</label>
                <Controller name="description" control={control} render={({ field }) => (
                    <TextAreaComponent field={field} placeholder={"Add description"} />
                )} />

                <button className="btn btn-primary btn-md w-full mt-3 rounded-md">Create Expense</button>
            </form>
        </div>
    )
}
