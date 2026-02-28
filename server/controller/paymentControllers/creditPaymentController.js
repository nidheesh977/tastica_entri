import AdminStaffModel from "../../model/adminAndStaffModel.js";
import creditModel from "../../model/creditPaymentModel.js";
import customerModel from "../../model/customerModel.js";
import invoiceModel from "../../model/invoiceModel.js";
import productModel from "../../model/productModel.js";
import { generateCreditId } from "../../utils/generateId.js";
import mongoose from "mongoose"
import { creditGiveValidation, creditPaymentValidation, creditRegistrationValidation } from "../../utils/joiValidation.js";
import { AppError } from "../../utils/AppError.js";

export const createCreditBook = async (req, res) => {

    try {
        const shopId = req.shop.id;
        const { invoiceId } = req.params;


        const { error, value } = creditRegistrationValidation.validate(req.body)


        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message })
        }

        const { customerName, registeredCustomer, customerPhoneNumber } = value;

        // create credit book model function
        const saveCreditBook = async (Model, data) => {
            const doc = new Model({
                creditBookId: data.creditId,
                shop: data.shopId,
                customerName: data.nameOfCustomer,
                registeredCustomer: data.registeredCustomer,
                customerPhoneNumber: data.phoneNumberOfCustomer,
            })

            return await doc.save()
        }





        // global variabale
        let newCreditBook = null

        if (registeredCustomer === true) {


            const findInvoice = await invoiceModel.findOne({ shop: shopId, _id: invoiceId })

            if (!findInvoice) {
                return res.status(404).json({ success: false, message: "invoice not found" })
            }

            const findCustomer = await customerModel.findOne({ shopId: shopId, _id: findInvoice.customer });

            if (findCustomer?.role === "shop") {
                return res.status(400).json({ success: false, message: "Cannot create credit book for shop" })
            }


            const creditId = await generateCreditId(shopId)

            const nameOfCustomer = findCustomer.customerName.trim();
            const registeredCustomerPhoneNumber = findCustomer.phoneNumber.trim()

            const creditBookExist = await creditModel.findOne({ shop: shopId, customerPhoneNumber: findCustomer.phoneNumber })


            if (creditBookExist !== null) {
                return res.status(409).json({ success: false, message: "Credit Book Already Exist" })
            }


            newCreditBook = await saveCreditBook(creditModel,
                {
                    creditId,
                    shopId,
                    nameOfCustomer,
                    registeredCustomer,
                    phoneNumberOfCustomer: registeredCustomerPhoneNumber,
                })



        } else {
            const nameOfCustomer = customerName.trim();
            const phoneNumberOfCustomer = customerPhoneNumber.trim();


            const creditBookExist = await creditModel.findOne({ shop: shopId, customerPhoneNumber: phoneNumberOfCustomer })



            if (creditBookExist !== null) {
                return res.status(409).json({ success: false, message: "Credit Book Already Exist" })
            }

            const creditId = await generateCreditId(shopId)


            newCreditBook = await saveCreditBook(creditModel,
                {
                    creditId,
                    shopId,
                    nameOfCustomer,
                    registeredCustomer,
                    phoneNumberOfCustomer,

                })

        }


        let { creditBookId, customerName: creditCustomerName } = newCreditBook;


        res.status(200).json({ success: true, message: "Successfully added", data: { creditBookId, creditCustomerName } })

    } catch (error) {


        return res.status(500).json({ success: false, message: "internal server error" })
    }
}





