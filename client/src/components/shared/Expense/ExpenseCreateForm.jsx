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
import { useCustomerExpense } from "../../../hooks/expense/useCustomerExpense";


export const ExpenseCreateForm = () => {

    const [isDelete, setIsDelete] = useState(true)
    // const [imageDocs, setImageDoc] = useState(null)


    const { expenseAccountDataExpenseForm } = useExpenseAccount()
    const { taxRatesDataForExpenseForm } = useTaxRates()
    const { vendorData } = useVendor()
    const { paymentAccountDataForExpForm } = usePaymentAccount()
    const { createExpense, isPending } = useExpense()
    const { customerData } = useCustomerExpense()


    const { handleSubmit, watch, register, setValue } = useForm()

    // console.log(imageDocs);



    const onSubmit = (data) => {
        console.log(data)
        const formData = new FormData()
        formData.append("image_doc", data.image_doc[0])
        formData.append("date", data.date)
        formData.append("expenseAccount", data.expenseAccount)
        formData.append("expenseSubTitle", data.expenseSubTitle)
        formData.append("expenseAmount", Number(data.expenseAmount))
        formData.append("amountIs", data.amountIs)
        formData.append("paidThrough", data.paidThrough)
        formData.append("shopTaxAccount", data.shopTaxAccount)
        formData.append("taxRate", data.taxRate)
        formData.append("vendor", data.vendor)
        formData.append("referenceId", data.referenceId)
        formData.append("customer", data.customer)
        formData.append("notes", data.notes)



        const obj = Object.fromEntries(formData.entries())
        console.log(obj)
        createExpense(formData)
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



    const imageDoc = watch("image_doc") // File/Blob from react-hook-form
    const [preview, setPreview] = useState(null)

    console.log(preview);


    useEffect(() => {
        if (!imageDoc || imageDoc.length === 0) {
            setPreview(null)
            return
        }

        const file = imageDoc[0]

        if (!(file instanceof File || file instanceof Blob)) {
            console.warn("Not a File/Blob", file)
            setPreview(null)
            return
        }

        const url = URL.createObjectURL(file)
        setPreview(url)

        return () => URL.revokeObjectURL(url)
    }, [imageDoc])

    const handleSaveExpense = () => {
        handleSubmit(onSubmit)()
    }

    const expenseAccount = (
        filterDataArr(expenseAccountDataExpenseForm, expenseAccountSearch, "subTitle", "title", false)?.map((expense, index) => (
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

        filterDataArr(paymentAccountDataForExpForm, paymentAccountSearch, "accounts", "accountTitle", false)?.map((account, index) => (
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
        filterDataArr(taxRatesDataForExpenseForm?.taxRates, taxRateSearch, "", "taxCodeName", true)?.map(taxRate => (
            <button type="button" onClick={() => {
                setValue("taxRateDis", `${taxRate.taxCodeName} [${taxRate.rate}%]`)
                setValue("shopTaxAccount", taxRatesDataForExpenseForm._id)
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
                        <input type="number"  {...register("expenseAmount", { valueAsNumber: true })} placeholder="Enter expense amount" id='amount' className="mr-16 rounded-md input input-sm input-bordered w-full max-w-sm " />
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
                            config={{
                                deleteBtn: true,
                                setIsDelete: setIsDelete,
                                setValue: setValue,
                                valueName: "vendor",
                                displayRemove: "vendorDis",
                                addDisplay: "Select a vendor"
                            }}
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
                        <label htmlFor="expense-account">Customer</label>
                        <SelectOptionComponent
                            config={{
                                deleteBtn: true,
                                setValue: setValue,
                                valueName: "customer",
                                displayRemove: "customerDis",
                                addDisplay: "Select a customer"

                            }}
                            selectPlaceholder={"Select a customer"}
                            selectedCustomer={selectedCustomer}
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


            </form >
            <div className="fixed left-0 z-50  bottom-14 p-2 bg-base-200 w-full shadow-md">
                <div className="px-4 xl:px-28 flex gap-2">
                    <button onClick={handleSaveExpense} disabled={isPending} className="btn btn-sm btn-info rounded-md text-white text-xs">{isPending ? "Saving..." : "Save"}</button>
                    <button className="btn btn-sm  rounded-md text-black text-xs">Save and New</button>
                    <button className="btn btn-sm  rounded-md text-black text-xs">Cancel</button>
                </div>
            </div>


            {/* image container */}
            <div className='w-full mt-10 lg:mt-0 lg:w-1/2 flex justify-center items-center lg:items-start relative'>
                <div className="lg:fixed lg:top-1/2  card bg-base-100 w-72 shadow-sm border-4 border-dotted">
                    <div className="card-body p-4">
                        <h2 className="card-title justify-center text-sm">Drop your Image</h2>
                        <p className="text-xs text-center">Maximum file size allowed 3MB</p>
                        <input type="file" {...register("image_doc")} className="file-input file-input-sm file-input-primary" />
                    </div>
                </div>
            </div>
        </div >
    )
}
