import React from 'react'

export const TextAreaComponent = ({ register, registerName }) => {
    return (
        <>
            <textarea {...register(registerName)} placeholder="Neutral" className={` border border-gray-500 textarea textarea-neutral w-full`}></textarea>
        </>
    )
}
