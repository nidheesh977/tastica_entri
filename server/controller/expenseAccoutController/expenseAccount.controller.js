import mongoose, { Types } from "mongoose";
import ExpenseAccountModel from "../../model/expense model/expenseAccountModel.js"
import { addExpenseValidation, createExpenseAccountValidation, expenseAccountStatusValidation, expenseAccountTitleStatusValidation } from "../../utils/joiValidation.js";
import { AppError } from "../../utils/AppError.js";
import { AuditLogModel } from "../../model/auditLogModel.js";

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

export const getExpenseAccountHeadForm = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop

        const result = await ExpenseAccountModel.aggregate([
            { $match: { shop: new Types.ObjectId(shopId) } },
            {
                $project: {
                    _id: 1,
                    expenseTitle: 1
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

        const findExpenses = await ExpenseAccountModel.find({ shop: shopId }).select("_id expenseTitle description isActive inActiveReason subTitle.title subTitle._id").sort({ createdAt: -1 })

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




        res.status(200).json({ success: true, message: "Data fetched successfully", data: findExpenses })
    } catch (error) {
        next(error)
    }
}

export const deleteExpenseAccountTitle = async (req, res, next) => {

    const shopId = req.shop.id;
    const { expenseId } = req.params
    const { id: userId } = req.user


    const { error, value } = expenseAccountTitleStatusValidation.validate(req.body)

    if (error) {
        return next(new AppError(error?.details[0].message, 400))
    }

    const { titleId, reason, isActive } = value

    const session = await mongoose.startSession()

    try {

        await session.withTransaction(async () => {
            if (!mongoose.Types.ObjectId.isValid(titleId)) {
                throw new AppError("Invalid ID format", 400)
            }
        })

        const findExpenses = await ExpenseAccountModel.findOne({ shop: shopId, _id: expenseId, "subTitle._id": titleId }).select("subTitle._id subTitle.isActive").session(session)


        if (!findExpenses) {
            return next(new AppError("Expense Account not found", 404))
        }

        const findSelect = findExpenses.subTitle.find(item => item._id.toString() === titleId.toString())

        if (findSelect.isActive === false && isActive === false || findSelect.isActive === true && isActive === true) {
            throw new AppError(`Expense account Already ${isActive ? "active" : "inactive"}`, 400)
        }

        const previousState = { isActive: findSelect?.isActive, inactiveReason: findSelect?.inActiveReason }

        await ExpenseAccountModel.findOneAndUpdate({ shop: shopId, _id: expenseId, "subTitle._id": titleId },
            { $set: { "subTitle.$.isActive": isActive, "subTitle.$.inActiveReason": isActive ? null : reason || (isActive ? "Reactivation" : "Deactivation") } },
            { new: true }, { session, runValidators: true })

        await AuditLogModel.create([
            {
                shop: shopId,
                targetId: expenseId,
                subDocumentId: titleId,
                targetModel: "ExpenseAccount",
                action: "STATUS_CHANGE",
                payload: {
                    before: previousState,
                    after: { isActive: isActive, inactiveReason: isActive ? null : reason }
                },
                reason: reason || (isActive ? "Reactivation" : "Deactivation"),
                performedBy: userId
            }
        ], { session })

        res.status(200).json({ success: true, message: `Expense Account ${isActive ? "Active" : "Inactive"} successfully` })

    } catch (error) {
        next(error)
    }
}




export const expenseAccountStatusUpdate = async (req, res, next) => {


    const { id: shopId } = req.shop;
    const { id: userId } = req.user



    const { error, value } = expenseAccountStatusValidation.validate(req.body)

    if (error) {
        return next(new AppError(error?.details[0].message, 400))
    }


    const { expenseAccountId, reason, isActive } = value


    const session = await mongoose.startSession()

    try {

        const result = await session.withTransaction(async () => {

            if (!mongoose.Types.ObjectId.isValid(expenseAccountId)) {
                throw new AppError("Invalid ID format", 400)
            }

            const expenseAccount = await ExpenseAccountModel.findById(expenseAccountId).session(session)


            if (!expenseAccount) {
                throw new AppError("Expense account not found", 400)
            }

            if (expenseAccount.isActive === false && isActive === false || expenseAccount.isActive === true && isActive === true) {
                throw new AppError(`Expense account Already ${isActive ? "active" : "inactive"}`, 400)
            }



            const previousState = { isActive: expenseAccount?.isActive, inactiveReason: expenseAccount?.inActiveReason }

            await ExpenseAccountModel.findOneAndUpdate({ shop: shopId, _id: expenseAccountId },
                { isActive: isActive, inActiveReason: isActive ? null : reason || (isActive ? "Reactivation" : "Deactivation") },
                { session, runValidators: true }
            )

            await AuditLogModel.create([
                {
                    shop: shopId,
                    targetId: expenseAccountId,
                    targetModel: "ExpenseAccount",
                    action: "STATUS_CHANGE",
                    payload: {
                        before: previousState,
                        after: { isActive: isActive, inactiveReason: isActive ? null : reason }
                    },
                    reason: reason || (isActive ? "Reactivation" : "Deactivation"),
                    performedBy: userId
                }
            ], { session })

            res.status(200).json({ success: true, message: `Expense Account ${isActive ? "Active" : "Inactive"} successfully` })

        })

    } catch (error) {
        next(error)
    } finally {
        await session.endSession()
    }
}