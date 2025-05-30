import { Category } from "../../../components/shared/Category/Category";
import { Quantity } from "../../../components/shared/Quantity/Quantity";
import { Product } from "../../../components/shared/Product/Product";
import { OpenOrderCart } from "../../../components/shared/OpenOrderCart/OpenOrderCart";
import { useInvoices } from "../../../hooks/useInvoices";
import { useSelector } from "react-redux";
import { AddCustomProduct } from "../../../components/shared/AddCustomProduct/AddCustomProduct";

export const OpenOrderCartView = () => {
  const { addProductToInvoiceOpenOrder, removeProductFromInvoiceOpenOrder } =
    useInvoices();
    const toggleCustomProduct = useSelector((state) => state.toggleCustomProduct.toggleCustomProduct);
  return (
    <>
   {toggleCustomProduct && <AddCustomProduct/>}
      <div className="grid grid-cols-12 h-[650px]">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <OpenOrderCart
            addProductToInvoice={addProductToInvoiceOpenOrder}
            removeProductFromInvoice={removeProductFromInvoiceOpenOrder}
          />
        </div>

        <div className="col-span-12 md:col-span-3 lg:col-span-2 border overflow-y-auto h-[670px]">
          <Category />
        </div>

        <div className="col-span-12 md:col-span-4 lg:col-span-6">
          <div>{/* <Quantity /> */}</div>

          <div className="flex gap-2 m-2 flex-wrap overflow-y-auto h-[680px] ">
            <Product addProductToInvoice={addProductToInvoiceOpenOrder} />
          </div>
        </div>
      </div>
    </>
  );
};
