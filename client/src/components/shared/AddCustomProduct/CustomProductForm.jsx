import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputComponent } from '../DaisyUiComponent/InputComponent'
import { SimpleSelectOption } from '../DaisyUiComponent/SimpleSelectOption'
import { IoMdArrowDropdown } from 'react-icons/io'
import { TextAreaComponent } from '../DaisyUiComponent/TextAreaComponent'

export const CustomProductForm = ({ control, setValue, salesAccountDis, purchaseAccountDis, register, accounts }) => {


    const unitTypes = [
        { id: 1, value: "", name: "Select unit" },
        { id: 2, value: "no", name: "no" },
        { id: 3, value: "kg", name: "kg" },
        { id: 4, value: "lt", name: "lt" },
        { id: 5, value: "m", name: "m" },
        { id: 6, value: "pcs", name: "pcs" },
    ]

    const handleSelectSellingAccount = (accountId, accountName) => {
        setValue("salesAccount", accountId)
        setValue("salesAccountDis", accountName)
    }
    const handleSelectPurchaseAccount = (accountId, accountName) => {
        setValue("purchaseAccount", accountId)
        setValue("purchaseAccountDis", accountName)
    }

    return (
        <div>
            <div >
                {/* type */}
                <div className='flex  flex-row justify-start items-start  gap-10 lg:gap-40 xl:gap-32'>
                    <label htmlFor="amountIs" >Type</label>
                    <div className="flex items-center gap-2">
                        <input type="radio" {...register("type")} name='type' id="taxInclusive" defaultChecked value={"GOODS"} className="radio radio-xs radio-primary" />
                        <label htmlFor="taxInclusive" >Goods</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" {...register("type")} name='type' value={"SERVICE"} id="taxInclusive" className="radio radio-xs radio-primary" />
                        <label htmlFor="taxExclusive" >Service</label>
                    </div>
                </div>
                {/* product name */}
                <div className='flex item-center justify-center mt-5 gap-2 w-1/2'>
                    <label className="label p-0 flex-block text-red-500">Name*</label>
                    <Controller name="productName" control={control} render={({ field }) => (
                        <InputComponent classNames={"input-sm"} field={field} regexVal={/\b\w/g} placeholder={"product Name"} />
                    )} />
                </div>

                <div className='flex item-center justify-center mt-10 gap-6 w-1/2'>
                    <label className="label p-0 flex-block">Unit</label>
                    <Controller name="unit" control={control} defaultValue={unitTypes} render={({ field }) => (
                        <SimpleSelectOption classNames={"select-sm"} data={unitTypes} field={field} />
                    )} />
                </div>
            </div>

            <div className='flex mt-5'>
                <div className='flex-1 pr-2'>
                    <div className='flex items-center justify-between p-1'>
                        <h4 className='font-medium'>Sales Information</h4>
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" disabled defaultChecked />
                    </div>

                    <div className='flex item-center justify-center mt-5 gap-4'>
                        <label className="label p-0 flex-block text-red-500 w-32"> Selling Price*</label>
                        <Controller name="sellingPrice" control={control} render={({ field }) => (
                            <InputComponent classNames={"input-sm"} field={field} regexVal={/\b\w/g} placeholder={"Selling price : 300"} />
                        )} />
                    </div>

                    <div className='flex item-center justify-center mt-5 gap-6'>
                        <label className="label p-0 flex-block w-28 text-red-500">Account*</label>
                        <div className={` dropdown w-full`} >
                            <div className="relative bg-white">
                                <div tabIndex={0} role="button" className="btn justify-between bg-transparent hover:bg-transparent btn-sm w-full input-bordered ">
                                    <p className={` text-md text-gray-800`}>{salesAccountDis ? salesAccountDis : "Select Account"}</p>
                                    <IoMdArrowDropdown />
                                </div>
                                <div
                                    tabIndex={-1}
                                    className="z-50 absolute dropdown-content card card-sm rounded-sm bg-base-100  w-full  shadow-md">
                                    <div className="card-body bg-white p-3  z-[1000]">
                                        {accounts?.salesAccount?.map((account) => (
                                            <button type="button" onClick={() => {
                                                handleSelectSellingAccount(account._id, account.name)
                                            }}
                                                key={account._id} className="w-full text-start rounded-md px-2 py-1 my-2 hover:bg-blue-500 hover:text-white block text-sm text-gray-700">{account.name}</button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='flex item-center justify-center mt-5 gap-6'>
                        <label className="label w-28 p-0">Description</label>
                        <Controller name="salesDescription" control={control} render={({ field }) => (
                            <TextAreaComponent field={field} regexVal={/\b\w/g} placeholder={"Optional"} />
                        )} />
                    </div>
                </div>



                <div className='flex-1 pl-2'>
                    <div className='flex items-center justify-between p-1'>
                        <h4 className='font-medium'>Purchase Information</h4>
                        <input type="checkbox" {...register("purchasable")} defaultChecked className="checkbox checkbox-primary checkbox-sm" />
                    </div>

                    <div className='flex item-center justify-center mt-5 gap-4'>
                        <label className="label p-0 flex-block text-red-500 w-32"> Cost Price*</label>
                        <Controller name="costPrice" control={control} render={({ field }) => (
                            <InputComponent classNames={"input-sm"} field={field} regexVal={/\b\w/g} placeholder={"Purchase price : 300"} />
                        )} />
                    </div>

                    <div className='flex item-center justify-center mt-5 gap-6'>
                        <label className="label p-0 flex-block w-28 text-red-500">Account*</label>
                        <div className={` dropdown w-full`} >
                            <div className="relative bg-white">
                                <div tabIndex={0} role="button" className="btn justify-between bg-transparent hover:bg-transparent btn-sm w-full input-bordered ">
                                    <p className={` text-md text-gray-800`}>{purchaseAccountDis ? purchaseAccountDis : "Select Account"}</p>
                                    <IoMdArrowDropdown />
                                </div>
                                <div
                                    tabIndex={-1}
                                    className="z-50 absolute dropdown-content card card-sm rounded-sm bg-base-100  w-full  shadow-md">
                                    <div className="card-body bg-white p-3  z-[1000]">
                                        {accounts?.purchaseAccount?.map((account) => (
                                            <button type="button" onClick={() => {
                                                handleSelectPurchaseAccount(account._id, account.name)
                                            }}
                                                key={account.taxId} className="w-full text-start rounded-md px-2 py-1 my-2 hover:bg-blue-500 hover:text-white block text-sm text-gray-700">{account.name} </button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='flex item-center justify-center mt-5 gap-6'>
                        <label className="label p-0 w-28">Description</label>
                        <Controller name="purchaseDescription" control={control} render={({ field }) => (
                            <TextAreaComponent field={field} regexVal={/\b\w/g} placeholder={"Optional"} />
                        )} />
                    </div>
                </div>

            </div>
        </div>
    )
}
