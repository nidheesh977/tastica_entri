import { ShoppingCart } from "../../../components/ShoppingCart/ShoppingCart";
import { Category } from "../../../components/Category/Category";
import { Quantity } from "../../../components/Quantity/Quantity";
import { Product } from "../../../components/Product/Product";
import { SideBar } from "../../../components/shared/SideBar/SideBar";



export const Cart = () => {
  const products = [
    {
      title: "Biscuit",
      price: 35,
      quantity: 1,
    },
    {
      title: "Lux Soap",
      price: 38,
      quantity: 1,
    },
    {
      title: "Vim Bar",
      price: 70,
      quantity: 1,
    },
    {
      title: "Pepsi",
      price: 40,
      quantity: 1,
    },
    {
      title: "Pen Blue Laxi",
      price: 5,
      quantity: 1,
    },
  ];

  const categories = [
    {
      title: "Vegetables",
    },
    {
      title: "Snacks",
    },
    {
      title: "Curry Powder",
    },
    {
      title: "Detergents",
    },
    {
      title: "Brush",
    },
  ];

  return (
    <>
    <SideBar/>
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-5 lg:col-span-4">
        <ShoppingCart products={products} />
      </div>

      <div className="col-span-12 md:col-span-2 border">
        <Category categories={categories} />
      </div>

      <div className="col-span-12 md:col-span-5 lg:col-span-6" >
        <div>
          <Quantity />
        </div>

        <div className="flex gap-2 m-2 flex-wrap"><Product products={products}/></div>
      </div>
    </div>
    </>
  );
};
