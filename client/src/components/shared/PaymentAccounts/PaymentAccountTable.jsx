import React, { useState } from 'react'
import { TableComponent } from '../DaisyUiComponent/TableComponent'
import { PaymentAccountForm } from './PaymentAccountForm'
import { usePaymentAccount } from '../../../hooks/usePaymentAccount'
import { useDispatch } from "react-redux"
import { addBackgroundBlur, removeBackgroundBlur } from "../../../redux/features/commonSlice"


export const PaymentAccountTable = ({ paymentAccountData }) => {

    const [openCreateForm, setopenCreateForm] = useState(false)
    const [selectBtnNum, setSelectBtnNum] = useState(null)

    const dispatch = useDispatch()

    const handleOpenForm = () => {
        setopenCreateForm(true)
        dispatch(addBackgroundBlur(true))
    }

    const { accountStatusChange, statusChangeLoading } = usePaymentAccount()

    const handleChangeAccStatus = (accountId, num) => {
        accountStatusChange(accountId)
        setSelectBtnNum(num)
    }

    return (
        <div className='w-full'>
            <div className='w-full flex justify-end'>
                {openCreateForm ? <PaymentAccountForm setopenCreateForm={setopenCreateForm} dispatch={dispatch} removeBackgroundBlur={removeBackgroundBlur} /> : null}
                <button className="btn btn-success btn-sm text-white" onClick={handleOpenForm}>Add</button>
            </div>

            <div className='w-full'>
                <TableComponent>
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Payment Account Name</th>
                            <th>Account Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentAccountData?.map((account, index) => (
                            <tr key={account?._id}>
                                <th>{index + 1}</th>
                                <td >{account?.accountTitle}</td>
                                <td>{account?.accountType}</td>
                                <td>
                                    {<button className={`btn btn-xs w-20 ${account?.isActive ? "btn-success" : "btn-error"}  `} onClick={() => handleChangeAccStatus(account?._id, index)}>
                                        {selectBtnNum === index && statusChangeLoading ? (
                                            <span className="loading loading-spinner loading-xs"></span>
                                        ) : (
                                            account?.isActive === true ? "Active" : "In Active"
                                        )}
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
