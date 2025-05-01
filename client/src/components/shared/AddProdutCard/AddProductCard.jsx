import { useRef } from "react";
import { FaBox } from "react-icons/fa";
import { SideBar } from "../SideBar/SideBar";

export const AddProductCard = () => {
  const productName = useRef(null);
  const quantity = useRef(null);
  const costPrice = useRef(null);
  const sellingPrice = useRef(null);
  const discount = useRef(null);
  const category = useRef(null);

  const handleSubmit = () => {};

  return (
    <>
    <SideBar/>
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
          <input
            type="text"
            ref={category}
            placeholder="Category"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />

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
