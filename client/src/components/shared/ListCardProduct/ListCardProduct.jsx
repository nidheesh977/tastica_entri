import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { AlertBox } from "../../shared/AlertBox/AlertBox";
import { useProducts } from "../../../hooks/useProducts";
import {useSelector} from 'react-redux'

export const ListCardProduct = () => {
  const [editId, setEditId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedQuantity, setEditedQuantity] = useState(null);
  const [editedCostPrice, setEditedCostPrice] = useState(null);
  const [editedCostPriceProfit, setEditedCostPriceProfit] = useState(null);
  const [editedSellingPrice, setEditedSellingPrice] = useState(null);
  const [editedDiscount, setEditedDiscount] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const { products, updateProduct, deleteProduct } = useProducts();

  const searchQuery = useSelector((state)=> state?.search)
  const productData = products?.filter((product) => {
    const query = searchQuery.toLowerCase();

    return (
      product?.productName?.toLowerCase().includes(query) ||
      product?.category?.categoryName.toLowerCase().includes(query) ||
      product?.quantity.toString().toLowerCase().includes(query) ||
      product?.product_id?.toLowerCase().includes(query) ||
      product?.costPrice?.toString().includes(query) ||
      product?.sellingPrice?.toString().includes(query) ||
      product?.discount?.toString().includes(query)
    );
  });

  return (
    <div className="md:w-5/6 w-full md:max-h-[520px] text-center pt-5 pb-14 px-5 border border-primary  shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-6 text-primary">
          Products
        </h1>
      </div>

      <div className="overflow-auto h-96 pb-10">
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
            {productData?.map((product, index) => (
              <tr key={product?._id} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">{index + 1}</td>
                <td className="border border-primary px-4 py-2">
                  {product?.product_id}
                </td>
                <td className="border border-primary px-4 py-2">
                  {editId === product?._id ? (
                    <input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full rounded border p-1"
                    />
                  ) : (
                    product?.productName
                  )}
                </td>
                <td className="border border-primary px-4 py-2">
                  {product?.category?.categoryName}
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
                    product?.costPrice
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
                    product.sellingPrice
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
                        onClick={() => {
                          updateProduct({
                            productId: editId,
                            productName: editedTitle,
                            quantity: editedQuantity,
                            costPrice: editedCostPrice,
                            costPriceProfit: editedCostPriceProfit,
                            sellingPrice: editedSellingPrice,
                            discount: editedDiscount,
                            category: editedCategory,
                            
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
                            setEditId(product?._id);
                            setEditedTitle(product?.productName);
                            setEditedQuantity(product?.quantity);
                            setEditedCategory(product?.category?._id);
                            setEditedSellingPrice(product?.sellingPrice);
                            setEditedCostPrice(product?.costPrice);
                            setEditedCostPriceProfit(product?.costPriceProfit);
                            setEditedDiscount(product?.discount);
                          }}
                          className="text-primary hover:text-orange-600 cursor-pointer"
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
                          deleteProduct(product?._id);
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
