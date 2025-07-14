import customerModel from "../../model/customerModel.js";
import invoiceModel from "../../model/invoiceModel.js";
import loyalityPointModel from "../../model/loyalityPointModel.js"
import loyalityTransactionModel from "../../model/loyalityTransactionModel.js";
import productModel from "../../model/productModel.js";
import shopModel from "../../model/shopModel.js";
import walletModels from "../../model/walletModel.js";

const { walletModel } = walletModels;



export const cashPayment = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const staffId = req.user.id;


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
                points: Math.round(loyaltyPointProduct),
                type: "EARNED"
            },
            {
                customerId: findCustomer._id,
                staffId: staffId,
                amount: findInvoice.redeemAmount,
                type: "REDEEMED"
            }
        ]




        // const findLoyalityRate = await loyalityPointModel.findOne({shop:findInvoice?.shop})

        if (findInvoice.redeemAmount > 0 && findShop.phoneNumber !== findCustomer.phoneNumber) {

            //   const getpoints = findInvoice.redeemAmount / findLoyalityRate?.loyalityRate || 0

            // let deductLoyalty = findCustomer.loyalityPoint - findInvoice.redeemAmount + loyaltyPointProduct

            //    let PointsToAmount = Math.round(deductLoyality) * findLoyalityRate?.loyalityRate || 0


            let PointsToAmount = deductLoyalty;



            await customerModel.findByIdAndUpdate(findCustomer._id, {
                loyalityPoint: Math.round(deductLoyalty),
                //  pointAmount:parseFloat(PointsToAmount).toFixed(2),
                pointAmount: Math.round(PointsToAmount),
                $push: { invoices: { $each: [invoiceCashPayment._id] } },

            }, { new: true })


            await walletModel.findOneAndUpdate({ customerId: invoiceCashPayment.customer }, { productLoyalityPoint: Math.round(deductLoyalty) }, { new: true }).populate("customerId", "customerName")

            await loyalityTransactionModel.insertMany(transaction)

            res.status(200).json({ success: true, message: "Cash payment successfully", data: invoiceCashPayment })
        }

        else if (invoiceCashPayment && findShop.phoneNumber !== findCustomer.phoneNumber) {
            //  add loylaity point to customer
            let addLoyalty = findCustomer.loyalityPoint += loyaltyPointProduct;

            // convert point to amount   
            //   let PointsToAmount = Math.round(addLoyality) * findLoyalityRate?.loyalityRate || 0

            let PointsToAmount = addLoyalty;


            await customerModel.findByIdAndUpdate(findCustomer._id, {
                loyalityPoint: Math.round(addLoyalty),
                //  pointAmount:parseFloat(PointsToAmount).toFixed(2),
                pointAmount: Math.round(PointsToAmount),
                $push: { invoices: { $each: [invoiceCashPayment._id] } }
            }, { new: true })

            const loyalityEarned = loyalityTransactionModel({
                customerId: findCustomer._id,
                staffId: staffId,
                points: Math.round(loyaltyPointProduct),
                type: "EARNED"
            })

            await loyalityEarned.save()


            await walletModel.findOneAndUpdate({ customerId: invoiceCashPayment.customer }, { $inc: { productLoyalityPoint: Math.round(loyaltyPointProduct) } }, { new: true }).populate("customerId", "customerName")

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


