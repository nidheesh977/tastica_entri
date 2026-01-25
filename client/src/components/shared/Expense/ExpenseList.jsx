import { FaPlus } from "react-icons/fa6";
import { ExpenseTable } from "./ExpenseTable";
import { Link } from "react-router-dom";

export const ExpenseList = () => {




    return (
        <div className='px-28 py-5'>
            <div className='flex justify-end'>
                <Link to={"/admin/expense/create"}>
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
