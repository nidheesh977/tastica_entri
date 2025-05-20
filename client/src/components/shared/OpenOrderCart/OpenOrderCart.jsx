import { FaSave, FaMoneyCheckAlt, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useInvoices } from "../../../hooks/useInvoices";
import { MdShoppingCart } from "react-icons/md";
import { AlertBox } from "../AlertBox/AlertBox";
import { PayDialogueBox } from "../PayDialogueBox/PayDialogueBox";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveSingleInvoiceOpenOrder } from "../../../redux/features/singleInvoiceOpenOrderSlice";

export const OpenOrderCart = ({
  addProductToInvoice,
  removeProductFromInvoice,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    singleInvoiceOpenOrder,
    makeCashPaymentOpenOrder,
    makeOnlinePaymentOpenOrder,
    saveInvoice,
    redeemPointsOpenOrder,
  } = useInvoices();

  const invoice = singleInvoiceOpenOrder;

  const products = invoice?.products;

  const [quantities, setQuantities] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [showPayDialog, setShowPayDialog] = useState(false);
  const [redeemAmountAdd, setRedeemAmountAdd] = useState("");
  const [pointAmount, setPointAmount] = useState("");

  useEffect(() => {
    if (invoice?.products) {
      const initialQuantities = {};
      invoice.products.forEach((product) => {
        initialQuantities[product.productId] = product.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [invoice]);

  useEffect(() => {
    if (id) {
      dispatch(saveSingleInvoiceOpenOrder(id));
      setPointAmount(invoice?.customer?.pointAmount);
    }
  }, [id, dispatch]);

  const handlePayNow = () => {
    setShowPayDialog(false);
    makeCashPaymentOpenOrder(id);

    navigate("/admin/open/orders");
  };

  const handleOnlinePay = () => {
    setShowPayDialog(false);
    makeOnlinePaymentOpenOrder(id);
  };

  const handleCancel = () => {
    setShowPayDialog(false);
  };

  return (
    <div className="p-5 border">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold flex gap-2 text-xl items-center">
          <MdShoppingCart className="text-primary" size={35} /> Cart
        </h1>
        <div className="font-bold ">{invoice?.customer?.customerName}</div>
        <div>
          <p className="text-sm font-bold ">{invoice?.customer?.phoneNumber}</p>
        </div>
      </div>

      <ul className="flex flex-col mt-4 h-[382px] overflow-y-auto w-full">
        {products?.map((product, index) => (
          <li
            key={product?.productId}
            className="grid grid-cols-12 border my-1 p-2 items-center"
          >
            {alertMessage === product._id && (
              <AlertBox
                message="Do you want to remove this product from the cart?"
                onConfirm={() => {
                  setAlertMessage(null);
                  removeProductFromInvoice(product?._id);
                }}
                onCancel={() => setAlertMessage(null)}
              />
            )}
            <span className="col-span-12 xl:col-span-6 my-1 xl:my-0 text-center xl:text-start">
              <span className="me-2 font-semibold">{index + 1}.</span>
              {product?.productName}
            </span>

            <div className="flex items-center gap-10 col-span-12 xl:col-span-4 my-2 xl:my-0 mx-auto xl:mx-0">
              <input
                type="number"
                className="w-14 bg-tertiary text-center"
                value={quantities[product?.productId] ?? 1}
                onChange={(e) => {
                  const newQty = e.target.value;
                  setQuantities((prev) => ({
                    ...prev,
                    [product.productId]: newQty,
                  }));
                }}
                onBlur={() =>
                  addProductToInvoice({
                    productId: product?.productId,
                    quantity: quantities[product.productId] ?? "",
                  })
                }
              />

              <FaTrash
                className="text-secondary hover:text-red-600 cursor-pointer"
                onClick={() => setAlertMessage(product._id)}
              />
            </div>

            <span className="col-span-12 xl:col-span-2 mx-auto xl:mx-0 text-right my-2 xl:my-0">
              MVR{product?.price}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-2 w-full font-bold">
        <div className="flex justify-between items-center border px-2 py-2">
          <div>Subtotal</div>
          <div>MVR{invoice?.subTotal || 0}</div>
        </div>
        <div className="flex justify-between items-center border px-2 py-2">
          <div>Discount</div>
          <p>{pointAmount}</p>
          <div>
            <input
              className="outline-primary px-2 w-2/3"
              type="number"
              onClick={(e) => {
                setRedeemAmountAdd(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              onClick={() =>
                redeemPointsOpenOrder({
                  redeemAmountAdd,
                  id,
                })
              }
              className="bg-primary text-white rounded p-1 text-sm hover:bg-opacity-90"
            >
              Redeem
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center font-semibold border px-2 py-2">
          <div>Total</div>
          <div>MVR{invoice?.totalAmount || 0}</div>
        </div>
      </div>

      <div className="flex gap-2 mt-2 justify-between">
        <button
          className="flex items-center justify-center gap-2 px-6 py-3 w-1/2 bg-secondary hover:bg-opacity-90 text-white rounded-lg"
          onClick={() => {
            saveInvoice();
            navigate("/admin/open/orders");
          }}
        >
          <FaSave /> Save
        </button>

        <button
          className="flex items-center justify-center gap-2 px-6 py-3 w-1/2 bg-primary hover:bg-opacity-90 text-white rounded-lg"
          onClick={() => setShowPayDialog(true)}
        >
          <FaMoneyCheckAlt /> Pay
        </button>
      </div>

      {showPayDialog && (
        <PayDialogueBox
          message={`Total payable amount: MVR${invoice?.totalAmount || 0}`}
          onPayNow={handlePayNow}
          onOnlinePay={handleOnlinePay}
          onCancel={handleCancel}
          invoice={invoice}
        />
      )}
    </div>
  );
};
