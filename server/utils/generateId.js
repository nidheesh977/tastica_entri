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

export const generateProductId = async (shopId) => {

  const counterName = "product"

  const counter = await counterModel.findOneAndUpdate(
    { shopId, counterName: counterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )

  const productId = `PROD${String(counter.seq).padStart(4, "0")}`

  return productId;
}

export const generateCategoryId = async (shopId) => {

  const counterName = "category"
  const counter = await counterModel.findOneAndUpdate(
    { shopId, counterName: counterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )

  const categoryId = `CATE${String(counter.seq).padStart(4, "0")}`

  return categoryId;
}


export const generatedStaffId = async (prefix, shopId) => {

  const randomNumber = Math.floor(Math.random() * 1000);

  const couterName = "staff"
  const counter = await counterModel.findOneAndUpdate(
    { shopId, counterName: couterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )

  return `${prefix}${String(randomNumber).padStart(4, counter.seq)}`

}


export const generateCustomerId = async (shopId) => {
  const randomNumber = Math.floor(Math.random() * 1000);
  const counterName = "customer"
  const counter = await counterModel.findOneAndUpdate(
    { shopId, counterName: counterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
  return `CUS${String(randomNumber).padStart(4, counter.seq)}`
}


export const generateCreditId = async (shopId) => {
  const randomNumber = Math.floor(Math.random() * 1000);
  const counterName = "credit"
  const counter = await counterModel.findOneAndUpdate(
    { shopId, counterName: counterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
  return `CRED${String(counter.seq).padStart(4, "0")}`
}


export const generateExpenseId = async (shopId) => {
  const counterName = "expense"
  const counter = await counterModel.findOneAndUpdate(
    { shopId, counterName: counterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
  return `EXPE${String(counter.seq).padStart(6, "0")}`
}


export const generateCustomInvoiceCustomerId = async (shopId) => {
  const counterName = "custom-Invoice-Customer"
  const counter = await counterModel.findOneAndUpdate(
    { shopId, counterName: counterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
  return `CINV-CUST${String(counter.seq).padStart(4, "0")}`
}