import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { AlertBox } from "../../shared/AlertBox/AlertBox";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";

export const ListCardProduct = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedQuantity, setEditedQuantity] = useState(null);
  const [editedCostPrice, setEditedCostPrice] = useState(null);
  const [editedSellingPrice, setEditedSellingPrice] = useState(null);
  const [editedDiscount, setEditedDiscount] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/product",
        withCredentials: true,
      });
      setProducts(response?.data?.data);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateProductData = async (productId, categoryId) => {
    const data = {
      productname: editedTitle,
      category: `${categoryId._id}`,
      quantity: editedQuantity,
      costprice: editedCostPrice,
      sellingprice: editedSellingPrice,
      discount: editedDiscount,
    };

    try {
      await axiosInstance({
        method: "PUT",
        url: `/product/update/${productId}/category/${categoryId._id}`,
        withCredentials: true,
        data,
      });
      toast.success("Product updated successfully");
      setEditId(null);
      fetchProducts();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/product/delete/${productId}`,
        withCredentials: true,
      });
      toast.success("Product updated successfully");
      setEditId(null);
      fetchProducts();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);

  return (
    <div className="md:w-5/6 w-full text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-6 text-primary">
          Products
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
              <th className="border border-primary px-4 py-2">ID</th>
              <th className="border border-primary px-4 py-2">Title</th>
              <th className="border border-primary px-4 py-2">Category</th>
              <th className="border border-primary px-4 py-2">Quantity</th>
              <th className="border border-primary px-4 py-2">Cost Price</th>
              <th className="border border-primary px-4 py-2">Selling Price</th>
              <th className="border border-primary px-4 py-2">Discount</th>
              <th className="border border-primary px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={product?._id} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">{index + 1}</td>
                <td className="border border-primary px-4 py-2">
                  {product?.product_id}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === product._id ? (
                    <input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    product?.productname
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {product?.category?.categoryname}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === product._id ? (
                    <input
                      type="number"
                      value={editedQuantity}
                      onChange={(e) => {
                        setEditedQuantity(e.target.value);
                      }}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    product?.quantity
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === product._id ? (
                    <input
                      type="number"
                      value={editedCostPrice}
                      onChange={(e) => setEditedCostPrice(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    product?.costprice
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === product._id ? (
                    <input
                      type="number"
                      value={editedSellingPrice}
                      onChange={(e) => setEditedSellingPrice(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    product.sellingprice
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === product._id ? (
                    <input
                      type="number"
                      value={editedDiscount}
                      onChange={(e) => setEditedDiscount(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    product?.discount
                  )}
                </td>
                <td className="border border-primary px-4 py-2 text-center">
                  <div className="flex justify-start items-center h-12 gap-2">
                    {editId === product._id ? (
                      <FaSave
                        title="Save"
                        size={20}
                        onClick={() =>
                          updateProductData(product._id, product?.category)
                        }
                        className="text-primary hover:text-blue-800 cursor-pointer"
                      />
                    ) : (
                      <>
                        <FiEdit
                          title="Edit"
                          size={20}
                          onClick={() => {
                            setEditId(product?._id);
                            setEditedTitle(product?.productname);
                            setEditedQuantity(product?.quantity);
                            setEditedSellingPrice(product?.sellingprice);
                            setEditedCostPrice(product?.costprice);
                            setEditedDiscount(product?.discount);
                          }}
                          className="text-primary hover:text-blue-800 cursor-pointer"
                        />
                        <MdDelete
                          title="Delete"
                          size={22}
                          onClick={() => setAlertMessage(product._id)}
                          className="hover:text-red-500 text-secondary cursor-pointer"
                        />
                      </>
                    )}
                    {alertMessage === product._id && (
                      <AlertBox
                        message="Do you want to delete this product?"
                        onConfirm={() => {
                          setAlertMessage(null);
                          deleteProduct(product._id);
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
