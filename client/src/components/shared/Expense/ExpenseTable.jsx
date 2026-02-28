import React, { useState } from 'react'
import { useExpense } from '../../../hooks/expense/useExpense'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

export const ExpenseTable = () => {
    const [page, setPage] = useState(1)
    const { paginatedData, isFetching, isLoading, isPlaceholderData } = useExpense(page, null)




    const currecnyCode = useSelector((state) => state?.auth?.shopData?.currencyCode)
    const admin = useSelector(state => state.auth.adminData)


    const handlePreviousPage = () => {
        setPage((old) => Math.max(old - 1, 0))
    }

    const handleNextPage = () => {


        if (!isPlaceholderData && paginatedData.hasmore) {
            setPage((old) => old + 1)
            return
        }

    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>EXPENSE ACCOUNT</th>
                            <th>REFERENCE#</th>
                            <th>VENDOR NAME</th>
                            <th>PAID THROUGH</th>
                            <th>CUSTOMER NAME</th>
                            <th>STATUS</th>
                            <th>AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>

                        {paginatedData?.data.map((expense, index) => {
                            return (
                                <tr className='border-y border-gray-300' key={expense._id}>
                                    <th>{(page - 1) * paginatedData?.limit + index + 1}</th>
                                    <td className='text-gray-500 font-medium'>{new Date(expense.createdDate).toLocaleDateString()}</td>
                                    <td className='text-blue-500 font-medium'>
                                        <Link to={admin ? `/admin/expense/${expense._id}` : `/staff/expense/${expense._id}`}>{expense.expenseSubTitle}</Link>
                                    </td>
                                    <td className='text-gray-500 font-medium'>{expense?.referenceId}</td>
                                    <td className='font-medium text-center text-gray-800'>{expense?.vendor[0]?.vendorName}</td>
                                    <td className='font-medium  text-gray-800'>{expense?.payment[0]?.accountTitle}</td>
                                    <td className='font-medium  text-gray-800'>{expense?.vendorstaffData[0]?.staffName}</td>
                                    <td className='text-gray-500 font-medium text-[13px]'>{expense?.billable ? "BILLABLE" : "NON-BILLABLE"}</td>
                                    <td className='font-medium  text-gray-800'>{currecnyCode} {expense?.expenseAmount}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>

            <div className='flex w-full justify-end mt-10'>



                <div className="join">
                    <button onClick={handlePreviousPage} disabled={page === 1} className="join-item btn">«</button>
                    <button className="join-item btn">Page {page}</button>
                    <button onClick={handleNextPage} disabled={isPlaceholderData || !paginatedData?.hasmore} className="join-item btn">»</button>
                </div>

            </div>
            {isLoading ? <p className='w-full text-center'>Loading...</p> : null}
            {isLoading === false && paginatedData?.data.length === 0 ? <p className='w-full text-center'>No data found</p> : null}
            {isFetching && !isLoading ? <p className='text-xs text-gray-400'>Refreshing...</p> : null}
        </>
    )
}
