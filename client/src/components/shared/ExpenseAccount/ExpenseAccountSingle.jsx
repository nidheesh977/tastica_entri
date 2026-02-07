import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useExpenseAccount } from '../../../hooks/expense/useExpenseAccount'
import { ExpenseAccountAddTitle } from './ExpenseAccountAddTitle'
import { addBackgroundBlur } from "../../../redux/features/commonSlice"
import { useDispatch } from "react-redux"
import { MdDelete } from "react-icons/md";


export const ExpenseAccountSingle = () => {

    const { expenseAccountSingleData, singleExpenseAccountLoading, softDeleTitleExpenseAccount } = useExpenseAccount()
    const [openAddTitleBox, setAddTitleBox] = useState(false)
    const [openDeleteBtn, setOpenDeleteBtn] = useState(false)
    const dispatch = useDispatch()

    const handleOpenTitleBox = () => {
        setAddTitleBox(true)
        dispatch(addBackgroundBlur(true))
    }
    const handleDeleteBtnView = () => {
        setOpenDeleteBtn((prev) => prev !== true)
    }

    const handleDeleteTitle = (titleId) => {
        softDeleTitleExpenseAccount(titleId)

    }

    return (
        <div className=' px-4 xl:px-24 pt-10 pb-32'>
            {openAddTitleBox ? <ExpenseAccountAddTitle setAddTitleBox={setAddTitleBox} /> : null}
            {singleExpenseAccountLoading ? <p>Loading...</p> : null}
            {singleExpenseAccountLoading === false ? <div className='w-[80%] mx-auto'>
                <h1 className='font-bold text-2xl text-gray-700'>{expenseAccountSingleData?.expenseTitle}</h1>
                <p className='mt-5'>{expenseAccountSingleData?.description}</p>

                {<div className={` flex justify-end items-center gap-4`}>
                    <button onClick={handleDeleteBtnView} className={`${expenseAccountSingleData?.subTitle.length ? "visible" : "invisible"} btn mt-10 btn-error btn-sm`}>{openDeleteBtn ? "Cancel" : "Delete"}</button>
                    <button onClick={handleOpenTitleBox} className={` btn mt-10 btn-success btn-sm text-white`}>Add</button>
                </div>}

                <div className='  mt-2 bg-base-200 flex items-start justify-start gap-5 px-5 py-10 flex-wrap rounded-sm'>
                    {expenseAccountSingleData?.subTitle.length === 0 ? <p className='w-fit px-4 py-2 bg-gray-200 shadow-md rounded-sm'>empty</p> : null}
                    {expenseAccountSingleData?.subTitle.map((subTitle) => (
                        <p className='w-fit px-4 py-2 bg-gray-300 rounded-sm flex gap-3 items-center justify-end font-medium'>{subTitle?.title} {openDeleteBtn ? <button onClick={() => handleDeleteTitle(subTitle._id)}><MdDelete size={20} color='#c61313' /> </button> : null}</p>
                    ))}
                </div>
            </div> : null}
        </div>
    )
}