export const addCredit = async (req, res) => {

    const shopId = req.shop.id;
    const { invoiceId } = req.params
    const userId = req.user.id


    const { error, value } = creditGiveValidation.validate(req.body)

    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message })
    }

    const { creditAmount, creditBookId, paymentMethod } = value;

    if (Number(creditAmount) < 0) {
        return res.status(400).json({ success: false, message: "Not Enter Negative Balance" })
    }

    if (Number(creditAmount) === 0) {
        return res.status(400).json({ success: false, message: "Please Enter valid Amount" })
    }

    const session = await mongoose.startSession()

    try {

        session.startTransaction()



        // ------------------------------------------------------------------------------------------

        const findUserData = async (userId) => {
            return await AdminStaffModel.findById(userId).session(session)
        }

        const creditStatusForInvoice = (invoiceTotal, creditAmount) => {

            let checkCreditStatus = ""
            let invoiceStatus = ""
            if (invoiceTotal === creditAmount) {
                checkCreditStatus = "full"
                invoiceStatus = "credited"
            } else {
                checkCreditStatus = "partial"
                invoiceStatus = "paid"
            }
            return { checkCreditStatus, invoiceStatus }
        }


        const reduceProductQty = async (model, invoice, session) => {
            let productQnt = invoice.products

            for (const item of productQnt) {
                const { unit, productId, quantity } = item;

                const findProduct = await productModel.findById(productId).select("quantity");


                const productQuantity = Number((findProduct?.quantity).toFixed(3))

                const purchaseQuantity = Number((quantity).toFixed(3))

                const substractQuantity = Number((productQuantity - purchaseQuantity).toFixed(3))


                await model.findByIdAndUpdate(productId,
                    {
                        $set: { quantity: substractQuantity }

                    }
                    , { new: true, session })


            }
        }

        // ------------------------------------------------------------------------------------------






        const invoice = await invoiceModel.findById(invoiceId).session(session)

        if (!invoice) {
            return res.status(404).json({ success: false, message: "Invoice Not found" })
        }



        if (invoice?.totalAmount !== creditAmount && paymentMethod === null || paymentMethod === "") {
            return res.status(400).json({ success: false, message: "Please select Payment Method" })
        }

        const findCreditBook = await creditModel.findOne({ shop: shopId, creditBookId }).session(session)

        if (!findCreditBook) {
            return res.status(404).json({ success: false, message: "Credit Book Not Found" })
        }


        const creditorData = await findUserData(userId)


        const credit = {
            invoice: invoiceId,
            creditAmount: creditAmount,
            creditor: creditorData.userName,
            creditorPosition: creditorData.role,
            creditorId: creditorData.staffId
        }




        await creditModel.findOneAndUpdate({ shop: shopId, creditBookId: creditBookId }, {
            $inc: { customertotalCredit: creditAmount },
            $push: { credit },
        }, { new: true, session })


        // update stock quantity
        await reduceProductQty(productModel, invoice, session)



        const { checkCreditStatus, invoiceStatus } = creditStatusForInvoice(invoice.totalAmount, creditAmount);


        await invoiceModel.findOneAndUpdate({ shop: shopId, _id: invoiceId },
            {
                creditStatus: checkCreditStatus,
                creditAmount: creditAmount,
                invoiceStatus: invoiceStatus,
                paymentMethod: paymentMethod
            }, { new: true, session }
        )

        await session.commitTransaction()

        res.status(200).json({ success: true, message: "Successfully added" })

    } catch (error) {

        await session.abortTransaction();
        return res.status(500).json({ success: false, message: "internal server error" })
    } finally {
        session.endSession()
    }
}


