import React, { useState } from 'react'
import { useExpense } from '../../../hooks/expense/useExpense'
import { useSelector } from 'react-redux'
import { ExpenseImageFullView } from './ExpenseImageFullView'
import { removeBackgroundBlur, addBackgroundBlur } from "../../../redux/features/commonSlice"
import { setExpensePrintData } from "../../../redux/features/expenseSlice"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { IoPrintOutline } from "react-icons/io5";
import { MdDownload } from "react-icons/md";

export const ExpenseSingle = () => {

    const [imageQuery, setImageQuery] = useState(null)
    const [imageView, setImageView] = useState(false)
    const [preview, setPreview] = useState(null)
    console.log(preview);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { handleSubmit, register, watch } = useForm()

    const imageDoc = watch("image_doc")

    const { expenseSingleData, expenseImageData, fetchImageLoading, uploadImage, getExpensePdf, uploadImageLoading, expenseSingleDataRefresh, imageUploadSuccess, expenseSingleDataLoading } = useExpense(null, imageQuery)

    const currecnyCode = useSelector((state) => state?.auth?.shopData?.currencyCode)

    const admin = useSelector(state => state.auth.adminData)

    const handleViewImage = (publicId) => {
        setImageQuery(publicId)

    }

    const handleDownloadExpensePdf = () => {

        const formattedDate = new Date(expenseSingleData?.createdDate)
            .toISOString()
            .split("T")[0];

        const payload = {
            expenseDocId: expenseSingleData?.expenseId,
            expenseFileTitle: expenseSingleData?.expenseSubTitle,
            expenseFileDate: formattedDate

        }

        getExpensePdf(payload)
    }

    const handleClickPrint = () => {
        navigate(admin ? "/admin/expense/print" : "/staff/expense/print")
        const { totalAmount, createdAt, billable, expenseSubTitle, paidThrough, taxCode, taxRate, taxAmount, amountIs, vendor, notes } = expenseSingleData
        const payload = {
            totalAmount: totalAmount,
            createdDate: createdAt,
            billable: billable,
            expenseSubTitle: expenseSubTitle,
            paidThrough: paidThrough?.accountTitle,
            taxCode: taxCode,
            taxRate: taxRate,
            taxAmount: taxAmount,
            amountIs: amountIs,
            vendor: vendor?.vendorName,
            notes: notes,
            currecnyCode: currecnyCode
        }

        dispatch(setExpensePrintData(payload))

    }

    const onsubmit = (data) => {
        const formData = new FormData()
        formData.append("image_doc", data.image_doc[0])
        uploadImage(formData)


    }

    const handleSaveExpense = () => {
        handleSubmit(onsubmit)()
    }

    const handleRemoveImage = () => {
        setPreview(null)
    }

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

    useEffect(() => {
        if (!imageUploadSuccess) return
        setPreview(null)
    }, [imageUploadSuccess])

    const imageuploader = (
        <form className='border-4 border-dotted  rounded-md'>
            <div className=" card bg-base-100 w-72 shadow-sm ">
                <div className="card-body p-4">
                    <h2 className="card-title justify-center text-sm">Drop your Image</h2>
                    <p className="text-xs text-center">Maximum file size allowed 3MB</p>
                    <input type="file" {...register("image_doc")} className="file-input file-input-sm file-input-primary" />
                </div>
            </div>
            {/* <button disabled={uploadImageLoading === true} className='btn btn-primary btn-sm mt-2 w-full'>{uploadImageLoading ? "Uploading..." : "Upload"}</button> */}
        </form>
    )

    const viewButton = (
        <button onClick={() => handleViewImage(expenseSingleData?.image?.publicId)} className="btn btn-primary">View Image</button>
    )

    const handleImageView = (imageUrl) => {
        setImageView(true)
        dispatch(addBackgroundBlur(true))
    }

    return (
        <>
            {imageView ? <ExpenseImageFullView imageUrl={expenseImageData} setImageView={setImageView} /> :
                <div>

                    {expenseSingleDataLoading ? <div className='flex justify-center items-center h-screen'>
                        <p>Loading...</p>
                    </div> :
                        <div className='px-2 lg:px-28 pt-2 pb-1 relative'>

                            <div>
                                <div className='flex gap-2 justify-end'>
                                    <button onClick={handleClickPrint} className='btn btn-outline btn-sm flex justify-center items-center gap-1'>
                                        <IoPrintOutline />
                                        Print
                                    </button>
                                    <button onClick={handleDownloadExpensePdf} className='btn btn-outline btn-sm flex justify-center items-center gap-1'>
                                        <MdDownload />
                                        Download pdf
                                    </button>
                                </div>
                                {/* two portion */}
                                <div className=' flex flex-col md:flex-row gap-1 px-4 xl:px-24 pt-10 pb-5'>
                                    <div className=' w-full xl:w-1/2 p-1 flex flex-col gap-2'>
                                        <div className='w-fit'>
                                            <p className='text-gray-500 font-medium mb-1'>Expense Amount</p>
                                            <p className='text-lg font-normal text-red-600 inline my-1'>
                                                <span className='text-gray-500 '>{currecnyCode}</span>
                                                <span className='text-2xl'> {expenseSingleData?.totalAmount.toFixed(2)}</span>
                                                <span className='text-gray-500 my-1 text-xs ml-1 font-medium'>on {new Date(expenseSingleData?.createdDate).toLocaleDateString()}</span>
                                            </p>
                                            <p className='text-sm font-medium mt-2 text-green-600'>{expenseSingleData?.billable ? "BILLABLE" : "NON-BILLABLE"}</p>
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
                                            <p className='text-sm mt-1 font-medium'>{currecnyCode} {expenseSingleData?.taxAmount.toFixed(2)} ( {expenseSingleData?.amountIs} )</p>
                                        </div>

                                        <div className='mt-5'>
                                            <p className='text-gray-500 font-medium text-sm'>Paid To</p>
                                            <p className='text-sm mt-1 font-medium text-blue-500 tracking-wider'>{expenseSingleData?.vendor?.vendorName}</p>
                                        </div>

                                        <div className='mt-1'>
                                            <p className='text-gray-500 font-medium text-sm'>{expenseSingleData?.notes}</p>

                                        </div>

                                    </div>

                                    <div className='w-full mt-10 lg:mt-0 lg:w-1/2 flex justify-center items-center lg:items-center '>
                                        {preview ?
                                            <div className="  w-96 h-64 max-h-[400px] object-cover  overflow-hidden rounded-md relative">
                                                <button disabled={uploadImageLoading === true} onClick={handleSaveExpense} className="btn btn-primary absolute top-2 right-24 z-10 btn-sm rounded">
                                                    {uploadImageLoading ? "Uploading..." : "Upload"}
                                                </button>
                                                <button onClick={handleRemoveImage} className="absolute top-2 right-10 z-10 bg-white px-2 py-1 rounded">
                                                    Clear
                                                </button>

                                                <img
                                                    className="w-full  h-full object-contain"
                                                    src={preview}
                                                    alt="image"
                                                />
                                            </div>
                                            :

                                            <div div className=' w-full xl:w-1/2 p-1 flex flex-col gap-5 items-center justify-center'>

                                                {!expenseSingleData?.image?.publicId ? imageuploader : null}
                                                {!fetchImageLoading && expenseSingleData?.image?.publicId && !imageQuery ? viewButton : null}

                                                {!fetchImageLoading && expenseImageData ? <div className='relative w-full'>
                                                    <button className='absolute bg-white right-2 top-2 p-2 rounded-md' onClick={handleImageView}>View</button>
                                                    <img className='rounded-md w-full' src={expenseImageData} alt={expenseSingleData?.accountTitle} />
                                                </div> : null}
                                            </div>
                                        }
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
                                                        <td >{expenseSingleData?.baseAmount.toFixed(2)}</td>
                                                        <td className='tracking-wider text-end'>0.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{expenseSingleData?.paidThrough?.accountTitle}</td>
                                                        <td >0.00</td>
                                                        <td className='tracking-wider text-end'>{expenseSingleData?.totalAmount.toFixed(2)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Input Tax</td>
                                                        <td >{expenseSingleData?.taxAmount.toFixed(2)}</td>
                                                        <td className='tracking-wider text-end'>0.00</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colSpan={1} ></td>
                                                        <td colSpan={1} className='font-bold text-gray-800'>{expenseSingleData?.totalAmount.toFixed(2)}</td>
                                                        <td colSpan={1} className='text-end font-bold text-gray-800'>{expenseSingleData?.totalAmount.toFixed(2)}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {expenseSingleDataRefresh && !expenseSingleDataLoading ? <p className='text-xs text-gray-400'>Refreshing...</p> : null}
                        </div >}
                </div>}
        </>
    )
}
