import { useState } from 'react'
import { TableComponent } from '../DaisyUiComponent/TableComponent'
import { VendorForm } from './VendorForm'
import { useDispatch, useSelector } from "react-redux"
import { removeBackgroundBlur, addBackgroundBlur, setOpenVendorForm } from "../../../redux/features/commonSlice"
import { VendorStatusForm } from './VendorStatusForm'
import { Link } from 'react-router-dom'


export const VendorDataTable = ({ vendorData }) => {


    const [selectBtnNum, setSelectBtnNum] = useState(null)
    const [openCreateForm, setopenCreateForm] = useState(false)
    const [openStatusForm, setOpenStatusForm] = useState({
        openCom: false,
        vendorId: null,
        isActive: null
    })

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


    const { openVendorForm } = useSelector(state => state.common)

    const handleOpenVendorForm = () => {
        dispatch(setOpenVendorForm(true))
        dispatch(addBackgroundBlur(true))
    }

    return (
        <div className='w-full'>
            <div className='w-full flex justify-end gap-5'>
                {openVendorForm ? <VendorForm setopenCreateForm={setopenCreateForm} dispatch={dispatch} removeBackgroundBlur={removeBackgroundBlur} /> : null}
                {openStatusForm.openCom ? <VendorStatusForm openStatusForm={openStatusForm} setOpenStatusForm={setOpenStatusForm} dispatch={dispatch} removeBackgroundBlur={removeBackgroundBlur} /> : null}
                <button className="btn btn-success btn-sm text-white" onClick={handleOpenVendorForm} >Add</button>
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
                                <td className='font-medium'>{vendor?.maskPhoneNumber}</td>
                                <td className='font-medium'>
                                    <Link to={`/admin/vendor/${vendor?._id}/staff`} className='btn btn-xs btn-primary'>Staff</Link>
                                </td>
                                <td className='font-medium'>{vendor?.maskAddress}</td>
                                <td>{vendor?.inActiveReason === null ? "N/A" : vendor?.inActiveReason.slice(0, 12)} {vendor?.inActiveReason === null ? null : vendor?.inActiveReason.length > 12 ? "..." : null} </td>
                                <td>
                                    {<button className={`btn btn-xs w-20 ${vendor?.isActive ? "btn-success" : "btn-error"}  `} onClick={() => handleChangeAccStatus(index, vendor?._id, vendor?.isActive ? false : true)}>

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