export const payCreditAmount = async (req, res) => {

    const shopId = req.shop.id
    const { bookid } = req.params;

    const { error, value } = creditPaymentValidation.validate(req.body)

    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message })
    }

    const { creditBookId, paidAmount, paymentMethod, singleCreditPay, creditInvoiceId } = value;
    const session = await mongoose.startSession()

    try {

        session.startTransaction()

        const bookExist = await creditModel.findOne({ shop: shopId, _id: bookid, }).session(session)



        const updateCreditBookCreditData = async (shopId, bookid, creditObjId, session) => {
            let today = new Date
            const debtInvoice = await creditModel.findOneAndUpdate({ shop: shopId, _id: bookid, "credit._id": creditObjId },
                {
                    $set: {

                        "credit.$.creditStatus": "paid",
                        "credit.$.customerPaidAt": today
                    }
                },
                { new: true, session })
        }

        const updateCreditBook = async (deductTotalDebt, amount, addPaidDebt, session) => {


            await creditModel.findOneAndUpdate({ shop: shopId, _id: bookid }, {
                $set: { customertotalCredit: deductTotalDebt, advanceAmount: amount, customerPaidAmount: addPaidDebt },

            }, { new: true, session })
        }

        const updateInvoiceCredit = async (shopId, creditObjId, paymentMethod, session) => {
            await invoiceModel.findOneAndUpdate({ shop: shopId, _id: creditObjId, }, {
                invoiceStatus: "paid",
                paymentStatus: "success",
                paymentMethod: paymentMethod,
                creditStatus: "none",
                creditAmount: 0
            }, { new: true, session })
        }


        if (paidAmount < 0) {
            return res.status(400).json({ success: false, message: "Not enter negative balance" })
        }

        if (paidAmount === 0) {
            return res.status(400).json({ success: false, message: "Not enter 0 digit" })
        }

        if (bookExist === null) {
            return res.status(404).json({ success: false, message: "Credit book Not Exist" })
        }

        if (bookExist.creditBookId !== creditBookId.toUpperCase()) {
            return res.status(400).json({ success: false, message: "Its not valid credit book id" })
        }

        let bookArr = bookExist.credit


        let amount = bookExist.advanceAmount > 0 ? bookExist.advanceAmount + paidAmount : paidAmount
        // -----------------------------------
        const round2 = (n) => {
            return Math.round((n + Number.EPSILON) * 100) / 100
        }
        // -------------------------------------------------------

        let deductTotalDebt = bookExist.customertotalCredit;

        let addPaidDebt = bookExist.customerPaidAmount

        let lessMoney = false

        const filterArr = bookArr.filter((item) => item.creditStatus === "pending")

        const minValue = filterArr.reduce((c, min) => (c.creditAmount < min.creditAmount) ? c : min, filterArr[0])





        if (singleCreditPay === true) {
            const findInvoiceCreditId = bookArr.find((invoice) => String(invoice?._id) === String(creditInvoiceId))


            if (!findInvoiceCreditId) {
                return res.status(404).json({ success: false, message: "Invoice credit not found" })
            }


            amount = Number((amount -= findInvoiceCreditId.creditAmount).toFixed(2))
            deductTotalDebt = Number((deductTotalDebt -= findInvoiceCreditId.creditAmount).toFixed(2))
            addPaidDebt = Number((addPaidDebt += findInvoiceCreditId.creditAmount).toFixed(2))


            await updateCreditBookCreditData(shopId, bookid, findInvoiceCreditId._id, session)

            await updateCreditBook(deductTotalDebt, amount, addPaidDebt, session);
            await updateInvoiceCredit(shopId, findInvoiceCreditId?.invoice, paymentMethod, session)


        } else if (minValue.creditAmount === paidAmount) {



            amount = Number((amount -= minValue.creditAmount).toFixed(2))
            deductTotalDebt = Number((deductTotalDebt -= minValue.creditAmount).toFixed(2))
            addPaidDebt = Number((addPaidDebt += minValue.creditAmount).toFixed(2))


            await updateCreditBookCreditData(shopId, bookid, minValue._id, session)

            await updateCreditBook(deductTotalDebt, amount, addPaidDebt, session);
            await updateInvoiceCredit(shopId, minValue?.invoice, paymentMethod, session)

        } else {
            for (let credit of bookArr.reverse()) {
                if (credit.creditStatus === "pending") {

                    if (credit.creditAmount > amount) {
                        lessMoney = true
                    } else {
                        amount = Number((amount -= credit.creditAmount).toFixed(2))
                        deductTotalDebt = Number((deductTotalDebt -= credit.creditAmount).toFixed(2));
                        addPaidDebt = Number((addPaidDebt += credit.creditAmount).toFixed(2))



                        await updateCreditBookCreditData(shopId, bookid, credit._id, session)

                        await updateCreditBook(deductTotalDebt, amount, addPaidDebt, session)
                        await updateInvoiceCredit(shopId, credit?.invoice, paymentMethod, session)

                        if (amount <= 0) {
                            break;
                        }
                        // else if (amount < credit.creditAmount) {

                        //     console.log("amount < credit.creditAmount", amount);

                        //     break;
                        // }
                    }
                }





            }
        }



        if (lessMoney) {
            return res.status(400).json({ success: false, message: "Add More amount" })
        }

        await session.commitTransaction()

        res.status(200).json({ success: true, message: "Debt paid successfully" })

    } catch (error) {
        await session.abortTransaction()
        return res.status(500).json({ success: false, message: "internal server error" })
    } finally {
        session.endSession()
    }
}

