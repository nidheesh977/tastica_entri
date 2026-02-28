import React, { useState } from 'react'
import { TableComponent } from '../DaisyUiComponent/TableComponent'
import { Link } from 'react-router-dom'
import { ExpenseAccountCreate } from './ExpenseAccountCreate'
import { ExpenseStatusForm } from './ExpenseStatusForm'
import { useDispatch, useSelector } from 'react-redux'
import { addBackgroundBlur, setOpenExpenseAccount } from "../../../redux/features/commonSlice"
import { usePermissionCheck } from '../../../hooks/usePermissionCheck'


export const ExpenseAccountTable = ({ expenseAccount }) => {


    const [openStatusForm, setOpenStatusForm] = useState({
        openCom: false,
        staffId: null,
        isActive: null
    })

    const dispatch = useDispatch()

    const { openExpenseAccForm } = useSelector((state) => state.common)
    const admin = useSelector(state => state.auth.adminData)



    const handleOpenForm = () => {
        dispatch(addBackgroundBlur(true))
        dispatch(setOpenExpenseAccount(true))
    }
    // for permission
    const { hasPermission } = usePermissionCheck()
    const viewExpAccApprove = hasPermission("view_expense_account")
    const createExpAccApprove = hasPermission("create_expense_account")
    const statusExpAccApprove = hasPermission("status_expense_account")

    const handleChangeAccStatus = (num, accountId, active) => {


        setOpenStatusForm(prev => ({
            openCom: true,
            expenseAccountId: accountId,
            isActive: active
        }))

    }


    return (
        <div className='w-full'>
            <div className='w-full flex justify-end'>
                {openExpenseAccForm ? <ExpenseAccountCreate /> : null}
                {openStatusForm.openCom ? <ExpenseStatusForm openStatusForm={openStatusForm} setOpenStatusForm={setOpenStatusForm} /> : null}
                <button disabled={!createExpAccApprove} className="btn btn-success btn-sm text-white" onClick={handleOpenForm}>Add</button>
            </div>

            <div className='w-full'>
                <TableComponent>
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Payment Account Name</th>
                            <th>Account subTitle</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseAccount?.map((expenseAcc, index) => (
                            <tr className='hover:bg-gray-100' key={expenseAcc?._id}>
                                <th>{index + 1}</th>
                                <td className='font-medium'>{expenseAcc?.expenseTitle}</td>
                                <td className='font-medium'>
                                    <Link to={admin ? `/admin/expense/account/${expenseAcc?._id}` : `/staff/expense/account/${expenseAcc?._id}`} className={`${!viewExpAccApprove ? "cursor-not-allowed pointer-events-none" : ""} btn btn-xs btn-primary`}>View</Link>
                                </td>
                                <td>{expenseAcc?.inActiveReason === null ? "N/A" : expenseAcc?.inActiveReason.slice(0, 12)} {expenseAcc?.inActiveReason === null ? null : expenseAcc?.inActiveReason.length > 12 ? "..." : null} </td>
                                <td>
                                    {<button disabled={!statusExpAccApprove} className={`btn btn-xs w-20 ${expenseAcc?.isActive ? "btn-success" : "btn-error"}  `} onClick={() => handleChangeAccStatus(index, expenseAcc?._id, expenseAcc?.isActive ? false : true)}>

                                        {expenseAcc?.isActive === true ? "Active" : "In Active"}

                                    </button>}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </TableComponent>
            </div>
        </div >
    )
}
