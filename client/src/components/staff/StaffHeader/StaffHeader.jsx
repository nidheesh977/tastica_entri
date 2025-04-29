import { IoMenu } from "react-icons/io5";
import { useState } from "react";

export const StaffHeader = () => {
  const [open, setOpen] = useState(false)
  return (
    <nav className="w-full">
      <div className="md:flex mx-auto py-4 px-5 md:py-8  justify-between items-center bg-blue-950 text-white font-bold md:px-10 ">
        <div className="flex justify-between w-full md:w-1/2">
          <div>Staff</div>

          <div className="md:hidden"><IoMenu size={20} onClick={()=> setOpen(!open)}/></div>
        </div>
        <div className={`flex w-full md:w-auto md:block mt-14 md:mt-0 justify-end ${open ? 'block' : 'hidden'}`}>
          <ul className='md:flex  gap-10 bg-blue-950 p-5 md:p-0 w-full text-center'>
            <li className="border rounded-md py-2 md:py-0   mb-2 md:border-none">Home</li>
            <li className="border rounded-md py-2 md:py-0   mb-2 md:border-none">About</li>
            <li className="border rounded-md py-2 md:py-0   mb-2 md:border-none">Contact</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};