import { useState } from "react";
import { FaBox } from "react-icons/fa";
export const AddCustomProduct = () => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [unit, setUnit] = useState("");

  return (
    <div className="flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-2
                 my-10  max-w-[500px] p-4  md:px-10 bg-[#E8F9FF] text-[#155E95] shadow-2xl rounded-lg"
      >
        <h1 className="text-3xl mb-6 font-thin text-center text-[#155E95] ">
          Add Custom Product
        </h1>

        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          className="p-4 my-1  w-full  bg-white shadow outline-[#155E95]"
        />
        <div className="flex items-center justify-between bg-white w-full shadow my-1">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="p-4 w-4/12 bg-white outline-[#155E95]"
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

        <input
          type="number"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          placeholder="Selling Price"
          className="p-4 my-1 w-full bg-white shadow outline-[#155E95]"
        />

        <button className="p-4 my-4  bg-[#155E95] hover:opacity-90 w-full text-white rounded-lg">
          <span className="flex items-center justify-center gap-2 font-semibold">
            Add Product <FaBox />
          </span>
        </button>
      </form>
    </div>
  );
};
