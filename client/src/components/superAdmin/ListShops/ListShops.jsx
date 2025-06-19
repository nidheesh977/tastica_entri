import { useSelector } from "react-redux";
import { useSuperAdmins } from "../../../hooks/useSuperAdmins";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { HiShieldCheck } from "react-icons/hi";
import { MdLockReset } from "react-icons/md";

export const ListShopCard = () => {
  const { shops, updateShop } = useSuperAdmins();

  const [editId, setEditId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedCountry, setEditedCountry] = useState("");
  const [editedCurrency, setEditedCurrency] = useState("");

  const searchQuery = useSelector((state) => state?.search);
  const navigate = useNavigate();
  const shopData = shops?.filter((shop) => {
    const query = searchQuery.toLowerCase();

    return (
      shop?.shopName?.toLowerCase().includes(query) ||
      shop?.email?.toLowerCase().includes(query) ||
      shop?.countryName.toLowerCase().includes(query) ||
      shop?.currencyCode.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full xl:w-auto text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-6 text-primary">
          Shops
        </h1>
      </div>

      <div className="overflow-auto h-96 pb-10">
        <table className="min-w-[768px] w-full border border-primary text-left text-sm sm:text-base">
          <thead className="bg-primary/10 font-semibold text-black">
            <tr>
              <th className="border border-primary px-4 py-2">No</th>
              <th className="border border-primary px-4 py-2">Shop Name</th>
              <th className="border border-primary px-4 py-2">Email</th>
              <th className="border border-primary px-4 py-2">Country</th>
              <th className="border border-primary px-4 py-2">Currency</th>
              <th className="border border-primary px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {shopData?.map((shop, index) => (
              <tr key={shop?._id} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">{index + 1}</td>
                <td className="border border-primary px-4 py-2">
                  {editId === shop?._id ? (
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    shop?.shopName
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === shop?._id ? (
                    <input
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    shop?.email
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === shop?._id ? (
                    <input
                      value={editedCountry}
                      onChange={(e) => setEditedCountry(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    shop?.countryName
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === shop?._id ? (
                    <input
                      value={editedCurrency}
                      onChange={(e) => setEditedCurrency(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    shop?.currencyCode
                  )}
                </td>
                <td className="border border-primary px-4 py-2 text-center">
                  <div className="flex justify-start items-center h-12 gap-2">
                    {editId === shop._id ? (
                      <FaSave
                        title="Save"
                        size={20}
                        className="text-primary hover:text-orange-600 cursor-pointer"
                        onClick={() => {
                          updateShop({
                            shopId: shop?._id,
                            shopName: editedName,
                            email: editedEmail,
                            countryName: editedCountry,
                            currencyCode: editedCurrency,
                          });
                          setEditId(null);
                        }}
                      />
                    ) : (
                      <>
                        <FiEdit
                          title="Edit"
                          size={20}
                          onClick={() => {
                            setEditId(shop?._id);
                            setEditedName(shop?.shopName);
                            setEditedEmail(shop?.email);
                            setEditedCountry(shop?.countryName);
                            setEditedCurrency(shop?.currencyCode);
                          }}
                          className="text-primary hover:text-orange-600 cursor-pointer"
                        />
                        <HiShieldCheck
                          onClick={() =>
                            navigate(`/admin/permissions/${shop?._id}`)
                          }
                          title="Permissions"
                          size={22}
                          className="hover:text-orange-600 text-primary cursor-pointer"
                        />
                        <MdLockReset
                          onClick={() =>
                            navigate(
                              `/super/admin/shop/reset/password/${shop?._id}`
                            )
                          }
                          title="Reset Password"
                          size={22}
                          className="hover:text-orange-600 text-primary cursor-pointer"
                        />
                      </>
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
