import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io'
import { InputComponent } from '../DaisyUiComponent/InputComponent'
import { SimpleSelectOption } from '../DaisyUiComponent/SimpleSelectOption'
import { usePaymentAccount } from '../../../hooks/usePaymentAccount'


export const PaymentAccountForm = ({ setopenCreateForm, dispatch, removeBackgroundBlur }) => {

    const { handleSubmit, control } = useForm({
        defaultValues: {
            accountType: "",
            accountTitle: ""
        }
    })



    const handlePayAccountCancel = () => {
        setopenCreateForm(false)
        dispatch(removeBackgroundBlur(false))
    }

    const { createPaymentAccount, accountCreateSuccess } = usePaymentAccount()



    const paymentAccountType = [
        { id: 1, value: "", name: "Select Account type" },
        { id: 2, value: "Cash", name: "Cash" },
        { id: 3, value: "Bank", name: "Bank" },
    ]

    const onSubmit = (data) => {
        createPaymentAccount(data);
    }


    useEffect(() => {
        if (!accountCreateSuccess) return
        setopenCreateForm(false)
    }, [accountCreateSuccess])


    return (
        <div className="fixed w-96 p-5 shadow-md bg-white top-[45%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
            <div className="mb-5 flex justify-between items-center">
                <h2 className=" font-semibold">Add tax rates</h2>
                <button onClick={handlePayAccountCancel} className="btn btn-ghost btn-sm">
                    <IoMdClose size={20} />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="label">Account Name</label>
                <Controller name="accountTitle" control={control} render={({ field }) => (
                    <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Account Name"} />
                )} />
                <label className="label mt-2">Account Type</label>
                <Controller name="accountType" control={control} defaultValue='Select Account type' render={({ field }) => (
                    <SimpleSelectOption field={field} data={paymentAccountType} />
                )} />
                <button className="btn btn-primary btn-md w-full mt-3 rounded-md">{"Create Payment Account"}</button>
            </form>

        </div>
    )
}
