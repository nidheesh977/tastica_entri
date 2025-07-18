import customerModel from "../../model/customerModel.js";
import invoiceModel from "../../model/invoiceModel.js";
import loyaltyTransactionModel from "../../model/loyaltyTransactionModel.js";
import productModel from "../../model/productModel.js";
import shopModel from "../../model/shopModel.js";
import walletModels from "../../model/walletModel.js";
import { parseFloatDecimal } from "../../utils/parseFloatDecimal.js";

const { walletModel, walletTransactionModel } = walletModels;



export const cashPayment = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const staffId = req.user.id;
        const shopId = req.shop.id;

        if (!invoiceId) {
            return res.status(400).json({ success: false, message: 'Invoice ID not get' });
        }

        const findInvoice = await invoiceModel.findById(invoiceId);

        if (!findInvoice) {
            return res.status(400).json({ success: false, message: "Invoice not found" });
        }

        let total = 0  // total of the product
        let totalOfDiscount = 0  // total of the product discount
        let deductDiscountFromTotal = 0 // deduct discount from the total
        let addTax = 0  // if tax exist add tax to total
        let loyaltyPointProduct = 0  // calculate product loyality rate 

        for (const item of findInvoice.products) {


            if (item.customProduct != true && item.loyaltyRate > 0) {
                total += item.total
                totalOfDiscount += item.productDiscount
                deductDiscountFromTotal = total - totalOfDiscount
                addTax = deductDiscountFromTotal + item.taxAmount
                loyaltyPointProduct = addTax * item.loyaltyRate
            }
        }


        const findShop = await shopModel.findById(findInvoice.shop)

        if (!findShop) {
            return res.status(400).json({ success: false, message: "Shop not found" })
        }

        if (findInvoice.paymentStatus === "success") {
            return res.status(400).json({ success: false, message: "Invoice already paid" });
        }

        if (findInvoice.totalAmount === 0) {
            return res.status(400).json({ success: false, message: "Please add product" });
        }

        let findCustomer = await customerModel.findById(findInvoice.customer);

        if (!findCustomer) {
            return res.status(400).json({ success: false, message: "Customer not found" })
        }



        const invoiceCashPayment = await invoiceModel.findByIdAndUpdate(invoiceId, {
            paymentStatus: "success",
            paymentMethod: "cash",
            invoiceStatus: "paid"
        }, { new: true }).populate("customer", "customerName phoneNumber");

        if (!invoiceCashPayment) {
            await invoiceModel.findByIdAndUpdate(invoiceId, {
                paymentStatus: "failed",
                paymentMethod: "cash",
                invoiceStatus: "saved"
            }, { new: true })
        }

        if (!invoiceCashPayment) {
            return res.status(400).json({ success: false, message: "invoice payment failed" })
        }

        // reduce quantity from products

        let productQnt = findInvoice.products

        for (const item of productQnt) {
            const { productId, quantity } = item;

            await productModel.findByIdAndUpdate(productId, {
                $inc: { 'quantity': -quantity }
            }, { new: true })

        }



        const transaction = [
            {
                customerId: findCustomer._id,
                staffId: staffId,
                points: parseFloatDecimal(loyaltyPointProduct),
                type: "EARNED"
            },
            {
                customerId: findCustomer._id,
                staffId: staffId,
                amount: parseFloatDecimal(findInvoice.redeemAmount - findInvoice.walletLoyaltyRedeemAmt),
                type: "REDEEMED"
            }
        ]



        if (findInvoice.redeemAmount > 0 && findShop.phoneNumber !== findCustomer.phoneNumber) {



            const { productLoyaltyRedeemAmt, walletLoyaltyRedeemAmt } = findInvoice;

            const loyaltyDeduct = parseFloatDecimal(findCustomer.loyalityPoint - productLoyaltyRedeemAmt + loyaltyPointProduct)

            const walletLoyaltyDeduct = parseFloatDecimal(walletLoyaltyRedeemAmt)

            await customerModel.findByIdAndUpdate(findCustomer._id, {
                loyalityPoint: loyaltyDeduct,
                $inc: { walletLoyaltyPoint: -walletLoyaltyDeduct },
                $push: { invoices: { $each: [invoiceCashPayment._id] } },

            }, { new: true })

            const findWallet = await walletModel.findOne({ shopId: shopId, customerId: findCustomer._id })

            const ProductLoyaltyDeductInwallet = parseFloatDecimal(findWallet.productLoyaltyPoint - productLoyaltyRedeemAmt + loyaltyPointProduct)

            await walletModel.findOneAndUpdate({ customerId: invoiceCashPayment.customer }, { $inc: { walletLoyaltyPoint: -walletLoyaltyDeduct }, productLoyaltyPoint: ProductLoyaltyDeductInwallet }, { new: true }).populate("customerId", "customerName")

            await loyaltyTransactionModel.insertMany(transaction)

            if (walletLoyaltyRedeemAmt > 0) {
                const newTransaction = walletTransactionModel({
                    customerId: findCustomer._id,
                    staffId: staffId,
                    shopId: shopId,
                    amount: walletLoyaltyRedeemAmt,
                    type: "debit",
                    balanceAfterTransaction: findWallet.walletLoyaltyPoint - walletLoyaltyRedeemAmt
                });

                await newTransaction.save()
            }

            res.status(200).json({ success: true, message: "Cash payment successfully", data: invoiceCashPayment })
        }

        else if (invoiceCashPayment && findShop.phoneNumber !== findCustomer.phoneNumber) {

            let addLoyalty = parseFloatDecimal(findCustomer.loyalityPoint += loyaltyPointProduct);

            await customerModel.findByIdAndUpdate(findCustomer._id, {
                loyalityPoint: addLoyalty,
                $push: { invoices: { $each: [invoiceCashPayment._id] } }
            }, { new: true })

            const loyaltyEarned = loyaltyTransactionModel({
                customerId: findCustomer._id,
                staffId: staffId,
                points: parseFloatDecimal(loyaltyPointProduct),
                type: "EARNED"
            })

            await loyaltyEarned.save()

            const addProductLoyalty = parseFloatDecimal(loyaltyPointProduct);

            await walletModel.findOneAndUpdate({ shopId: shopId, customerId: invoiceCashPayment.customer }, { $inc: { productLoyaltyPoint: addProductLoyalty } }, { new: true }).populate("customerId", "customerName")

            res.status(200).json({ success: true, message: "Cash payment successfully", data: invoiceCashPayment })

        } else {
            await customerModel.findByIdAndUpdate(findCustomer._id, {
                loyalityPoint: 0,
                $push: {
                    invoices: { $each: [invoiceCashPayment._id] },
                },

            }, { new: true })

            res.status(200).json({ success: true, message: "Cash payment successfully", data: invoiceCashPayment })
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}


