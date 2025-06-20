import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const PermissionCard = ({ togglePermission, hasPermission }) => {
  return (
    <div className=" flex flex-col gap-1 rounded-lg shadow-2xl p-10 md:w-1/2 md:h-96">
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
    </div>
  );
};
