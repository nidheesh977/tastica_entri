import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ExpensePrint = () => {
    const navigate = useNavigate();


    const { expensePrintData } = useSelector(state => state.expense)

    console.log(expensePrintData);


    const handlePrint = () => {
        const afterPrintHandler = () => {
            console.log("Print dialog closed");
            navigate(-1); // go back to previous page
            window.removeEventListener("afterprint", afterPrintHandler);
        };


        window.addEventListener("afterprint", afterPrintHandler);

        // Trigger print
        window.print();
    };

    useEffect(() => {
        handlePrint()
    }, [])

    return (
        <div className='invoice-print p-5 text-3xl'>
            <p className='font-semibold'>Expense Details</p>

            <hr className='my-10 h-[2px] bg-gray-500' />

            <div>
                <h4 className='text-lg font-medium text text-gray-600'>Expense Amount</h4>
                <p className='text-lg font-normal text-red-600 inline my-1'>
                    <span className='text-gray-500 '>{expensePrintData?.currecnyCode}</span>
                    <span className='text-2xl'> {expensePrintData?.totalAmount.toFixed(2)}</span>
                    <span className='text-gray-500 my-1 text-sm ml-1 font-medium'>on {new Date(expensePrintData?.createdDate).toLocaleDateString()}</span>
                </p>
                <p className='text-lg font-medium mt-3 text-green-600'>{expensePrintData?.billable ? "BILLABLE" : "NON-BILLABLE"}</p>
            </div>

            <div className='mt-10'>
                <p className='text-4xl'>{expensePrintData?.expenseSubTitle}</p>
            </div>

            <div className='mt-9'>
                <p className='text-lg font-medium text-gray-700'>Paid Through</p>
                <p className='text-lg'>{expensePrintData?.paidThrough}</p>
            </div>

            <div className='mt-9'>
                <p className='text-lg font-medium text-gray-700'>Tax</p>
                <p className='text-lg'>{expensePrintData?.taxCode} [ {expensePrintData?.taxRate}% ]</p>
            </div>

            <div className='mt-9'>
                <p className='text-lg font-medium text-gray-700'>Tax Amount</p>
                <p className='text-lg'>{expensePrintData?.currecnyCode} {expensePrintData?.taxAmount.toFixed(2)} ( {expensePrintData?.amountIs} )</p>
            </div>

            <div className='mt-9'>
                <p className='text-lg font-medium text-gray-700'>Paid To</p>
                <p className='text-lg text-blue-500 tracking-wider'>{expensePrintData?.vendor}</p>
            </div>

            <div className='mt-9'>
                <p className='text-lg font-medium tracking-wider'>{expensePrintData?.notes}</p>
            </div>


        </div>

    )
}
