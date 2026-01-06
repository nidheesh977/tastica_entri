import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom"

export const AdminDashBoardButton = ({ title, buttonColor, route }) => {
    return (
        <>
            <Link to={route} className='mr-auto w-32 h-10 block mb-2'>
                <button className={`w-32 h-10  flex items-center justify-center gap-2 font-medium text-white rounded-md ${buttonColor}`}>
                    <IoMdArrowBack />
                    {title}
                </button>
            </Link>
        </>
    )
}
