import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "../../../hooks/useProducts";
import { saveSearchQuery } from "../../../redux/features/searchSlice";
import { useInvoices } from "../../../hooks/useInvoices";

export const Product = ({ addProductToInvoice }) => {
  const categoryId = useSelector((state) => state.category);

  const { products } = useProducts();
  let categoryProducts = products?.filter(
    (product) => product?.category?._id === categoryId
  );

  const searchQuery = useSelector((state) => state.search);
  const dispatch = useDispatch();
  if (searchQuery !== "") {
    categoryProducts = products?.filter((product) => {
      const query = searchQuery.toLowerCase();

      return (
        product?.productName?.toLowerCase().includes(query) ||
        product?.category?.categoryName.toLowerCase().includes(query) ||
        product?.quantity.toString().toLowerCase().includes(query) ||
        product?.product_id?.toLowerCase().includes(query) ||
        product?.costPrice?.toString().includes(query) ||
        product?.sellingPrice?.toString().includes(query) ||
        product?.discount?.toString().includes(query)
      );
    });
  }

  return (
    <>
      {categoryProducts?.map((product) => (
        <div
          key={product?._id}
          onClick={() => {
            dispatch(saveSearchQuery(""));

            addProductToInvoice({
              productId: product?._id,
              quantity: 1,
            });
          }}
          className="bg-[#E8F9FF] w-full md:w-56 h-20 text-sm rounded border flex flex-col justify-between border-black  cursor-pointer hover:border-primary hover:border-2 font-semibold p-5"
        >
          <div className="h-10">
            <h1 className="pb-4 font-bold">{product?.productName}</h1>
          </div>
          <div>
            <p className=" border-t  border-black text-center font-bold ">
              MVR{product?.sellingPrice || product?.costPrice}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
