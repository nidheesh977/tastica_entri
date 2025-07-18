import { FaSave, FaMoneyCheckAlt, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useInvoices } from "../../../hooks/useInvoices";
import { MdShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { AlertBox } from "../AlertBox/AlertBox";
import { PayDialogueBox } from "../PayDialogueBox/PayDialogueBox";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveSingleInvoiceOpenOrder } from "../../../redux/features/singleInvoiceOpenOrderSlice";
import { FiInfo } from "react-icons/fi";

export const OpenOrderCart = ({
  addProductToInvoice,
  removeProductFromInvoice,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state?.auth?.adminData);
  const currency = useSelector((state) => state?.auth?.shopData?.currencyCode);
  const {
    singleInvoiceOpenOrder,
    makeCashPaymentOpenOrder,
    makeSwipePaymentOpenOrder,
    makeOnlinePaymentOpenOrder,
    saveInvoice,
    redeemPointsOpenOrder,
    addProductToInvoiceOpenOrder,
  } = useInvoices();

  const invoice = singleInvoiceOpenOrder;
  const products = invoice?.products;

  const [quantities, setQuantities] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [showPayDialog, setShowPayDialog] = useState(false);
  const [redeemAmountAdd, setRedeemAmountAdd] = useState("");
  const [pointAmount, setPointAmount] = useState("");
  const [buffer, setBuffer] = useState("");
  const [lastTime, setLastTime] = useState(null);
  const [wallet, setWallet] = useState("");
  const [loyalty, setLoyalty] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      const now = new Date().getTime();
      // if (e.key === "Enter") {
      //   if (buffer.length > 2) {
      //     addProductToInvoiceOpenOrder({ productId: buffer, quantity: 1 });
      //   }
      //   setBuffer("");
      //   setLastTime(null);
      //   return;
      // }
      if (e.key === "Enter") {
        const cleanedBuffer = buffer.replace(/shift/gi, "");
        console.log(cleanedBuffer);
        if (cleanedBuffer.length > 2) {
          addProductToInvoiceOpenOrder({ productId: cleanedBuffer, quantity: 1 });
        }
        
        setBuffer("");
        setLastTime(null);
        return;
      }
      
      if (lastTime && now - lastTime > 100) {
        setBuffer("");
      }
      setBuffer((prev) => prev + e.key);
      setLastTime(now);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [buffer, lastTime]);

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
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (invoice?.customer?.loyalityPoint !== undefined) {
      setPointAmount(
        invoice.customer?.loyalityPoint +
          invoice.customer?.walletLoyaltyPoint || 0
      );
      setWallet(invoice.customer?.walletLoyaltyPoint);
      setLoyalty(invoice.customer?.loyalityPoint);
    }
  }, [invoice]);

  const handleCashPay = () => {
    setShowPayDialog(false);
    makeCashPaymentOpenOrder(id);
    navigate(
      admin ? "/admin/payment/success/cash" : "/staff/payment/success/cash"
    );
  };

  const handleSwipePay = () => {
    setShowPayDialog(false);
    makeSwipePaymentOpenOrder(id);
    navigate(
      admin ? "/admin/payment/success/swipe" : "/staff/payment/success/swipe"
    );
  };

  const handleStripePay = () => {
    setShowPayDialog(false);
    makeOnlinePaymentOpenOrder(id);
    navigate(
      admin ? "/admin/payment/success/online" : "/staff/payment/success/online"
    );
  };

  function getRedeemAmount(redeemAmountAdd, loyalty, wallet) {
    const usedPoints = Math.min(redeemAmountAdd, loyalty);
    const remaining = redeemAmountAdd - usedPoints;
    const usedWallet = Math.min(remaining, wallet);

    return usedPoints + usedWallet;
  }

  return (
    <div className="p-2 border h-[670px]">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold flex gap-2 text-xl items-center">
          <MdShoppingCart className="text-primary" size={35} /> Cart
        </h1>
        <div className="font-bold">{invoice?.customer?.customerName}</div>
        <div>
          <p className="text-sm font-bold">{invoice?.customer?.phoneNumber}</p>
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
            <span className="col-span-12 xl:col-span-6 text-center xl:text-start">
              <span className="me-2 font-semibold">{index + 1}.</span>
              {product?.productName}
            </span>
            <div className="flex items-center col-span-12 xl:col-span-4 mx-auto xl:mx-0">
              <div className="w-24 me-1 flex justify-between">
                <div>{product?.price}</div>
                <div>x</div>
              </div>
              {!product?.customProduct ? (
                <input
                  type="number"
                  className="w-12 bg-tertiary text-center"
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
              ) : (
                <span className="text-center w-12">{product?.quantity}</span>
              )}
              <span className="text-center w-10">{product?.unit}</span>
            </div>
            <span className="col-span-12 flex items-center gap-2 xl:col-span-1 mx-auto xl:mx-0 text-right">
              {product?.price * product?.quantity}
            </span>
            <span className="col-span-12 xl:col-span-1 flex justify-end">
              <FaTrash
                title="Remove product"
                className="text-primary hover:text-orange-600 cursor-pointer"
                onClick={() => setAlertMessage(product._id)}
                size={12}
              />
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-2 w-full font-bold">
        <div className="flex justify-between items-center border px-2 py-2">
          <div>Products Discount</div>
          <div>
            {currency}
            {invoice?.totalDiscount || 0}
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 border px-2 py-2">
          <div className="flex items-center gap-1 hover:cursor-pointer">
            Discount{" "}
            <FiInfo
              className="hover:text-primary"
              title={`Loyalty Amount (${loyalty}) + Wallet Amount (${wallet})`}
            />
          </div>
          <p>{pointAmount}</p>
          <input
            className="outline-primary px-2 w-2/3 border"
            type="text"
            value={redeemAmountAdd} 
            onChange={(e) => setRedeemAmountAdd(e.target.value)}
          />
          <button
            onClick={() => {
              const redeemAmountNum = getRedeemAmount(
                Number(redeemAmountAdd),
                loyalty,
                wallet
              );

              if (
                !isNaN(redeemAmountNum) &&
                redeemAmountNum >= 0 &&
                redeemAmountNum <= invoice?.totalAmount
              ) {
                redeemPointsOpenOrder({ redeemAmountAdd: redeemAmountNum, id });
                setRedeemAmountAdd("");
              }

              
            }}
            className="bg-primary text-white rounded p-1 text-sm hover:bg-opacity-90"
          >
            Redeem
          </button>
        </div>
        <div className="flex justify-between items-center font-semibold border px-2 py-2">
          <div>Total</div>
          <div>
            {currency}
            {invoice?.totalAmount || 0}
          </div>
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
          className={`flex items-center justify-center gap-2 px-6 py-3 w-1/2 ${
            invoice?.products?.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-opacity-90"
          } text-white rounded-lg`}
          onClick={() => {
            if (invoice?.products?.length === 0) return;
            setShowPayDialog(true);
          }}
        >
          {invoice?.products?.length === 0 ? (
            <MdRemoveShoppingCart />
          ) : (
            <FaMoneyCheckAlt />
          )}
          {invoice?.products?.length === 0 ? "Cart Empty" : "Pay"}
        </button>
      </div>

      {showPayDialog && (
        <PayDialogueBox
          message={`Total payable amount: MVR${invoice?.totalAmount || 0}`}
          cashPay={handleCashPay}
          swipePay={handleSwipePay}
          stripePay={handleStripePay}
          onCancel={() => setShowPayDialog(false)}
          invoice={invoice}
        />
      )}
    </div>
  );
};
