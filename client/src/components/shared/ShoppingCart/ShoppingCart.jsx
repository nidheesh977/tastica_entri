import { useEffect, useState } from "react";
import { MdMoreVert, MdAdd, MdRemove } from "react-icons/md";
import { FaSave, FaMoneyCheckAlt } from "react-icons/fa";

export const ShoppingCart = ({
  cartProducts: initialProducts,
  addProductToCartRef,
}) => {
  const [selectedUser, setSelectedUser] = useState("User");
  const [cartProducts, setCartProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [removedProductIds, setRemovedProductIds] = useState(new Set());

  useEffect(() => {
    if (addProductToCartRef) {
      addProductToCartRef.current = addProductToCart;
    }
  }, [cartProducts, quantities, removedProductIds]);

  useEffect(() => {
    const newProducts = initialProducts.filter(
      (product) =>
        !cartProducts.some((p) => p.product_id === product.product_id) &&
        !removedProductIds.has(product.product_id),
    );

    if (newProducts.length > 0) {
      const updatedCart = [...cartProducts, ...newProducts];
      const updatedQuantities = { ...quantities };

      newProducts.forEach((product) => {
        updatedQuantities[product.product_id] = 1;
      });

      setCartProducts(updatedCart);
      setQuantities(updatedQuantities);
    }
  }, [initialProducts]);

  const addProductToCart = (product) => {
    const alreadyInCart = cartProducts.some(
      (p) => p.product_id === product.product_id,
    );
    if (alreadyInCart) return;

    setCartProducts((prev) => [...prev, product]);
    setQuantities((prev) => ({ ...prev, [product.product_id]: 1 }));

    setRemovedProductIds((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(product.product_id);
      return newSet;
    });
  };

  const increaseQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prev) => {
      const newQty = prev[productId] - 1;
      if (newQty <= 0) {
        setCartProducts((prevProducts) =>
          prevProducts.filter((p) => p.product_id !== productId),
        );
        const updated = { ...prev };
        delete updated[productId];

        setRemovedProductIds((prevSet) => new Set(prevSet).add(productId));
        return updated;
      }
      return {
        ...prev,
        [productId]: newQty,
      };
    });
  };

  const subtotal = cartProducts.reduce((sum, product) => {
    const qty = quantities[product.product_id] || 1;
    return sum + product.sellingprice * qty;
  }, 0);

  const tax = 5;
  const total = subtotal + tax;

  return (
    <div className="p-5 border">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Cart</h1>
        <div>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="lg:w-52 h-10 rounded p-2 font-semibold border"
          >
            <option value="">Select a user</option>
            <option value="arjun">Arjun</option>
            <option value="ashay">Ashay</option>
            <option value="john">John</option>
          </select>
        </div>
        <MdMoreVert className="cursor-pointer" size={20} />
      </div>

      <ul className="flex flex-col mt-4 w-full">
        {cartProducts.map((product) => (
          <li
            key={product.product_id}
            className="border flex justify-between items-center gap-8 w-full px-2 py-2"
          >
            <div className="flex-1">
              <p>{product.productname}</p>
            </div>
            <div className="flex items-center gap-2">
              <div
                onClick={() => decreaseQuantity(product.product_id)}
                className="rounded flex cursor-pointer justify-center items-center text-white w-5 h-5 font-bold bg-[#BF3131] hover:bg-opacity-90"
              >
                <MdRemove />
              </div>
              <div>{quantities[product.product_id]}</div>
              <div
                onClick={() => increaseQuantity(product.product_id)}
                className="rounded flex cursor-pointer justify-center items-center text-white w-5 h-5 font-bold bg-[#155E95] hover:bg-opacity-90"
              >
                <MdAdd />
              </div>
            </div>
            <div className="w-10 text-right">
              ₹{quantities[product.product_id] * product.sellingprice}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-2 w-full font-bold">
        <div className="flex justify-between items-center border px-2 py-2">
          <div>Subtotal</div>
          <div>₹{subtotal}</div>
        </div>
        <div className="flex justify-between items-center border px-2 py-2">
          <div>Tax</div>
          <div>₹{tax}</div>
        </div>
        <div className="flex justify-between items-center font-semibold border px-2 py-2">
          <div>Total</div>
          <div>₹{total}</div>
        </div>
      </div>

      <div className="flex gap-2 mt-2 justify-between">
        <button className="flex items-center justify-center gap-2 px-6 py-3 w-1/2 bg-[#BF3131] hover:bg-opacity-90 text-white rounded-lg">
          <FaSave /> Save
        </button>
        <button className="flex items-center justify-center gap-2 px-6 py-3 w-1/2 bg-[#155E95] hover:bg-opacity-90 text-white rounded-lg">
          <FaMoneyCheckAlt /> Pay
        </button>
      </div>
    </div>
  );
};
