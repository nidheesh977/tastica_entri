import { useState } from "react";
import { FaBox } from "react-icons/fa";
import { AdminSideBar } from "../../admin/AdminSideBar/AdminSideBar"
import { useCategories } from "../../../hooks/useCategories";
import { useProducts } from "../../../hooks/useProducts";

export const AddProductCard = () => {
  const { categories } = useCategories();
  const { addProduct } = useProducts();
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [costPriceProfit, setCostPriceProfit] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [unit, setUnit] = useState("");

  return (
    <>
      <AdminSideBar />
      <div className="flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-2
                my-10  max-w-[500px] p-4  md:px-10 bg-tertiary text-primary shadow-2xl rounded-lg"
        >
          <h1 className="text-3xl mb-6 font-thin text-center text-primary ">
            Add Product
          </h1>

          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="p-4 my-1  w-full  bg-white shadow outline-primary"
          />
          <div className="flex items-center justify-between bg-white w-full shadow my-1">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              className="p-4 w-4/12 bg-white outline-primary"
            />

            <span className="flex gap-4 px-4">
              <span className="flex gap-1">
                no
                <input
                  type="radio"
                  value="no"
                  name="unit"
                  className="accent-primary"
                  onChange={(e) => setUnit(e.target.value)}
                />
              </span>
              <span className="flex gap-1">
                kg
                <input
                  type="radio"
                  value="kg"
                  name="unit"
                  className="accent-primary"
                  onChange={(e) => setUnit(e.target.value)}
                />
              </span>
              <span className="flex gap-1">
                lt
                <input
                  type="radio"
                  value="lt"
                  name="unit"
                  className="accent-primary"
                  onChange={(e) => setUnit(e.target.value)}
                />
              </span>
              <span className="flex gap-1">
                m
                <input
                  type="radio"
                  value="m"
                  name="unit"
                  className="accent-primary"
                  onChange={(e) => setUnit(e.target.value)}
                />
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between  w-full  my-1">
            <input
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              placeholder="Cost Price"
              className="p-4 my-1 w-full bg-white shadow outline-primary"
            />
            <input
              type="number"
              value={costPriceProfit}
              onChange={(e) => setCostPriceProfit(e.target.value)}
              placeholder="Cost Price Profit"
              className="p-4 my-1 w-full bg-white shadow outline-primary"
            />
          </div>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="Selling Price"
            className="p-4 my-1 w-full bg-white shadow outline-primary"
          />
          <div className="flex items-center justify-between bg-white w-full shadow my-1">
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount"
              className="p-4  w-1/2 bg-white   outline-primary"
            />
            <span className="flex gap-4 px-4">
              <span className="flex gap-1">
                %
                <input
                  type="radio"
                  value="percentage"
                  name="discountType"
                  className="accent-primary"
                  onChange={(e) => setDiscountType(e.target.value)}
                />
              </span>
              <span className="flex gap-1">
                MVR
                <input
                  type="radio"
                  value="flat"
                  name="discountType"
                  className="accent-primary"
                  onChange={(e) => setDiscountType(e.target.value)}
                />
              </span>
            </span>
          </div>

          <select
            value={category?._id}
            onChange={(e) => setCategory(e.target.value)}
            className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
          >
            <option className="bg-primary" value="">
              Select a category
            </option>
            {categories?.map((category) => (
              <option
                className="bg-primary"
                key={category?._id}
                value={category?._id}
              >
                {category?.categoryName}
              </option>
            ))}
          </select>

          <button
            className="p-4 my-4  bg-primary hover:opacity-90 w-full text-white rounded-lg"
            onClick={() => {
              addProduct({
                productName,
                quantity: Number(quantity),
                costPrice: Number(costPrice),
                costPriceProfit: Number(costPriceProfit),
                sellingPrice: Number(sellingPrice),
                discount: Number(discount),
                category,
                discountType,
                unit,
              });
              setProductName("");
              setQuantity("");
              setCostPrice("");
              setCostPriceProfit("");
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
