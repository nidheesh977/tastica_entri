import { InputComponent } from "../DaisyUiComponent/InputComponent"
import { useForm, Controller } from "react-hook-form"
import { removeBackgroundBlur } from "../../../redux/features/commonSlice"
import { useDispatch } from "react-redux"
import { useExpenseAccount } from "../../../hooks/expense/useExpenseAccount"
import { useEffect } from "react"
import { IoMdClose } from "react-icons/io";

export const ExpenseAccountAddTitle = ({ setAddTitleBox }) => {

    const { handleSubmit, reset, register, control } = useForm({
        defaultValues: {
            title: ""
        }
    })

    const { addTitleToExpenseAccount, addTitleToExpenseAccountCreated } = useExpenseAccount()

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        addTitleToExpenseAccount(data)

    }

    const handleTitleAddCancel = () => {
        dispatch(removeBackgroundBlur(false))
        setAddTitleBox(false)
    }

    useEffect(() => {
        if (!addTitleToExpenseAccountCreated) return;
        dispatch(removeBackgroundBlur(false))
        setAddTitleBox(false)
    }, [addTitleToExpenseAccountCreated])

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

                <button disabled={addTitleToExpenseAccountCreated === true} className="btn btn-primary btn-md w-full mt-3 rounded-md">{addTitleToExpenseAccountCreated ? "Addding" : "Add"}</button>
            </form>
        </div>
    )
}
