import { useState } from "react";
import { FaBox } from "react-icons/fa";
import { useCustomProducts } from "../../../hooks/useCustomProducts";
import { useDispatch } from "react-redux";
import { toggleCustomProductHandler } from "../../../redux/features/customProductSlice";
import { FaTimes } from "react-icons/fa";


export const AddCustomProduct = () => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [unit, setUnit] = useState("");
  const { addCustomProduct } = useCustomProducts();
  const dispatch = useDispatch();

  const resetForm = () => {
    setProductName("");
    setQuantity("");
    setUnit("");
    setSellingPrice("");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center py-20">
        <div className="bg-tertiary text-primary shadow-2xl rounded-lg p-4 max-w-[500px] w-full mx-4 relative">
          <button
            onClick={() => {
              dispatch(toggleCustomProductHandler());
              resetForm();
            }}
            className="absolute top-2 right-2 text-xl font-bold p-4 hover:text-orange-600"
          >
          <FaTimes/>
          </button>

          <form onSubmit={(e) => e.preventDefault()} className="md:px-10 py-10">
            <h1 className="text-3xl mb-6 font-thin text-center">
              Add Custom Product
            </h1>

            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product Name"
              className="p-4 my-1 w-full bg-white shadow outline-primary"
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
                {["no", "kg", "lt", "m"].map((u) => (
                  <span key={u} className="flex gap-1">
                    {u}
                    <input
                      type="radio"
                      value={u}
                      name="unit"
                      className="accent-primary"
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </span>
                ))}
              </span>
            </div>

            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              placeholder="Selling Price"
              className="p-4 my-1 w-full bg-white shadow outline-primary"
            />

            <button
              className="p-4 my-4 bg-primary hover:opacity-90 w-full text-white rounded-lg"
              onClick={() => {
                addCustomProduct({ productName, quantity, unit, sellingPrice });
                dispatch(toggleCustomProductHandler());
                resetForm();
                
              }}
            >
              <span className="flex items-center justify-center gap-2 font-semibold">
                Add Product <FaBox />
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
