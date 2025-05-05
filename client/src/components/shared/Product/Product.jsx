export const Product = ({ products, addProductToCart }) => {

  console.log('product page: ',products);
  
  return (
    <>
      {products.map((product) => (
        <div onClick={()=> addProductToCart(product)} key={product?.product_id} className="bg-[#E8F9FF] w-52 h-24 rounded border-2  cursor-pointer hover:border hover:border-primary font-semibold p-5">
          <h1 className="pb-4 font-bold">{product?.productname}</h1>
          <p className="text-gray-500 border-t-2 ">₹{product?.sellingprice}</p>
        </div>
      ))}
    </>
  );
};
