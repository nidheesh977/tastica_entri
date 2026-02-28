import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { removeBackgroundBlur } from '../../../redux/features/commonSlice'


export const VendorSingleBox = ({ singleVendorData, setSingleVendorData }) => {


    const dispatch = useDispatch()

    const handleVendorModelCancel = () => {
        setSingleVendorData((prev) => ({
            openVendorModelBox: false,
            vendorName: "",
            vendorEmail: "",
            vendorAddress: ""
        }))
        dispatch(removeBackgroundBlur(false))
    }
    return (
        <div className="fixed w-96  p-5 shadow-md bg-white top-[50%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md" >
            <div className="mb-5 flex justify-between items-center">
                <h2 className=" font-semibold">Vendor</h2>
                <button className="btn btn-ghost btn-sm" onClick={handleVendorModelCancel}>
                    <IoMdClose size={20} />
                </button>
            </div>

            <div className='flex flex-col gap-5 tracking-wide'>
                <div className='flex gap-1'>
                    <p>Name:</p>
                    <p className='font-medium text-gray-800'>{singleVendorData.vendorName || ""}</p>
                </div>
                <div className='flex gap-1 '>
                    <p>Email:</p>
                    <p className='font-medium text-gray-800'>{singleVendorData.vendorEmail || ""}</p>
                </div>
                <div className='flex gap-1'>
                    <p>Address:</p>
                    <p className='font-medium text-gray-800'>{singleVendorData.vendorAddress || ""}</p>
                </div>
            </div>
        </div>
    )
}
