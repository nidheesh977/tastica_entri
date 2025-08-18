export const generateId = (prefix) => {
  const randomNumber = Math.floor(Math.random() * 1000);
  const paddedNumber = String(randomNumber).padStart(3, '0');
  return `${prefix}${paddedNumber}`;
}

import counterModel from "../model/counterModel.js"


export const generateInvoiceId = async (shopId) => {

  const date = new Date()
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")




  const counterName = `invoice-${day}${month}`

  const counter = await counterModel.findOneAndUpdate(
    { shopId, counterName: counterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )

  const invoiceId = `INVO${day}${month}${String(counter.seq).padStart(4, "0")}`

  return invoiceId


}