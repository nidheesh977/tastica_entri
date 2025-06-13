import { useState } from "react";
import { FaHashtag } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleQuantityHandler } from "../../../redux/features/quantitySlice";
import { useInvoices } from "../../../hooks/useInvoices";

export const AddQuantity = (productId) => {
  const [quantity, setQuantity] = useState("");
  const { addProductToInvoice } = useInvoices();
  const dispatch = useDispatch();

  const resetForm = () => {
    setQuantity("");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center py-20">
        <div className="bg-tertiary text-primary shadow-2xl rounded-lg p-4 max-w-[500px] w-full mx-4 relative">
          <form onSubmit={(e) => e.preventDefault()} className="md:px-10 py-10">
            <h1 className="text-3xl mb-6 font-thin text-center">
              Add Quantity
            </h1>

            <div className="flex items-center justify-between bg-white w-full shadow my-1">
              <input
                type="number"
                value={quantity}
                onBlur={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                className="p-4 w-4/12 bg-white outline-primary"
              />
            </div>

            <button
              className="p-4 my-4 bg-primary hover:opacity-90 w-full text-white rounded-lg"
              onClick={() => {
                addProductToInvoice({ productId, quantity });
                dispatch(toggleQuantityHandler());
                resetForm();
              }}
            >
              <span className="flex items-center justify-center gap-2 font-semibold">
                Add Quantity <FaHashtag />
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
