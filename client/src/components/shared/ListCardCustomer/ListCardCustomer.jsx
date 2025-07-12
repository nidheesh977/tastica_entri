import { useState } from "react";
import { MdDelete, MdEventNote } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AlertBox } from "../../shared/AlertBox/AlertBox";
import { useCustomers } from "../../../hooks/useCustomers";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

export const ListCardCustomer = ({ permissions }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedMobile, setEditedMobile] = useState("");
  const searchQuery = useSelector((state) => state?.search);
  const { customers, deleteCustomer, updateCustomer } = useCustomers();
  const navigate = useNavigate();
  const admin = useSelector((state) => state?.auth?.adminData);
  const customerData = customers?.filter((customer) => {
    const query = searchQuery.toLowerCase();

    return (
      customer?.customerName?.toLowerCase().includes(query) ||
      customer?.email?.toLowerCase().includes(query) ||
      customer?.phoneNumber.toString().toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full xl:w-auto text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-6 text-primary">
          Customers
        </h1>
      </div>

      <div className="overflow-auto h-96 pb-10">
        <table className="min-w-[768px] w-full border border-primary text-left text-sm sm:text-base">
          <thead className="bg-primary/10 font-semibold text-black">
            <tr>
              <th className="border border-primary px-4 py-2">No</th>
              <th className="border border-primary px-4 py-2">Name</th>
              <th className="border border-primary px-4 py-2">ID</th>
              <th className="border border-primary px-4 py-2">Mobile</th>
              <th className="border border-primary px-4 py-2">Points</th>
              <th className="border border-primary px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {customerData?.map((customer, index) => (
              <tr key={customer?._id} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">{index + 1}</td>
                <td className="border border-primary px-4 py-2">
                  {editId === customer?._id ? (
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    customer?.customerName
                  )}
                </td>
                <td className="border border-primary px-4 py-2 hover:text-primary" title="Click to view barcode">
                  <Link
                    to={`/${admin ? "admin" : "staff"}/print/barcode/${
                      customer?._id
                    }`}
                  >
                    {customer?.customerId}
                  </Link>
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === customer?._id ? (
                    <input
                      value={editedMobile}
                      onChange={(e) => setEditedMobile(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    customer?.phoneNumber
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {customer?.loyalityPoint}
                </td>
                <td className="border border-primary px-4 py-2 text-center">
                  <div className="flex justify-start items-center h-12 gap-2">
                    {editId === customer?._id ? (
                      <FaSave
                        title="Save"
                        size={20}
                        onClick={() => {
                          updateCustomer({
                            customerId: customer?._id,
                            customerName: editedName,
                            phoneNumber: editedMobile,
                          });

                          setEditId(null);
                        }}
                        className="text-primary hover:text-orange-600 cursor-pointer"
                      />
                    ) : (
                      <div className="flex gap-2 items-center mx-auto">
                        {permissions?.includes("customer_update") && (
                          <FiEdit
                            title="Edit"
                            size={20}
                            onClick={() => {
                              setEditId(customer?._id);
                              setEditedName(customer?.customerName);
                              setEditedMobile(customer?.phoneNumber);
                            }}
                            className="text-primary hover:text-orange-600 cursor-pointer"
                          />
                        )}
                        {permissions?.includes("customer_delete") && (
                          <MdDelete
                            title="Delete"
                            size={22}
                            onClick={() => setAlertMessage(customer?._id)}
                            className="hover:text-orange-600 text-primary cursor-pointer"
                          />
                        )}

                        <MdEventNote
                          onClick={() => {
                            navigate(
                              `/admin/customer/view/invoice/${customer?._id}`
                            );
                          }}
                          title="Invoices"
                          size={22}
                          className="text-primary hover:text-orange-600 cursor-pointer"
                        />
                      </div>
                    )}
                    {alertMessage === customer?._id && (
                      <AlertBox
                        message="Do you want to delete this customer?"
                        onConfirm={() => {
                          setAlertMessage(null);
                          deleteCustomer(customer?._id);
                        }}
                        onCancel={() => setAlertMessage(null)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
