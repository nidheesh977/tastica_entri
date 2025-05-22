import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const OpenOrderCard = ({ savedInvoices }) => {
  const navigate = useNavigate();

  const admin = useSelector((state) => state?.auth?.adminData);

  return (
    <>
      {savedInvoices?.map((savedInvoice) => (
        <div
          onClick={() =>
            navigate(
              admin
                ? `/admin/open/orders/data/${savedInvoice?._id}`
                : `/staff/open/orders/data/${savedInvoice?._id}`
            )
          }
          key={savedInvoice?._id}
          className="bg-tertiary w-full md:w-56 h-20 text-sm rounded border flex flex-col justify-between border-primary  cursor-pointer hover:border-primary hover:border-2 font-semibold p-5"
        >
          <div className="h-10">
            <h1 className="pb-2 font-bold text-center">
              {savedInvoice?.customer?.customerName}
            </h1>
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
