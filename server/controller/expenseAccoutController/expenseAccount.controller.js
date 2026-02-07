import mongoose, { Types } from "mongoose";
import ExpenseAccountModel from "../../model/expense model/expenseAccountModel.js"
import { addExpenseValidation, createExpenseAccountValidation } from "../../utils/joiValidation.js";
import { AppError } from "../../utils/AppError.js";

export const createExpenseAccount = async (req, res) => {
    try {
        const shopId = req.shop.id;

        const { error, value } = createExpenseAccountValidation.validate(req.body)

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message })
        }

        const { expenseTitle, description } = value;

        const lowerCaseExpenseTitle = expenseTitle.trim().toLowerCase()

        const expenseAccountExist = await ExpenseAccountModel.findOne({ shop: shopId, expenseTitleLowerCase: lowerCaseExpenseTitle }).select("expenseTitleLowerCase")


        if (expenseAccountExist) {
            return res.status(409).json({ success: false, message: "Expense Account Already Exist" })
        }

        const newExpenseAccount = ExpenseAccountModel({
            shop: shopId,
            expenseTitle: expenseTitle,
            description: description,
            expenseTitleLowerCase: expenseTitle
        })

        await newExpenseAccount.save();

        res.status(201).json({ success: true, message: "Expense account create successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const addNewExpenseInAccount = async (req, res, next) => {

    const shopId = req.shop.id;
    const expenseAccountId = req.params.id;
    const { error, value } = addExpenseValidation.validate(req.body)

    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message })
    }
    try {


        const { title } = value;


        const lowerCaseTitle = title.trim().replace(/\s+/g, " ").toLowerCase()

        const isTitleExist = await ExpenseAccountModel.findOne({
            shop: shopId, _id: expenseAccountId,
            subTitle: {
                $elemMatch: {
                    titleLowerCase: lowerCaseTitle,
                    isActive: { $ne: false }
                }
            }
        }).select("_id")

        if (isTitleExist) {
            return next(new AppError("Expense Title Already Exist", 409))
        }

        await ExpenseAccountModel.findOneAndUpdate({ shop: shopId, _id: expenseAccountId, }, {
            $push: {
                subTitle: {
                    title: title,
                    titleLowerCase: title,
                    isActive: true
                }
            }
        }, { new: true })




        res.status(201).json({ success: true, message: "Title Added Successfully" })
    } catch (error) {
        next(error)
    }
}


export const getExpenseAccountForExpenseForm = async (req, res) => {
    try {
        const shopId = req.shop.id;

        const findExpenses = await ExpenseAccountModel.aggregate([
            { $match: { shop: new Types.ObjectId(shopId) } },
            {
                $project: {
                    expenseTitle: 1,
                    subTitle: {
                        $filter: {
                            input: "$subTitle",
                            as: "st",
                            cond: { $eq: ["$$st.isActive", true] }
                        }
                    }
                }
            }
        ]);

        res.status(200).json({ success: true, message: "Data fetched successfully", data: findExpenses })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export const getExpenseAccounts = async (req, res, next) => {
    try {
        const shopId = req.shop.id;

        const findExpenses = await ExpenseAccountModel.find({ shop: shopId }).select("_id expenseTitle description subTitle.title subTitle._id").sort({ createdAt: -1 })

        res.status(200).json({ success: true, message: "Data fetched successfully", data: findExpenses })
    } catch (error) {
        console.log(error);

        next(error)
    }
}

export const getSingleExpenseAccount = async (req, res, next) => {
    try {
        const shopId = req.shop.id;
        const { expenseId } = req.params;

        const findExpenses = await ExpenseAccountModel.findOne({ shop: shopId, _id: expenseId, }).select("-expenseTitleLowerCase -shop")

        if (!findExpenses) {
            return next(new AppError("Expense Account not found", 404))
        }

        findExpenses.subTitle = findExpenses.subTitle.filter(item => item.isActive === true)


        res.status(200).json({ success: true, message: "Data fetched successfully", data: findExpenses })
    } catch (error) {
        next(error)
    }
}

export const deleteExpenseAccountTitle = async (req, res, next) => {
    try {
        const shopId = req.shop.id;
        const { expenseId } = req.params
        const { titleId } = req.params

        const findExpenses = await ExpenseAccountModel.findOne({ shop: shopId, _id: expenseId, "subTitle._id": titleId }).select("_id")


        if (!findExpenses) {
            return next(new AppError("Expense Account not found", 404))
        }

        await ExpenseAccountModel.findOneAndUpdate({ shop: shopId, _id: expenseId, "subTitle._id": titleId },
            { $set: { "subTitle.$.isActive": false } },
            { new: true })

        res.status(200).json({ success: true, message: "Title Delete successfully" })
    } catch (error) {
        next(error)
    }
}