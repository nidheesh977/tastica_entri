// utils/printHelper.js

export const wordWrap = (text, maxLineLength) => {
  if (!text || typeof text !== 'string') return '';
  const words = text.split(' ');
  let lines = [], currentLine = '';
  words.forEach(word => {
    if ((currentLine + word).length > maxLineLength && currentLine.length > 0) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });
  if (currentLine.length > 0) lines.push(currentLine.trim());
  return lines.join('\n');
};

const padRight = (str, length) => String(str).padEnd(length, ' ');
const padLeft = (str, length) => String(str).padStart(length, ' ');

export const generateFormattedInvoice = (data) => {
  if (!data) return '';
  const MAX_LINE_LENGTH = 42;
  let output = '', subtotal = 0, totalDiscount = 0;

  output += '-------------------------------------------\n';
  output += padRight('Zensettle - Malaysia', MAX_LINE_LENGTH).trim() + '\n';
  output += '-------------------------------------------\n\n';

  output += `Invoice No: ${data.invoiceNumber}\n`;
  output += `Date: ${new Date(data.createdAt).toLocaleString()}\n`;
  output += `Staff: ${data.staff}\n`;

  if (data.customInvoice?.customerName) {
    output += `Customer: ${data.customInvoice.customerName}\n`;
    if (data.customInvoice.phoneNumber)
      output += `Phone: ${data.customInvoice.phoneNumber}\n`;
    if (data.customInvoice.address)
      output += `Address: ${wordWrap(data.customInvoice.address, MAX_LINE_LENGTH - 9)}\n`;
  } else {
    output += `Customer: ${data.customer}\n`;
  }

  output += '\n-------------------------------------------\n';

  const PRODUCT_COL_WIDTH = 19, QTY = 3, PRICE = 6, DISC = 5, NET = 5, GAP = 1;

  output += padRight('Product', PRODUCT_COL_WIDTH) + ' '.repeat(GAP) +
            padLeft('Qty', QTY) + ' '.repeat(GAP) +
            padLeft('Price', PRICE) + ' '.repeat(GAP) +
            padLeft('Disc', DISC) + ' '.repeat(GAP) +
            padLeft('Net', NET) + '\n';
  output += '-------------------------------------------\n';

  data.products.forEach(product => {
    const originalLineTotal = product.price * product.quantity;
    const discountedLineTotal = originalLineTotal - product.productDiscount;
    subtotal += originalLineTotal;
    totalDiscount += product.productDiscount;

    const lines = wordWrap(product.productName, PRODUCT_COL_WIDTH).split('\n');
    output += padRight(lines[0], PRODUCT_COL_WIDTH) + ' '.repeat(GAP) +
              padLeft(product.quantity, QTY) + ' '.repeat(GAP) +
              padLeft(product.price.toFixed(1), PRICE) + ' '.repeat(GAP) +
              padLeft(product.productDiscount.toFixed(1), DISC) + ' '.repeat(GAP) +
              padLeft(discountedLineTotal.toFixed(1), NET) + '\n';

    for (let i = 1; i < lines.length; i++) {
      output += padRight(lines[i], MAX_LINE_LENGTH) + '\n';
    }
  });

  output += '-------------------------------------------\n';

  const summaryValueWidth = 15;
  const summaryLabelWidth = MAX_LINE_LENGTH - summaryValueWidth;
  const total = subtotal - totalDiscount;

  output += padRight('Subtotal:', summaryLabelWidth) + padLeft(subtotal.toFixed(1), summaryValueWidth) + '\n';
  output += padRight('Total Discount:', summaryLabelWidth) + padLeft(totalDiscount.toFixed(1), summaryValueWidth) + '\n';
  if (data.isTaxActive) {
    output += padRight('Total Tax:', summaryLabelWidth) + padLeft(data.totalTax.toFixed(1), summaryValueWidth) + '\n';
  }
  output += padRight('Total Amount:', summaryLabelWidth) + padLeft(`${data.currencyCode} ${total.toFixed(1)}`, summaryValueWidth) + '\n';
  output += `Payment Status: ${data.paymentStatus?.toUpperCase()}\n`;
  if (data.paymentMethod) {
    output += `Payment Method: ${data.paymentMethod}\n`;
  }

  output += '\nThank you for shopping.\n';
  output += '-------------------------------------------\n';
  return output;
};
