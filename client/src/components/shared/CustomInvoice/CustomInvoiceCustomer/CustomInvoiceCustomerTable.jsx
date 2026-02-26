import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { TableComponent } from '../../DaisyUiComponent/TableComponent';
import { CustomInvoiceCustomerAddForm } from './CustomInvoiceCustomerAddForm';
import { addBackgroundBlur } from "../../../../redux/features/commonSlice"
import CustomInvoiceCustomerFormBox from './CustomInvoiceCustomerFormBox';

export const CustomInvoiceCustomerTable = ({ customCuspaginatedData, isPlaceholderData, setPage, page, }) => {


    const [openForm, setOpenForm] = useState(false)

    const admin = useSelector(state => state.auth.adminData)

    const dispatch = useDispatch()

    const handlePreviousPage = () => {
        setPage((old) => Math.max(old - 1, 0))
    }

    const handleNextPage = () => {


        if (!isPlaceholderData && customCuspaginatedData.hasmore) {
            setPage((old) => old + 1)
            return
        }

    }

    const handleChangeAccStatus = () => {

    }

    const handleOpenCreateForm = () => {
        dispatch(addBackgroundBlur(true))
        setOpenForm(true)
    }


    return (

        <div className='w-full'>
            <div className='w-full flex justify-end gap-5'>
                {openForm ? <CustomInvoiceCustomerFormBox setOpenForm={setOpenForm} /> : null}
                {/* {openStatusForm.openCom ? <VendorStaffStatusForm openStatusForm={openStatusForm} setOpenStatusForm={setOpenStatusForm} dispatch={dispatch} removeBackgroundBlur={removeBackgroundBlur} /> : null} */}
                <button className="btn btn-success btn-sm text-white" onClick={handleOpenCreateForm}>Add</button>
            </div>

            <div className='w-full'>
                <TableComponent>
                    {/* head */}
                    <thead>
                        <tr className='tracking-wide'>
                            <th></th>
                            <th>CUSTOMER - ID</th>
                            <th>CUSTOMER NAME</th>
                            <th>CUSTOMER TYPE</th>
                            <th>EMAIL</th>
                            <th>PHONE NUMBER</th>
                            <th>REASON</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customCuspaginatedData?.data.map((customer, index) => {
                            return (
                                <tr className='border-y border-gray-300 hover:bg-gray-100' key={customer._id}>
                                    <th>{(page - 1) * customCuspaginatedData?.limit + index + 1}</th>
                                    <td className=' font-medium text-blue-500 cursor-pointer'>{customer?.customerId}</td>
                                    <td className='text-gray-500 font-medium'>{customer.customerName ? customer.customerName : customer.businessName}</td>
                                    <td className='text-gray-500 font-medium'>{customer?.customerType}</td>
                                    <td className='text-gray-500 font-medium'>{customer?.email}</td>
                                    <td className='text-gray-500 font-medium'>{customer?.maskPhoneNumber}</td>
                                    <td>{customer?.inActiveReason === null ? "N/A" : customer?.inActiveReason.slice(0, 12)} {customer?.inActiveReason === null ? null : customer?.inActiveReason.length > 12 ? "..." : null} </td>
                                    <td>
                                        {<button className={`btn btn-xs w-20 ${customer?.isActive ? "btn-success" : "btn-error"}  `} onClick={() => handleChangeAccStatus(index, staff?._id, staff?.isActive ? false : true)}>

                                            {customer?.isActive === true ? "Active" : "In Active"}

                                        </button>}
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </TableComponent>

                <div className='flex w-full justify-end mt-10'>

                    <div className="join">
                        <button onClick={handlePreviousPage} disabled={page === 1} className="join-item btn">«</button>
                        <button className="join-item btn">Page {page}</button>
                        <button onClick={handleNextPage} disabled={isPlaceholderData || !customCuspaginatedData?.hasmore} className="join-item btn">»</button>
                    </div>

                </div>
            </div>
        </div>

    )
}
