import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CustomInvoiceCustomerTable } from './CustomInvoiceCustomerTable';
import { useState } from 'react';
import { useCustomInvoiceCustomer } from '../../../../hooks/useCustomInvoice/useCustomInvoiceCustomer';



export const CustomInvoiceCustomerList = () => {

    const [page, setPage] = useState(1)

    const { customCuspaginatedData, customCusDataRefreshing, customCusDataisLoading, isPlaceholderData } = useCustomInvoiceCustomer(page)


    return (
        <div className='px-5 lg:px-28 py-5'>

            {customCusDataisLoading ? <p className='text-center w-full'>Loading...</p> : null}
            {customCuspaginatedData ? <CustomInvoiceCustomerTable customCuspaginatedData={customCuspaginatedData} isPlaceholderData={isPlaceholderData} setPage={setPage} page={page} /> : null}
            {!customCusDataRefreshing && customCuspaginatedData?.data?.length === 0 ? <p>No data found</p> : null}
            {customCusDataRefreshing && !customCusDataisLoading ? <p className='text-xs text-center text-gray-400'>Refreshing...</p> : null}
        </div>
    )
}
