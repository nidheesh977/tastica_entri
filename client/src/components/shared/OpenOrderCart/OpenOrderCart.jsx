import { FaSave, FaMoneyCheckAlt, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useInvoices } from "../../../hooks/useInvoices";
import {
  MdShoppingCart,
  MdRemoveShoppingCart,
  MdLocalOffer,
} from "react-icons/md";
import { AlertBox } from "../AlertBox/AlertBox";
import { PayDialogueBox } from "../PayDialogueBox/PayDialogueBox";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveSingleInvoiceOpenOrder } from "../../../redux/features/singleInvoiceOpenOrderSlice";
import { FiInfo } from "react-icons/fi";
import { addBackgroundBlur } from "../../../redux/features/commonSlice";
import { CreditDialogBox } from "../CreditDialogbox/CreditDialogBox";
import { usePermissionCheck } from "../../../hooks/usePermissionCheck";

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
    updateProductQuantityOpenOrder,
    addDiscountOpenOrder,
  } = useInvoices();

  const { hasPermission } = usePermissionCheck()

  const invoice = singleInvoiceOpenOrder;
  const products = invoice?.products;

  const [quantities, setQuantities] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [showPayDialog, setShowPayDialog] = useState(false);
  const [showCreditDialog, setShowCreditDialog] = useState(false);
  const [redeemAmountAdd, setRedeemAmountAdd] = useState("");
  const [pointAmount, setPointAmount] = useState("");
  const [buffer, setBuffer] = useState("");
  const [lastTime, setLastTime] = useState(null);
  const [wallet, setWallet] = useState("");
  const [loyalty, setLoyalty] = useState("");
  const [productId, setProductId] = useState("");
  const [manualDiscount, setManualDiscount] = useState("");
  const [isPay, setIsPay] = useState(false)




  const handleToggle = () => {
    setIsPay((prev) => prev !== true)
  }

  const handleOpenCreditDialog = () => {
    setShowCreditDialog(true)
    dispatch(addBackgroundBlur(true))

  }

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
          addProductToInvoice({
            productId: cleanedBuffer,
            quantity: 1,
          });
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
      // setPointAmount(
      //   invoice.customer?.loyalityPoint +
      //     invoice.customer?.walletLoyaltyPoint || 0
      // );
      setPointAmount(
        Number(
          (
            (invoice.customer?.loyalityPoint || 0) +
            (invoice.customer?.walletLoyaltyPoint || 0)
          ).toFixed(2)
        )
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

      <ul className="flex flex-col mt-4 h-[350px] overflow-y-auto w-full">
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
            <span className="col-span-12 xl:col-span-5 text-center xl:text-start">
              <span className="col-span-12 xl:col-span-5">
                <span className="flex items-center justify-center xl:justify-start">
                  <span className="me-2 font-semibold">{index + 1}.</span>
                  <span
                    className="cursor-pointer inline-block w-32 overflow-hidden whitespace-nowrap text-ellipsis"
                    title={product?.productName}
                  >
                    {product?.productName}
                  </span>
                </span>
              </span>
            </span>
            {productId === product?._id ? (
              <>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className="w-20 bg-tertiary text-center outline-primary border border-primary"
                    onChange={(e) => setManualDiscount(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      addDiscountOpenOrder({ productId, manualDiscount });
                      setProductId("");
                    }}
                    className="px-2 bg-primary rounded  hover:bg-opacity-90 text-tertiary flex items-center gap-1"
                  >
                    <MdLocalOffer size={10} /> Add
                  </button>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="flex items-center col-span-12 xl:col-span-4 mx-auto xl:mx-0">
                  <div className="w-24 me-1 flex justify-between">
                    <div>{product?.price}</div>
                    <div>x</div>
                  </div>
                  {!product?.customProduct && !product?.manualDiscount ? (
                    <input
                      type="number"
                      className="w-14 bg-tertiary text-center"
                      value={quantities[product.productId] ?? product.quantity}
                      onChange={(e) => {
                        const newQty = e.target.value;
                        setQuantities((prev) => ({
                          ...prev,
                          [product.productId]: newQty,
                        }));
                      }}
                      onBlur={() =>
                        updateProductQuantityOpenOrder({
                          productId: product?.productId,
                          quantity:
                            quantities[product.productId] ?? product.quantity,
                        })
                      }
                    />
                  ) : (
                    <span className="text-center w-12">
                      {product?.quantity}
                    </span>
                  )}
                  <span className="text-center w-10">{product?.unit}</span>
                </div>
                <span className="flex items-center gap-2 col-span-12 xl:col-span-1 text-right mx-auto xl:mx-0">
                  {product?.price * product?.quantity}
                </span>
                <span className="col-span-12 xl:col-span-2 gap-2 flex justify-end">
                  <FaTrash
                    title="Remove product"
                    className="text-primary hover:text-orange-600 cursor-pointer"
                    onClick={() => setAlertMessage(product._id)}
                    size={12}
                  />
                  <span className="text-xs">
                    {product?.manualDiscount || ""}
                  </span>
                  <MdLocalOffer
                    size={12}
                    title="Discount"
                    onClick={() => setProductId(product?._id)}
                    className="text-primary hover:text-orange-600 cursor-pointer"
                  />
                </span>{" "}
              </>
            )}
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

      <div className={`${hasPermission("credit_give") ? "h-8" : "h-4"} flex justify-end my-2`}>
        {hasPermission("credit_give") && <button onClick={handleToggle} className={`relative w-[90px] h-8 rounded-full flex items-center px-1 transition-colors ${invoice?.products?.length === 0 ? "invisible" : "visible"} ${isPay ? "bg-red-500" : "bg-primary"}`}>
          <span className={`${isPay ? "translate-x-[42px]" : "translate-x-0"} absolute left-1 top-1 w-[41px] h-6 bg-white rounded-full shadow-md transition-transform duration-300`}></span>
          <span className="relative w-1/2 text-center text-xs text-white font-medium">
            CREDIT
          </span>
          <span className="relative w-1/2 text-center text-xs text-white font-medium">
            PAY
          </span>

        </button>}

      </div>

      <div className="flex gap-2 mt-3 justify-between">
        <button
          className="flex items-center justify-center gap-2 px-6 py-3 w-1/2 bg-secondary hover:bg-opacity-90 text-white rounded-lg"
          onClick={() => {
            saveInvoice();
            navigate("/admin/open/orders");
          }}
        >
          <FaSave /> Save
        </button>

        {invoice?.products.length > 0 && isPay ? <button onClick={handleOpenCreditDialog} className="px-6 py-3 w-1/2 bg-red-500 text-white rounded-lg">Credit</button> : <button
          className={`flex items-center justify-center gap-2 px-6 py-3 w-1/2 ${invoice?.products?.length === 0
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
        </button>}
      </div>
      {showCreditDialog && (<CreditDialogBox
        invoiceData={invoice} setShowCreditDialog={setShowCreditDialog}
      />)}

      {showPayDialog && (
        <PayDialogueBox
          message={`Total payable amount:  ${invoice?.totalAmount || 0}`}
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
