import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { axiosInstance } from "../../../config/axiosInstance";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../redux/features/categorySlice";
import toast from "react-hot-toast";
import { AlertBox } from "../AlertBox/AlertBox";

export const ListCardCategory = () => {
  const [categories, setCategories] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDiscount, setEditedDiscount] = useState(null);
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/categories",
        withCredentials: true,
      });

      setCategories(response?.data?.data);
      dispatch(addCategory(response?.data?.data));
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateCategoryData = async (categoryId) => {
    const data = {
      categoryname: editCategoryName,
      description: editedDescription,
      discount: editedDiscount,
    };

    try {
      await axiosInstance({
        method: "PUT",
        url: `/categories/${categoryId}`,
        withCredentials: true,
        data,
      });

      toast.success("Category updated successfully!");
      setEditId(null);
      setEditCategoryName("");
      setEditedDescription("");
      setEditedDiscount(null);
      fetchCategories();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/categories/${categoryId}`,
      });
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="md:w-5/6 w-full text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-6 text-primary">
          Categories
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
              <th className="border border-primary px-4 py-2">Category Name</th>
              <th className="border border-primary px-4 py-2">Description</th>
              <th className="border border-primary px-4 py-2">Discount</th>
              <th className="border border-primary px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, index) => (
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
                    category?.categoryname
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
                  {editId === category._id ? (
                    <input
                      type="number"
                      value={editedDiscount}
                      onChange={(e) => setEditedDiscount(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    category?.discountrate
                  )}
                </td>
                <td className="border border-primary px-4 py-2 text-center">
                  <div className="flex justify-start items-center h-12 gap-2">
                    {editId === category._id ? (
                      <FaSave
                        title="Save"
                        size={20}
                        onClick={() => updateCategoryData(category._id)}
                        className="text-primary hover:text-blue-800 cursor-pointer"
                      />
                    ) : (
                      <>
                        <FiEdit
                          title="Edit"
                          size={20}
                          onClick={() => {
                            setEditId(category._id);
                            setEditCategoryName(category.categoryname);
                            setEditedDescription(category.description);
                            setEditedDiscount(category.discountrate);
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