export const getCreditBooks = async (req, res) => {
    try {
        const shopId = req.shop.id;

        const getCreditBookDatas = await creditModel.find({ shop: shopId }).populate({ path: "credit.invoice", select: "invoiceNumber products" })

        res.status(200).json({ success: true, message: "Data fetch successfully", data: getCreditBookDatas })

    } catch (error) {

        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const getSingleCreditBookForPayment = async (req, res) => {
    try {

        const { id } = req.params;
        const shopId = req.shop.id;

        if (!id || id === undefined) {
            return res.status(400).json({ success: false, message: "ID not get" })
        }



        const findCreditBook = await creditModel.findOne({ shop: shopId, _id: id }).select("creditBookId customerName customerPhoneNumber customertotalCredit customerPaidAmount advanceAmount")

        if (!findCreditBook) {
            return res.status(400).json({ success: false, message: "Credit book not found" })
        }

        const result = await creditModel.aggregate([
            {
                $match: {
                    shop: new mongoose.Types.ObjectId(shopId),
                    creditBookId: findCreditBook.creditBookId
                }
            },
            {
                $project: {
                    minimumCreditPay: {
                        $ifNull: [{
                            $min: {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$credit",
                                            as: "c",
                                            cond: { $eq: ["$$c.creditStatus", "pending"] }
                                        }
                                    },
                                    as: "pc",
                                    in: "$$pc.creditAmount"
                                }
                            }
                        }, 0]
                    }
                }
            }
        ])

        const minimumCreditAmount = result[0]?.minimumCreditPay

        const data = { ...findCreditBook.toObject(), minimumCreditAmount }



        res.status(200).json({ success: true, message: "data fetched successfully", data: data, })

    } catch (error) {


        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const getCreditSingleBookForDisplay = async (req, res) => {
    try {

        const { id } = req.params;
        const shopId = req.shop.id

        if (!id || id === undefined) {
            return res.status(400).json({ success: false, message: "ID not get" })
        }

        const findCreditBook = await creditModel.findOne({ shop: shopId, _id: id }).populate({ path: "credit.invoice", select: "invoiceNumber totalAmount products" })

        if (!findCreditBook) {
            return res.status(400).json({ success: false, message: "Credit book not found" })
        }

        res.status(200).json({ success: true, message: "data fetched successfully", data: findCreditBook })

    } catch (error) {

        return res.status(500).json({ success: false, message: "internal server error" })
    }
}



export const clearAdvanceAmt = async (req, res) => {
    try {

        const shopId = req.shop.id;
        const { id } = req.params;

        await creditModel.findOneAndUpdate({ shop: shopId, _id: id }, {
            advanceAmount: 0
        }, { new: true })

        res.status(200).json({ success: true, message: "Advance clear successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}


export const customerCreditDetail = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop;
        const { creditBookId } = req.query;


        const creditUserData = await creditModel.findOne({ shop: shopId, creditBookId }).select("customerName customerPhoneNumber")



        res.status(200).json({ success: true, message: "Data fetched successfully", data: creditUserData })

    } catch (error) {
        next(error)
    }
}