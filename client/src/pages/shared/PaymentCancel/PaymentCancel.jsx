import { FaCheckCircle } from "react-icons/fa"; 
import { MdShoppingCart, MdCancel } from "react-icons/md";
import {SideBar} from '../../../components/shared/SideBar/SideBar'
import { useNavigate } from "react-router-dom";

export const PaymentCancel = () => {
  const navigate = useNavigate()
  return (
    <>
    <SideBar/>
    <div className="flex flex-col justify-center items-center gap-4 mt-10 font-bold text-primary text-xl shadow-2xl w-96 h-96 mx-auto  rounded" >

    <MdCancel size={50} className="text-red-600"/>
   <p>Payment Cancelled</p> 
   <button className="bg-primary flex gap-2 items-center cursor-pointer hover:bg-opacity-90 text-white px-2 text-base py-1 rounded" onClick={()=> navigate('/admin/cart')}>
    <MdShoppingCart/> Back to Home</button>
    </div>
    </>
  )
}
