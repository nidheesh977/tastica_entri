import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { axiosInstance } from "../../../config/axiosInstance";

export const ListCardProduct = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async() => {
    try {

      const response = await axiosInstance({
        method: 'GET',
        url: '/'
      })
      
    } catch (error) {
      
    }
  }

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
        <table className="min-w-[768px] w-full border border-primary text-left">
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
                  {prod.title}
                </td>
                <td className="border border-primary px-4 py-2">
                  {prod.category}
                </td>
                <td className="border border-primary px-4 py-2">
                  {prod.quantity}
                </td>
                <td className="border border-primary px-4 py-2">{prod.cost}</td>
                <td className="border border-primary px-4 py-2">
                  {prod.selling}
                </td>
                <td className="border border-primary px-4 py-2">
                  {prod.discount}
                </td>
                <td className="border border-primary px-4 py-2 text-center">
                  <MdDelete className="hover:text-red-500 text-secondary cursor-pointer inline-block" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
