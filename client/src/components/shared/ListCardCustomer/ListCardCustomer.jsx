import React from "react";
import { MdDelete } from "react-icons/md";

export const ListCardCustomer = () => {
  return (
    <>
      <div className='md:w-1/2 text-center pt-5 pb-14 px-5 m-2 border border-primary shadow h-full'>
        <div className="grid grid-cols-12 items-center">
          <h1 className='font-thin text-start col-span-8 text-3xl my-6 text-primary'>Customers</h1>
          <input className='rounded-xl text-primary shadow col-span-4 outline-primary h-10 p-5' type="text" placeholder="Search" />
        </div>
        <ul className='flex flex-col gap-1 border-l border-r border-t border-primary'>
          <li className='grid grid-cols-4 border-b border-primary items-center  p-2 px-4'>
            <span>No</span>
            <span>Name</span>
            <span>Ponits</span>
            <span>Action</span>
          </li>
          <li className='grid grid-cols-4 items-center border-b border-primary p-2 px-4'>
            <span>1</span>
            <span>Arjun</span>
            <span>507</span>
            <span className="flex justify-center cursor-pointer">
              <MdDelete className='hover:text-red-500 text-secondary' />
            </span>
          </li>
          <li className='grid grid-cols-4 items-center p-2 px-4 border-b border-primary'>
            <span>2</span>
            <span>Vishnu</span>
            <span>802</span>
            <span className="flex justify-center cursor-pointer">
              <MdDelete className='hover:text-red-500 text-secondary' />
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};
