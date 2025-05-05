import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AlertBox } from "../../shared/AlertBox/AlertBox";

export const ListCardCustomer = () => {
  const [customers, setCustomers] = useState([
    { index: 0, _id: 1, name: "Arjun", points: 507 },
    { index: 1, _id: 2, name: "Vishnu", points: 802 },
  ]);

  const [alertMessage, setAlertMessage] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const updateCustomerData = (id) => {
    setEditId(null);
   
  };

  const deleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((cust) => cust._id !== id));
  };

  return (
    <div className="w-full xl:w-auto text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-6 text-primary">
          Customers
        </h1>
        <input
          className="rounded-xl shadow md:col-span-4 outline-primary h-10 p-5 w-full"
          type="text"
          placeholder="Search"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[768px] w-full border border-primary text-left text-sm sm:text-base">
          <thead className="bg-primary/10 font-semibold text-black">
            <tr>
              <th className="border border-primary px-4 py-2">No</th>
              <th className="border border-primary px-4 py-2">Name</th>
              <th className="border border-primary px-4 py-2">Points</th>
              <th className="border border-primary px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((cust, index) => (
              <tr key={cust._id} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">{index + 1}</td>
                <td className="border border-primary px-4 py-2">
                  {editId === cust._id ? (
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    cust.name
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {cust.points}
                </td>
                <td className="border border-primary px-4 py-2 text-center">
                  <div className="flex justify-start items-center h-12 gap-2">
                    {editId === cust._id ? (
                      <FaSave
                        title="Save"
                        size={20}
                        onClick={() => updateCustomerData(cust._id)}
                        className="text-primary hover:text-blue-800 cursor-pointer"
                      />
                    ) : (
                      <>
                        <FiEdit
                          title="Edit"
                          size={20}
                          onClick={() => {
                            setEditId(cust._id);
                            setEditedName(cust.name);
                          }}
                          className="text-primary hover:text-blue-800 cursor-pointer"
                        />
                        <MdDelete
                          title="Delete"
                          size={22}
                          onClick={() => setAlertMessage(cust._id)}
                          className="hover:text-red-500 text-secondary cursor-pointer"
                        />
                      </>
                    )}
                    {alertMessage === cust._id && (
                      <AlertBox
                        message="Do you want to delete this customer?"
                        onConfirm={() => {
                          setAlertMessage(false);
                          deleteCustomer(cust._id);
                        }}
                        onCancel={() => setAlertMessage(false)}
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
