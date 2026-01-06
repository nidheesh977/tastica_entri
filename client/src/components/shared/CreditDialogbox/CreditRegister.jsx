import React, { useEffect, useState } from 'react'
import { useCredit } from '../../../hooks/useCredit'


export const CreditRegister = ({ invoiceId, title, customerData, setOpenRegisterDialog }) => {


    const [creditRegisterData, setCreditRegisterData] = useState({
        registeredCustomer: true,
        customerName: customerData?.customerName || "",
        customerPhoneNumber: customerData?.phoneNumber || "",
        userRole: customerData?.role || ""
    })

    const { createCreditBook, isRegisterLoading, isRegisterSuccess } = useCredit()



    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        createCreditBook({ invoiceId, creditRegisterData })
    }


    useEffect(() => {
        if (isRegisterSuccess === true) {
            setOpenRegisterDialog(false)
        }
    }, [isRegisterSuccess])


    return (
        <>
            <h2 className='text-center my-2 font-medium'>{title}</h2>

            <form onSubmit={handleRegisterSubmit}>
                <div className='flex flex-col w-full items-start justify-start my-3'>
                    <label htmlFor="" className='my-1'> Registered Customer</label>
                    <select name="" id="" onChange={(e) => setCreditRegisterData((prev) => {
                        const value = e.target.value === "true"
                        return {
                            ...prev,
                            registeredCustomer: value,
                            userRole: value ? customerData?.role : "",
                            customerName: value ? customerData?.customerName : "",
                            customerPhoneNumber: value ? customerData?.phoneNumber : ""
                        }

                    })} className=' h-10 w-full rounded-md bg-gray-100 p-2 tracking-wider'>
                        <option disabled>select option</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                {creditRegisterData.registeredCustomer !== true && <div className='flex flex-col w-full items-start justify-start my-3'>
                    <label htmlFor="" className='my-1 '>Customer name</label>
                    <input type="text" value={creditRegisterData?.customerName} onChange={(e) => setCreditRegisterData((prev) => {
                        const updated = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase())
                        return { customerName: updated }
                    }
                    )}
                        className=' h-10 w-full rounded-md bg-gray-100 p-2 tracking-wider' placeholder='Customer Name' />
                </div>}

                {creditRegisterData.registeredCustomer !== true && <div className='flex flex-col w-full items-start justify-start my-3'>
                    <label htmlFor="" className='my-1 '>Phone Number</label>
                    <input type="number" onChange={(e) => setCreditRegisterData((prev) => ({ ...prev, customerPhoneNumber: e.target.value }))}
                        placeholder='Customer Phone Number' className='uppercase h-10 w-full rounded-md bg-gray-100 p-2 tracking-wider' />
                </div>}

                {creditRegisterData.registeredCustomer === true && <div className='w-full '>
                    <p className='w-fit'>Customer Name : {creditRegisterData?.customerName}</p>
                    <p className='w-fit'>Customer Phone No : {creditRegisterData?.customerPhoneNumber}</p>
                </div>}
                <button disabled={isRegisterLoading} className='w-32 h-10 bg-primary mt-5 rounded-md text-white  disabled:opacity-40' >{isRegisterLoading ? "Adding..." : "Add"}</button>
            </form>
        </>
    )
}
