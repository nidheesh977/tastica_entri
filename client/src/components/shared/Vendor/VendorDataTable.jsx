import { useState } from 'react'
import { TableComponent } from '../DaisyUiComponent/TableComponent'
import { VendorForm } from './VendorForm'
import { useDispatch, useSelector } from "react-redux"
import { removeBackgroundBlur, addBackgroundBlur, setOpenVendorForm } from "../../../redux/features/commonSlice"
import { VendorStatusForm } from './VendorStatusForm'
import { Link } from 'react-router-dom'
import { usePermissionCheck } from '../../../hooks/usePermissionCheck'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { VendorSingleBox } from './VendorSingleBox'



export const VendorDataTable = ({ vendorData, getDecryptPhoneNumber, visiblePhone }) => {


    const [selectVendorId, setSelectVendorId] = useState(null)
    const [openStatusForm, setOpenStatusForm] = useState({
        openCom: false,
        vendorId: null,
        isActive: null
    })
    const [singleVendorData, setSingleVendorData] = useState({
        openVendorModelBox: false,
        vendorName: "",
        vendorEmail: "",
        vendorAddress: ""
    })




    const { hasPermission } = usePermissionCheck()
    const createVendorApprove = hasPermission("vendor_create")
    const statusVendorApprove = hasPermission("vendor_change_status")

    const dispatch = useDispatch()

    const handleChangeAccStatus = (num, vendorId, active) => {
        setSelectBtnNum(num)
        setOpenStatusForm((prev) => (
            {
                ...prev,
                openCom: true,
                vendorId: vendorId,
                isActive: active
            }
        ))
        dispatch(addBackgroundBlur(true))
    }


    const { openVendorForm } = useSelector(state => state.common);
    const admin = useSelector(state => state.auth.adminData);

    const { isDecrypt, decryptPhoneNumber } = visiblePhone


    const handleOpenVendorSingleData = (vendorName, vendorEmail, vendorAddress) => {
        setSingleVendorData((prev) => ({
            openVendorModelBox: true,
            vendorName: vendorName,
            vendorEmail: vendorEmail,
            vendorAddress: vendorAddress
        }))
        dispatch(addBackgroundBlur(true))

    }


    const handleOpenVendorForm = () => {
        dispatch(setOpenVendorForm(true))
        dispatch(addBackgroundBlur(true))
    }

    const handleGetDecryptPhoneNumber = (vendorId) => {
        getDecryptPhoneNumber(vendorId)
        setSelectVendorId(vendorId)
    }

    return (
        <div className='w-full'>
            <div className='w-full flex justify-end gap-5'>
                {openVendorForm ? <VendorForm dispatch={dispatch} removeBackgroundBlur={removeBackgroundBlur} /> : null}
                {openStatusForm.openCom ? <VendorStatusForm openStatusForm={openStatusForm} setOpenStatusForm={setOpenStatusForm} dispatch={dispatch} removeBackgroundBlur={removeBackgroundBlur} /> : null}
                {singleVendorData.openVendorModelBox ? <VendorSingleBox singleVendorData={singleVendorData} setSingleVendorData={setSingleVendorData} /> : null}
                <button disabled={!createVendorApprove} className="btn btn-success btn-sm text-white" onClick={handleOpenVendorForm} >Add</button>
            </div>

            <div className='w-full'>
                <TableComponent>
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Vendor Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Staff</th>
                            <th>Address</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendorData?.map((vendor, index) => (
                            <tr key={vendor?._id}>
                                <th>{index + 1}</th>
                                <td className='font-medium'>{vendor?.vendorName}</td>
                                <td className='font-medium'>{vendor?.email}</td>
                                <td className='font-medium flex items-center gap-4 tracking-wider'>
                                    {vendor?._id === selectVendorId && isDecrypt ? decryptPhoneNumber : vendor?.maskPhoneNumber}
                                    <MdOutlineRemoveRedEye size={16} className={`cursor-pointer ${isDecrypt ? "pointer-events-none opacity-40" : ""}`} onClick={() => {
                                        handleGetDecryptPhoneNumber(vendor?._id)
                                    }} />
                                </td>
                                <td className='font-medium'>
                                    <Link to={admin ? `/admin/vendor/${vendor?._id}/staff` : `/staff/vendor/${vendor?._id}/staff`} className='btn btn-xs btn-primary'>Staff</Link>
                                </td>

                                <td className='font-medium flex items-center gap-4 tracking-wider'>
                                    {vendor?.address.slice(0, 10) + "..."}
                                    <MdOutlineRemoveRedEye size={16} className={`cursor-pointer `} onClick={() => {
                                        handleOpenVendorSingleData(vendor?.vendorName, vendor?.email, vendor?.address)
                                    }} />
                                </td>

                                <td>{vendor?.inActiveReason === null ? "N/A" : vendor?.inActiveReason.slice(0, 12)} {vendor?.inActiveReason === null ? null : vendor?.inActiveReason.length > 12 ? "..." : null} </td>
                                <td>
                                    {<button disabled={!statusVendorApprove} className={`btn btn-xs w-20 ${vendor?.isActive ? "btn-success" : "btn-error"}  `} onClick={() => handleChangeAccStatus(index, vendor?._id, vendor?.isActive ? false : true)}>

                                        {vendor?.isActive === true ? "Active" : "In Active"}

                                    </button>}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </TableComponent>
            </div>
        </div>
    )
}
