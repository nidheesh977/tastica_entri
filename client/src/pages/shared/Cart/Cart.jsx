import { ShoppingCart } from "../../../components/shared/ShoppingCart/ShoppingCart";
import { Category } from "../../../components/shared/Category/Category";
import { Quantity } from "../../../components/shared/Quantity/Quantity";
import { Product } from "../../../components/shared/Product/Product";
import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { axiosInstance } from "../../../config/axiosInstance";
import { useState } from "react";

export const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const fetchCategoryProducts = async (id) => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/admin/products/category-search?categoryId=${id}`,
        withCredentials: true,
      });
      setProducts(response?.data?.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const addProductToCart = (product) => {
    setCartProducts((prev) => [...prev, product]);
  };

  return (
    <>
      <SideBar />
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <ShoppingCart cartProducts={cartProducts} />
        </div>

        <div className="col-span-12 md:col-span-2 border">
          <Category fetchCategoryProducts={fetchCategoryProducts} />
        </div>

        <div className="col-span-12 md:col-span-5 lg:col-span-6">
          <div>
            <Quantity />
          </div>

          <div className="flex gap-2 m-2 flex-wrap">
            <Product products={products} addProductToCart={addProductToCart} />
          </div>
        </div>
      </div>
    </>
  );
};
