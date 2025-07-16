import invoiceModel from "../../model/invoiceModel.js";
import Stripe from 'stripe'
import loyalityTransactionModel from "../../model/loyalityTransactionModel.js";
import customerModel from "../../model/customerModel.js";
import productModel from "../../model/productModel.js";
import shopModel from "../../model/shopModel.js";
import walletModels from "../../model/walletModel.js";
import { parseFloatDecimal } from "../../utils/parseFloatDecimal.js";

const { walletModel, walletTransactionModel } = walletModels;

export const onlinePaymentStripe = async (req, res) => {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MY)


    try {
        const { invoiceId } = req.params;

        const { role } = req.user;

        if (!invoiceId) {
            return res.stattus(400).json({ success: true, message: "Invoice ID not get" })
        }

        const findInvoice = await invoiceModel.findById(invoiceId);

        if (!findInvoice) {
            return res.status(400).json({ success: false, message: "Invoice not found" });
        }

        if (findInvoice.totalAmount === 0) {
            return res.status(400).json({ success: false, message: "Please add product" });
        }

        if (findInvoice.paymentStatus === "success") {
            return res.status(400).json({ success: false, message: "Invoice already paid" });
        }

        const successUrl = role === "admin" ? process.env.ADMIN_SUCCESS_URL : process.env.STAFF_SUCCESS_URL
        const cancelUrl = role === "admin" ? process.env.ADMIN_CANCEL_URL : process.env.STAFF_CANCEL_URL




        const totalAmount = parseFloat(findInvoice.totalAmount).toFixed(2);
        const countryCurrency = findInvoice.currencyCode.toLowerCase()

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: countryCurrency,
                    product_data: {
                        name: "Payable Amount"
                    },
                    unit_amount: totalAmount * 100
                },
                quantity: 1
            }],
            mode: "payment",
            success_url: `${successUrl}/?invoice=${findInvoice._id}`,
            cancel_url: `${cancelUrl}/?invoice=${findInvoice._id}`
        })

        res.status(200).json({ success: true, message: "payment Success", session: session })


    } catch (error) {

        res.status(500).json({ success: false, message: "Internal server error", error })
    }
}





export const OnlinePaymentSuccess = async (req, res) => {
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
            if (item.customProduct != true) {
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

        let findCustomer = await customerModel.findById(findInvoice.customer);

        if (!findCustomer) {
            return res.status(400).json({ success: false, message: "Customer not found" })
        }

        const findWallet = await walletModel.findOne({ shopId, customerId: findCustomer._id })

        if (!findWallet) {
            return res.status(400).json({ success: false, message: "Wallet not found" })
        }

        const invoiceDigitalPayment = await invoiceModel.findByIdAndUpdate(invoiceId, {
            paymentStatus: "success",
            paymentMethod: "digital",
            invoiceStatus: "paid"
        }, { new: true }).populate("customer", "customerName phoneNumber");


        // reduce quantity from products

        let productQnt = findInvoice.products

        for (const item of productQnt) {
            const { productId, quantity } = item;

            await productModel.findByIdAndUpdate(productId, {
                $inc: { 'quantity': -quantity }
            }, { new: true })
        }



        // add loyality points to customer

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
                amount: findInvoice.redeemAmount,
                type: "REDEEMED"
            }
        ]



        if (findInvoice.redeemAmount > 0 && findShop.phoneNumber !== findCustomer.phoneNumber) {


            const { productLoyaltyRedeemAmt, walletLoyaltyRedeemAmt } = findInvoice;

            const loyalityDeduct = parseFloatDecimal(findCustomer.loyalityPoint - productLoyaltyRedeemAmt + loyaltyPointProduct)

            const walletLoyalityDeductCustomer = parseFloatDecimal(walletLoyaltyRedeemAmt)


            await customerModel.findByIdAndUpdate(findCustomer._id, {
                loyalityPoint: loyalityDeduct,
                $inc: { walletLoyaltyPoint: -walletLoyalityDeductCustomer },
                $push: {
                    invoices: { $each: [invoiceDigitalPayment._id] },
                },

            }, { new: true })



            const ProductloyalityDeductInwallet = parseFloatDecimal(findWallet.productLoyaltyPoint - productLoyaltyRedeemAmt + loyaltyPointProduct)

            await walletModel.findOneAndUpdate({ customerId: invoiceDigitalPayment.customer }, { $inc: { walletLoyaltyPoint: -walletLoyaltyRedeemAmt }, productLoyaltyPoint: ProductloyalityDeductInwallet }, { new: true }).populate("customerId", "customerName")

            await loyalityTransactionModel.insertMany(transaction)

            if (walletLoyaltyRedeemAmt > 0) {
                const newTransaction = walletTransactionModel({
                    customerId: findCustomer._id,
                    staffId: staffId,
                    shopId: shopId,
                    amount: walletLoyaltyRedeemAmt,
                    type: "debit",
                });

                await newTransaction.save()
            }

            res.status(200).json({ success: true, message: "Stripe payment successfully", data: invoiceDigitalPayment })
        }

        else if (invoiceDigitalPayment && findShop.phoneNumber !== findCustomer.phoneNumber) {

            let addLoyalty = parseFloatDecimal(findCustomer.loyalityPoint += loyaltyPointProduct);

            await customerModel.findByIdAndUpdate(findCustomer._id, {
                loyalityPoint: addLoyalty,
                $push: {
                    invoices: { $each: [invoiceDigitalPayment._id] },
                },

            }, { new: true })

            const loyalityEarned = loyalityTransactionModel({
                customerId: findCustomer._id,
                staffId: staffId,
                points: parseFloatDecimal(loyaltyPointProduct),
                type: "EARNED"
            })

            await loyalityEarned.save()

            const addProductLoyalty = parseFloatDecimal(loyaltyPointProduct);

            await walletModel.findOneAndUpdate({ shopId: shopId, customerId: invoiceDigitalPayment.customer }, { $inc: { productLoyaltyPoint: addProductLoyalty } }, { new: true }).populate("customerId", "customerName")


            res.status(200).json({ success: true, message: "Stripe payment successfully", data: invoiceDigitalPayment })

        } else {
            await customerModel.findByIdAndUpdate(findCustomer._id, {
                loyalityPoint: 0,
                $push: {
                    invoices: { $each: [invoiceDigitalPayment._id] },
                },

            }, { new: true })

            res.status(200).json({ success: true, message: "Cash payment successfully", data: invoiceDigitalPayment })
        }


    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}


export const OnlinePaymentFailed = async (req, res) => {
    try {
        const { invoiceId } = req.params;

        if (!invoiceId) {
            return res.status(400).json({ success: false, message: 'Invoice ID not get' });
        }

        const findInvoice = await invoiceModel.findById(invoiceId);

        if (!findInvoice) {
            return res.status(400).json({ success: false, message: "Invoice not found" });
        }

        if (findInvoice.paymentStatus === "success") {
            return res.status(400).json({ success: false, message: "Invoice already paid" });
        }

        let findCustomer = await customerModel.findById(findInvoice.customer);

        if (!findCustomer) {
            return res.status(400).json({ success: false, message: "Customer not found" })
        }




        await invoiceModel.findByIdAndUpdate(invoiceId, {
            invoiceStatus: "saved",
            paymentStatus: "pending",
        }, { new: true })



        return res.status(200).json({ success: false, message: "invoice payment failed" })



    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}
