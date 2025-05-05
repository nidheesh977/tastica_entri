import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AlertBox } from "../../shared/AlertBox/AlertBox";

export const ListCardStaff = () => {
  const [staffs, setStaffs] = useState([
    { index: 0, _id: 1, name: "Arjun" },
    { index: 1, _id: 2, name: "Ashai" },
  ]);
  const [alertMessage, setAlertMessage] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editedStaffName, setEditedStaffName] = useState("");

  const updateStaffData = (id) => {
    setEditId(null);
  };

  const deleteStaff = (id) => {};

  return (
    <div className="text-center pt-5 pb-14 px-2 sm:px-5 m-2 border border-primary shadow h-full">
      <div className="grid grid-cols-12 items-center">
        <h1 className="font-thin text-start col-span-7 text-xs sm:text-3xl my-6 text-primary">
          Staffs
        </h1>
        <input
          className="rounded-xl shadow col-span-5 outline-primary h-10 p-2 text-xs sm:text-base"
          type="text"
          placeholder="Search"
        />
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto border border-primary text-left text-xs sm:text-base">
          <thead className="bg-primary/10">
            <tr className="border-b border-primary">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff._id} className="border-b border-primary">
                <td className="px-4 py-2">{staff.index + 1}</td>
                <td className="px-4 py-2">
                  {editId === staff._id ? (
                    <input
                      className="rounded p-1 shadow w-full"
                      type="text"
                      value={editedStaffName}
                      onChange={(e) => setEditedStaffName(e.target.value)}
                    />
                  ) : (
                    <span>{staff?.name}</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {editId === staff._id ? (
                    <div className="flex items-center justify-start gap-2 cursor-pointer w-16 h-12">
                      <FaSave
                        title="Save"
                        onClick={() => updateStaffData(staff._id)}
                        size={20}
                        className="text-primary hover:text-blue-800"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 justify-start cursor-pointer w-16 h-12">
                      <FiEdit
                        title="Edit"
                        className="text-primary hover:text-blue-800"
                        size={20}
                        onClick={() => {
                          setEditId(staff?._id);
                          setEditedStaffName(staff.name);
                        }}
                      />
                      <MdDelete
                        size={25}
                        title="Delete"
                        onClick={() => setAlertMessage(true)}
                        className="hover:text-red-500 text-secondary"
                      />
                      {alertMessage && (
                        <AlertBox
                          message="Do you want to delete this staff?"
                          onConfirm={() => {
                            setAlertMessage(false);
                            deleteStaff(staff._id);
                          }}
                          onCancel={() => setAlertMessage(false)}
                        />
                      )}
                    </div>
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
