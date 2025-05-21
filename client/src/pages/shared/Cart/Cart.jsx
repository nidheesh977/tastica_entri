import { ShoppingCart } from "../../../components/shared/ShoppingCart/ShoppingCart";
import { Category } from "../../../components/shared/Category/Category";
import { Quantity } from "../../../components/shared/Quantity/Quantity";
import { Product } from "../../../components/shared/Product/Product";
import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { useInvoices } from "../../../hooks/useInvoices";

export const Cart = () => {
  const { addProductToInvoice, removeProductFromInvoice } = useInvoices();
  return (
    <>
      <SideBar />
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-5 lg:col-span-4  ">
          <ShoppingCart addProductToInvoice={addProductToInvoice} removeProductFromInvoice={removeProductFromInvoice} />
        </div>

        <div className="col-span-12 md:col-span-3 lg:col-span-2 border overflow-y-auto h-[670px]">
          <Category />
        </div>

        <div className="col-span-12 md:col-span-4 lg:col-span-6">
          <div>{/* <Quantity /> */}</div>

          <div className="flex gap-2 m-2 flex-wrap overflow-y-auto h-[680px] ">
            <Product addProductToInvoice={addProductToInvoice} />
          </div>
        </div>
      </div>
    </>
  );
};
