import { useState } from "react";
import { FaBox } from "react-icons/fa";
import { SideBar } from "../SideBar/SideBar";
import { useCategories } from "../../../hooks/useCategories";
import { useProducts } from "../../../hooks/useProducts";

export const AddProductCard = () => {
  const { categories } = useCategories();
  const { addProduct } = useProducts();
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [discountType, setDiscountType] = useState("");
  
  console.log(discountType)

  return (
    <>
      <SideBar />
      <div className="flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-2
                my-10  max-w-[500px] p-4  md:px-10 bg-[#E8F9FF] text-[#155E95] shadow-2xl rounded-lg"
        >
          <h1 className="text-3xl mb-6 font-thin text-center text-[#155E95] ">
            Add Product
          </h1>

          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="p-4 my-1  w-full  bg-white shadow-2xl outline-[#155E95]"
          />

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />

          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            placeholder="Cost Price"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />

          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="Selling Price"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />

          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Discount"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />
          <div className="flex justify-between p-4 my-1 w-full bg-white shadow-2xl">
            <span className="text-gray-400">Discount Type</span>
            <span className="flex gap-5">
            <span className="flex gap-1">
               %
              <input
                type="radio"
                value="percentage"
                name="discountType"
                className="accent-primary"
                onChange={(e)=> setDiscountType(e.target.value)}
              />
            </span>
            <span className="flex gap-1">
            MVR
              <input
                type="radio"
                value="flat"
                name="discountType"
                className="accent-primary"
                onChange={(e)=> setDiscountType(e.target.value)}
              />
            </span>
            </span>
          </div>
          <select
            value={category?._id}
            onChange={(e) => setCategory(e.target.value)}
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          >
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.categoryName}
              </option>
            ))}
          </select>

          <button
            className="p-4 my-4  bg-[#155E95] hover:opacity-90 w-full text-white rounded-lg"
            onClick={() => {
              addProduct({
                productName,
                quantity: Number(quantity),
                costPrice: Number(costPrice),
                sellingPrice: Number(sellingPrice),
                discount: Number(discount),
                category,
                discountType,
              });
              setProductName("");
              setQuantity("");
              setCostPrice("");
              setSellingPrice("");
              setDiscount("");
            }}
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
