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

export const createExpense = async (req, res, next) => {
    try {

        const { id: shopId } = req.shop;


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
            customer,
            notes

        } = value



        if (!vendor && !customer || vendor && customer) {
            return (next(new AppError("Please select either Customer or Vendor", 400)))
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



        const billable = !!customer

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

        const { baseAmount, taxAmount, totalAmount } = calculateTax(expenseAmount || 0, selectedTaxRate.rate || 0, amountIs || "nothing")     // The amountis hold inclusive or exclusive

        const isVendor = vendor === "" ? null : vendor

        const dateToIso = new Date(date).toISOString();

        const newExpense = ExpenseModel({
            expenseId: expenseId,
            shop: shopId,
            createdDate: dateToIso,
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
            vendor: isVendor,
            customer,
            referenceId,
            billable: billable,
            notes,
            cloudinary: {
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



//  For customer


export const getCustomerForExpenseForm = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop

        const result = await customerModel.aggregate([
            { $match: { shopId: new Types.ObjectId(shopId) } },
            {
                $project: {
                    _id: 1,
                    customerName: 1
                }
            }
        ])

        console.log(result);



        res.status(200).json({ success: true, message: "Data fetched successfully", data: result })

    } catch (error) {
        console.log(error)
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
                                from: "accounts",
                                localField: "paidThrough",
                                foreignField: "_id",
                                as: "payment"
                            }
                        },
                        {
                            $lookup: {
                                from: "customers",
                                localField: "customer",
                                foreignField: "_id",
                                as: "customerData"
                            }
                        },
                        {
                            $project: {
                                expenseSubTitle: 1,
                                referenceId: 1,
                                "vendor.vendorName": 1,
                                "payment.accountTitle": 1,
                                "customerData.customerName": 1,
                                customer: 1,
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
            .populate({ path: "customer", select: "customerName" })
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