import React, { use, useState } from 'react'
import { TableComponent } from '../DaisyUiComponent/TableComponent'
import { VendorStaffForm } from './VendorStaffForm'
import { VendorStaffStatusForm } from './VendorStaffStatusForm'
import { useDispatch } from 'react-redux'
import { addBackgroundBlur, removeBackgroundBlur } from "../../../redux/features/commonSlice"

export const VendorStaffTable = ({ vendorStaffData }) => {

    const [openStatusForm, setOpenStatusForm] = useState({
        openCom: false,
        staffId: null,
        isActive: null
    })

    const dispatch = useDispatch()

    const [openCreateForm, setOpenCreateForm] = useState(false)

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
        setOpenCreateForm(true)
        dispatch(addBackgroundBlur(true))
    }

    return (
        <div className='w-full'>
            <div className='w-full flex justify-end gap-5'>
                {openCreateForm ? <VendorStaffForm setOpenCreateForm={setOpenCreateForm} dispatch={dispatch} removeBackgroundBlur={removeBackgroundBlur} /> : null}
                {openStatusForm.openCom ? <VendorStaffStatusForm openStatusForm={openStatusForm} setOpenStatusForm={setOpenStatusForm} dispatch={dispatch} removeBackgroundBlur={removeBackgroundBlur} /> : null}
                <button className="btn btn-success btn-sm text-white" onClick={handleOpenCreateForm}>Add</button>
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
                                <td className='font-medium'>{staff?.maskPhoneNumber}</td>
                                <td>{staff?.inActiveReason === null ? "N/A" : staff?.inActiveReason.slice(0, 12)} {staff?.inActiveReason === null ? null : staff?.inActiveReason.length > 12 ? "..." : null} </td>
                                <td>
                                    {<button className={`btn btn-xs w-20 ${staff?.isActive ? "btn-success" : "btn-error"}  `} onClick={() => handleChangeAccStatus(index, staff?._id, staff?.isActive ? false : true)}>

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
