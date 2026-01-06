import React, { useState } from 'react'
import { CreditAddBox } from './CreditAdd'
import { HiOutlineXMark } from "react-icons/hi2";
import { CreditRegister } from './CreditRegister';
import { removeBackgroundBlur } from "../../../redux/features/commonSlice"
import { useDispatch } from 'react-redux';

export const CreditDialogBox = ({ invoiceData, setShowCreditDialog, resetBillingState }) => {

    const [isNormalCustomer, SetIsNormalCustomer] = useState(false)
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false)

    const dispatch = useDispatch()

    const handleDialogBoxClose = () => {
        setShowCreditDialog(false)
        dispatch(removeBackgroundBlur(false))
    }



    return (
        <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg shadow-lg z-[1000] min-w-[500px]  text-center bg-tertiary text-black">
            <div className='flex justify-end'>
                <button onClick={handleDialogBoxClose} className='p-2 bg-slate-100 rounded-full hover:bg-slate-200'>
                    <HiOutlineXMark />
                </button>
            </div>
            {openRegisterDialog === true ? (<CreditRegister
                invoiceId={invoiceData?._id}
                title={"Register Credit"}
                customerData={invoiceData?.customer}
                setOpenRegisterDialog={setOpenRegisterDialog} />)
                :
                (<CreditAddBox setOpenRegisterDialog={setOpenRegisterDialog}
                    invoiceNumber={invoiceData?.invoiceNumber}
                    totalAmount={invoiceData?.totalAmount}
                    setShowCreditDialog={setShowCreditDialog}
                    invoiceId={invoiceData?._id}
                    resetBillingState={resetBillingState}
                    title={"Add Credit"}

                />)}
        </div>
    )
}
