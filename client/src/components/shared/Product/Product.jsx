import { useCategories } from "../../../hooks/useCategories";

export const Product = () => {
  const { categoryProducts } = useCategories();

  return (
    <>
      {categoryProducts?.map((product) => (
        <div
          key={product?._id}
          className="bg-[#E8F9FF] w-52 h-24 rounded border-2  cursor-pointer hover:border hover:border-primary font-semibold p-5"
        >
          <h1 className="pb-4 font-bold">{product?.productName}</h1>
          <p className="text-gray-500 border-t-2 ">
            {product?.sellingPrice || product?.costPrice}
          </p>
        </div>
      ))}
    </>
  );
};
