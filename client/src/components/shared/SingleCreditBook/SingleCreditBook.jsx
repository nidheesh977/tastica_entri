import { useCredit } from '../../../hooks/useCredit'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CreditPaymentBox } from '../CreditDialogbox/CreditPaymentBox'
import { useDispatch, useSelector } from 'react-redux'
import { addBackgroundBlur } from "../../../redux/features/commonSlice"
import { openPaymentCreditbox } from '../../../redux/features/creditSlice'
import { usePermissionCheck } from '../../../hooks/usePermissionCheck'

export const SingleCreditBook = () => {
    const [loadMore, setLoadmore] = useState(3)
    const [openFilterBox, setOpenFilterBox] = useState(false)
    const { creditDataDisplay, creditDataDisplayRefetch } = useCredit()
    const { hasPermission } = usePermissionCheck()
    const [filterValue, setFilterValue] = useState("all")
    const [openProducts, setOpenProducts] = useState(false)
    const [selectBoxIndex, setSelectBoxIndex] = useState(null)
    const [creditAmt, setCreditAmt] = useState(0)
    const [invoiceCreditId, setInvoiceCreditId] = useState("")

    const bookid = useParams().id;


    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { PaymentCreditBoxOpen } = useSelector((state) => state.credit)
    const admin = useSelector((state) => state.auth?.adminData)

    const handleLoadMore = () => {
        setLoadmore((prev) => prev + 3)
    }

    const handleGoBack = () => {
        navigate(admin ? "/admin/credit/book" : "/staff/credit/book")
    }

    const handleOpenFilterBox = () => {
        setOpenFilterBox((prev) => prev !== true)
    }

    const handleFilterData = (data) => {
        setFilterValue(data)
    }

    const handleOpenProductsBox = (index) => {
        setOpenProducts((prev) => prev !== true)
        setSelectBoxIndex(index)
    }

    const handleOpenPaymentBox = (amount, invoiceCreditId) => {
        dispatch(openPaymentCreditbox(true))
        setCreditAmt(amount)
        dispatch(addBackgroundBlur(true))
        setInvoiceCreditId(invoiceCreditId)
    }

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };



    const filterData = creditDataDisplay?.credit?.filter((item) => {

        if (filterValue === "paid" || filterValue === "pending") {
            return item?.creditStatus === filterValue
        }
        return true

    }) || []


    useEffect(() => {
        if (!bookid) return
        creditDataDisplayRefetch()
    }, [bookid, invoiceCreditId])


    return (
        <div className='w-full '>
            <h1 className='text-center mb-3 font-semibold text-2xl mt-5'>Credit book</h1>
            <div className='mt-5 w-[50%] mx-auto bg-[#fbfbfb] shadow-md rounded p-5'>
                <div className='py-2 border-b border-b-primary flex justify-between'>
                    <p className='text-xl '>Customer Details</p>
                    <button onClick={handleGoBack} className='text-blue-500 underline'>Back</button>
                </div>

                <div className='w-full flex mt-5 flex-col lg:flex-row text-[#262626]'>

                    <div className='w-1/2'>
                        <p className=' font-normal'> Customer name :
                            <span className='font-medium ml-1'>{creditDataDisplay?.customerName}</span>
                        </p>
                        <p className=' font-normal'> Customer phone number :
                            <span className='font-medium ml-1'>{creditDataDisplay?.customerPhoneNumber}</span>
                        </p>
                    </div>

                    <div className='w-1/2 font-medium mt-5 lg:mt-0'>
                        <p className='font-normal '>Credit ID :
                            <span className='font-medium ml-1'>{creditDataDisplay?.creditBookId}</span>
                        </p>
                        <p className='font-normal my-1'>Total credit :
                            <span className='font-medium ml-1'>{creditDataDisplay?.customertotalCredit}</span>
                        </p>
                        <p className='font-normal my-1'> paid :
                            <span className='font-medium ml-1'>{creditDataDisplay?.customerPaidAmount}</span>
                        </p>
                        <p className='font-normal '>Advance Amount :
                            <span className='font-medium ml-1'>{creditDataDisplay?.advanceAmount}</span>
                        </p>
                    </div>

                </div>
            </div>

            <div >
                <div className=' mt-4 w-[50%] mx-auto relative z-0'>
                    <div className='flex justify-end'>
                        <p onClick={handleOpenFilterBox} className='w-fit text-end text-blue-500 cursor-pointer'>Filter</p>
                    </div>

                    {openFilterBox && <div className='absolute  flex flex-col gap-1 right-0 w-32 bg-slate-100 rounded p-2'>
                        <p onClick={() => handleFilterData("all")} className='text-blue-500 cursor-pointer'>ALL</p>
                        <p onClick={() => handleFilterData("paid")} className='text-blue-500 cursor-pointer'>Paid</p>
                        <p onClick={() => handleFilterData("pending")} className='text-blue-500 cursor-pointer'>pending</p>
                    </div>}

                </div>
                {filterData.slice(0, loadMore).map((credit, index) => (
                    <div key={credit?._id} className='mt-5 w-[50%] mx-auto bg-[#fbfbfb] shadow-md rounded p-5'>
                        <div className='flex justify-between'>
                            <p className=' font-normal'> Invoice Number :
                                <span className='font-medium ml-1'>{credit?.invoice?.invoiceNumber}</span>
                            </p>
                            <p className={`${credit?.creditStatus === "paid" ? "text-green-500" : "text-red-500"} font-normal py-1 px-2 bg-slate-100 rounded-md`}>{credit?.creditStatus}</p>
                        </div>
                        <p className=' font-normal my-1'>Invoice Total amount :
                            <span className='font-medium ml-1'>{credit?.invoice?.totalAmount}</span>
                        </p>
                        <p className=' font-normal'> Credit amount :
                            <span className='font-medium ml-1'>{credit?.creditAmount}</span>
                        </p>
                        <p className=' font-normal my-1'> Creditor :
                            <span className='font-medium ml-1'>{credit?.creditor}</span>
                        </p>
                        <p className=' font-normal my-1'> Given date :
                            <span className='font-medium ml-1'>{formatDate(credit?.givenAt)}</span>
                        </p>
                        <p className=' font-normal'> Customer paid date :
                            <span className='font-medium ml-1'>{credit?.customerPaidAt === null ? "Nil" : formatDate(credit?.customerPaidAt)}</span>
                        </p>
                        {hasPermission("credit_pay") && credit?.creditStatus === "pending" && (<p>
                            <button onClick={() => handleOpenPaymentBox(credit?.creditAmount, credit?._id)} className='ml-auto block w-14 h-8  text-white rounded-md bg-primary'> Pay</button>
                        </p>)}

                        <button onClick={() => handleOpenProductsBox(index)} className={`${openProducts && index === selectBoxIndex ? "text-red-500" : "text-blue-500"} mt-3  `}>{openProducts && index === selectBoxIndex ? "Cancel" : "Products"}</button>
                        {openProducts && index === selectBoxIndex && <div className='mt-3'>
                            <table >
                                <thead >
                                    <th className='px-3 py-1'>Product Name</th>
                                    <th className='px-3 py-1'>Price</th>
                                    <th className='px-3 py-1'>Quantity</th>
                                    <th className='px-3 py-1'>Total</th>
                                </thead>
                                <tbody>
                                    {credit?.invoice?.products.map((product) => (
                                        <tr key={product?._id} className='border-y border-y-primary py-2'>
                                            <td className='px-3 py-1'>{product?.productName}</td>
                                            <td className='px-3 py-1 text-center'>{product?.price}</td>
                                            <td className='px-3 py-1 text-center'>{product?.quantity} {product?.unit}</td>
                                            <td className='px-3 py-1 text-center'>{product?.total}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>}
                    </div>
                ))}
                {loadMore <= filterData.length && <button onClick={handleLoadMore} className='block mx-auto mt-5 text-lg text-blue-500'>Load More</button>}
            </div>
            {PaymentCreditBoxOpen && <CreditPaymentBox isPendingPayment={true}
                customerName={creditDataDisplay?.customerName}
                customerPhoneNumber={creditDataDisplay?.customerPhoneNumber}
                customerCreditBookId={creditDataDisplay?.creditBookId}
                customerCreditAmt={creditAmt}
                customerCreditDoc_id={creditDataDisplay?._id}
                customerInvoiceCreditId={invoiceCreditId}
            />}
        </div >
    )
}
