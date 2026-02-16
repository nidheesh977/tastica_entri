import React from 'react'
import { useExpenseAccount } from '../../../hooks/expense/useExpenseAccount'
import { ExpenseAccountTable } from './ExpenseAccountTable';

export const ExpenseAccountBox = () => {
    const { expenseAccount, expenseAccountLoading, expenseAccountRefreshing } = useExpenseAccount()

    console.log(expenseAccount);

    return (
        <div className="px-4 xl:px-24 pt-10 pb-32">
            <div className="mx-auto mt-10 max-w-4xl flex justify-center flex-col items-center">
                {expenseAccountLoading ? <p className='text-center w-full'>Loading...</p> : null}
                {expenseAccount ? <ExpenseAccountTable expenseAccount={expenseAccount} /> : null}
                {!expenseAccountLoading && expenseAccount?.length === 0 ? <p>No data found</p> : null}
                {expenseAccountRefreshing && !expenseAccountLoading ? <p className='text-xs text-gray-400'>Refreshing...</p> : null}
            </div>
        </div>
    )
}
