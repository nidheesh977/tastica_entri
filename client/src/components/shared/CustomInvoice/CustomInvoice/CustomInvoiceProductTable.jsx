import React from 'react'
import { TextAreaComponent } from '../../DaisyUiComponent/TextAreaComponent'
import { Controller } from 'react-hook-form'
import { InputComponent } from '../../DaisyUiComponent/InputComponent'

export const CustomInvoiceProductTable = ({ control, rows, handleAddNewRow }) => {
    return (
        <>
            <div className='bg-gray-200 p-2 max-w-5xl'>
                <p className='font-medium'>Item Table</p>
            </div>
            <div className="overflow-x-auto max-w-5xl">
                <table className="table table-fixed w-full border">
                    {/* head */}
                    <thead>
                        <tr className='border'>
                            <th colSpan={3}>ITEM DETAILS</th>
                            <th colSpan={1}>QUANTITY</th>
                            <th>RATE</th>
                            <th>DISCOUNT</th>
                            <th>TAX</th>
                            <th>AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {rows.map((row, index) => (
                            <tr key={row.id} className='border'>

                                <td colSpan={3} className='border'>
                                    <Controller name="invoiceNumber" control={control} render={({ field }) => (
                                        <InputComponent classNames={"input-sm"} field={field} regexVal={/\b\w/g} placeholder={"Add new item"} />
                                    )} />
                                    {row.item ? <Controller name="address" control={control} render={({ field }) => (
                                        <TextAreaComponent classNames={"h-2"} field={field} regexVal={/\b\w/g} placeholder={"Enter description"} />
                                    )} /> : null}
                                </td>
                                <td colSpan={1} className='border'>{row.quantity.toFixed(2)}</td>
                                <td className='border'>{row.rate.toFixed(2)}</td>
                                <td className='border'>{row.discount.toFixed(2)}</td>
                                <td className='border'>{row.tax}</td>
                                <td className='font-medium border'>{row.amount}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>

            <div className='w-full flex justify-start'>
                <div className='w-1/2 flex justify-between flex-col items-start pr-10'>
                    <button onClick={handleAddNewRow} className='mt-5 btn btn-sm btn-primary'>Add new row</button>
                    <div className='w-full'>
                        <label className="label mt-2">Customer Notes</label>
                        <Controller name="address" control={control} render={({ field }) => (
                            <TextAreaComponent classNames={""} field={field} regexVal={/\b\w/g} placeholder={"Enter description"} />
                        )} />
                    </div>
                </div>
                <div className='w-96'>
                    <div className='mt-5 bg-slate-100 p-2 rounded-md'>
                        {/* subtotal */}
                        <div className='flex justify-between'>
                            <p className='text-sm font-medium'>Sub total</p>
                            <p className='text-xs font-medium'>0.00</p>
                        </div>
                        <div className='flex justify-between items-center mt-5'>
                            <div className='flex items-center gap-5'>
                                <p className='text-xs font-normal'>Shipping charges</p>
                                <Controller name="invoiceNumber" control={control} render={({ field }) => (
                                    <InputComponent classNames={"input-sm w-[100px]"} field={field} regexVal={/\b\w/g} placeholder={""} />
                                )} />
                            </div>
                            <p className='text-xs font-medium'>0.00</p>
                        </div>

                        <hr className='my-2' />

                        <div className='flex justify-between'>
                            <p className='text-xs font-medium'>ON HST [13%]</p>
                            <p className='text-xs font-medium'>0.00</p>
                        </div>
                        <div className='flex justify-between mt-5'>
                            <p className='text-xs font-medium'>Zero Rate [0%]</p>
                            <p className='text-xs font-medium'>0.00</p>
                        </div>

                        <div className='flex justify-between items-center mt-5'>
                            <div className='flex items-center gap-10'>
                                <p className='text-xs font-normal mr-2'> Adjustment</p>
                                <Controller name="invoiceNumber" control={control} render={({ field }) => (
                                    <InputComponent classNames={"input-sm w-[100px]"} field={field} regexVal={/\b\w/g} placeholder={""} />
                                )} />
                            </div>
                            <p className='text-xs font-medium'>0.00</p>
                        </div>


                        <div className='flex justify-between mt-5'>
                            <p className='text-xs font-medium'>Round Off</p>
                            <p className='text-xs font-medium'>0.00</p>
                        </div>

                        <hr className='my-5' />

                        <div className='flex justify-between mt-5'>
                            <p className='text-sm font-medium'>Total</p>
                            <p className='text-sm font-medium'>0.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
