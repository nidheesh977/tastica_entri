import { FaStore } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { removeShopData } from "../../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

export const ShopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const shopname = useSelector((state) => state.auth?.shopData?.shopname);
  return (
    <nav className="w-full">
      <div className="md:flex mx-auto py-4 px-5  justify-between items-center bg-[#155E95] text-white font-bold md:px-10 ">
        <div className="flex justify-between items-center w-full md:w-1/2">
          <div className="cursor-pointer flex items-center gap-4">
            <span className="text-xl font-thin">Tastica</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {shopname && <FaStore size={20} />}
          {shopname && <p>{shopname}</p>}
          {shopname && (
            <MdLogout
              onClick={() => {dispatch(removeShopData())
                navigate('/')
              }}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </nav>
  );
};
