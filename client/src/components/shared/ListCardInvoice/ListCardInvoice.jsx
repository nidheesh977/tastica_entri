import { useState } from "react";
import { MdDelete, MdRestoreFromTrash } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ListCardInvoice = ({
  invoices,
  setStatus,
  handleInvoiceDelete,
}) => {
  const searchQuery = useSelector((state) => state?.search);
  const [paid, setPaid] = useState(true);
  const [refunded, setRefunded] = useState(false);
  const [custom, setCustom] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [editId, setEditId] = useState(null);
  const [archiveReason, setArchiveReason] = useState("");

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
        {setStatus && (
          <div className="flex items-center lg:gap-3">
            <span
              className={`cursor-pointer text-sm px-2 pb-1 ${
                paid ? "border-b-2 border-black" : ""
              }`}
              onClick={() => {
                setPaid(true);
                setRefunded(false);
                setCustom(false);
                setDeleted(false);
                setStatus("paid");
              }}
            >
              Paid
            </span>
            <span
              className={`cursor-pointer text-sm px-2 pb-1 ${
                refunded ? "border-b-2 border-black" : ""
              }`}
              onClick={() => {
                setPaid(false);
                setRefunded(true);
                setCustom(false);
                setDeleted(false);
                setStatus("refunded");
              }}
            >
              Refunded
            </span>
            <span
              className={`cursor-pointer text-sm px-2 pb-1 ${
                custom ? "border-b-2 border-black" : ""
              }`}
              onClick={() => {
                setPaid(false);
                setRefunded(false);
                setCustom(true);
                setDeleted(false);
                setStatus("custom");
              }}
            >
              Custom
            </span>
            <span
              className={`cursor-pointer text-sm px-2 pb-1 ${
                deleted ? "border-b-2 border-black" : ""
              }`}
              onClick={() => {
                setPaid(false);
                setRefunded(false);
                setCustom(false);
                setDeleted(true);
                setStatus("archived");
              }}
            >
              Deleted
            </span>
          </div>
        )}
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
              <th className="border border-primary px-4 py-2">Actions</th>
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
                <td className="border px-4 py-2">
                  {editId === invoice?._id ? (
                    <div className="flex flex-col items-center gap-2">
                      <textarea
                        className="border rounded-md w-full border-primary outline-primary p-2"
                        placeholder="Reason"
                        onChange={(e) => setArchiveReason(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          handleInvoiceDelete({
                            actions: "archive",
                            invoiceId: editId,
                            archiveReason,
                          });

                          setEditId(null);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Confirm Delete
                      </button>
                    </div>
                  ) : invoice?.invoiceStatus === "archived" ? (
                    <MdRestoreFromTrash
                      title="Restore"
                      size={22}
                      onClick={() => {
                        handleInvoiceDelete({
                          actions: "restore",
                          invoiceId: invoice?._id,
                        });
                      }}
                      className="hover:text-green-600 text-primary cursor-pointer"
                    />
                  ) : (
                    <MdDelete
                      title="Delete"
                      size={22}
                      onClick={() => setEditId(invoice?._id)}
                      className="hover:text-orange-600 text-primary cursor-pointer"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
