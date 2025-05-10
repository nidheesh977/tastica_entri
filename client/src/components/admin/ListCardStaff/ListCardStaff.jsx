import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { AlertBox } from "../../shared/AlertBox/AlertBox";
import { useStaffs } from "../../../hooks/useStaffs";

export const ListCardStaff = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedMobile, setEditedMobile] = useState("");
  const {staffs, updateStaff, deleteStaff} = useStaffs()

  return (
    <div className="w-full xl:w-auto text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-6 text-primary">
          Staffs
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
              <th className="border border-primary px-4 py-2">Email</th>
              <th className="border border-primary px-4 py-2">Mobile</th>
              <th className="border border-primary px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {staffs?.map((staff, index) => (
              <tr key={staff?._id} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">{index + 1}</td>
                <td className="border border-primary px-4 py-2">
                  {editId === staff?._id ? (
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    staff?.userName
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === staff?._id ? (
                    <input
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    staff?.email
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === staff?._id ? (
                    <input
                      value={editedMobile}
                      onChange={(e) => setEditedMobile(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    staff?.phoneNumber
                  )}
                </td>
                <td className="border border-primary px-4 py-2 text-center">
                  <div className="flex justify-start items-center h-12 gap-2">
                    {editId === staff._id ? (
                      <FaSave
                        title="Save"
                        size={20}
                        onClick={() => {updateStaff(staff?._id, editedName, editedEmail, editedMobile)
                          setEditId(null);
                        }}
                        className="text-primary hover:text-blue-800 cursor-pointer"
                      />
                    ) : (
                      <>
                        <FiEdit
                          title="Edit"
                          size={20}
                          onClick={() => {
                            setEditId(staff?._id);
                            setEditedName(staff?.userName);
                            setEditedEmail(staff?.email);
                            setEditedMobile(staff?.phoneNumber);
                          }}
                          className="text-primary hover:text-blue-800 cursor-pointer"
                        />
                        <MdDelete
                          title="Delete"
                          size={22}
                          onClick={() => setAlertMessage(staff?._id)}
                          className="hover:text-red-500 text-secondary cursor-pointer"
                        />
                      </>
                    )}
                    {alertMessage === staff._id && (
                      <AlertBox
                        message="Do you want to delete this staff?"
                        onConfirm={() => {
                          setAlertMessage(null);
                          deleteStaff(staff._id);
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
