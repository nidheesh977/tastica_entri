import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AlertBox } from "../AlertBox/AlertBox";
import { useState } from "react";
import { useInvoices } from "../../../hooks/useInvoices";
import { MdEventNote } from "react-icons/md";
export const OpenOrderCard = ({ savedInvoices }) => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const admin = useSelector((state) => state?.auth?.adminData);
  const { deleteOpenOrder } = useInvoices();

  return (
    <>
      {savedInvoices?.map((savedInvoice) => (
        <div
          key={savedInvoice?._id}
          className="bg-tertiary w-full md:w-56 h-28 text-sm rounded border flex flex-col justify-between border-primary  cursor-pointer   font-semibold p-5"
        >
          <div className="h-10 flex items-center justify-between">
            <h1 className="font-bold text-center ">
              {savedInvoice?.customer?.customerName}
            </h1>
            <div className="flex gap-2">
              <MdEventNote
                title="View Invoice"
                size={20}
                className="text-primary hover:text-orange-600 "
                onClick={() =>
                  navigate(
                    admin
                      ? `/admin/open/orders/data/${savedInvoice?._id}`
                      : `/staff/open/orders/data/${savedInvoice?._id}`,
                  )
                }
              />
              <FaTrash
                title="Delete open order"
                className="text-primary hover:text-orange-600 cursor-pointer"
                onClick={() => setAlertMessage(savedInvoice?._id)}
                size={16}
              />
            </div>
            {alertMessage === savedInvoice?._id && (
              <AlertBox
                message="Do you want to delete this open order?"
                onConfirm={() => {
                  setAlertMessage(null);

                  deleteOpenOrder(savedInvoice?._id);
                }}
                onCancel={() => setAlertMessage(null)}
              />
            )}
          </div>
          <div>
            <p className=" border-t  border-black text-center font-bold ">
              {savedInvoice?.customer?.phoneNumber}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
