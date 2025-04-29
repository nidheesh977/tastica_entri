import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { primary, tertiary } from "../../../utils/constants";
import { FaBoxOpen } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { FaBox } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';    

export const SideBar = () => {
  const sidebar = useSelector((state) => state.sidebar.sideBar);

  return (
    <div
      className={`
      fixed top-15 md:top-[99px]  left-0 h-[81%] md:h-[77%] xl:h-[81%] w-60 bg-${tertiary} shadow-2xl text-white 
      transform ${sidebar ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-300 ease-in-out
      z-50
    `}
    >
      <ul className="w-full flex flex-col gap-1 text-lg font-bold p-2">
        <li
          className={` bg-[${primary}] rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10`}
        >
          <FaHome />
          Home
        </li>

        <li
          className={` bg-[${primary}]  rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10`}
        >
          <FaUsers />
          Staffs
        </li>
        <li
          className={` bg-[${primary}] rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10`}
        >
          <MdPersonAdd />
          Add Staff
        </li>
        <li
          className={` bg-[${primary}] rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10`}
        >
          <FaBoxOpen />
          Products
        </li>
        <li
          className={` bg-[${primary}] rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10`}
        >
          <FaBox />
          Add Product
        </li>
        <li
          className={` bg-[${primary}] rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10`}
        >
          <FaShoppingCart />
          Shopping Cart
        </li>
      </ul>
    </div>
  );
};
