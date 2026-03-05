import { FaPlus } from "react-icons/fa6";
import { ExpenseTable } from "./ExpenseTable";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePermissionCheck } from "../../../hooks/usePermissionCheck";
export const ExpenseList = () => {


    const admin = useSelector(state => state.auth.adminData)

    const { hasPermission } = usePermissionCheck()

    const isPermissionApproved = hasPermission("create_expense")



    return (
        <div className='px-28 py-5'>
            <div className='flex justify-between items-center text-xl font-medium mb-10'>
                <h1>Expenses</h1>
                <Link className={`${!isPermissionApproved ? "cursor-not-allowed pointer-events-none" : ""} `} to={admin ? "/admin/expense/create" : "/staff/expense/create"}>
                    <button disabled={!isPermissionApproved} className="btn btn-sm btn-info text-white text-xs">
                        <FaPlus />
                        New
                    </button>
                </Link>
            </div>

            <hr className="my-5" />
            <ExpenseTable />
        </div>
    )
}
