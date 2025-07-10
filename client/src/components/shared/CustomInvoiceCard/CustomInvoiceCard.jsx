import { useEffect, useRef, useState } from "react";
import { useProducts } from "../../../hooks/useProducts";
import { useCustomInvoice } from "../../../hooks/useCustomInvoice";
import { FaTrash } from "react-icons/fa";
import { MdPersonAdd, MdPrint } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const CustomInvoiceCard = () => {
  const createdRef = useRef(false);
  const invoiceIdRef = useRef(null);
  const isEmptyInvoiceRef = useRef(false);
  const navigate = useNavigate();
  const { products } = useProducts();
  const {
    invoiceData,
    addProductToInvoice,
    removeProductFromInvoice,
    createCustomInvoice,
    deleteCustomInvoice,
    createCustomerCustomInvoice,
  } = useCustomInvoice();

  const [rows, setRows] = useState([
    { title: "", quantity: "", price: 0, total: 0 },
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRefs = useRef({});
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerAdded, setCustomerAdded] = useState(false);
  const phone = useSelector((state) => state?.auth?.shopData?.phoneNumber);
  const [buffer, setBuffer] = useState("");
  const [lastTime, setLastTime] = useState(null);

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
    if (!customerAdded) return;
    const lastIndex = rows.length - 1;
    const input = inputRefs.current?.[`title-${lastIndex}`];
    if (input) input.focus();
  }, [rows.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const table = document.getElementById("invoice-table");
      if (table && !table?.contains(event?.target)) {
        const lastIndex = rows.length - 1;
        const lastRow = rows[lastIndex];
        if (!lastRow?.title.trim() && !lastRow?.quantity.trim()) {
          setRows(rows.slice(0, -1));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [rows]);

  useEffect(() => {
    isEmptyInvoiceRef.current = invoiceData?.products?.length === 0;
  }, [invoiceData]);

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;

    if (field === "quantity") {
      const quantity = parseFloat(value) || 0;
      const price = parseFloat(newRows[index].price) || 0;
      newRows[index].total = (quantity * price).toFixed(2);
    }

    if (field === "title") {
      const matched = products.filter((p) =>
        p.productName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matched.slice(0, 5));
      setHighlightIndex(-1);
    }

    setRows(newRows);
  };

  const handleProductSelect = (index, product) => {
    const updated = [...rows];
    const price = product.sellingPrice || product.costPrice || 0;
    updated[index] = {
      ...updated[index],
      title: product.productName,
      productId: product._id,
      price: price,
      quantity: "",
      total: 0,
    };
    setRows(updated);
    setSuggestions([]);
    setHighlightIndex(-1);

    setTimeout(() => {
      inputRefs.current[`quantity-${index}`]?.focus();
    }, 0);
  };

  const handleKeyDown = (e, index, field) => {
    if (field === "title") {
      if (e.key === "ArrowDown") {
        setHighlightIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
      } else if (e.key === "ArrowUp") {
        setHighlightIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = suggestions[highlightIndex] || suggestions[0];
        if (selected) {
          handleProductSelect(index, selected);
        }
      }
    }

    if (field === "quantity" && e.key === "Enter") {
      e.preventDefault();
      const { productId, quantity } = rows[index];
      if (productId && quantity.trim()) {
        addProductToInvoice.mutate({
          productId,
          quantity: parseFloat(quantity),
        });
        setRows([...rows, { title: "", quantity: "", price: 0, total: 0 }]);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    const create = async () => {
      try {
        const invoice = await createCustomInvoice.mutateAsync();
        if (isMounted && invoice?._id) {
          invoiceIdRef.current = invoice._id;
          createdRef.current = true;
        } else {
          console.error("Invoice creation failed: no _id returned", invoice);
        }
      } catch (error) {
        console.error("Failed to create invoice:", error);
      }
    };

    create();

    return () => {
      isMounted = false;
      if (
        createdRef.current &&
        invoiceIdRef.current &&
        isEmptyInvoiceRef.current
      ) {
        deleteCustomInvoice.mutate(invoiceIdRef.current);
      }
    };
  }, []);

  return (
    <div className="md:w-5/6 w-full text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-3 text-primary flex items-center gap-10">
          Custom Invoice{" "}
          <MdPrint
            onClick={() => navigate("/admin/print")}
            title="print"
            className="hover:text-orange-400 cursor-pointer"
          />
        </h1>
        <div className="md:w-1/2">
          {!customerAdded && (
            <p className="text-red-500 font-bold pb-2">
              Add customer details to continue.
            </p>
          )}
          <div
            className={` ${
              customerAdded ? "flex-col text-start" : "flex"
            } flex-wrap md:flex-nowrap`}
          >
            {invoiceData?.customerDetailsCustom?.userName || customerAdded ? (
              <p>{customerName}</p>
            ) : (
              <input
                type="text"
                maxLength={phone?.length}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Name"
                className="p-4 my-1 w-full border bg-white shadow outline-primary"
              />
            )}
            {invoiceData?.customerDetailsCustom?.phoneNumber ||
            customerAdded ? (
              <p>{phoneNumber}</p>
            ) : (
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Mobile"
                className="p-4 my-1 w-full border bg-white shadow outline-primary"
              />
            )}
            {invoiceData?.customerDetailsCustom?.email || customerAdded ? (
              <p>{email}</p>
            ) : (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-4 my-1 w-full border bg-white shadow outline-primary"
              />
            )}
          </div>
          {invoiceData?.customerDetailsCustom?.address || customerAdded ? (
            <p className="text-start">{customerAddress}</p>
          ) : (
            <textarea
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="Address"
              className="p-4 my-1 border w-full bg-white shadow outline-primary"
            ></textarea>
          )}
          {!customerAdded && (
            <button
              className="bg-primary text-tertiary px-4 py-2 rounded hover:bg-opacity-90"
              disabled={!rows}
              onClick={() => {
                createCustomerCustomInvoice.mutate(
                  {
                    customerName,
                    email: email,
                    address: customerAddress,
                    phoneNumber: phoneNumber,
                  },
                  {
                    onSuccess: () => {
                      setCustomerAdded(true);
                      setRows([
                        { title: "", quantity: "", price: 0, total: 0 },
                      ]);
                    },
                  }
                );
              }}
            >
              <span className="flex items-center justify-center gap-2 font-semibold">
                Add Customer <MdPersonAdd />
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-auto h-96 pb-10">
        <table
          id="invoice-table"
          className="min-w-[768px] w-full border border-primary text-left text-sm sm:text-base"
        >
          <thead className="bg-primary/10 font-semibold text-black">
            <tr>
              <th className="border border-primary px-4 py-2">No</th>
              <th className="border border-primary px-4 py-2">Title</th>
              <th className="border border-primary px-4 py-2">Quantity</th>
              <th className="border border-primary px-4 py-2">Unit</th>
              <th className="border border-primary px-4 py-2">Price</th>
              <th className="border border-primary px-4 py-2">Total Price</th>
              <th className="border border-primary px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerAdded &&
              rows.map((row, index) => (
                <tr className="border-t border-primary" key={index}>
                  <td className="border border-primary px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-primary px-4 py-2 relative">
                    <input
                      className="w-full py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      type="text"
                      ref={(el) => (inputRefs.current[`title-${index}`] = el)}
                      value={row.title}
                      onChange={(e) =>
                        handleChange(index, "title", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, index, "title")}
                    />
                    {index === rows?.length - 1 && suggestions.length > 0 && (
                      <ul className="absolute z-10 bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto rounded shadow w-full">
                        {suggestions.map((item, i) => (
                          <li
                            key={item?._id}
                            className={`px-3 py-1 cursor-pointer hover:bg-yellow-100 ${
                              i === highlightIndex ? "bg-yellow-200" : ""
                            }`}
                            onClick={() => handleProductSelect(index, item)}
                          >
                            {item.productName}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    <input
                      className="w-full py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      type="text"
                      ref={(el) =>
                        (inputRefs.current[`quantity-${index}`] = el)
                      }
                      value={row.quantity}
                      onChange={(e) =>
                        handleChange(index, "quantity", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, index, "quantity")}
                    />
                  </td>
                  <td className="border border-primary px-4 py-2">kg</td>
                  <td className="border border-primary px-4 py-2">
                    {row?.price}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {row?.total}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    <FaTrash
                      title="Remove product"
                      className="text-primary hover:text-orange-600 cursor-pointer"
                      size={12}
                      onClick={() => {
                        if (row.productId) {
                          removeProductFromInvoice.mutate({
                            productsId: row.productId,
                          });
                        }
                        const updatedRows = [...rows];
                        updatedRows.splice(index, 1);
                        setRows(updatedRows);
                      }}
                    />
                  </td>
                </tr>
              ))}
            <tr>
              <td
                colSpan={5}
                className="text-right font-semibold px-4 py-2 border border-primary"
              >
                Discount
              </td>
              <td className="border border-primary px-4 py-2 font-semibold">
                {invoiceData?.totalDiscount}
              </td>
            </tr>
            <tr>
              <td
                colSpan={5}
                className="text-right font-semibold px-4 py-2 border border-primary"
              >
                Total Amount
              </td>
              <td className="border border-primary px-4 py-2 font-semibold">
                {invoiceData?.totalAmount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
