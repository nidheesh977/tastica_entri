import React from "react";
import { primary, secondary } from "../../utils/constants";
import { MdDelete } from 'react-icons/md';


export const ListCardUser = () => {
  return (
    <>
      <div className="md:w-1/2 text-center p-5 border shadow h-full">
        <h1 className={`font-thin text-3xl my-6 text-[${primary}]`}>Users</h1>
        <ul className="flex flex-col gap-1 border">
          <li className="grid grid-cols-4   items-center border p-2 px-4">
            <span>No</span>
            <span>Name</span>
            <span>Ponits</span>
            <span>Action</span>
          </li>
          <li className="grid grid-cols-4  items-center border p-2 px-4">
            <span>1</span>
            <span>Arjun</span>
            <span>507</span>
            <span className="flex justify-center cursor-pointer"><MdDelete className={`hover:text-red-500 text-[${secondary}]`}/></span>
          </li>
          <li className="grid grid-cols-4  items-center border p-2 px-4">
            <span>2</span>
            <span>Vishnu</span>
            <span>802</span>
            <span className="flex justify-center cursor-pointer"><MdDelete className={`hover:text-red-500 text-[${secondary}]`}/></span>
          </li>
        </ul>
      </div>
    </>
  );
};
