import React, { useState } from 'react'
import { useExpense } from '../../../hooks/expense/useExpense'
import { useSelector } from 'react-redux'
import { ExpenseImageFullView } from './ExpenseImageFullView'
import { removeBackgroundBlur, addBackgroundBlur } from "../../../redux/features/commonSlice"
import { useDispatch } from 'react-redux';

export const ExpenseSingle = () => {

    const [imageQuery, setImageQuery] = useState(null)
    const [imageView, setImageView] = useState(false)
    console.log(imageQuery);

    const dispatch = useDispatch()


    const { expenseSingleData, expenseImageData } = useExpense(null, imageQuery)

    const currecnyCode = useSelector((state) => state?.auth?.shopData?.currencyCode)

    const handleViewImage = (publicId) => {
        setImageQuery(publicId)

    }

    const imageuploader = (
        <div className=" card bg-base-100 w-72 shadow-sm border-4 border-dotted">
            <div className="card-body p-4">
                <h2 className="card-title justify-center text-sm">Drop your Image</h2>
                <p className="text-xs text-center">Maximum file size allowed 3MB</p>
                <input type="file" className="file-input file-input-sm file-input-primary" />
            </div>
        </div>
    )

    const viewButton = (
        <button onClick={() => handleViewImage(expenseSingleData?.cloudinary?.publicId)} className="btn btn-primary">View Image</button>
    )

    const handleImageView = (imageUrl) => {
        setImageView(true)
        dispatch(addBackgroundBlur(true))
    }

    return (
        <>
            {imageView ? <ExpenseImageFullView imageUrl={expenseImageData} setImageView={setImageView} /> : <div className='px-28 pt-2 pb-1 relative'>

                <div>
                    {/* two portion */}
                    <div className='flex flex-col md:flex-row gap-1 px-4 xl:px-24 pt-10 pb-5'>
                        <div className=' w-full xl:w-1/2 p-1 flex flex-col gap-2'>
                            <div className='w-fit'>
                                <p className='text-gray-500 font-medium mb-1'>Expense Amount</p>
                                <p className='text-lg font-normal text-red-600 inline my-1'>
                                    <span className='text-gray-500 mr-1'>{currecnyCode}</span>
                                    {expenseSingleData?.expenseAmount}
                                </p>
                                <span className='text-gray-500 my-1 text-xs ml-1 font-medium'>on {new Date(expenseSingleData?.createdDate).toLocaleDateString()}</span>
                                <p className='text-sm font-medium  text-green-600'>{expenseSingleData?.billable ? "BILLABLE" : "NON-BILLABLE"}</p>
                            </div>

                            <div>
                                <div className="badge tracking-wider font-normal text-[#474747] bg-[#aadee0] p-3 rounded-sm">{expenseSingleData?.expenseSubTitle}</div>
                            </div>

                            <div className='mt-10'>
                                <p className='text-gray-500 font-medium text-sm'>Paid Through</p>
                                <p className='mt-1 text-sm font-medium'>{expenseSingleData?.paidThrough?.accountTitle}</p>
                            </div>

                            <div className='mt-5'>
                                <p className='text-gray-500 font-medium text-sm'>Tax</p>
                                <p className='text-sm mt-1 font-medium'>{expenseSingleData?.taxCode} [ {expenseSingleData?.taxRate}% ]</p>
                            </div>

                            <div className='mt-5'>
                                <p className='text-gray-500 font-medium text-sm'>Tax Amount</p>
                                <p className='text-sm mt-1 font-medium'>{currecnyCode} {expenseSingleData?.taxAmount} ( {expenseSingleData?.amountIs} )</p>
                            </div>

                            <div className='mt-5'>
                                <p className='text-gray-500 font-medium text-sm'>Paid To</p>
                                <p className='text-sm mt-1 font-medium text-blue-500 tracking-wider'>{expenseSingleData?.vendor?.vendorName}</p>
                            </div>

                            <div className='mt-1'>
                                <p className='text-gray-500 font-medium text-sm'>{expenseSingleData?.notes}</p>

                            </div>

                        </div>
                        <div className=' w-full xl:w-1/2 p-1 flex flex-col gap-5 items-center justify-center'>

                            {!expenseSingleData?.cloudinary?.publicId ? imageuploader : null}
                            {expenseSingleData?.cloudinary?.publicId && !imageQuery ? viewButton : null}

                            {expenseImageData ? <div className='relative'>
                                <button className='absolute bg-white right-2 top-2 p-2 rounded-md' onClick={handleImageView}>View</button>
                                <img className='rounded-md' src={expenseImageData} alt={expenseSingleData?.accountTitle} />
                            </div> : null}
                        </div>
                    </div>
                    <div className='px-4 xl:px-24'>
                        <p className='ml-3 font-medium border-b-2 pb-1 border-b-blue-600 w-fit'>Journal</p>
                        <div className="divider mt-0"></div>

                        <p className='text-sm text-gray-500 font-medium'>Amount is displayed in your base currency
                            <span className="badge badge-success rounded-sm ml-1 tracking-wider text-white">{currecnyCode}</span>
                        </p>

                        <p className='mt-5 font-semibold'>Expense</p>

                        <div>
                            <div className="overflow-x-auto mt-5">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>

                                            <th>Account</th>
                                            <th >Debit</th>
                                            <th className='text-end'>Credit</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        <tr >
                                            <td>{expenseSingleData?.expenseSubTitle}</td>
                                            <td >{expenseSingleData?.baseAmount}</td>
                                            <td className='tracking-wider text-end'>0.00</td>
                                        </tr>
                                        <tr>
                                            <td>{expenseSingleData?.paidThrough?.accountTitle}</td>
                                            <td >0.00</td>
                                            <td className='tracking-wider text-end'>{expenseSingleData?.totalAmount}</td>
                                        </tr>
                                        <tr>
                                            <td>Input Tax</td>
                                            <td >{expenseSingleData?.taxAmount}</td>
                                            <td className='tracking-wider text-end'>0.00</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={1} ></td>
                                            <td colSpan={1} className='font-bold text-gray-800'>{expenseSingleData?.totalAmount}</td>
                                            <td colSpan={1} className='text-end font-bold text-gray-800'>{expenseSingleData?.totalAmount}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div >}
        </>
    )
}
