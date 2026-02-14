import React from 'react'
import { useVendor } from '../../../hooks/useVendor'
import { VendorDataTable } from './VendorDataTable'



export const VendorBox = () => {

    const { vendorData, vendorDataRefreshing, vendorDataLoading } = useVendor()


    return (
        <div className="px-4 xl:px-24 pt-10 pb-32">
            <div className="mx-auto mt-10 max-w-4xl flex justify-center flex-col items-center">
                {vendorDataLoading ? <p className='text-center w-full'>Loading...</p> : null}
                {vendorData ? <VendorDataTable vendorData={vendorData} /> : null}
                {!vendorDataLoading && vendorData?.length === 0 ? <p>No data found</p> : null}
                {vendorDataRefreshing && !vendorDataLoading ? <p className='text-xs text-gray-400'>Refreshing...</p> : null}
            </div>
        </div>
    )
}
