import { MdDelete } from "react-icons/md";
import { axiosInstance } from "../../../config/axiosInstance";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../redux/features/categorySlice";
import toast from "react-hot-toast";
import { AlertBox } from "../AlertBox/AlertBox";

export const ListCardCategory = () => {
  const [categories, setCategories] = useState([]);
  const [alertMessage, setAlertMessage] = useState(false);
  const dispatch = useDispatch();
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/products/categories",
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

  const deleteCategory = async (id) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: `/category/delete/${id}`,
      });
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="xl:w-1/2 text-center md:pt-5 pb-14 px-1 m-2 md:px-5 border border-primary shadow h-full">
        <div className="grid grid-cols-12 items-center">
          <h1 className="font-thin text-xs text-start col-span-8 sm:text-3xl my-6 text-primary">
            Categories
          </h1>
          <input
            className="rounded-xl text-primary shadow col-span-4 outline-primary h-10 p-5"
            type="text"
            placeholder="Search"
          />
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto border border-primary text-left text-xs sm:text-base">
            <thead className="bg-primary/10">
              <tr className="border-b border-primary">
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Discount</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category, index) => (
                <tr className="border-b border-primary" key={category._id}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{category?.categoryname}</td>
                  <td className="px-4 py-2">{category?.description}</td>
                  <td className="px-4 py-2">{category?.discountrate}%</td>
                  <td>
                    <div className="flex items-center justify-end cursor-pointer w-12 h-12">
                      <MdDelete
                        onClick={() => {
                          setAlertMessage(true);
                        }}
                        title="Delete"
                        className="hover:text-red-500  text-secondary"
                      />
                      {alertMessage && (
                        <AlertBox
                          message="Do you want to delete this category?"
                          onClose={() => {
                            setAlertMessage(false);
                            deleteCategory(category._id);
                          }}
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
    </>
  );
};
