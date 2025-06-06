import { MdPersonAdd } from "react-icons/md";
import { FaSave, FaMoneyCheckAlt, FaTrash } from "react-icons/fa";
import { useCustomers } from "../../../hooks/useCustomers";
import { useState, useEffect } from "react";
import { useInvoices } from "../../../hooks/useInvoices";
import { MdShoppingCart } from "react-icons/md";
import { AlertBox } from "../AlertBox/AlertBox";
import { PayDialogueBox } from "../PayDialogueBox/PayDialogueBox";

export const ShoppingCart = ({
  addProductToInvoice,
  removeProductFromInvoice,
}) => {
  const { customers, addCustomer } = useCustomers();

  const {
    createInvoice,
    makeCashPayment,
    makeSwipePayment,
    makeOnlinePayment,
    saveInvoice,
    redeemPoints,
    invoice,
  } = useInvoices();

  const products = invoice?.products;
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

  useEffect(() => {
    if (searchQuery?.length === 7) {
      const matchedCustomer = customers?.find(
        (customer) =>
          customer?.phoneNumber?.toString().toLowerCase() ===
          searchQuery.toLowerCase(),
      );

      if (matchedCustomer && matchedCustomer._id !== invoice?.customer?._id) {
        setName(matchedCustomer.customerName);
        setMobile(matchedCustomer.phoneNumber);
        setPointAmount(matchedCustomer?.pointAmount);
        setIsNewCustomer(false);
        createInvoice(matchedCustomer._id); // Only if different from current
      } else if (!matchedCustomer) {
        setName("");
        setIsNewCustomer(true);
      }
    }
  }, [searchQuery, customers]);

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
    setShowPayDialog(false);
    makeCashPayment();
    resetBillingState();
  };
  const handleSwipePay = () => {
    setShowPayDialog(false);
    makeSwipePayment();
    resetBillingState();
  };

  const handleStripePay = () => {
    setShowPayDialog(false);
    makeOnlinePayment();
    resetBillingState();
  };

  const handleCancel = () => {
    setShowPayDialog(false);
  };

  useEffect(() => {
    if (invoice?.customer) {
      setName(invoice.customer.customerName || "");
      setMobile(invoice.customer.phoneNumber || "");
      setPointAmount(invoice.customer.pointAmount || "");
    }
  }, [invoice]);
  useEffect(() => {
    if (invoice?.products) {
      const initialQuantities = {};
      invoice.products.forEach((product) => {
        initialQuantities[product.productId] = product.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [invoice]);

  return (
    <div className="p-5 border">
      {!isNewCustomer && name === "" && (
        <div className="flex items-center justify-between gap-4 h-9">
          {!isNewCustomer && (
            <h1 className="font-bold flex gap-2 text-xl items-center">
              <MdShoppingCart className="text-primary" size={35} /> Cart
            </h1>
          )}
          <input
            className="rounded shadow md:col-span-4 outline-primary h-10 p-5 w-full "
            type="text"
            placeholder="Enter customer mobile number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {isNewCustomer && (
        <div className="flex flex-col gap-2 my-2 h-[214px]">
          <div className="flex items-center justify-between my-2">
            <p className="font-bold">Add New Customer</p>
          </div>
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
            minLength={7}
            maxLength={14}
            placeholder="Mobile"
            className="rounded shadow outline-primary h-10 p-5"
          />

          <button
            onClick={() => {
              addCustomer({
                customerName,
                phoneNumber,
              });

              setCustomerName("");
              setPhoneNumber("");
            }}
            className="bg-primary flex items-center justify-center gap-2  text-white py-2 px-2 rounded hover:bg-opacity-90"
          >
            <MdPersonAdd /> Add
          </button>
        </div>
      )}

      <div className="flex items-center justify-between w-full">
        {!isNewCustomer && name && (
          <h1 className="font-bold flex gap-2 text-xl items-center">
            <MdShoppingCart className="text-primary" size={35} /> Cart
          </h1>
        )}
        {!isNewCustomer && <div className="font-bold ">{name}</div>}
        {!isNewCustomer && name !== "" && (
          <div>
            <p className="text-sm font-bold ">{mobile}</p>
          </div>
        )}
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
            <span className=" col-span-12 xl:col-span-6 my-1 xl:my-0 text-center xl:text-start">
              <span className="me-2 font-semibold">{index + 1}.</span>
              {product?.productName}
            </span>
            <div className="flex items-center col-span-12 xl:col-span-4 my-2 xl:my-0 mx-auto xl:mx-0">
              <>
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
                <span>{product?.unit}</span>
              </>
            </div>
            <span className="flex items-center  gap-2 col-span-12 xl:col-span-1 mx-auto xl:mx-0 text-right my-2 xl:my-0  ">
              {product?.price}
            </span>
            <span className="col-span-12 xl:col-span-1">
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
        <div className="mt-2 w-full font-bold">
          {/* <div className="flex justify-between items-center border px-2 py-2">
            <div>Subtotal</div>
            <div>MVR{invoice?.subTotal || 0}</div>
          </div> */}
          <div className="flex justify-between items-center border px-2 py-2">
            <div>Products Discount</div>
            <div>MVR{invoice?.totalDiscount || 0}</div>
          </div>
          <div className="flex justify-between items-center gap-2 border px-2 py-2">
            <div>Discount</div>
            <p>{pointAmount}</p>
            <div>
              <input
                className="outline-primary px-2 w-2/3 border "
                type="text"
                onChange={(e) => {
                  setRedeemAmountAdd(e.target.value);
                }}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  redeemPoints(redeemAmountAdd);
                  setRedeemAmountAdd("");
                }}
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
      )}

      {!isNewCustomer && (
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
            className="flex items-center justify-center gap-2 px-6 py-3 w-1/2 bg-primary hover:bg-opacity-90 text-white rounded-lg"
            onClick={() => setShowPayDialog(true)}
          >
            <FaMoneyCheckAlt /> Pay
          </button>
        </div>
      )}

      {showPayDialog && (
        <PayDialogueBox
          message={`Total payable amount: MVR${invoice?.totalAmount || 0}`}
          cashPay={handleCashPay}
          swipePay={handleSwipePay}
          stripePay={handleStripePay}
          onCancel={handleCancel}
          invoice={invoice}
        />
      )}
    </div>
  );
};
