export const generateInvoiceId = () => {
    const prefix = 'INVO';
    const randomNumber = Math.floor(Math.random() * 1000);
    const paddedNumber = String(randomNumber).padStart(3, '0');
    return `${prefix}${paddedNumber}`;
  }