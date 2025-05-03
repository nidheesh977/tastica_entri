import { MdDelete } from "react-icons/md";

export const ListCardStaff = () => {
  return (
    <>
      <div className="md:w-1/2 text-center pt-5 pb-14 px-5 m-2  border border-primary  shadow h-full">
        <div className="grid grid-cols-12 items-center">
          <h1 className="font-thin text-start col-span-8 text-3xl my-6 text-primary">
            Staffs
          </h1>
          <input
            className="rounded-xl  shadow col-span-4 outline-primary h-10 p-5"
            type="text"
            placeholder="Search"
          />
        </div>

        <ul className="flex flex-col border-l border-r border-t border-primary gap-1">
          <li className="grid grid-cols-3 border-b border-primary items-center p-2 px-4">
            <span>No</span>
            <span>Name</span>
            <span>Action</span>
          </li>
          <li className="grid grid-cols-3 border-b border-primary items-center  p-2 px-4">
            <span>1</span>
            <span>Arjun</span>
            <span className="flex justify-center cursor-pointer">
              <MdDelete className="hover:text-red-500 text-secondary" />
            </span>
          </li>
          <li className="grid grid-cols-3 border-b border-primary  items-center  p-2 px-4">
            <span>2</span>
            <span>Vishnu</span>
            <span className="flex justify-center cursor-pointer">
              <MdDelete className="hover:text-red-500 text-secondary" />
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};
