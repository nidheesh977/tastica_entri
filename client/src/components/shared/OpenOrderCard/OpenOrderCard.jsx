import { Link, useParams } from "react-router-dom";
export const OpenOrderCard = ({ savedInvoices }) => {
  const { id } = useParams();
  return (
    <>
      {savedInvoices?.map((savedInvoice) => (
        <Link to={`/admin/open/orders/data/${savedInvoice?._id}`} key={savedInvoice?._id}>
              
        <div
          className="bg-tertiary w-full md:w-56 h-20 text-sm rounded border flex flex-col justify-between border-black  cursor-pointer hover:border-primary hover:border-2 font-semibold p-5"
          
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
         </Link>
      ))}
    </>
  );
};
