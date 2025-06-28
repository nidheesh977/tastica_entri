import { useEffect, useRef, useState } from "react";
import { useProducts } from "../../../hooks/useProducts";
import { useSelector } from "react-redux";

export const CustomInvoiceCard = ({ createInvoice, deleteInvoice }) => {
  const customInvoice = useSelector((state) => state?.customInvoice);

  const [rows, setRows] = useState([
    { title: "", quantity: "", price: 0, total: 0 },
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRefs = useRef({});
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const { products } = useProducts();

  useEffect(() => {
    const lastIndex = rows.length - 1;
    const input = inputRefs.current?.[`title-${lastIndex}`];
    if (input) input.focus();
  }, [rows.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const table = document.getElementById("invoice-table");
      if (table && !table.contains(event.target)) {
        const lastIndex = rows.length - 1;
        const lastRow = rows[lastIndex];
        if (!lastRow.title.trim() && !lastRow.quantity.trim()) {
          setRows(rows.slice(0, -1));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [rows]);

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
      const { title, quantity } = rows[index];
      if (title.trim() && quantity.trim()) {
        setRows([...rows, { title: "", quantity: "", price: 0, total: 0 }]);
      }
    }
  };

  const totalAmount = rows
    .reduce((sum, row) => sum + parseFloat(row.total || 0), 0)
    .toFixed(2);

  useEffect(() => {
    createInvoice();
    return () => {
      if (customInvoice?.products.length === 0) {
        deleteInvoice();
      }
    };
  }, []);

  return (
    <div className="md:w-5/6 w-full text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-3 text-primary">
          Custom Invoice
        </h1>
      </div>
      <div className="md:w-1/2">
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Name"
          className="p-4 my-1  w-full border  bg-white shadow outline-primary"
        />
        <textarea
          type="text"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          placeholder="Address"
          className="p-4 my-1 border w-full  bg-white shadow outline-primary"
        ></textarea>
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
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr className="border-t border-primary" key={index}>
                <td className="border border-primary px-4 py-2">{index + 1}</td>

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

                  {index === rows.length - 1 && suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto rounded shadow w-full">
                      {suggestions.map((item, i) => (
                        <li
                          key={item._id}
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
                    ref={(el) => (inputRefs.current[`quantity-${index}`] = el)}
                    value={row.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index, "quantity")}
                  />
                </td>

                <td className="border border-primary px-4 py-2">kg</td>
                <td className="border border-primary px-4 py-2">{row.price}</td>
                <td className="border border-primary px-4 py-2">{row.total}</td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={5}
                className="text-right font-semibold px-4 py-2 border border-primary"
              >
                Total Amount
              </td>
              <td className="border border-primary px-4 py-2 font-semibold">
                {totalAmount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
