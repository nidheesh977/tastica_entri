import React from 'react'
import { useVendorStaff } from '../../../hooks/useVendorStaff'
import { VendorStaffTable } from './VendorStaffTable'

export const VendorStaffBox = () => {

    const { vendorStaffData, vendorStaffDataLoding, vendorStaffDataRefreshing, getDecryptPhoneNumberForVendorStaff, visiblePhone } = useVendorStaff()

    return (
        <div className="px-4 xl:px-24 pt-10 pb-32">
            <div className="mx-auto mt-10 max-w-4xl flex justify-center flex-col items-center">
                {vendorStaffDataLoding ? <p className='text-center w-full'>Loading...</p> : null}
                {vendorStaffData ? <VendorStaffTable vendorStaffData={vendorStaffData} getDecryptPhoneNumberForVendorStaff={getDecryptPhoneNumberForVendorStaff} visiblePhone={visiblePhone} /> : null}
                {!vendorStaffDataRefreshing && vendorStaffData?.length === 0 ? <p>No data found</p> : null}
                {vendorStaffDataRefreshing && !vendorStaffDataLoding ? <p className='text-xs text-gray-400'>Refreshing...</p> : null}
            </div>
        </div>
    )
}
