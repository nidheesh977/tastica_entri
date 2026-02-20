import mongoose from "mongoose";
import ExpenseModel from "../../model/expense model/expenseModel.js"
import TaxRateModel from "../../model/taxRateModel.js";
import ExpenseAccountModel from "../../model/expense model/expenseAccountModel.js";
import { calculateTax } from "../../utils/calculateTax.js";
import { generateExpenseId } from "../../utils/generateId.js";
import { Types } from "mongoose"
import customerModel from "../../model/customerModel.js";
import { createExpenseFormValidation } from "../../utils/joiValidation.js";
import { AppError } from "../../utils/AppError.js";
import { compressImage } from "../../utils/compressImage.js";
import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary .js";
import { cloudinaryInstance } from "../../config/cloudineryConfig.js";
import PDFDocument from "pdfkit"


export const createExpense = async (req, res, next) => {
    try {

        const { id: shopId } = req.shop;
        const { id: userId } = req.user

        const file = req.file;







        const { error, value } = createExpenseFormValidation.validate(req.body)

        if (error) {
            return next(new AppError(error.details[0].message, 400))
        }



        const {
            date,
            expenseAccount,
            expenseSubTitle,
            expenseAmount,
            amountIs,
            paidThrough,
            shopTaxAccount,
            taxRate,
            vendor,
            referenceId,
            vendorStaff,
            notes,
            billable,

        } = value



        if (vendorStaff && !vendor) {
            return (next(new AppError("Please select  Vendor", 400)))
        }


        const findTaxRate = await TaxRateModel.findOne({ shop: shopId, },
            { taxRates: { $elemMatch: { "_id": taxRate } } }
        )



        if (!findTaxRate) {
            return res.status(404).json({ success: false, message: "Selected Tax rate is not found" })
        }

        const findExpenseAccount = await ExpenseAccountModel.findOne({ shop: shopId, _id: expenseAccount },
            { subTitle: { $elemMatch: { "_id": expenseSubTitle } } }
        )

        if (!findExpenseAccount) {
            return res.status(404).json({ success: false, message: "Selected expense is not found" })
        }





        const expenseId = await generateExpenseId(shopId)

        const selectedTaxRate = findTaxRate.taxRates[0]

        const selectdExpense = findExpenseAccount.subTitle[0]

        const folder = process.env.EXPENSE_DOC_IMAGE_FOLDER
        const type = process.env.EXPENSE_DOC_IMAGE_AUTH

        let compressedImage = null
        let result = null

        if (file) {
            compressedImage = await compressImage(file.buffer, 1200, 72)

            result = await uploadImageToCloudinary(compressedImage, folder, type, "image")
        }

        const { baseAmount, taxAmount, totalAmount } = calculateTax(expenseAmount || 0, selectedTaxRate.rate || 0, amountIs || "nothing")

        const dateToIso = new Date(date).toISOString();

        const newExpense = ExpenseModel({
            expenseId: expenseId,
            shop: shopId,
            createdDate: dateToIso,
            createdBy: userId,
            expenseAccount,
            expenseSubTitle: selectdExpense?.title,
            expenseAmount,
            taxAmount: taxAmount,
            totalAmount: totalAmount,
            baseAmount: baseAmount,
            amountIs,
            paidThrough,
            taxCode: selectedTaxRate.taxCodeName,
            shopTaxAccount,
            taxRate: selectedTaxRate.rate,
            vendor: vendor,
            vendorStaff,
            referenceId,
            billable: billable,
            notes,
            image: {
                publicId: result?.public_id,
                version: result?.version
            }
        })

        await newExpense.save()

        res.status(201).json({ success: true, message: "Expense create successfully" })

    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const uploadImageToExpense = async (req, res, next) => {
    try {

        const { expenseId } = req.params;
        const { id: shopId } = req.shop

        const isExpenseExist = await ExpenseModel.findOne({ shop: shopId, _id: expenseId })




        if (!isExpenseExist) {
            return next(new AppError("Expense not found", 404))
        }

        const file = req.file;


        const folder = process.env.EXPENSE_DOC_IMAGE_FOLDER
        const type = process.env.EXPENSE_DOC_IMAGE_AUTH


        const compressedImage = await compressImage(file.buffer, 1200, 72)

        const result = await uploadImageToCloudinary(compressedImage, folder, type, "image")


        await ExpenseModel.findOneAndUpdate({ shop: shopId, _id: expenseId },
            {
                image: {
                    publicId: result?.public_id,
                    version: result?.version
                }
            },
            { new: true }
        )

        res.status(200).json({ success: true, message: "Image upload successfully", })
    } catch (error) {
        next(error)
    }
}

export const downloadExpensePdf = async (req, res, next) => {
    try {
        const { id: shopId, currencyCode } = req.shop
        const { expenseId } = req.params

        const expense = await ExpenseModel.findOne({ shop: shopId, _id: expenseId })
            .select("_id expenseId createdDate totalAmount expenseSubTitle amountIs taxCode taxRate billable notes taxAmount")
            .populate({ path: "paidThrough", select: "accountTitle" })
            .populate({ path: "vendor", select: "vendorName" })

        if (!expense) {
            return next(new AppError("Expense Account not found", 404))
        }

        const formattedDate = new Date(expense.createdDate)
            .toISOString()
            .split("T")[0];

        const doc = new PDFDocument({
            size: "A4",
            margin: 50
        })

        res.setHeader("Content-Type", "application/pdf")
        res.setHeader("Content-Disposition",
            `attachment; filename=${expense?.expenseSubTitle}-${formattedDate}.pdf`)

        doc.pipe(res)

        doc.fontSize(22).text("Expense Details", { align: "left" })

        doc.moveTo(50, 100)   // start point (x, y)
            .lineTo(545, 100)  // end point (same y = straight)
            .stroke();

        doc.moveDown(3)


        doc.fontSize(14).text("Expense Amount", { align: "left" })
        doc.moveDown(0.5)
        doc.fontSize(20).text(currencyCode + " ", { continued: true })
            .text(expense?.totalAmount.toFixed(2) + " ", { continued: true })
            .fontSize(12).text("on" + " " + new Date(expense?.createdDate).toLocaleDateString(),)
        doc.moveDown(0.9)
        doc.fontSize(12).text(expense.billable ? "BILLABLE" : "NON-BILLABLE")

        doc.moveDown(4)



        doc.fontSize(24).text(expense.expenseSubTitle)

        doc.moveDown(2)


        doc.fontSize(12).text("Paid Through")
        doc.moveDown(0.2)
        doc.fontSize(12).text(expense?.paidThrough?.accountTitle)

        doc.moveDown(2)

        doc.fontSize(12).text("Tax")
        doc.moveDown(0.2)
        doc.fontSize(12).text(`${expense?.taxCode} [ ${expense?.taxRate}% ]`)

        doc.moveDown(2)
        doc.fontSize(12).text("Tax Amount")
        doc.moveDown(0.2)
        doc.fontSize(12).text(`${currencyCode} ${expense?.taxAmount.toFixed(2)}  ( ${expense?.amountIs} ) `)

        doc.moveDown(2)
        doc.fontSize(12).text("Paid To")
        doc.moveDown(0.2)
        doc.fontSize(12).text(expense?.vendor?.vendorName)

        doc.moveDown(2)
        doc.fontSize(12).text(expense?.notes)


        doc.end();

    } catch (error) {
        next(error)
    }
}

export const getTaxRateAmount = async (req, res, next) => {
    const { id: shopId } = req.shop

    const { expenseAmount, taxRate, amountIs } = req.body;
    try {

        const findTaxRate = await TaxRateModel.findOne({ shop: shopId, },
            { taxRates: { $elemMatch: { "_id": taxRate } } }
        )

        if (!findTaxRate) {
            return res.status(404).json({ success: false, message: "Selected Tax rate is not found" })
        }

        const selectedTaxRate = findTaxRate.taxRates[0]

        const { baseAmount, taxAmount, totalAmount } = calculateTax(expenseAmount || 0, selectedTaxRate.rate || 0, amountIs || "nothing")

        res.status(200).json({ success: true, message: "Data fetched successfully", data: taxAmount })
    } catch (error) {
        console.log(error);

        next(error)
    }
}


export const getExpense = async (req, res) => {
    try {

        const { id: shopId } = req.shop

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 4

        const results = await ExpenseModel.aggregate([
            {
                $facet: {
                    data: [
                        { $sort: { createdAt: -1 } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        { $match: { shop: new Types.ObjectId(shopId) } },

                        {
                            $lookup: {
                                from: "vendors",
                                localField: "vendor",
                                foreignField: "_id",
                                as: "vendor"
                            },

                        },
                        {
                            $lookup: {
                                from: "paymentaccounts",
                                localField: "paidThrough",
                                foreignField: "_id",
                                as: "payment"
                            }
                        },
                        {
                            $lookup: {
                                from: "vendorstaffs",
                                localField: "vendorStaff",
                                foreignField: "_id",
                                as: "vendorstaffData"
                            }
                        },
                        {
                            $project: {
                                expenseSubTitle: 1,
                                referenceId: 1,
                                "vendor.vendorName": 1,
                                "payment.accountTitle": 1,
                                "vendorstaffData.staffName": 1,
                                expenseAmount: 1,
                                createdDate: 1,
                                billable: 1
                            }
                        },




                    ],

                    totalCount: [{ $match: { shop: new Types.ObjectId(shopId) } }, { $count: "count" }]


                }
            }

        ])




        const data = results[0]?.data || []
        const totalCount = results[0]?.totalCount[0]?.count || 0

        const datalength = data.length || 0

        const hasmore = (page * limit) < totalCount



        res.status(200).json({ success: true, message: "Data fetched successfully", data, totalCount, page, datalength, hasmore, limit })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export const getSingleExpense = async (req, res, next) => {
    try {
        const { expenseId } = req.params
        const { id: shopId } = req.shop;

        const getExpense = await ExpenseModel.findOne({ shop: shopId, _id: expenseId })
            .populate({ path: "expenseAccount", select: "expenseTitle" })
            .populate({ path: "paidThrough", select: "accountTitle" })
            .populate({ path: "vendorStaff", select: "staffName" })
            .populate({ path: "vendor", select: "vendorName" })

        if (!getExpense) {
            throw new AppError("Expense Page not found", 404)
        }

        res.status(200).json({ success: true, message: "Data fetched successfull", data: getExpense })
    } catch (error) {

        next(error)
    }
}

export const getImageDoc = async (req, res, next) => {
    try {
        const { imagePublicId } = req.query;
        console.log(imagePublicId);

        const image = cloudinaryInstance.url(imagePublicId, {
            type: "authenticated",
            sign_url: true,
            expires_at: Math.floor(Date.now() / 1000) + 60
        })

        res.status(200).json({ success: true, message: "Data fetched successfully", data: image })

    } catch (error) {
        next(error)
    }
}