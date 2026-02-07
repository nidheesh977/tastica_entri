import { useState } from 'react'
import { useExpenseAccount } from '../../../hooks/expense/useExpenseAccount'
import { ExpenseAccountCreate } from './ExpenseAccountCreate'
import { addBackgroundBlur } from "../../../redux/features/commonSlice"
import { useDispatch } from "react-redux"


export const ExpenseAccount = () => {
    const { expenseAccount } = useExpenseAccount()

    const [openSubTitle, setOpenSubTitle] = useState(false)
    const [selectedNum, setSelectedNum] = useState(null)
    const [openForm, setOpenForm] = useState(false)


    const dispatch = useDispatch()

    const handleOpen = (selectBox) => {
        setOpenSubTitle(true)
        setSelectedNum(selectBox)
    }

    const handleOpenExpAccForm = () => {
        setOpenForm(true)
        dispatch(addBackgroundBlur(true))
    }
    return (
        <div className=' px-4 xl:px-24 pt-10 pb-32 relative'>
            {openForm ? <ExpenseAccountCreate setOpenForm={setOpenForm} /> : null}

            <div className='flex justify-end'>
                <button onClick={handleOpenExpAccForm} className='btn btn-sm btn-primary my-5 ml-auto'> create new</button>
            </div>
            <div className='flex flex-wrap gap-5'>
                {
                    expenseAccount?.map((expenseAcc, index) => (
                        <div key={expenseAcc?._id} className="card w-72 bg-base-100 card-sm shadow-md">
                            <div className="card-body items-start justify-start">
                                <h2 className="card-title w-fit">{expenseAcc?.expenseTitle}</h2>
                                <p className='text-gray-500 h-fit w-fit'>{expenseAcc?.description}</p>

                                {<div className='w-full mt-1 bg-gray-200 py-2 px-2 rounded-md font-medium'>
                                    {expenseAcc?.subTitle[0]?.title || "Empty"}
                                </div>}
                                {openSubTitle === false ? <div className='mt-5 flex justify-end'>
                                    <button onClick={() => handleOpen(index)} className='btn btn-xs btn-outline btn-primary '>More</button>
                                </div> : null}





                            </div>
                        </div>
                    ))
                }
            </div>




        </div >
    )
}
