import invoiceModel from "../../model/invoiceModel.js";



export const paymentRefund = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;


    const parseAmount = parseFloat(amount)

    if (amount === "") {
      return res.status(400).json({ success: false, message: "Amount cannot be empty" })
    }

    if (!id) {
      return res.status(400).json({ success: false, message: "Invoice ID is missing" })
    }

    const invoiceExist = await invoiceModel.findById(id);

    const totalAmount = invoiceExist.totalAmount;


    let refundType;
    let invoiceStatus;
    let paymentStatus;


    if (parseAmount < 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" })
    } else if (parseAmount === 0) {
      refundType = null
      invoiceStatus = "paid"
      paymentStatus = "success"
    } else if (parseAmount > totalAmount) {
      return res.status(400).json({ success: false, message: "Exceeds balance" })
    } else if (parseAmount === totalAmount) {
      refundType = "full"
      invoiceStatus = "refunded"
      paymentStatus = "refunded"
    } else if (parseAmount < totalAmount) {
      refundType = "partial"
      invoiceStatus = "paid"
      paymentStatus = "success"
    }


    if (parseAmount === 0) {

      let refundDeductTotal = invoiceExist.subTotal + invoiceExist.totalTax
      const updateInvoice = await invoiceModel.findByIdAndUpdate(id, {
        refundedAmount: parseAmount,
        refundType,
        paymentStatus,
        invoiceStatus,
        totalAmount: refundDeductTotal
      }, { new: true })

      res.status(200).json({ success: true, message: "Payment refunded successfully", data: updateInvoice });
    } else {

      let refundDeductTotal = totalAmount - parseAmount
      const updateInvoice = await invoiceModel.findByIdAndUpdate(id, {
        refundedAmount: parseAmount,
        refundType,
        paymentStatus,
        invoiceStatus,
        totalAmount: refundDeductTotal
      }, { new: true })

      res.status(200).json({ success: true, message: "Payment refunded successfully", data: updateInvoice });
    }



  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" })
  }
}