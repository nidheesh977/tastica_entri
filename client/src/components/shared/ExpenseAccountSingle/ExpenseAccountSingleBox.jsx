import React, { useState } from 'react'
import { useExpenseAccount } from '../../../hooks/expense/useExpenseAccount'
import { ExpenseAccountSingleTable } from './ExpenseAccountSingleTable';

export const ExpenseAccountSingleBox = () => {


    const { expenseAccountSingleData, singleExpenseAccountLoading, singleExpenseRefreshing } = useExpenseAccount()




    return (
        <div className="px-4 xl:px-24 pt-10 pb-32 relative">

            {expenseAccountSingleData ? <div className='absolute top-5 left-1/2 text-xl font-semibold'>{expenseAccountSingleData?.expenseTitle}</div> : null}

            <div className="mx-auto mt-10 max-w-4xl flex justify-center flex-col items-center">
                {singleExpenseAccountLoading ? <p className='text-center w-full'>Loading...</p> : null}
                {expenseAccountSingleData?.subTitle ? <ExpenseAccountSingleTable expenseAccountSingleData={expenseAccountSingleData} /> : null}
                {!singleExpenseAccountLoading && expenseAccountSingleData?.subTitle.length === 0 ? <p>No data found</p> : null}
                {singleExpenseRefreshing && !singleExpenseAccountLoading ? <p className='text-xs text-gray-400'>Refreshing...</p> : null}
            </div>
        </div>
    )
}
