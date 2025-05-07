import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AlertBox } from "../../shared/AlertBox/AlertBox";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";

export const ListCardCustomer = () => {
  const [customers, setCustomers] = useState([]);

  const [alertMessage, setAlertMessage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedMobile, setEditedMobile] = useState("");

  const fetchCustomer = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/customer",
        withCredentials: true,
      });
      setCustomers(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCustomerData = async (id) => {
    try {
      await axiosInstance({
        method: "PUT",
        url: `/customer/${id}`,
        withCredentials: true,
      });
      fetchCustomer();
      toast.success("Customer details updated successfully");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
    setEditId(null);
  };

  const deleteCustomer = async(id) => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/customer/${id}`,
        withCredentials: true,
      });
      fetchCustomer();
      toast.success("Customer deleted successfully");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
    setEditId(null);
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

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
              <th className="border border-primary px-4 py-2">Mobile</th>
              <th className="border border-primary px-4 py-2">Points</th>
              <th className="border border-primary px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer, index) => (
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
                        onClick={() => updateCustomerData(customer?._id)}
                        className="text-primary hover:text-blue-800 cursor-pointer"
                      />
                    ) : (
                      <>
                        <FiEdit
                          title="Edit"
                          size={20}
                          onClick={() => {
                            setEditId(customer?._id);
                            setEditedName(customer?.customerName);
                            setEditedMobile(customer?.phoneNumber);
                          }}
                          className="text-primary hover:text-blue-800 cursor-pointer"
                        />
                        <MdDelete
                          title="Delete"
                          size={22}
                          onClick={() => setAlertMessage(customer?._id)}
                          className="hover:text-red-500 text-secondary cursor-pointer"
                        />
                      </>
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
