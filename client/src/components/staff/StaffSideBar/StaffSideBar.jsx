import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdPersonAdd, MdReceipt } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const StaffSideBar = () => {
  const sidebar = useSelector((state) => state.sidebar.sideBar);

  const navigate = useNavigate();
  const handleSideBar = (route) => {
    navigate(route);
  };

  return (
    <div
      className={`
      fixed top-15 md:top-[99px]  left-0 h-[81%] md:h-[77%] xl:h-[81%] w-60 bg-tertiary backdrop-blur  shadow-2xl text-white
      transform ${sidebar ? "translate-x-0" : "-translate-x-full"}
      transition-transform duration-300 ease-in-out
      z-50
    `}
    >
      <ul className="w-full flex flex-col gap-1 text-lg font-bold p-2">
        <li
          onClick={() => handleSideBar("/staff")}
          className={
            " bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
          }
        >
          <FaHome />
          Home
        </li>

        <li
          onClick={() => handleSideBar("/staff/customer/add")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdPersonAdd />
          Add Customer
        </li>

        <li
          onClick={() => handleSideBar("/staff")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaShoppingCart />
          Shopping Cart
        </li>

        <li
          onClick={() => handleSideBar("/staff/open/orders")}
          className="bg-primary rounded flex items-center hover:bg-opacity-90 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdReceipt />
          Open Orders
        </li>
      </ul>
    </div>
  );
};
