import React from 'react'

export const Product = ({products}) => {
  return (
    <>
    {products.map(product => (
        <div className='bg-[#E8F9FF] w-52 h-24 rounded border font-semibold p-5'>
        <h1 className='pb-4 font-bold'>{product.title}</h1>
        <p className='text-gray-500 border-t-2 '>₹{product.price}</p>

    </div>

    ))}
    
    </>
  )
}
