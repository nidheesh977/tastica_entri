import { FaPlus } from "react-icons/fa6";
import { ExpenseTable } from "./ExpenseTable";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export const ExpenseList = () => {


    const admin = useSelector(state => state.auth.adminData)


    return (
        <div className='px-28 py-5'>
            <div className='flex justify-end mb-10'>
                <Link to={admin ? "/admin/expense/create" : "/staff/expense/create"}>
                    <button className="btn btn-sm btn-info text-white text-xs">
                        <FaPlus />
                        New
                    </button>
                </Link>
            </div>
            <ExpenseTable />
        </div>
    )
}
