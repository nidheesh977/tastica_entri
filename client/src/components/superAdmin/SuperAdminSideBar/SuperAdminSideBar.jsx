import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { MdPersonAdd } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toggleSideBar } from "../../../redux/features/sidebarSlice";

export const SuperAdminSideBar = () => {
  const sidebar = useSelector((state) => state.sidebar.sideBar);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSideBar = (route) => {
    navigate(route);
  };

  return (
    <div
      className={`
      fixed top-15 md:top-[99px]  left-0 h-[81%] md:h-[77%] xl:h-[81%] w-96 bg-tertiary backdrop-blur  shadow-2xl text-white
      transform ${sidebar ? "translate-x-0" : "-translate-x-full"}
      transition-transform duration-300 ease-in-out
      z-50
    `}
    >
      <ul className="w-full flex flex-col gap-1 text-lg font-bold p-2 text-primary">
        <li
          onClick={() => {
            handleSideBar("/staff");
            dispatch(toggleSideBar());
          }}
          className={
            " bg-tertiary rounded border flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
          }
        >
          <FaHome />
          Home
        </li>

        <li
          onClick={() => {
            handleSideBar("/staff/customer/add");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdPersonAdd />
          Add Customer
        </li>

        <li
          onClick={() => {
            handleSideBar("/staff");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary rounded border flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaShoppingCart />
          Shopping Cart
        </li>

        
      </ul>
    </div>
  );
};
