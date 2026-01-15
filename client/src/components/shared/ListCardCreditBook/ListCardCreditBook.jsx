import React, { useState } from 'react'
import { useCredit } from '../../../hooks/useCredit'
import { useDispatch, useSelector } from "react-redux";
import { addCreditObjectId, openPaymentCreditbox } from "../../../redux/features/creditSlice"
import { CreditPaymentBox } from '../CreditDialogbox/CreditPaymentBox';
import { addBackgroundBlur } from "../../../redux/features/commonSlice"
import { Link } from 'react-router-dom';
import { usePermissionCheck } from '../../../hooks/usePermissionCheck';
import { FaTrash } from "react-icons/fa";


export const ListCardCreditBook = () => {

    const dispatch = useDispatch()
    const { creditData, isCreditDataPending, advanceAmtClear } = useCredit()
    const { hasPermission } = usePermissionCheck()
    const { PaymentCreditBoxOpen } = useSelector((state) => state.credit)
    const admin = useSelector((state) => state.auth?.adminData)




    const handlePayCredit = (id) => {
        dispatch(addCreditObjectId(id))
        dispatch(openPaymentCreditbox(true))
        dispatch(addBackgroundBlur(true))
    }

    const handleAdvanceClear = (id) => {
        advanceAmtClear(id)
    }

    const round2 = (n) => {
        return Math.round((n + Number.EPSILON) * 100) / 100
    }

    const creditDatas = creditData?.map((credit, index) => {

        const isCredittotalAboveZero = credit?.customertotalCredit === 0 ? true : false

        return (
            <tr key={credit?._id} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">{index + 1}</td>
                <td className="border border-primary px-4 py-2">{credit?.customerName}</td>
                <td className="border border-primary px-4 py-2 hover:text-primary"><Link to={admin ? `/admin/credit/book/data/${credit?._id}` : `/staff/credit/book/data/${credit?._id}`} >{credit?.creditBookId}</Link> </td>
                <td className="border border-primary px-4 py-2">{credit?.customerPhoneNumber}</td>
                <td className="border border-primary px-4 py-2">{round2(credit?.customertotalCredit)}</td>
                <td className="border border-primary px-4 py-2">{round2(credit?.customerPaidAmount)}</td>
                <td className="border border-primary px-4 py-2 ">
                    {round2(credit?.advanceAmount)}
                    {credit?.advanceAmount > 0 && hasPermission("credit_pay") && <button onClick={() => handleAdvanceClear(credit?._id)} className='px-2 py-2 rounded-md ml-10 text-red-500 disabled:opacity-40'>
                        <FaTrash />
                    </button>}
                </td>
                {hasPermission("credit_pay") && <td className="border  px-4 py-2 flex ">
                    <button disabled={isCredittotalAboveZero} onClick={() => handlePayCredit(credit?._id)} className='px-3 py-2 rounded-md bg-primary text-white disabled:opacity-40'>Pay</button>

                </td>}
            </tr>
        )
    }) || []

    return (
        <>
            <div className="w-full xl:max-w-6xl text-center pt-5 pb-14 px-5 border border-primary h-full overflow-y-visible shadow">
                <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
                    <h1 className="font-thin text-start md:col-span-8 text-3xl my-6 text-primary">
                        Credit books
                    </h1>
                </div>

                {isCreditDataPending ? <p>Loading...</p> : <div className="overflow-auto h-96 pb-10">
                    <table className="min-w-[768px] w-full border border-primary text-left text-sm sm:text-base">
                        <thead className="bg-primary/10 font-semibold text-black">
                            <tr>
                                <th className="border border-primary px-4 py-2">No</th>
                                <th className="border border-primary px-4 py-2">Name</th>
                                <th className="border border-primary px-4 py-2">ID</th>
                                <th className="border border-primary px-4 py-2">Mobile</th>
                                <th className="border border-primary px-4 py-2">Credit </th>
                                <th className="border border-primary px-4 py-2"> Paid </th>
                                <th className="border border-primary px-4 py-2">Advance </th>
                                {hasPermission("credit_pay") ? <th className="border border-primary px-4 py-2 ">Action</th> : ""}
                            </tr>
                        </thead>
                        <tbody>
                            {creditDatas.length === 0 ? <tr className=''>
                                <td>No Data found</td>
                            </tr> : creditDatas}
                        </tbody>
                    </table>
                </div>}
            </div>

            {PaymentCreditBoxOpen && <CreditPaymentBox />}
        </>
    )
}
