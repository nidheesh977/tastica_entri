import React, { useEffect, useRef, useState } from 'react'
import { useCredit } from '../../../hooks/useCredit'
import { clearInvoiceData } from '../../../redux/features/invoiceSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { clearSingleInvoiceOpenOrder, singleInvoiceOpenOrderSlice } from "../../../redux/features/singleInvoiceOpenOrderSlice"
import { usePermissionCheck } from '../../../hooks/usePermissionCheck'

export const CreditAddBox = ({ setOpenRegisterDialog, invoiceNumber, totalAmount, title, invoiceId, setShowCreditDialog, resetBillingState, }) => {


    const { hasPermission } = usePermissionCheck()
    const [creditAddData, setCreditAddData] = useState({
        creditBookId: "",
        creditAmount: totalAmount,
        paymentMethod: null
    })
    const [queryValue, setQueryValue] = useState("")


    const { addCredit, isSuccess, isPending, creditDataForAddDialog, isCreditrDataAddDialog } = useCredit(queryValue)

    const dispatch = useDispatch()
    const creditCustomerData = useSelector((state) => state.credit)
    const admin = useSelector((state) => state?.auth?.adminData);



    const location = useLocation();
    const navigate = useNavigate()
    const path = location.pathname.replace(/^\/(admin|staff)/, "").replace(/\/[^/]+$/, "")

    const prevPathRef = useRef(path);

    const handleOpenRegister = () => {
        setOpenRegisterDialog(true)
    }




    const handleSubmit = (e) => {

        e.preventDefault()

        addCredit({ invoiceId, creditAddData, })

    }

    // for button disabled
    const isFormValid = creditAddData?.creditBookId.length >= 8

    useEffect(() => {
        if (!isSuccess) return


        setCreditAddData(prev => ({ creditAmount: "", creditBookId: "" }))
        setShowCreditDialog(false)
        if (prevPathRef.current.includes("/open/orders/data")) {
            dispatch(clearSingleInvoiceOpenOrder());
            navigate(admin ? "/admin/cart" : "/staff")
        }
        dispatch(clearInvoiceData())
        resetBillingState?.()



    }, [isSuccess, navigate, dispatch, resetBillingState])


    useEffect(() => {

        const value = creditAddData.creditBookId

        if (!value) {
            return setQueryValue("")
        }
        const timer = setTimeout(() => {

            setQueryValue(value)
        }, 300)

        return () => {
            clearTimeout(timer)
        }

    }, [creditAddData.creditBookId])


    return (
        <>
            <h2 className='text-center my-2 font-medium'>{title}</h2>
            <div className='flex justify-between items-center mt-5'>
                <p className='text-start text-sm '>Invoice No: {invoiceNumber}</p>
                {hasPermission("credit_create") && <p onClick={handleOpenRegister} className='text-blue-400 cursor-pointer'>New credit Book</p>}
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col items-start justify-end mt-5 '>

                {creditCustomerData.isCreditDataDisplay && <div className='w-full border px-3 py-3 rounded-md border-primary'>
                    <p className='w-fit tracking-wide font-semibold'>Customer Name : {creditCustomerData.customerName}</p>
                    <p className='w-fit tracking-wide font-semibold' >Credit Book ID : {creditCustomerData.creditBookId}</p>
                </div>}

                <input type="text" name='bookid' onChange={(e) => setCreditAddData((prev) => {
                    const creditIdToUpperCase = e.target.value.toUpperCase()

                    return { ...prev, creditBookId: creditIdToUpperCase }
                })}
                    placeholder='Credit book ID' id='credit-amount' maxLength={10} className='uppercase h-10 w-full rounded-md bg-gray-100 p-2 tracking-wider' />



                {<div className={`${queryValue ? "p-2" : "p-0"} w-full my-4  text-gray-700 bg-gray-200 rounded-md  font-medium`}>
                    {isCreditrDataAddDialog ? <p>Loading...</p> : ""}
                    {creditDataForAddDialog && isCreditrDataAddDialog === false ? <div className='flex justify-between rounded-md  bg-gray-200  w-full'>
                        <p>Customer Name : {creditDataForAddDialog.customerName}</p>
                        <p>Mob: {creditDataForAddDialog.customerPhoneNumber}</p>
                    </div> : null}
                    {!creditDataForAddDialog && isCreditrDataAddDialog === false && queryValue ? <p>Invalid credit Id</p> : null}
                </div>}



                <label className='text-sm text-gray-600 mt-2'> Credit Amount</label>
                <input type="text" value={creditAddData?.creditAmount} name='creditAmt' min={0} max={totalAmount}
                    onChange={(e) =>
                        setCreditAddData((prev) => {
                            let val = Number(e.target.value);
                            if (val > totalAmount) val = totalAmount;


                            return { ...prev, creditAmount: val };
                        })
                    }
                    placeholder='Credit amount' id='credit-amount' className='h-10  w-full rounded-md bg-gray-100 p-2 tracking-wider' />

                {creditAddData.creditAmount >= totalAmount || creditAddData.creditAmount === 0 ? "" : <p className='text-sm my-3 text-gray-600'>Customer Pay amount: {`(${totalAmount}) - (${creditAddData.creditAmount}) = `}  {totalAmount - creditAddData.creditAmount}</p>}

                {creditAddData.creditAmount >= totalAmount ? "" : <select onChange={(e) => { setCreditAddData((prev) => ({ ...prev, paymentMethod: e.target.value })), setQueryValue("") }} className=' h-10 w-full rounded-md bg-gray-100 p-2 tracking-wider'>
                    <option value={""}>Select Payment</option>
                    <option Value={"cash"}>Cash</option>
                    <option value={"internal-device"}>Card</option>
                </select>}
                <button className='w-full h-10 bg-primary mt-5 rounded-md text-white  disabled:opacity-40' disabled={!isFormValid || isPending || creditDataForAddDialog === null}>{isPending ? "Credit Adding..." : "Credit Add"}</button>
            </form >

            { }
        </>
    )
}
