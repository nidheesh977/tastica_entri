import { MdDelete } from "react-icons/md";

export const ListCardCategory = () => {
  return (
    <>
      <div className="xl:w-1/2 text-center md:pt-5 pb-14 px-1 md:px-5 m-2 border border-primary shadow h-full">
        <div className="grid grid-cols-12 items-center">
          <h1 className="font-thin text-xs  text-start col-span-8 sm:text-3xl my-6 text-primary">
            Categories
          </h1>
          <input
            className="rounded-xl text-[${primary}] shadow col-span-4 outline-primary h-10 p-5"
            type="text"
            placeholder="Search"
          />
        </div>
        <ul className="flex flex-col text-xs sm:text-base  gap-1 border-l border-r border-t border-primary">
          <li className="text-xs sm:text-base grid grid-cols-4 gap-4 md:gap-0 border-b border-primary items-center  p-2 md:px-4">
            <span>No</span>
            <span>Category</span>
            <span>Discount</span>
            <span>Action</span>
          </li>
          <li className="grid grid-cols-4 gap-4 md:gap-0  items-center border-b border-primary p-2 px-4">
            <span>1</span>
            <span>Curry Powder</span>
            <span>5%</span>
            <span className="flex justify-center cursor-pointer">
              <MdDelete className="hover:text-red-500 text-secondary" />
            </span>
          </li>
          <li className="grid grid-cols-4 gap-4 md:gap-0 items-center p-2 px-4 border-b border-primary">
            <span>2</span>
            <span>Detergents</span>
            <span>10%</span>
            <span className="flex justify-center cursor-pointer">
              <MdDelete className="hover:text-red-500 text-secondary" />
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};
