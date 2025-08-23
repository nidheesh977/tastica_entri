import { useState, useEffect } from "react";
import qz from "qz-tray";
import { useSelector } from "react-redux";

const ThermalPrinterInvoice = () => {
  const invoice = useSelector((state) => state?.latestPaidInvoice);
  const [invoiceData, setInvoiceData] = useState(null);
  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [isQzTrayConnected, setIsQzTrayConnected] = useState(false);
  const [printMessage, setPrintMessage] = useState("");
  const { shopName, phoneNumber } = useSelector((state) => state?.auth?.shopData);

  useEffect(() => {
    if (invoice && invoice.products?.length > 0) {
      setInvoiceData(invoice);
    }
  }, [invoice]);

  function wordWrap(text, maxLineLength) {
    if (!text || typeof text !== "string") return "";
    const words = text.split(" ");
    let lines = [],
      currentLine = "";
    words.forEach((word) => {
      if (
        (currentLine + word).length > maxLineLength &&
        currentLine.length > 0
      ) {
        lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    });
    if (currentLine.length > 0) lines.push(currentLine.trim());
    return lines.join("\n");
  }

  const padRight = (str, length) => String(str).padEnd(length, " ");
  const padLeft = (str, length) => String(str).padStart(length, " ");

  const generateFormattedInvoice = (data) => {




    const splitStaffName = data?.staff?.split(" ")

    const MAX_LINE_LENGTH = 42;
    let out = "";
    let subtotal = 0,
      discount = 0;

    out += "-------------------------------------------\n";
    out +=
      padRight(`${shopName} - ${data?.countryName}`, MAX_LINE_LENGTH).trim() +
      "\n";
    out += "-------------------------------------------\n\n";

    out += `Invoice No: ${data?.invoiceNumber}\n`;
    out += `Date: ${new Date(data?.createdAt).toLocaleString()}\n`;
    out += `Staff: ${splitStaffName[0]}\n`;

    if (data?.customerDetailsCustom?.customerName) {
      out += `Customer: ${data?.customerDetailsCustom?.customerName}\n`;
      if (data.customerDetailsCustom.phoneNumber)
        out += `Phone: ${data?.customerDetailsCustom?.phoneNumber}\n`;
      if (data?.customerDetailsCustom?.address) {
        out += `Address: ${wordWrap(
          data?.customerDetailsCustom?.address,
          MAX_LINE_LENGTH - 9
        )}\n`;
      }
    } else if (
      data?.customer &&
      typeof data?.customer === "object" &&
      data?.customer?.customerName
    ) {
      if (shopName != data.customer.customerName) out += `Customer: ${data?.customer?.customerName}\n`;
      if (data?.customer?.phoneNumber && phoneNumber != data?.customer?.phoneNumber) out += `Phone: ${data?.customer?.phoneNumber}\n`;
    } else {
      out += `Customer: Guest\n`;
    }

    out += "\n-------------------------------------------\n";

    const PRODUCT_COL_WIDTH = 19;
    const QTY_COL_WIDTH = 3;
    const PRICE_COL_WIDTH = 6;
    const DISC_COL_WIDTH = 5;
    const NET_COL_WIDTH = 5;
    const GAP = 1;

    out +=
      padRight("Product", PRODUCT_COL_WIDTH) +
      " ".repeat(GAP) +
      padLeft("Qty", QTY_COL_WIDTH) +
      " ".repeat(GAP) +
      padLeft("Price", PRICE_COL_WIDTH) +
      " ".repeat(GAP) +
      padLeft("Disc", DISC_COL_WIDTH) +
      " ".repeat(GAP) +
      padLeft("Net", NET_COL_WIDTH) +
      "\n";
    out += "-------------------------------------------\n";

    data?.products?.forEach((p) => {
      const originalTotal = p.price * p.quantity;
      const discounted = originalTotal - p.productDiscount;
      subtotal += originalTotal;
      discount += p.productDiscount;

      const wrappedName = wordWrap(p.productName, PRODUCT_COL_WIDTH).split(
        "\n"
      );

      out += padRight(wrappedName[0], PRODUCT_COL_WIDTH) + " ".repeat(GAP);
      out += padLeft(p.quantity, QTY_COL_WIDTH) + " ".repeat(GAP);
      out += padLeft(p.price.toFixed(1), PRICE_COL_WIDTH) + " ".repeat(GAP);
      out +=
        padLeft(p.productDiscount?.toFixed(1) ?? "0.0", DISC_COL_WIDTH) +
        " ".repeat(GAP);
      out += padLeft(discounted.toFixed(1), NET_COL_WIDTH) + "\n";

      for (let i = 1; i < wrappedName.length; i++) {
        out += padRight(wrappedName[i], MAX_LINE_LENGTH) + "\n";
      }
    });

    out += "-------------------------------------------\n";

    const summaryValueWidth = 15;
    const summaryLabelWidth = MAX_LINE_LENGTH - summaryValueWidth;

    out +=
      padRight("Subtotal:", summaryLabelWidth) +
      padLeft(subtotal.toFixed(1), summaryValueWidth) +
      "\n";
    out +=
      padRight("Total Discount:", summaryLabelWidth) +
      padLeft(discount.toFixed(1), summaryValueWidth) +
      "\n";
    if (data?.isTaxActive) {
      out +=
        padRight("Total Tax:", summaryLabelWidth) +
        padLeft(data.totalTax?.toFixed(1) ?? "0.0", summaryValueWidth) +
        "\n";
    }

    if (data?.redeemAmount) {
      out += padRight("Redeem Amount:", summaryLabelWidth) +
        padLeft(data.redeemAmount.toFixed(1), summaryValueWidth) + "\n"
    }

    out +=
      padRight("Total Amount:", summaryLabelWidth) +
      padLeft(`${data?.currencyCode} ${data.totalAmount.toFixed(1)}`, summaryValueWidth) +
      "\n";

    out += `Payment Status: ${data?.paymentStatus?.toUpperCase()}\n`;
    if (data?.paymentMethod) {
      out += `Payment Method: ${data.paymentMethod}\n`;
    }

    out += "\nThank you for shopping.\n";
    out += "-------------------------------------------\n";
    return out;
  };

  useEffect(() => {
    const connectAndLoadPrinters = async () => {
      try {
        if (!qz.websocket.isActive()) {
          console.log("Connecting to QZ Tray...");
          await qz.websocket.connect();
          setIsQzTrayConnected(true);
          console.log("QZ Tray connected.");
        } else {
          setIsQzTrayConnected(true);
        }

        const printerList = await qz.printers.find();
        setPrinters(printerList);
        if (printerList.length > 0) {
          setSelectedPrinter(printerList[0]);
        }
      } catch (err) {
        console.error("Failed to connect QZ Tray:", err);
        setPrintMessage("QZ Tray connection failed.");
      }
    };

    connectAndLoadPrinters();

    return () => {
      if (qz.websocket.isActive()) {
        console.log("Disconnecting from QZ Tray...");
        qz.websocket.disconnect();
      }
    };
  }, []);

  const handlePrint = async () => {
    if (!isQzTrayConnected || !selectedPrinter) {
      setPrintMessage("Printer not connected or not selected.");
      return;
    }

    try {
      const content = generateFormattedInvoice(invoiceData);
      const config = qz.configs.create(selectedPrinter);
      const data = ["\x1B\x40", content, "\x1D\x56\x00"];
      await qz.print(config, data);
      setPrintMessage("✅ Printed successfully!");
    } catch (err) {
      console.error("Print error:", err);
      setPrintMessage("❌ Print failed. Check console.");
    }
  };

  if (!invoiceData) {
    return (
      <div className="p-4 text-center text-gray-600">
        Loading invoice or no products to print...
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 rounded-lg shadow-md font-sans m-3">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Thermal Printer Invoice
      </h1>

      <div className="mb-4">
        <label
          htmlFor="printer-select"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Printer:
        </label>
        <select
          id="printer-select"
          value={selectedPrinter}
          onChange={(e) => setSelectedPrinter(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
        >
          {printers.length > 0 ? (
            printers.map((printer, index) => (
              <option key={index} value={printer}>
                {printer}
              </option>
            ))
          ) : (
            <option value="">No printers found</option>
          )}
        </select>
      </div>

      <button
        onClick={handlePrint}
        disabled={!isQzTrayConnected || !selectedPrinter}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Print Invoice Now
      </button>

      {printMessage && (
        <div
          className={`mt-4 p-3 text-sm rounded-md ${printMessage.includes("✅")
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            }`}
        >
          {printMessage}
        </div>
      )}

      <div className="mt-6 p-4 bg-white rounded-md shadow-inner text-sm overflow-auto max-h-96">
        <h4 className="font-semibold mb-2 text-gray-800">Invoice Preview:</h4>
        <pre className="whitespace-pre-wrap font-mono text-gray-700">
          {generateFormattedInvoice(invoiceData)}
        </pre>
      </div>
    </div>
  );
};

export default ThermalPrinterInvoice;
