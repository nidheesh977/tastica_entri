import React, { useState } from 'react'
import { TableComponent } from '../DaisyUiComponent/TableComponent'
import { ExpenseAccountSingleAddTitleForm } from './ExpenseAccountSingleAddTitleForm'
import { useDispatch, useSelector } from "react-redux"
import { addBackgroundBlur, setOpenExpenseSubTitleForm } from "../../../redux/features/commonSlice"
import { ExpenseAccountSingleStatusForm } from './ExpenseAccountSingleStatusForm'

export const ExpenseAccountSingleTable = ({ expenseAccountSingleData }) => {

    const [openCreateForm, setopenCreateForm] = useState(false)
    const [openStatusForm, setOpenStatusForm] = useState({
        openCom: false,
        titleId: null,
        isActive: null
    })

    console.log(openStatusForm);

    const { openExpenseSubTitleForm } = useSelector((state) => state.common)

    const dispatch = useDispatch()

    const handleOpenForm = () => {
        dispatch(setOpenExpenseSubTitleForm(true))
        dispatch(addBackgroundBlur(true))
    }

    const handleChangeAccStatus = (num, titleId, active) => {
        setOpenStatusForm(prev => (
            {
                openCom: true,
                titleId: titleId,
                isActive: active
            }

        ))

        dispatch(addBackgroundBlur(true))
    }

    return (
        <div className='w-full'>
            <div className='w-full flex justify-end'>
                {openExpenseSubTitleForm ? <ExpenseAccountSingleAddTitleForm /> : null}
                {openStatusForm.openCom ? <ExpenseAccountSingleStatusForm openStatusForm={openStatusForm} setOpenStatusForm={setOpenStatusForm} /> : null}
                <button className="btn btn-success btn-sm text-white" onClick={handleOpenForm}>Add</button>
            </div>

            <div className='w-full'>
                <TableComponent>
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th> Expense Subtitle</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseAccountSingleData?.subTitle?.map((title, index) => (
                            <tr key={title?._id}>
                                <th>{index + 1}</th>
                                <td >{title?.title}</td>
                                <td>{title?.inActiveReason === null ? "N/A" : title?.inActiveReason.slice(0, 12)} {title?.inActiveReason === null ? null : title?.inActiveReason.length > 12 ? "..." : null} </td>
                                <td>
                                    {<button className={`btn btn-xs w-20 ${title?.isActive ? "btn-success" : "btn-error"}  `} onClick={() => handleChangeAccStatus(index, title?._id, title?.isActive ? false : true)}>

                                        {title?.isActive === true ? "Active" : "In Active"}

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
