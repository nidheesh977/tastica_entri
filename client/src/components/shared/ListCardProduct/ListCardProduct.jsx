import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { AlertBox } from "../../shared/AlertBox/AlertBox"; // Adjust import as needed

export const ListCardProduct = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Product A",
      category: "Category 1",
      quantity: 50,
      cost: 10,
      selling: 15,
      discount: 5,
    },
    {
      id: 2,
      title: "Product B",
      category: "Category 2",
      quantity: 30,
      cost: 20,
      selling: 25,
      discount: 0,
    },
  ]);

  const [editId, setEditId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);

  const handleEdit = (product) => {
    setEditId(product.id);
    setEditedProduct({ ...product });
  };

  const handleSave = (id) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? editedProduct : prod)),
    );
    setEditId(null);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

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
            {products.map((prod, index) => (
              <tr key={prod.id} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">{index + 1}</td>
                <td className="border border-primary px-4 py-2">{prod.id}</td>
                <td className="border border-primary px-4 py-2">
                  {editId === prod.id ? (
                    <input
                      value={editedProduct.title}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          title: e.target.value,
                        })
                      }
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    prod.title
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === prod.id ? (
                    <input
                      value={editedProduct.category}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          category: e.target.value,
                        })
                      }
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    prod.category
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === prod.id ? (
                    <input
                      type="number"
                      value={editedProduct.quantity}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          quantity: e.target.value,
                        })
                      }
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    prod.quantity
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === prod.id ? (
                    <input
                      type="number"
                      value={editedProduct.cost}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          cost: e.target.value,
                        })
                      }
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    prod.cost
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === prod.id ? (
                    <input
                      type="number"
                      value={editedProduct.selling}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          selling: e.target.value,
                        })
                      }
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    prod.selling
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === prod.id ? (
                    <input
                      type="number"
                      value={editedProduct.discount}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          discount: e.target.value,
                        })
                      }
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    prod.discount
                  )}
                </td>
                <td className="border border-primary px-4 py-2 text-center">
                  <div className="flex justify-start items-center h-12 gap-2">
                    {editId === prod.id ? (
                      <FaSave
                        title="Save"
                        size={20}
                        onClick={() => handleSave(prod.id)}
                        className="text-primary hover:text-blue-800 cursor-pointer"
                      />
                    ) : (
                      <>
                        <FiEdit
                          title="Edit"
                          size={20}
                          onClick={() => handleEdit(prod)}
                          className="text-primary hover:text-blue-800 cursor-pointer"
                        />
                        <MdDelete
                          title="Delete"
                          size={22}
                          onClick={() => setAlertMessage(prod.id)}
                          className="hover:text-red-500 text-secondary cursor-pointer"
                        />
                      </>
                    )}
                    {alertMessage === prod.id && (
                      <AlertBox
                        message="Do you want to delete this product?"
                        onConfirm={() => {
                          setAlertMessage(null);
                          deleteProduct(prod.id);
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
