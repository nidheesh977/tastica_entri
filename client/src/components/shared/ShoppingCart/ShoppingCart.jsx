import {
  MdPersonAdd,
  MdRemoveShoppingCart,
  MdNoCell,
  MdShoppingCart,
} from "react-icons/md";
import { FaSave, FaMoneyCheckAlt, FaTrash } from "react-icons/fa";
import { useCustomers } from "../../../hooks/useCustomers";
import { useState, useEffect } from "react";
import { useInvoices } from "../../../hooks/useInvoices";
import { AlertBox } from "../AlertBox/AlertBox";
import { PayDialogueBox } from "../PayDialogueBox/PayDialogueBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { clearInvoiceData } from "../../../redux/features/invoiceSlice";
import { FiInfo } from "react-icons/fi";

export const ShoppingCart = ({
  addProductToInvoice,
  removeProductFromInvoice,
}) => {
  const { customers, addCustomer } = useCustomers();
  const currency = useSelector((state) => state?.auth?.shopData?.currencyCode);
  const shop = useSelector((state) => state?.auth?.shopData);
  const admin = useSelector((state) => state?.auth?.adminData);
  const dispatch = useDispatch();
  const {
    createInvoice,
    makeCashPayment,
    makeSwipePayment,
    makeOnlinePayment,
    saveInvoice,
    redeemPoints,
    invoice,
    clearInvoice,
  } = useInvoices();

  const products = invoice?.products || [];
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [quantities, setQuantities] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [showPayDialog, setShowPayDialog] = useState(false);
  const [redeemAmountAdd, setRedeemAmountAdd] = useState("");
  const [pointAmount, setPointAmount] = useState("");
  const [invoiceCleared, setInvoiceCleared] = useState(false);
  const [buffer, setBuffer] = useState("");
  const [lastTime, setLastTime] = useState(null);
  const [wallet, setWallet] = useState("");
  const [loyalty, setLoyalty] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const now = new Date().getTime();
      if (e.key === "Enter") {
        if (buffer.length > 2) {
          addProductToInvoice({ productId: buffer, quantity: 1 });
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
    if (invoiceCleared && searchQuery?.length === shop?.phoneNumber?.length) {
      const matchedCustomer = customers?.find(
        (customer) =>
          customer?.phoneNumber?.toString().toLowerCase() ===
          searchQuery.toLowerCase()
      );

      if (matchedCustomer && matchedCustomer._id !== invoice?.customer?._id) {
        setName(matchedCustomer.customerName);
        setMobile(matchedCustomer.phoneNumber);
        setPointAmount(
          matchedCustomer?.loyalityPoint +
            matchedCustomer?.walletLoyaltyPoint || 0
        );
        setWallet(matchedCustomer?.walletLoyaltyPoint);
        setLoyalty(matchedCustomer?.loyalityPoint);
        setIsNewCustomer(false);
        createInvoice(matchedCustomer._id);
      } else if (!matchedCustomer) {
        setName("");
        setIsNewCustomer(true);
      }
    }
  }, [
    searchQuery,
    customers,
    invoice,
    createInvoice,
    shop?.phoneNumber,
    invoiceCleared,
  ]);

  const resetBillingState = () => {
    setCustomerName("");
    setPhoneNumber("");
    setSearchQuery("");
    setName("");
    setMobile("");
    setIsNewCustomer(false);
    setQuantities({});
  };

  const handleCashPay = () => {
    makeCashPayment();
    setShowPayDialog(false);
    resetBillingState();

    admin
      ? navigate("/admin/payment/success/cash")
      : navigate("/staff/payment/success/cash");
  };

  const handleSwipePay = () => {
    makeSwipePayment();
    setShowPayDialog(false);
    resetBillingState();
    admin
      ? navigate("/admin/payment/success/swipe")
      : navigate("/staff/payment/success/swipe");
  };

  const handleStripePay = () => {
    makeOnlinePayment();
    setShowPayDialog(false);
    resetBillingState();
  };

  useEffect(() => {
    resetBillingState();
    dispatch(clearInvoiceData());
    clearInvoice(undefined, {
      onSuccess: () => {
        setInvoiceCleared(true);
        queryClient.invalidateQueries(["invoice"]);
      },
    });
  }, []);

  function getRedeemAmount(redeemAmountAdd, loyalty, wallet) {
    const usedPoints = Math.min(redeemAmountAdd, loyalty);
    const remaining = redeemAmountAdd - usedPoints;
    const usedWallet = Math.min(remaining, wallet);
    console.log("redeemAmountAdd: ", redeemAmountAdd);
    console.log("loyalty: ", loyalty);
    console.log("Wallet: ", wallet);

    return usedPoints + usedWallet;
  }

  return (
    <div className="p-2 border h-[670px]">
      {!isNewCustomer && name === "" && (
        <div className="flex items-center justify-between gap-4 h-9">
          <h1 className="font-bold flex gap-2 text-xl items-center">
            <MdShoppingCart className="text-primary" size={35} /> Cart
          </h1>
          <input
            className="rounded shadow outline-primary h-10 p-5 w-full"
            type="text"
            placeholder="Phone Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span
            className="cursor-pointer rounded-md shadow-xl flex items-center p-2"
            title="Invoice Without Phone Number"
          >
            <MdNoCell
              className="hover:text-orange-600 mx-auto text-primary"
              size={18}
              onClick={() => {
                setSearchQuery(shop?.phoneNumber);
                setIsNewCustomer(false);
              }}
            />
          </span>
        </div>
      )}

      {isNewCustomer && (
        <div className="flex flex-col gap-2 my-2 h-[214px]">
          <p className="font-bold my-2">Add New Customer</p>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Full Name"
            className="rounded shadow outline-primary h-10 p-5"
          />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onFocus={() => setPhoneNumber(searchQuery)}
            maxLength={10}
            placeholder="Mobile"
            className="rounded shadow outline-primary h-10 p-5"
          />
          <button
            onClick={() => {
              addCustomer({ customerName, phoneNumber });
              setCustomerName("");
              setPhoneNumber("");
            }}
            className="bg-primary flex items-center justify-center gap-2 text-white py-2 px-2 rounded hover:bg-opacity-90"
          >
            <MdPersonAdd /> Add
          </button>
        </div>
      )}

      <div className="flex items-center justify-between w-full mt-2">
        {!isNewCustomer && name && (
          <>
            <h1 className="font-bold flex gap-2 text-xl items-center">
              <MdShoppingCart className="text-primary" size={35} /> Cart
            </h1>
            <div className="font-bold">{name}</div>
            <p className="text-sm font-bold">{mobile}</p>
          </>
        )}
      </div>

      <ul className="flex flex-col mt-4 h-[382px] overflow-y-auto w-full">
        {products.map((product, index) => (
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
                    addProductToInvoice({
                      productId: product?.productId,
                      quantity:
                        quantities[product.productId] ?? product.quantity,
                    })
                  }
                />
              ) : (
                <span className="text-center w-12">{product?.quantity}</span>
              )}
              <span className="text-center w-10">{product?.unit}</span>
            </div>
            <span className="flex items-center gap-2 col-span-12 xl:col-span-1 text-right mx-auto xl:mx-0">
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

      {!isNewCustomer && (
        <>
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
                  title="Wallet Amount + Loyalty Amount"
                />
              </div>
              <p>{pointAmount}</p>
              <input
                className="outline-primary px-2 w-2/3 border"
                type="text"
                value={redeemAmountAdd}
                onChange={(e) => {
                  setRedeemAmountAdd(e.target.value);
                }}
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
                    redeemAmountNum > 0 &&
                    redeemAmountNum <= invoice?.totalAmount
                  ) {
                    redeemPoints({ redeemAmountAdd: redeemAmountNum });
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
                resetBillingState();
              }}
            >
              <FaSave /> Save
            </button>
            <button
              className={`flex items-center justify-center gap-2 px-6 py-3 w-1/2 ${
                products.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-opacity-90"
              } text-white rounded-lg`}
              onClick={() => {
                if (products.length === 0) return;
                setShowPayDialog(true);
              }}
            >
              {products.length === 0 ? (
                <MdRemoveShoppingCart />
              ) : (
                <FaMoneyCheckAlt />
              )}
              {products.length === 0 ? "Cart Empty" : "Pay"}
            </button>
          </div>
        </>
      )}

      {showPayDialog && (
        <PayDialogueBox
          message={`Total payable amount: ${currency}${
            invoice?.totalAmount || 0
          }`}
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
