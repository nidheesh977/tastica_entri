import mongoose from "mongoose";
import ExpenseModel from "../../model/expense model/expenseModel.js"
import TaxRateModel from "../../model/taxRateModel.js";
import ExpenseAccountModel from "../../model/expense model/expenseAccountModel.js";
import { calculateTax } from "../../utils/calculateTax.js";
import { generateExpenseId } from "../../utils/generateId.js";

export const createExpense = async (req, res, next) => {
    try {

        const { id: shopId } = req.shop;

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
            customerId } = req.body


        const findTaxRate = await TaxRateModel.findOne({ shop: shopId, },
            { taxRates: { $elemMatch: { "_id": taxRate } } }
        )

        if (!findTaxRate) {
            return res.status(404).json({ success: false, message: "Selected Tax rate is not found" })
        }

        const findExpenseAccount = await ExpenseAccountModel.findOne({ shop: shopId },
            { subTitle: { $elemMatch: { "_id": expenseSubTitle } } }
        )

        if (!findExpenseAccount) {
            return res.status(404).json({ success: false, message: "Selected expense is not found" })
        }

        const billable = !!customerId

        const expenseId = await generateExpenseId(shopId)

        const selectedTaxRate = findTaxRate.taxRates[0]

        const selectdExpense = findExpenseAccount.subTitle[0]


        const { baseAmount, taxAmount, totalAmount } = calculateTax(expenseAmount || 0, selectedTaxRate.rate || 0, amountIs || "nothing")     // The amountis hold inclusive or exclusive

        const isVendor = vendor === "" ? null : vendor

        const newExpense = ExpenseModel({
            expenseId: expenseId,
            shop: shopId,
            createdDate: date,
            expenseAccount,
            expenseSubTitle: selectdExpense.title,
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
            customer: customerId,
            referenceId,
            billable: billable
        })

        await newExpense.save()

        res.status(201).json({ success: true, message: "Expense create successfully" })

    } catch (error) {
        next(error)
    }
}


export const getExpense = async (req, res) => {
    try {

        const { id: shopId } = req.shop

        const findExpense = await ExpenseModel.aggregate([
            { $match: { shop: mongoose.Types.ObjectId(shopId) } },

        ])

        res.status(200).json({ success: true, message: "Data fetched successfully", data: findExpense })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}