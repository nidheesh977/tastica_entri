import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ListCardInvoice = ({ invoices }) => {
  const searchQuery = useSelector((state) => state?.search);
  const [all, setAll] = useState(false);
  const [cash, setCash] = useState();
  const [swipe, setSwipe] = useState(false);
  const [stripe, setStripe] = useState(false);
  const [method] = useState(false);

  const invoicesData = invoices?.filter((invoice) => {
    const query = searchQuery.toLowerCase();

    return (
      invoice?.invoiceNumber?.toString().toLowerCase().includes(query) ||
      invoice?.staff?.toLowerCase().includes(query) ||
      invoice?.customer?.customerName?.toLowerCase().includes(query) ||
      invoice?.customer?.phoneNumber?.toString().includes(query) ||
      invoice?.totalDiscount?.toString().includes(query) ||
      invoice?.totalAmount?.toString().includes(query)
    );
  });

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const showCustomerColumn = invoices?.some(
    (inv) => inv?.customer?.customerName
  );
  const showPhoneColumn = invoices?.some((inv) => inv?.customer?.phoneNumber);

  return (
    <div className="md:w-5/6 w-full text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-3 text-primary">
          Invoices
        </h1>
        <div className="flex items-center lg:gap-3">
          <span
            className={`cursor-pointer text-sm px-2 pb-1 ${
              all ? "border-b-2 border-black" : ""
            }`}
            onClick={() => {
              setAll(true);
              setCash(false);
              setSwipe(false);
              setStripe(false);
              method("all");
            }}
          >
            All
          </span>
          <span
            className={`cursor-pointer text-sm px-2 pb-1 ${
              cash ? "border-b-2 border-black" : ""
            }`}
            onClick={() => {
              setCash(true);
              setSwipe(false);
              setStripe(false);
              setAll(false);
              method("cash");
            }}
          >
            Cash
          </span>
          <span
            className={`cursor-pointer text-sm px-2 pb-1 ${
              swipe ? "border-b-2 border-black" : ""
            }`}
            onClick={() => {
              setSwipe(true);
              setCash(false);
              setStripe(false);
              setAll(false);
              method("internal-device");
            }}
          >
            Swipe
          </span>
          <span
            className={`cursor-pointer text-sm px-2 pb-1 ${
              stripe ? "border-b-2 border-black" : ""
            }`}
            onClick={() => {
              setStripe(true);
              setSwipe(false);
              setCash(false);
              setAll(false);
              method("digital");
            }}
          >
            Stripe
          </span>
        </div>
      </div>

      <div className="overflow-auto h-96 pb-10">
        <table className="min-w-[768px] w-full border border-primary text-left text-sm sm:text-base">
          <thead className="bg-primary/10 font-semibold text-black">
            <tr>
              <th className="border border-primary px-4 py-2">No</th>
              <th className="border border-primary px-4 py-2">
                Invoice Number
              </th>
              <th className="border border-primary px-4 py-2">Date</th>
              <th className="border border-primary px-4 py-2">Staff</th>
              {showCustomerColumn && (
                <th className="border border-primary px-4 py-2">Customer</th>
              )}
              {showPhoneColumn && (
                <th className="border border-primary px-4 py-2">Mobile</th>
              )}
              <th className="border border-primary px-4 py-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoicesData?.map((invoice, index) => (
              <tr key={invoice?._id} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">{index + 1}</td>
                <td className="border border-primary px-4 py-2 hover:text-primary">
                  <Link to={`/admin/invoice/data/${invoice?._id}`}>
                    {" "}
                    {invoice?.invoiceNumber}
                  </Link>
                </td>
                <td className="border border-primary px-4 py-2">
                  {formatDate(invoice?.createdAt)}
                </td>
                <td className="border border-primary px-4 py-2">
                  {invoice?.staff}
                </td>
                {invoice?.customer?.customerName && (
                  <td className="border border-primary px-4 py-2">
                    {invoice?.customer?.customerName}
                  </td>
                )}

                {invoice?.customer?.phoneNumber && (
                  <td className="border border-primary px-4 py-2">
                    {invoice?.customer?.phoneNumber}
                  </td>
                )}

                <td className="border border-primary px-4 py-2">
                  {invoice?.totalAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
