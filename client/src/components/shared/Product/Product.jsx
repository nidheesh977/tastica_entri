import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "../../../hooks/useProducts";
import { saveSearchQuery } from "../../../redux/features/searchSlice";
import { useMemo } from "react";
import { useInvoices } from "../../../hooks/useInvoices";
import { toggleQuantityHandler } from "../../../redux/features/quantitySlice";

export const Product = ({ addProductToInvoice }) => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.category);
  const searchQuery = useSelector((state) => state.search);
  const { invoice, singleInvoiceOpenOrder } = useInvoices();
  const { products } = useProducts();
  const currency = useSelector((state) => state?.auth?.shopData?.currencyCode)
  const existingCartProducts =
    invoice?.products || singleInvoiceOpenOrder?.products;
  const categoryProducts = useMemo(() => {
    let filtered = products?.filter(
      (product) => product?.category?._id === categoryId
    );

    if (searchQuery !== "") {
      const query = searchQuery.toLowerCase();
      filtered = products?.filter(
        (product) =>
          product?.productName?.toLowerCase().includes(query) ||
          product?.category?.categoryName?.toLowerCase().includes(query) ||
          product?.quantity?.toString().includes(query) ||
          product?.product_id?.toLowerCase().includes(query) ||
          product?.costPrice?.toString().includes(query) ||
          product?.sellingPrice?.toString().includes(query) ||
          product?.discount?.toString().includes(query)
      );
    }

    return filtered;
  }, [products, categoryId, searchQuery]);

  const isProductInCart = (productId) => {
    return existingCartProducts?.some((p) => p.productId === productId);
  };

  return (
    <>
      {categoryProducts?.map((product) => {
        const isDisabled =
          isProductInCart(product._id) ||
          (!invoice?.customer && !singleInvoiceOpenOrder?.customer);

        return (
          <div
            key={product._id}
            title={product?.productName}
            onClick={() => {
              if (isDisabled) return;
              dispatch(saveSearchQuery(""));
              dispatch(toggleQuantityHandler());
              addProductToInvoice({
                productId: product._id, quantity: product.quantity > 0 && product.quantity < 1 ? 0.01 : 1
              });
            }}
            className={`bg-tertiary w-full md:w-56 h-28 text-sm rounded border flex flex-col justify-evenly p-2 font-semibold ${isDisabled
              ? "border-gray-400 cursor-not-allowed opacity-50"
              : "border-primary cursor-pointer hover:border-2"
              }`}
          >
            <div >
              <h1 className="text-center font-bold overflow-hidden">{product.productName}</h1>
            </div>
            <div>
              <p className="border-t border-black text-center font-bold py-1">
                {currency}{product.sellingPrice || product.costPrice}
              </p>
              <p className="border-t border-black text-center font-bold py-1">
                Available Stock {product?.quantity > 0 && product?.quantity < 1 && product?.unit === "kg" ? product?.quantity * 1000 : product?.quantity} {product?.quantity > 0 && product?.quantity < 1 && product.unit === "kg" ? "gm" : product?.unit}
              </p>

              {isDisabled && (
                <p className="text-xs text-center text-red-600 font-medium">
                  {!invoice?.customer && !singleInvoiceOpenOrder?.customer
                    ? "First Select Customer"
                    : "Already in Cart"}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
