import React, { useEffect, useMemo, useState } from 'react'
import { useCredit } from '../../../hooks/useCredit'
import { HiOutlineXMark } from 'react-icons/hi2'
import { removeBackgroundBlur } from "../../../redux/features/commonSlice"
import { removeCreditObjectId, openPaymentCreditbox } from "../../../redux/features/creditSlice"
import { useDispatch } from 'react-redux'


export const CreditPaymentBox = ({ isPendingPayment = false, customerName, customerPhoneNumber, customerInvoiceCreditId, customerCreditBookId, customerCreditAmt, customerCreditDoc_id }) => {
    const [creditPayData, setCreditPayData] = useState({
        creditBookId: "",
        paidAmount: 0,
        paymentMethod: "",
        bookDocId: "",
        singleCreditPay: false,
        creditInvoiceId: ""
    })
    const [openConfirmBox, setOpenConfirmBox] = useState(false)



    const isFormValid = useMemo(() => {
        return (
            creditPayData?.creditBookId.length >= 8 && creditPayData?.paidAmount !== "" && creditPayData?.paymentMethod !== ""
        )
    }, [creditPayData?.creditBookId, creditPayData?.paidAmount, creditPayData?.paymentMethod])





    const dispatch = useDispatch()

    const { creditDataForPay, payCredit, isPaycreditLoading, } = useCredit()

    const handleDialogBoxClose = () => {
        dispatch(removeBackgroundBlur(false))
        dispatch(removeCreditObjectId())
        dispatch(openPaymentCreditbox(false))
    }

    const handleopenConfirmBox = (id) => {
        setOpenConfirmBox(true)
        isPendingPayment ? setCreditPayData((prev) => ({ ...prev, bookDocId: customerCreditDoc_id, creditInvoiceId: customerInvoiceCreditId })) : setCreditPayData((prev) => ({ ...prev, bookDocId: id }))
    }

    const handleCloseConfirmBox = () => {
        setOpenConfirmBox(false)
    }

    const handleSubmit = () => {
        payCredit(creditPayData)
    }

    const round2 = (n) => {
        return Math.round((n + Number.EPSILON) * 100) / 100
    }

    useEffect(() => {

        if (isPendingPayment === false) return
        setCreditPayData((prev) => ({
            ...prev,
            paidAmount: customerCreditAmt,
            bookDocId: customerCreditDoc_id,
            creditBookId: customerCreditBookId,
            singleCreditPay: true
        }))


    },
        [isPendingPayment,])





    const confirmPaymentBox = (
        <div className='mt-5 w-full'>
            <p className='w-fit text-start text-[16px] my-3 text-red-500'>Are the book ID, paid amount, payment method correct below?</p>
            <p className='w-fit text-sm font-medium my-1 tracking-wider'>Customer credit ID : {creditPayData?.creditBookId || "0000000"}</p>
            <p className='w-fit text-sm font-medium my-1 tracking-wider'>payment amount : {creditPayData?.paidAmount || 0}</p>
            <p className='w-fit text-sm font-medium my-1 tracking-wider'>Payment method {creditPayData?.paymentMethod || ""}</p>


            <div className='w-full flex justify-end gap-3'>
                <button disabled={isPaycreditLoading} onClick={handleSubmit} className='w-32 h-10 bg-primary mt-5 rounded-md text-white  disabled:opacity-40'>{isPaycreditLoading ? "Paying..." : "Pay"}</button>
                <button onClick={handleCloseConfirmBox} className='w-32 h-10 bg-yellow-500 mt-5 rounded-md text-white  disabled:opacity-40'>Cancel</button>
            </div>
        </div>
    )

    const formInputData = (
        <form className='flex flex-col items-center justify-end mt-5 gap-3'>
            <input value={creditPayData?.creditBookId} readOnly={isPendingPayment} type="text" name='bookid' onChange={(e) => setCreditPayData((prev) => {
                const creditIdToUpperCase = e.target.value.toUpperCase()
                return { ...prev, creditBookId: creditIdToUpperCase }
            })}
                placeholder='Credit book ID' id='credit-amount' maxLength={10} className='uppercase h-10 w-full rounded-md bg-gray-100 p-2 tracking-wider' />

            <input value={isPendingPayment ? creditPayData?.paidAmount : null} readOnly={isPendingPayment} type="text" name='creditAmt' min={creditDataForPay?.minimumCreditAmount} onChange={(e) => setCreditPayData((prev) => ({ ...prev, paidAmount: Number(e.target.value) }))}
                placeholder={`Minimum credit pay : ${creditDataForPay?.minimumCreditAmount}`} className='h-10 w-full rounded-md bg-gray-100 p-2 tracking-wider' />

            <select value={creditPayData?.paymentMethod} onChange={(e) => setCreditPayData((prev) => ({ ...prev, paymentMethod: e.target.value }))} className=' h-10 w-full rounded-md bg-gray-100 p-2 tracking-wider'>
                <option value={""}>Select Payment</option>
                <option value={"cash"}>Cash</option>
                <option value={"internal-device"}>Card</option>
                <option value={"digital"}>Stripe</option>
            </select>

            <button type='button' onClick={() => handleopenConfirmBox(creditDataForPay?._id)} className='w-full h-10 bg-primary mt-5 rounded-md text-white  disabled:opacity-40' disabled={!isFormValid}>{"Pay"}</button>
        </form>
    )


    return (
        <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-10 py-5 rounded-lg shadow-lg z-[1000] min-w-[500px]  text-center bg-tertiary text-black">
            <div className='flex justify-end'>
                <button onClick={handleDialogBoxClose} className='p-2 bg-slate-100 rounded-full hover:bg-slate-200'>
                    <HiOutlineXMark />
                </button>
            </div>
            <h2 className='text-center my-2 font-medium'>Pay credit Amount</h2>
            <div className='w-full flex flex-col'>
                <p className='w-fit text-sm font-medium my-2 tracking-widest'>Credit book ID : {isPendingPayment ? customerCreditBookId : creditDataForPay?.creditBookId}</p>
                <p className='w-fit text-sm font-medium my-1 tracking-wider'>Customer Name : {isPendingPayment ? customerName : creditDataForPay?.customerName}</p>
                <p className='w-fit text-sm font-medium tracking-wider'>Customer Phone Number : {isPendingPayment ? customerPhoneNumber : creditDataForPay?.customerPhoneNumber}</p>
            </div>

            {isPendingPayment === true ? "" : <hr className='my-4 bg-primary' />}
            {isPendingPayment === false && <div className='w-full flex justify-between mt-2'>
                <div>
                    <p>Credit Amt</p>
                    <p className='font-medium tracking-wider'>{round2(creditDataForPay?.customertotalCredit)}</p>
                </div>
                <div>
                    <p>Advance Amt</p>
                    <p className='font-medium tracking-wider'>{round2(creditDataForPay?.advanceAmount)}</p>
                </div>
                <div>
                    <p>Customer pay</p>
                    <p className='font-medium tracking-wider'>{creditDataForPay?.customertotalCredit === 0 ? 0 : round2(Number(creditDataForPay?.customertotalCredit || 0)) - round2(Number(creditDataForPay?.advanceAmount || 0))}</p>
                </div>
            </div>}

            <hr className='my-4 bg-primary' />

            {openConfirmBox ? confirmPaymentBox : formInputData}
        </div>
    )
}
