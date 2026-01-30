import { FaCalendarAlt } from "react-icons/fa";
import { SelectOptionComponent } from "../DaisyUiComponent/SelectOptionComponent";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { IoMdSearch } from "react-icons/io";
import { useExpenseAccount } from "../../../hooks/expense/useExpenseAccount";
import { useTaxRates } from "../../../hooks/useTaxRates";
import { useVendor } from "../../../hooks/useVendor";
import { usePaymentAccount } from "../../../hooks/usePaymentAccount";
import { filterDataArr } from "../../../utils/filterDataArr";
import { useExpense } from "../../../hooks/expense/useExpense";


export const ExpenseCreateForm = () => {

    // const [filteredData, setFilteredData] = useState([])

    const { expenseAccountData } = useExpenseAccount()
    const { taxRatesData } = useTaxRates()
    const { vendorData } = useVendor()
    const { paymentAccountData } = usePaymentAccount()
    const { createExpense, customerData } = useExpense()


    const { handleSubmit, watch, register, setValue } = useForm({
        defaultValues: {
            expenseAmount: 0
        }
    })




    const onSubmit = (data) => {
        createExpense(data)
    }

    const selectedExpenseAccount = watch("expenseTitleDis")
    const selectedTaxRate = watch("taxRateDis")
    const selectedVendor = watch("vendorDis")
    const selectPaidThrough = watch("paidThroughDis")
    const selectedCustomer = watch("customerDis")

    const expenseAccountSearch = watch("searchExpenseAcc")
    const paymentAccountSearch = watch("searchPaymentAcc")
    const taxRateSearch = watch("searchTaxRates")
    const vendorNameSearch = watch("searchVendor")
    const customerNameSearch = watch("searchcustomer")


    const handleSaveExpense = () => {
        handleSubmit(onSubmit)()
    }


    const expenseAccount = (
        filterDataArr(expenseAccountData, expenseAccountSearch, "subTitle", "title", false)?.map((expense, index) => (
            <div key={expense?._id}>
                <p className="text-sm font-semibold" >{expense.expenseTitle}</p>
                {expense?.subTitle.map((title) => (
                    <button type="button" key={title?._id}
                        onClick={() => {
                            setValue("expenseAccount", expense._id)
                            setValue("expenseSubTitle", title._id)
                            setValue("expenseTitleDis", title.title)
                        }}

                        className="w-full text-start rounded-md px-2 py-1 my-2 hover:bg-blue-500 hover:text-white block text-sm text-gray-500">
                        {title.title}
                    </button>
                ))}
            </div>
        ))
    )

    const paymentAccount = (

        filterDataArr(paymentAccountData, paymentAccountSearch, "accounts", "accountTitle", false)?.map((account, index) => (
            <div key={account?._id}>
                <p className="text-sm font-semibold" >{account._id}</p>
                {account.accounts.map((account) => (
                    <button type="button" key={account?._id}
                        onClick={() => {
                            setValue("paidThrough", account._id)
                            setValue("paidThroughDis", account.accountTitle)
                        }}

                        className="w-full text-start rounded-md px-2 py-1 my-2 hover:bg-blue-500 hover:text-white block text-sm text-gray-500">
                        {account.accountTitle}
                    </button>
                ))}
            </div>
        ))
    )

    const taxRates = (
        filterDataArr(taxRatesData?.taxRates, taxRateSearch, "", "taxCodeName", true)?.map(taxRate => (
            <button type="button" onClick={() => {
                setValue("taxRateDis", `${taxRate.taxCodeName} [${taxRate.rate}%]`)
                setValue("shopTaxAccount", taxRatesData._id)
                setValue("taxRate", taxRate.taxId)
            }}
                key={taxRate.taxId} className="w-full text-start rounded-md px-2 py-1 my-2 hover:bg-blue-500 hover:text-white block text-sm text-gray-700">{taxRate.taxCodeName} [{taxRate.rate}%] </button>
        ))
    )

    const vendors = (
        filterDataArr(vendorData, vendorNameSearch, "", "vendorName", true)?.map((vendor) => (
            <div key={vendor._id} role="button" className="flex px-2 rounded-md items-center gap-5 hover:bg-blue-500 hover:text-white" onClick={() => {
                setValue("vendor", vendor._id)
                setValue("vendorDis", vendor.vendorName)

            }}>

                <div className="w-12 h-12 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                    <span className="text-sm">{vendor?.char}</span>
                </div>

                <p>{vendor?.vendorName}</p>
            </div>
        ))
    )

    const customer = (
        filterDataArr(customerData, customerNameSearch, "", "customerName", true)?.map((customer) => (
            <div key={customer._id} role="button" className="flex px-2 rounded-md items-center gap-5 hover:bg-blue-500 hover:text-white" onClick={() => {
                setValue("customer", customer._id)
                setValue("customerDis", customer.customerName)

            }}>
                <p>{customer?.customerName}</p>
            </div>
        ))
    )

    return (
        <div className='flex flex-col md:flex-row gap-1 px-4 xl:px-24 pt-16 pb-20 relative'>
            {/* form container */}

            <form className='relative w-full xl:w-1/2 p-1 flex flex-col gap-5'>

                {/* Date Input */}
                <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center '>
                    <label htmlFor="date" className='text-red-500'>Date*</label>
                    <div className="relative  w-full max-w-sm md:mr-16">
                        <input type="date" {...register("date", { valueAsDate: true })} id='date' className=" z-50 rounded-md input input-sm input-bordered w-full max-w-sm" />
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
                        selectedExpenseAccount={selectedExpenseAccount}

                    >
                        <div className="relative">
                            <div className="sticky top-3 bg-white ">
                                <IoMdSearch className="absolute top-2 left-3" />
                                <input type="text" {...register("searchExpenseAcc")} placeholder="search" className="pl-10 tracking-wider rounded-md input input-sm input-bordered w-full max-w-sm" />
                            </div>
                            <div className="h-56 overflow-y-auto">
                                <hr className="my-5" />
                                {expenseAccount}
                            </div>
                        </div>

                    </SelectOptionComponent>
                </div>

                <div className="mt-5 flex flex-col gap-5">
                    {/* expense amount */}
                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center'>
                        <label htmlFor="amount" className='text-red-500'>Amount*</label>
                        <input type="number"  {...register("expenseAmount", { valueAsNumber: true })} min={0} id='amount' className="mr-16 rounded-md input input-sm input-bordered w-full max-w-sm " />
                    </div>

                    <div className='flex  flex-row justify-start items-start  gap-10 lg:gap-40 xl:gap-32'>
                        <label htmlFor="amountIs" >Amount Is</label>
                        <div className="flex items-center gap-2">
                            <input type="radio"  {...register("amountIs")} id="taxInclusive" value={"inclusive"} className="radio radio-xs radio-primary" />
                            <label htmlFor="taxInclusive" >Tax Inclusive</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" {...register("amountIs")} value={"exclusive"} id="taxExclusive" className="radio radio-xs radio-primary" />
                            <label htmlFor="taxExclusive" >Tax Exclusive</label>
                        </div>

                    </div>
                </div>

                <div className="mt-10">
                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative'>
                        <label htmlFor="paid-through" className='text-red-500'>Paid Through*</label>
                        <SelectOptionComponent
                            selectPlaceholder={"Select an account"}
                            selectPaidThrough={selectPaidThrough}
                        >
                            <div className="relative">

                                <div className="sticky top-3 bg-white ">
                                    <IoMdSearch className="absolute top-2 left-3" />
                                    <input type="text" {...register("searchPaymentAcc")} placeholder="search" className="pl-10 tracking-wider rounded-md input input-sm input-bordered w-full max-w-sm" />

                                </div>
                                <div className="h-56 overflow-y-auto">
                                    <hr className="my-5" />
                                    {paymentAccount}

                                </div>
                            </div>
                        </SelectOptionComponent >
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative mt-8'>
                        <label htmlFor="tax">Tax</label>
                        <SelectOptionComponent
                            selectPlaceholder={"Select an account"}
                            selectedTaxRate={selectedTaxRate}
                        >
                            <div className="relative">

                                <div className="sticky top-3 bg-white ">
                                    <IoMdSearch className="absolute top-2 left-3" />
                                    <input type="text" {...register("searchTaxRates")} placeholder="search" className="pl-10 tracking-wider rounded-md input input-sm input-bordered w-full max-w-sm" />

                                </div>
                                <div className="h-56 overflow-y-auto">
                                    <hr className="my-5" />
                                    <p className="text-sm font-semibold">Tax</p>
                                    {taxRates}
                                </div>
                            </div>
                        </SelectOptionComponent>
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative mt-8'>
                        <label htmlFor="vendor">Vendor</label>
                        <SelectOptionComponent
                            selectPlaceholder={"Select a vendor"}
                            selectedVendor={selectedVendor}
                        >
                            <div className="relative">

                                <div className="sticky top-3 bg-white ">
                                    <IoMdSearch className="absolute top-2 left-3" />
                                    <input type="text" {...register("searchVendor")} placeholder="search" className="pl-10 tracking-wider rounded-md input input-sm input-bordered w-full max-w-sm" />

                                </div>
                                <div className="h-56 overflow-y-auto">
                                    <hr className="my-5" />
                                    <div className="flex flex-col gap-3">
                                        {vendors}
                                    </div>
                                </div>
                            </div>
                        </SelectOptionComponent>
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative mt-8'>
                        <label htmlFor="referenceId">Reference#</label>
                        <input type="text" {...register("referenceId")} id='referenceId' className="mr-16 rounded-md input input-sm input-bordered w-full max-w-sm " />
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative mt-8'>
                        <label htmlFor="notes">notes</label>
                        <textarea {...register("notes")} id="notes" className="textarea rounded-md  md:mr-16 textarea-sm textarea-bordered w-full max-w-sm" placeholder="notes"></textarea>
                    </div>

                    <hr className="my-10" />

                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative mt-3'>
                        <label htmlFor="expense-account">Customer Name</label>
                        <SelectOptionComponent
                            selectPlaceholder={"Select a customer"}
                            selectedVendor={selectedCustomer}
                            isTop={true}
                        >
                            <div className="relative">

                                <div className="sticky top-3 bg-white ">
                                    <IoMdSearch className="absolute top-2 left-3" />
                                    <input type="text" {...register("searchcustomer")} placeholder="search" className="pl-10 tracking-wider rounded-md input input-sm input-bordered w-full max-w-sm" />

                                </div>
                                <div className="h-56 overflow-y-auto">
                                    <hr className="my-5" />
                                    <div className="flex flex-col gap-3">
                                        {customer}
                                    </div>
                                </div>
                            </div>
                        </SelectOptionComponent>
                    </div>

                </div>


            </form>
            <div className="fixed left-0 z-50  bottom-14 p-2 bg-base-200 w-full shadow-md">
                <div className="px-4 xl:px-28 flex gap-2">
                    <button onClick={handleSaveExpense} className="btn btn-sm btn-info rounded-md text-white text-xs">Save</button>
                    <button className="btn btn-sm  rounded-md text-black text-xs">Save and New</button>
                    <button className="btn btn-sm  rounded-md text-black text-xs">Cancel</button>
                </div>
            </div>


            {/* image container */}
            <div className='w-1/2 flex justify-center items-start relative'>
                <div className="fixed top-1/2  card bg-base-100 w-60 shadow-sm border-4 border-dotted">
                    <div className="card-body p-4">
                        <h2 className="card-title justify-center text-sm">Drop your Image</h2>
                        <p className="text-xs text-center">Maximum file size allowed 10MB</p>
                        <input type="file" className="file-input file-input-sm file-input-primary" />
                    </div>
                </div>
            </div>
        </div>
    )
}
