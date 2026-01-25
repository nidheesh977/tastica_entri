import mongoose from "mongoose";
import ExpenseAccountModel from "../../model/expense model/expenseAccountModel.js"
import { addExpenseValidation, createExpenseAccountValidation } from "../../utils/joiValidation.js";

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

export const addNewExpenseInAccount = async (req, res) => {

    const shopId = req.shop.id;
    const expenseAccountId = req.params.id;
    const { error, value } = addExpenseValidation.validate(req.body)

    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message })
    }
    try {


        const { title } = value;


        const lowerCaseTitle = title.trim().replace(/\s+/g, " ").toLowerCase()



        const addNewExpense = await ExpenseAccountModel.findOneAndUpdate({ shop: shopId, _id: expenseAccountId, "subTitle.titleLowerCase": { $ne: lowerCaseTitle } }, {
            $push: {
                subTitle: {
                    title: title,
                    titleLowerCase: title,
                }
            }
        }, { new: true })


        const message = addNewExpense === null ? "Expense Already Exist" : "Expense Added Successfully"
        const statusCode = addNewExpense === null ? 409 : 201

        res.status(statusCode).json({ success: true, message: message })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export const getExpenseAccountForExpenseForm = async (req, res) => {
    try {
        const shopId = req.shop.id;

        const findExpenses = await ExpenseAccountModel.find({ shop: shopId }).select("_id expenseTitle subTitle.title subTitle._id")

        res.status(200).json({ success: true, message: "Data fetched successfully", data: findExpenses })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}