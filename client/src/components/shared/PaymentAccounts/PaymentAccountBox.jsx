import React from 'react'
import { usePaymentAccount } from '../../../hooks/usePaymentAccount'
import { PaymentAccountTable } from './PaymentAccountTable'

export const PaymentAccountBox = () => {

    const { paymentAccountData, isLoading, paymentAccountRefreshing } = usePaymentAccount()

    console.log("render");
    return (
        <div className="px-4 xl:px-24 pt-10 pb-32">
            <div className="mx-auto mt-10 max-w-4xl flex justify-center flex-col items-center">
                {isLoading ? <p className='text-center w-full'>Loading...</p> : null}
                {paymentAccountData ? <PaymentAccountTable paymentAccountData={paymentAccountData} /> : null}
                {!isLoading && paymentAccountData.length === 0 ? <p>No data found</p> : null}
                {paymentAccountRefreshing && !isLoading ? <p className='text-xs text-gray-400'>Refreshing...</p> : null}
            </div>
        </div>
    )
}
