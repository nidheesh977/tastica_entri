import { useRef } from "react";
import { FaBox } from "react-icons/fa";
import { SideBar } from "../SideBar/SideBar";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../config/axiosInstance";
import { useProducts } from "../../../hooks/useProducts";
import { useCategories } from "../../../hooks/useCategories";
import toast from "react-hot-toast";

export const AddProductCard = () => {
  const productName = useRef(null);
  const quantity = useRef(null);
  const costPrice = useRef(null);
  const sellingPrice = useRef(null);
  const discount = useRef(null);
  const category = useRef(null);
  const categories = useSelector((state) => state?.categories);
  const { fetchProducts } = useProducts();
  const { fetchCategories } = useCategories();

  !categories && fetchCategories();

  const handleSubmit = async () => {
    const data = {
      productName: productName?.current?.value,
      quantity: quantity?.current?.value,
      costPrice: costPrice?.current?.value,
      sellingPrice: sellingPrice?.current?.value,
      discount: discount?.current?.value,
      category: category?.current?.value,
    };
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/product/create",
        withCredentials: true,
        data,
      });
      fetchProducts();

      toast.success("Product added successfully");
      (productName.current.value = ""),
        (quantity.current.value = ""),
        (costPrice.current.value = ""),
        (sellingPrice.current.value = ""),
        (discount.current.value = "");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <SideBar />
      <div className="flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-2
                my-10  max-w-[500px] py-10 p-4  md:px-10 bg-[#E8F9FF] text-[#155E95] shadow-2xl rounded-lg"
        >
          <h1 className="text-3xl mb-6 font-thin text-center text-[#155E95] ">
            Add Product
          </h1>

          <input
            type="text"
            ref={productName}
            placeholder="Product Name"
            className="p-4 my-1  w-full  bg-white shadow-2xl outline-[#155E95]"
          />

          <input
            type="number"
            ref={quantity}
            placeholder="Quantity"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />

          <input
            type="number"
            ref={costPrice}
            placeholder="Cost Price"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />

          <input
            type="number"
            ref={sellingPrice}
            placeholder="Selling Price"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />

          <input
            type="number"
            ref={discount}
            placeholder="Discount"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />
          <select
            ref={category}
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          >
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.categoryname}
              </option>
            ))}
          </select>

          <button
            className="p-4 my-4  bg-[#155E95] hover:opacity-90 w-full text-white rounded-lg"
            onClick={handleSubmit}
          >
            <span className="flex items-center justify-center gap-2 font-semibold">
              Add Product <FaBox />
            </span>
          </button>
        </form>
      </div>
    </>
  );
};
