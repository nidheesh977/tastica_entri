import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const PermissionCard = ({ togglePermission, hasPermission }) => {
  return (
    <div className=" flex flex-col gap-1 rounded-lg shadow-2xl p-10 md:w-1/2 ">
      <h1 className="font-semibold mb-2">Permission Management</h1>

      <div>
        <div className=" flex bg-dark justify-between px-4  text-tertiary text-center font-bold py-2">
          Product
        </div>
        <div className="grid grid-cols-12">
          <div className="border rounded bg-light cursor-pointer hover:bg-medium col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("product_create")}
            >
              Create
              {hasPermission("product_create") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>
          <div className="border bg-light cursor-pointer hover:bg-medium rounded col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("product_read")}
            >
              Read
              {hasPermission("product_read") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>
          <div className="border bg-light cursor-pointer hover:bg-medium rounded col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("product_update")}
            >
              Update
              {hasPermission("product_update") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>
          <div className="cursor-pointer bg-light hover:bg-medium border rounded col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("product_delete")}
            >
              Delete
              {hasPermission("product_delete") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className=" bg-dark flex justify-between px-4  text-tertiary text-center font-bold py-2 ">
          Category
        </div>
        <div className="grid grid-cols-12 w-full">
          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("category_create")}
            >
              Create
              {hasPermission("category_create") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>
          <div className="rounded bg-light cursor-pointer hover:bg-medium col-span-12 md:col-span-3 border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("category_read")}
            >
              Read
              {hasPermission("category_read") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>
          <div className="rounded bg-light cursor-pointer hover:bg-medium col-span-12 md:col-span-3 border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("category_update")}
            >
              Update
              {hasPermission("category_update") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>
          <div className="rounded bg-light cursor-pointer hover:bg-medium border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("category_delete")}
            >
              Delete
              {hasPermission("category_delete") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className=" flex bg-dark justify-between px-4 text-tertiary text-center font-bold py-2">
          Customer
        </div>
        <div className="grid grid-cols-12 w-full">
          <div className="bg-light rounded cursor-pointer hover:bg-medium border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("customer_create")}
            >
              Create
              {hasPermission("customer_create") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>
          <div className="bg-light rounded cursor-pointer hover:bg-medium border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("customer_read")}
            >
              Read
              {hasPermission("customer_read") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>
          <div className="rounded bg-light cursor-pointer hover:bg-medium border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("customer_update")}
            >
              Update
              {hasPermission("customer_update") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>
          <div className="rounded bg-light cursor-pointer hover:bg-medium border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("customer_delete")}
            >
              Delete
              {hasPermission("customer_delete") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>
        </div>
      </div>

      <div >
        <div className=" flex bg-dark justify-between px-4 text-tertiary text-center font-bold py-2 mt-5">
          Credit
        </div>

        <div className="grid grid-cols-12 w-full">
          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("credit_give")}
            >
              Credit give
              {hasPermission("credit_give") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("credit_create")}
            >
              Credit book create
              {hasPermission("credit_create") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("credit_read")}
            >
              Credit Read
              {hasPermission("credit_read") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("credit_pay")}
            >
              Credit Pay
              {hasPermission("credit_pay") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

        </div>

      </div>

      <div >
        <div className=" flex bg-dark justify-between px-4 text-tertiary text-center font-bold py-2 mt-5">
          Expense
        </div>

        <div className="grid grid-cols-12 w-full">
          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("view_expense")}
            >
              Expense View
              {hasPermission("view_expense") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("create_expense")}
            >
              Expense Create
              {hasPermission("create_expense") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>




        </div>

      </div>
      <div >
        <div className=" flex bg-dark justify-between px-4 text-tertiary text-center font-bold py-2 mt-5">
          Expense Account
        </div>

        <div className="grid grid-cols-12 w-full">
          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("view_expense_account")}
            >
              Account View
              {hasPermission("view_expense_account") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("create_expense_account")}
            >
              Account Create
              {hasPermission("create_expense_account") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("status_expense_account")}
            >
              Status Update
              {hasPermission("status_expense_account") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

        </div>

      </div>

      <div >
        <div className=" flex bg-dark justify-between px-4 text-tertiary text-center font-bold py-2 mt-5">
          Vendor
        </div>

        <div className="grid grid-cols-12 w-full">
          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("vendor_view")}
            >
              Vendor View
              {hasPermission("vendor_view") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("vendor_create")}
            >
              Vendor Create
              {hasPermission("vendor_create") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("vendor_change_status")}
            >
              Status Update
              {hasPermission("vendor_change_status") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

        </div>

      </div>

      <div >
        <div className=" flex bg-dark justify-between px-4 text-tertiary text-center font-bold py-2 mt-5">
          Payment Account
        </div>

        <div className="grid grid-cols-12 w-full">
          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("payment_acc_view")}
            >
              Account View
              {hasPermission("payment_acc_view") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("payment_acc_create")}
            >
              Account Create
              {hasPermission("payment_acc_create") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("payment_acc_change_status")}
            >
              Status Update
              {hasPermission("payment_acc_change_status") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

        </div>

      </div>
      <div >
        <div className=" flex bg-dark justify-between px-4 text-tertiary text-center font-bold py-2 mt-5">
          Tax Rate
        </div>

        <div className="grid grid-cols-12 w-full">
          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("tax_rate_view")}
            >
              Tax Rate View
              {hasPermission("tax_rate_view") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("tax_create")}
            >
              Tax Rate Create
              {hasPermission("tax_create") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

          <div className=" bg-light col-span-12 md:col-span-3 rounded cursor-pointer hover:bg-medium border  p-3  text-sm font-semibold text-center text-white ">
            <span
              className="flex justify-between items-center"
              onClick={() => togglePermission("tax_change_status")}
            >
              Status Update
              {hasPermission("tax_change_status") ? (
                <FaCheckCircle
                  className="text-green-400 border bg-tertiary rounded-full"
                  size={18}
                />
              ) : (
                <FaTimesCircle
                  className="text-red-400 border bg-tertiary rounded-full"
                  size={18}
                />
              )}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
