import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { AlertBox } from "../AlertBox/AlertBox";
import { useCategories } from "../../../hooks/useCategories";
import { useSelector } from "react-redux";

export const ListCardCategory = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const searchQuery = useSelector((state) => state?.search);
  const [editedDiscount, setEditedDiscount] = useState(null);
  const { categories, updateCategory, deleteCategory } = useCategories();

  const categoryData = categories?.filter((category) => {
    const query = searchQuery.toLowerCase();

    return (
      category?.categoryName?.toLowerCase().includes(query) ||
      category?.description?.toLowerCase().includes(query) ||
      category?.discountRate.toString().toLowerCase().includes(query)
    );
  });

  return (
    <div className="md:w-5/6 w-full text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-6 text-primary">
          Categories
        </h1>
      </div>

      <div className="overflow-auto h-96 pb-10">
        <table className="min-w-[768px] w-full border border-primary text-left text-sm sm:text-base">
          <thead className="bg-primary/10 font-semibold text-black">
            <tr>
              <th className="border border-primary px-4 py-2">No</th>
              <th className="border border-primary px-4 py-2">Category Name</th>
              <th className="border border-primary px-4 py-2">Description</th>
              <th className="border border-primary px-4 py-2">Discount</th>
              <th className="border border-primary px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryData?.map((category, index) => (
              <tr key={category._id} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">{index + 1}</td>
                <td className="border border-primary px-4 py-2">
                  {editId === category._id ? (
                    <input
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    category?.categoryName
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === category._id ? (
                    <input
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    category?.description
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {/* {editId === category._id ? (
                    <input
                      type="number"
                      value={editedDiscount}
                      onChange={(e) => setEditedDiscount(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : ( */}
                  {category?.discountRate}
                  {/* )} */}
                </td>
                <td className="border border-primary px-4 py-2 text-center">
                  <div className="flex justify-start items-center h-12 gap-2">
                    {editId === category._id ? (
                      <FaSave
                        title="Save"
                        size={20}
                        onClick={() => {
                          updateCategory({
                            categoryId: category._id,
                            categoryName: editCategoryName,
                            description: editedDescription,
                          });
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
                            setEditId(category._id);
                            setEditCategoryName(category.categoryName);
                            setEditedDescription(category.description);
                            setEditedDiscount(category.discountRate);
                          }}
                          className="text-primary hover:text-blue-800 cursor-pointer"
                        />
                        <MdDelete
                          title="Delete"
                          size={22}
                          onClick={() => setAlertMessage(category._id)}
                          className="hover:text-red-500 text-secondary cursor-pointer"
                        />
                      </>
                    )}
                    {alertMessage === category._id && (
                      <AlertBox
                        message="Do you want to delete this category?"
                        onConfirm={() => {
                          setAlertMessage(null);
                          deleteCategory(category._id);
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
