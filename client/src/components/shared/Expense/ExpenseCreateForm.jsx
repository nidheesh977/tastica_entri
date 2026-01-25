import { FaCalendarAlt } from "react-icons/fa";
import { SelectOptionComponent } from "../DaisyUiComponent/SelectOptionComponent";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { IoMdSearch } from "react-icons/io";


export const ExpenseCreateForm = () => {
    const obj = {
        title: "Other Expense",
        subTitle: [
            { id: 1, title: "meals" },
            { id: 2, title: "electricty" },
            { id: 3, title: "building tax" },
        ]
    }


    const { handleSubmit, watch, register, setValue } = useForm()



    const onSubmit = (data) => {
        console.log(data);

    }

    const selectedExpenseAccount = watch("expenseAccount")
    const selectedTaxRate = watch("shopTaxAccount")

    const handleSaveExpense = () => {
        handleSubmit(onSubmit)()
    }

    return (
        <div className='flex flex-col md:flex-row gap-1 px-4 xl:px-28 py-16 relative'>
            {/* form container */}

            <form className='relative w-full xl:w-1/2 p-1 flex flex-col gap-5'>

                {/* Date Input */}
                <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center '>
                    <label htmlFor="date" className='text-red-500'>Date*</label>
                    <div className="relative  w-full max-w-sm md:mr-16">
                        <input type="date" {...register("date")} id='date' className=" z-50 rounded-md input input-sm input-bordered w-full max-w-sm" />
                        <span className='absolute right-1  top-1/2 -translate-y-1/2 pointer-events-none'>
                            <FaCalendarAlt className="text-blue-400" />
                        </span>
                    </div>
                </div>

                {/* Expense Account */}

                <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative'>
                    <label htmlFor="expense-account" className='text-red-500'>Expense Account*</label>
                    <SelectOptionComponent
                        selectPlaceholder={"Select an account"}
                        selectAccountObj={obj}
                        registerKey={"expenseAccount"}
                        setValue={setValue}
                        selectedExpenseAccount={selectedExpenseAccount}

                    >
                        <div className="relative">

                            <div className="sticky top-3 bg-white ">
                                <IoMdSearch className="absolute top-2 left-3" />
                                <input type="text" placeholder="search" className="pl-10 tracking-wider rounded-md input input-sm input-bordered w-full max-w-sm" />

                            </div>
                            <div className="h-56 overflow-y-auto">
                                <hr className="my-5" />
                                <p className="text-sm font-semibold">{obj.title}</p>
                                {obj?.subTitle.map((title, index) => (
                                    <button type="button" onClick={() => setValue("shopTaxAccount", title.title)} key={title.id} className="w-full text-start rounded-md px-2 py-1 my-2 hover:bg-blue-500 hover:text-white block text-sm text-gray-500">{title.title}</button>
                                ))}

                                <p className="text-sm font-semibold">{obj.title}</p>
                                {obj?.subTitle.map((title) => (
                                    <button onClick={() => setValue("shopTaxAccount", title.title)} key={title.id} className="w-full text-start rounded-md px-2 py-1 my-2 hover:bg-blue-500 hover:text-white block text-sm text-gray-500">{title.title}</button>
                                ))}
                            </div>
                        </div>

                    </SelectOptionComponent>
                </div>

                <div className="mt-5 flex flex-col gap-5">
                    {/* expense amount */}
                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center'>
                        <label htmlFor="amount" className='text-red-500'>Amount*</label>
                        <input type="text" id='date' className="mr-16 rounded-md input input-sm input-bordered w-full max-w-sm " />
                    </div>

                    <div className='flex  flex-row justify-start items-start  gap-10 lg:gap-40 xl:gap-28'>
                        <label htmlFor="amount " >Amount Is</label>
                        <div className="flex items-center gap-2">
                            <input type="radio" name="radio-2" className="radio radio-xs radio-primary" />
                            <label htmlFor="amount" >Tax Inclusive</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" name="radio-2" className="radio radio-xs radio-primary" />
                            <label htmlFor="amount" >Tax Exclusive</label>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative'>
                        <label htmlFor="expense-account" className='text-red-500'>Paid Through*</label>
                        <SelectOptionComponent
                            selectPlaceholder={"Select an account"}
                            selectAccountObj={obj}
                            selectedTaxRate={selectedTaxRate}
                            // registerKey={"shopTaxAccount"}
                            setValue={setValue}
                        >
                            <div className="relative">

                                <div className="sticky top-3 bg-white ">
                                    <IoMdSearch className="absolute top-2 left-3" />
                                    <input type="text" placeholder="search" className="pl-10 tracking-wider rounded-md input input-sm input-bordered w-full max-w-sm" />

                                </div>
                                <div className="h-56 overflow-y-auto">
                                    <hr className="my-5" />
                                    <p className="text-sm font-semibold">{obj.title}</p>
                                    {obj?.subTitle.map((title, index) => (
                                        <button type="button" onClick={() => setValue("shopTaxAccount", title.title)} key={title.id} className="w-full text-start rounded-md px-2 py-1 my-2 hover:bg-blue-500 hover:text-white block text-sm text-gray-500">{title.title}</button>
                                    ))}

                                    <p className="text-sm font-semibold">{obj.title}</p>
                                    {obj?.subTitle.map((title) => (
                                        <button onClick={() => setValue("shopTaxAccount", title.title)} key={title.id} className="w-full text-start rounded-md px-2 py-1 my-2 hover:bg-blue-500 hover:text-white block text-sm text-gray-500">{title.title}</button>
                                    ))}
                                </div>
                            </div>
                        </SelectOptionComponent >
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative mt-8'>
                        <label htmlFor="expense-account">Tax</label>
                        <SelectOptionComponent
                            selectPlaceholder={"Select an account"}
                            selectAccountObj={obj}
                        />
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative mt-8'>
                        <label htmlFor="expense-account">Vendor</label>
                        <SelectOptionComponent
                            selectPlaceholder={"Select a vendor"}
                            selectAccountObj={obj}
                        />
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative mt-8'>
                        <label htmlFor="expense-account">Reference#</label>
                        <SelectOptionComponent
                            selectPlaceholder={"Select a vendor"}
                            selectAccountObj={obj}
                        />
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative mt-8'>
                        <label htmlFor="expense-account">notes</label>
                        <textarea className="textarea rounded-md  md:mr-16 textarea-sm textarea-bordered w-full max-w-sm" placeholder="Bio"></textarea>
                    </div>

                    <hr className="my-10" />

                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative mt-8'>
                        <label htmlFor="expense-account">Customer Name</label>
                        <SelectOptionComponent
                            selectPlaceholder={"Select a vendor"}
                            selectAccountObj={obj}
                        />
                    </div>

                </div>


            </form>
            <div className="fixed left-0  bottom-14 p-2 bg-base-200 w-full shadow-md">
                <div className="px-4 xl:px-28 flex gap-2">
                    <button onClick={handleSaveExpense} className="btn btn-sm btn-info rounded-md text-white text-xs">Save (Alt+S)</button>
                    <button className="btn btn-sm  rounded-md text-black text-xs">Save and New(Alt+N)</button>
                    <button className="btn btn-sm  rounded-md text-black text-xs">Cancel</button>
                </div>
            </div>


            {/* image container */}
            <div className='w-1/2 flex justify-center items-center'>
                <h1>hello</h1>
            </div>
        </div>
    )
}
