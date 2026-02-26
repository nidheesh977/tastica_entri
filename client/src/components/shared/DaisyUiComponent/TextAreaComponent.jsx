import React from 'react'

export const TextAreaComponent = ({ field, placeholder = "Eg", classNames }) => {
    return (
        <>
            <textarea {...field} placeholder={placeholder} className={`${classNames} border border-gray-500 textarea  textarea-neutral w-full`}></textarea>
        </>
    )
}
