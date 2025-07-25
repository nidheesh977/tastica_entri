import invoiceModel from '../../model/invoiceModel.js'
import customerModel from '../../model/customerModel.js'
import { loyalitCalcultaionInCart } from '../../helpers/loyalityPointCalcIncart.js';


export const addRedeemToInvoice = async (req, res) => {
    try {

        const { invoiceId } = req.params;
        const shopId = req.shop.id;
        const { redeemAmountAdd } = req.body;


        if (!invoiceId) {
            return res.staus(400).json({ success: false, message: "Invoice ID not get" })
        }

        const findInvoice = await invoiceModel.findOne({ shop: shopId, _id: invoiceId })

        if (!findInvoice) {
            return res.status(404).json({ success: false, message: "Invoice not found" })
        }

        const findCustomer = await customerModel.findById(findInvoice?.customer);

        if (!findCustomer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        if (redeemAmountAdd < 0) {
            return res.status(400).json({ success: false, message: "Redeem cannot be negative" })
        }







        if (findInvoice.redeemAmount === redeemAmountAdd && findInvoice.redeemAmount !== 0) {
            return res.status(400).json({ success: false, message: "This Amount Already Added" })
        }
        else if (findInvoice.redeemAmount === 0) {
            const deductSubTotal = parseFloat(findInvoice.subTotal - redeemAmountAdd).toFixed(2)
            const deductTotalAmount = parseFloat(findInvoice.totalAmount - redeemAmountAdd).toFixed(2)
            const { loyalityPoint } = findCustomer;
            const updateInvoice = await invoiceModel.findByIdAndUpdate(findInvoice._id, {
                subTotal: deductSubTotal,
                totalAmount: deductTotalAmount,
                redeemAmount: redeemAmountAdd
            }, { new: true })

            loyalitCalcultaionInCart(findInvoice._id, redeemAmountAdd, loyalityPoint)

            res.status(200).json({ success: true, message: "Redeem added successfully", data: updateInvoice })
        }
        else if (redeemAmountAdd <= findInvoice.redeemAmount) {

            const deductSubTotal = parseFloat(findInvoice.subTotal + findInvoice.redeemAmount - redeemAmountAdd).toFixed(2);
            const deductTotalAmount = parseFloat(findInvoice.totalAmount + findInvoice.redeemAmount - redeemAmountAdd).toFixed(2);
            const { loyalityPoint } = findCustomer;
            const updateInvoice = await invoiceModel.findByIdAndUpdate(findInvoice._id, {
                subTotal: deductSubTotal,
                totalAmount: deductTotalAmount,
                redeemAmount: redeemAmountAdd
            }, { new: true })

            loyalitCalcultaionInCart(findInvoice._id, redeemAmountAdd, loyalityPoint)

            res.status(200).json({ success: true, message: "Redeem Updated", data: updateInvoice })
        } else if (redeemAmountAdd > findInvoice.redeemAmount) {

            const deductSubTotal = parseFloat(findInvoice.subTotal + findInvoice.redeemAmount - redeemAmountAdd).toFixed(2);
            const deductTotalAmount = parseFloat(findInvoice.totalAmount + findInvoice.redeemAmount - redeemAmountAdd).toFixed(2);
            const { loyalityPoint } = findCustomer;
            const updateInvoice = await invoiceModel.findByIdAndUpdate(findInvoice._id, {
                subTotal: deductSubTotal,
                totalAmount: deductTotalAmount,
                redeemAmount: redeemAmountAdd
            }, { new: true });

            loyalitCalcultaionInCart(findInvoice._id, redeemAmountAdd, loyalityPoint)

            res.status(200).json({ success: true, message: "Redeem Updated", data: updateInvoice })
        }

    } catch (error) {

        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


