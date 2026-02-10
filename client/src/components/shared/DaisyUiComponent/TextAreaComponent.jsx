import React from 'react'

export const TextAreaComponent = ({ field, placeholder = "Eg" }) => {
    return (
        <>
            <textarea {...field} placeholder={placeholder} className={` border border-gray-500 textarea textarea-neutral w-full`}></textarea>
        </>
    )
}
