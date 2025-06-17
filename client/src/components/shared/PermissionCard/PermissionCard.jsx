import { useState } from "react";
import { dark, light, medium } from "../../../../utils/constants";
import { FaCheckCircle } from "react-icons/fa";

export const PermissionCard = () => {
  const [productRead, setProductRead] = useState();
  const [productPermission] = useState([
    "product_read",
    "product_update",
    "product_delete",
    "product_create",
  ]);
  const categoryPermissions = useState([
    "category_read",
    "category_update",
    "category_delete",
    "category_create",
  ]);
  const customerPermissions = useState([
    "customer_read",
    "customer_update",
    "customer_delete",
    "customer_create",
  ]);

  return (
    <div className=" flex flex-col gap-1 rounded-lg shadow-2xl p-10 md:w-1/2 md:h-96">
      <h1 className="font-semibold mb-2">Permission Management</h1>

      <div>
        <div
          style={{ background: `${dark}` }}
          className=" flex justify-between px-4  text-tertiary text-center font-bold py-2"
        >
          Product
        </div>
        <div className="grid grid-cols-12">
          <div
            style={{ background: `${dark}` }}
            className="border rounded cursor-pointer hover:opacity-90 col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            <span className="flex justify-between items-center">
              Create
              <FaCheckCircle
                className="text-green-400 border bg-tertiary rounded-full"
                size={18}
              />
            </span>
          </div>
          <div
            style={{ background: `${dark}` }}
            className="border cursor-pointer hover:opacity-90 rounded col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            <span className="flex justify-between items-center">
              Read
              <FaCheckCircle
                className="text-green-400 border bg-tertiary rounded-full"
                size={18}
              />
            </span>
          </div>
          <div
            style={{ background: `${dark}` }}
            className="border cursor-pointer hover:opacity-90 rounded col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white"
          >
            <span className="flex justify-between items-center">
              Update
              <FaCheckCircle
                className="text-green-400 border bg-tertiary rounded-full"
                size={18}
              />
            </span>
          </div>
          <div
            style={{ background: `${dark}` }}
            className="cursor-pointer hover:opacity-90 border rounded col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            <span className="flex justify-between items-center">
              Delete
              <FaCheckCircle
                className="text-green-400 border bg-tertiary rounded-full"
                size={18}
              />
            </span>
          </div>
        </div>
      </div>

      <div>
        <div
          style={{ background: `${medium}` }}
          className=" flex justify-between px-4  text-tertiary text-center font-bold py-2 "
        >
          Category
        </div>
        <div className="grid grid-cols-12 w-full">
          <div
            style={{ background: `${medium}` }}
            className=" col-span-12 md:col-span-3 rounded cursor-pointer hover:opacity-90 border  p-3  text-sm font-semibold text-center text-white "
          >
            <span className="flex justify-between items-center">
              Create
              <FaCheckCircle
                className="text-green-400 border bg-tertiary rounded-full"
                size={18}
              />
            </span>
          </div>
          <div
            style={{ background: `${medium}` }}
            className="rounded cursor-pointer hover:opacity-90 col-span-12 md:col-span-3 border  p-3  text-sm font-semibold text-center text-white "
          >
            <span className="flex justify-between items-center">
              Read
              <FaCheckCircle
                className="text-green-400 border bg-tertiary rounded-full"
                size={18}
              />
            </span>
          </div>
          <div
            style={{ background: `${medium}` }}
            className="rounded cursor-pointer hover:opacity-90 col-span-12 md:col-span-3 border  p-3  text-sm font-semibold text-center text-white "
          >
            <span className="flex justify-between items-center">
              Update
              <FaCheckCircle
                className="text-green-400 border bg-tertiary rounded-full"
                size={18}
              />
            </span>
          </div>
          <div
            style={{ background: `${medium}` }}
            className="rounded cursor-pointer hover:opacity-90 border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            <span className="flex justify-between items-center">
              Delete
              <FaCheckCircle
                className="text-green-400 border bg-tertiary rounded-full"
                size={18}
              />
            </span>
          </div>
        </div>
      </div>
      <div>
        <div
          style={{ background: `${light}` }}
          className=" flex justify-between px-4 text-tertiary text-center font-bold py-2"
        >
          Customer
        </div>
        <div className="grid grid-cols-12 w-full">
          <div
            style={{ background: `${light}` }}
            className="rounded cursor-pointer hover:opacity-90 border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            <span className="flex justify-between items-center">
              Create
              <FaCheckCircle
                className="text-green-400 border bg-tertiary rounded-full"
                size={18}
              />
            </span>
          </div>
          <div
            style={{ background: `${light}` }}
            className="rounded cursor-pointer hover:opacity-90 border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            <span className="flex justify-between items-center">
              Read
              <FaCheckCircle
                className="text-green-400 border bg-tertiary rounded-full"
                size={18}
              />
            </span>
          </div>
          <div
            style={{ background: `${light}` }}
            className="rounded cursor-pointer hover:opacity-90 border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            <span className="flex justify-between items-center">
              Update
              <FaCheckCircle
                className="text-green-400 border bg-tertiary rounded-full"
                size={18}
              />
            </span>
          </div>
          <div
            style={{ background: `${light}` }}
            className="rounded cursor-pointer hover:opacity-90 border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            <span className="flex justify-between items-center">
              Delete
              <FaCheckCircle
                className="text-green-400 border bg-tertiary rounded-full"
                size={18}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
