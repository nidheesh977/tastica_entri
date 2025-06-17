import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { AlertBox } from "../../shared/AlertBox/AlertBox";
import { useDispatch, useSelector } from "react-redux";
import { useSuperAdmins } from "../../../hooks/useSuperAdmins";
import { saveSelectedShopId } from "../../../redux/features/selectedShopSlice";

export const ListStaffCardSuperAdmin = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedMobile, setEditedMobile] = useState("");
  const [shopId, setShopId] = useState("");
  const { shops, shopStaffs, updateStaff, deleteStaff } = useSuperAdmins();
  const searchQuery = useSelector((state) => state?.search);
  const dispatch = useDispatch();

  const staffData = shopStaffs?.filter((staff) => {
    const query = searchQuery.toLowerCase();

    return (
      staff?.userName?.toLowerCase().includes(query) ||
      staff?.email?.toLowerCase().includes(query) ||
      staff?.phoneNumber.toString().toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full xl:w-auto text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <div className="flex justify-between items-center  font-thin text-start md:col-span-12 text-3xl my-6 text-primary">
          <div>Employees</div>

          <select
            value={shopId}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setShopId(selectedValue);
              dispatch(saveSelectedShopId(selectedValue));
            }}
            className=" rounded p-2 text-lg border border-primary my-1  bg-tertiary text-primary shadow-2xl outline-primary"
          >
            <option className="bg-white" value="">
              Select a shop
            </option>
            {shops?.map((shop) => (
              <option
                className="bg-tertiary text-primary"
                key={shop?._id}
                value={shop?._id}
              >
                {shop?.shopName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-auto h-96 pb-10">
        <table className="min-w-[768px] w-full border border-primary text-left text-sm sm:text-base">
          <thead className="bg-primary/10 font-semibold text-black">
            <tr>
              <th className="border border-primary px-4 py-2">No</th>
              <th className="border border-primary px-4 py-2">Name</th>
              <th className="border border-primary px-4 py-2">Role</th>
              <th className="border border-primary px-4 py-2">Email</th>
              <th className="border border-primary px-4 py-2">Mobile</th>
              <th className="border border-primary px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {staffData?.map((staff, index) => (
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
                  {staff?.role}
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
                        onClick={() => {
                          updateStaff({
                            staffId: staff?._id,
                            userName: editedName,
                            email: editedEmail,
                            phoneNumber: editedMobile,
                          });
                          setEditId(null);
                        }}
                        className="text-primary hover:text-orange-600 cursor-pointer"
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
                          className="text-primary hover:text-orange-600 cursor-pointer"
                        />
                        <MdDelete
                          title="Delete"
                          size={22}
                          onClick={() => setAlertMessage(staff?._id)}
                          className="hover:text-orange-600 text-primary cursor-pointer"
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
