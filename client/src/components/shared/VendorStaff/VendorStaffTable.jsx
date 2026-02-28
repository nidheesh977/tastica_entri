import React, { use, useState } from 'react'
import { TableComponent } from '../DaisyUiComponent/TableComponent'
import { VendorStaffForm } from './VendorStaffForm'
import { VendorStaffStatusForm } from './VendorStaffStatusForm'
import { useDispatch, useSelector } from 'react-redux'
import { addBackgroundBlur, removeBackgroundBlur, setOpenVendorStaffForm } from "../../../redux/features/commonSlice"
import { usePermissionCheck } from '../../../hooks/usePermissionCheck'
import { MdOutlineRemoveRedEye } from 'react-icons/md'

export const VendorStaffTable = ({ vendorStaffData, getDecryptPhoneNumberForVendorStaff, visiblePhone }) => {

    const [selectVendorId, setSelectVendorId] = useState(null)
    const [openStatusForm, setOpenStatusForm] = useState({
        openCom: false,
        staffId: null,
        isActive: null
    })

    const dispatch = useDispatch()

    // permission
    const { hasPermission } = usePermissionCheck()
    const createVendorStaffApprove = hasPermission("vendor_create")
    const statusVendorStaffApprove = hasPermission("vendor_change_status")


    const { openVendorStaffForm } = useSelector(state => state.common);

    const { isDecrypt, decryptPhoneNumber } = visiblePhone;

    const handleChangeAccStatus = (num, staffId, active) => {
        setOpenStatusForm((prev) => ({
            ...prev,
            openCom: true,
            staffId: staffId,
            isActive: active
        }))
        dispatch(addBackgroundBlur(true))
    }

    const handleOpenCreateForm = () => {
        dispatch(setOpenVendorStaffForm(true))
        dispatch(addBackgroundBlur(true))
    }

    const handleGetDecryptPhoneNumber = (staffId) => {
        getDecryptPhoneNumberForVendorStaff(staffId)
        setSelectVendorId(staffId)
    }

    return (
        <div className='w-full'>
            <div className='w-full flex justify-end gap-5'>
                {openVendorStaffForm ? <VendorStaffForm /> : null}
                {openStatusForm.openCom ? <VendorStaffStatusForm openStatusForm={openStatusForm} setOpenStatusForm={setOpenStatusForm} dispatch={dispatch} removeBackgroundBlur={removeBackgroundBlur} /> : null}
                <button disabled={!createVendorStaffApprove} className="btn btn-success btn-sm text-white" onClick={handleOpenCreateForm}>Add</button>
            </div>

            <div className='w-full'>
                <TableComponent>
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>staff Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendorStaffData?.map((staff, index) => (
                            <tr key={staff?._id}>
                                <th>{index + 1}</th>
                                <td className='font-medium'>{staff?.staffName}</td>
                                <td className='font-medium'>{staff?.email}</td>
                                <td className='font-medium flex items-center gap-4 tracking-wider'>
                                    {staff?._id === selectVendorId && isDecrypt ? decryptPhoneNumber : staff?.maskPhoneNumber}
                                    <MdOutlineRemoveRedEye className={`cursor-pointer ${isDecrypt ? "pointer-events-none opacity-40" : ""}`} size={16} onClick={() => {
                                        handleGetDecryptPhoneNumber(staff?._id)
                                    }} />

                                </td>
                                <td>{staff?.inActiveReason === null ? "N/A" : staff?.inActiveReason.slice(0, 12)} {staff?.inActiveReason === null ? null : staff?.inActiveReason.length > 12 ? "..." : null} </td>
                                <td>
                                    {<button disabled={!statusVendorStaffApprove} className={`btn btn-xs w-20 ${staff?.isActive ? "btn-success" : "btn-error"}  `} onClick={() => handleChangeAccStatus(index, staff?._id, staff?.isActive ? false : true)}>

                                        {staff?.isActive === true ? "Active" : "In Active"}

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
