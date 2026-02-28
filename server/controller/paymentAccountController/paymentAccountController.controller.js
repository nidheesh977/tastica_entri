import bcryptjs from "bcryptjs";
import PaymentAccountModel from "../../model/paymentAccountModel.js";
import { createPaymentAccountValidation, paymentAcoountStatusValidation } from "../../utils/joiValidation.js";
import mongoose, { mongo, Types } from "mongoose";
import { AppError } from "../../utils/AppError.js";
import { AuditLogModel } from "../../model/auditLogModel.js";



export const createPaymentAccount = async (req, res) => {


    const { id: shopId } = req.shop;
    const { id: userId } = req.user
    const { error, value } = createPaymentAccountValidation.validate(req.body);

    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message })
    }

    const session = await mongoose.startSession()

    const { accountType, accountTitle } = value;

    try {
        await session.withTransaction(async () => {

            const accountTitleToLowerCase = accountTitle.trim().replace(/\s+/g, " ")

            const isPaymentAccountExist = await PaymentAccountModel.findOne({ shop: shopId, accountTitleLowerCase: accountTitleToLowerCase, accountType: accountType })
                .select("_id  accountTitleLowerCase").session(session)

            if (isPaymentAccountExist) {
                return res.status(409).json({ success: false, message: "Payment Account Already Exist" })
            }


            const newState = {
                accountType,
                accountTitle
            }

            const newPaymentAccount = await PaymentAccountModel.create([
                {
                    shop: shopId,
                    accountType: accountType,
                    accountTitle: accountTitle,
                    accountTitleLowerCase: accountTitle,
                }], { session })



            await AuditLogModel.create([
                {
                    shop: shopId,
                    targetId: newPaymentAccount[0]?._id,
                    targetModel: "PaymentAccount",
                    action: "CREATE",
                    payload: {
                        before: null,
                        after: newState
                    },
                    reason: "Create new payment account",
                    performedBy: userId
                }
            ], { session })


            res.status(201).json({ success: true, message: "Payment account create successfully" })
        })

    } catch (error) {

        return res.status(500).json({ success: false, message: "Internal server" })
    } finally {
        await session.endSession()
    }
}


export const getPaymentAcountForExpenseForm = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop

        const findAccount = await PaymentAccountModel.aggregate([
            { $match: { shop: new Types.ObjectId(shopId), isActive: true } },
            {


                $project: {
                    _id: "$_id",
                    accountType: "$accountType",
                    accountTitle: "$accountTitle"
                }


            },
            {
                $group: {
                    _id: "$accountType",
                    accounts: {
                        $push: {
                            _id: "$_id",
                            accountTitle: "$accountTitle"
                        }
                    }
                }
            }
        ])




        res.status(200).json({ success: true, message: "Payment account create successfully", data: findAccount })
    } catch (error) {
        next(error)
    }
}

export const getPaymentAccountForShop = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop

        const getPaymentAccount = await PaymentAccountModel.find({ shop: shopId }).select("_id accountTitle accountType isActive").lean()

        res.status(200).json({ success: true, message: "Data fetched successfully", data: getPaymentAccount })

    } catch (error) {
        next(error)
    }
}

export const getAccountType = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop

        const result = await PaymentAccountModel.aggregate([
            { $match: { shop: new Types.ObjectId(shopId) } },
            { $sort: { createdAt: 1 } },
            {
                $group: {
                    _id: "$accountType"
                }
            },
            {
                $project: {
                    _id: 0,
                    value: "$_id",
                    name: "$_id",

                }
            },

        ]);

        let num = 1

        const datas = result.map((item) => ({
            id: num += 1,
            ...item,

        }))

        datas.unshift({ id: 1, value: "", name: "Select Account type", })

        res.status(200).json({ success: true, message: "Data fetched successfully", data: datas })
    } catch (error) {
        next(error)
    }
}

export const paymentActiveOrInactive = async (req, res, next) => {

    const { id: shopId } = req.shop;
    const { id: userId } = req.user;

    const { error, value } = paymentAcoountStatusValidation.validate(req.body)

    if (error) {
        return next(new AppError(error?.details[0].message, 400))
    }

    const { paymentAccountId, reason, isActive } = value

    const session = await mongoose.startSession()
    try {

        await session.withTransaction(async () => {

            if (!mongoose.Types.ObjectId.isValid(paymentAccountId)) {
                throw new AppError("Invalid ID format", 400)
            }

            const findAccount = await PaymentAccountModel.findOne({ shop: shopId, _id: paymentAccountId }).select("_id isActive")

            if (!findAccount) {
                return next(new AppError("Account not found", 404))
            }

            if (findAccount.isActive === false && isActive === false || findAccount.isActive === true && isActive === true) {
                throw new AppError(`Vendor Already ${isActive ? "active" : "inactive"}`, 400)
            }

            const previousState = { isActive: findAccount?.isActive, inactiveReason: findAccount?.inActiveReason }

            await PaymentAccountModel.findOneAndUpdate({ shop: shopId, _id: paymentAccountId },
                { isActive: isActive, inActiveReason: isActive ? null : reason || (isActive ? "Reactivation" : "Deactivation") },
                { session, runValidators: true }
            )

            await AuditLogModel.create([
                {
                    shop: shopId,
                    targetId: paymentAccountId,
                    targetModel: "PaymentAccount",
                    action: "STATUS_CHANGE",
                    payload: {
                        before: previousState,
                        after: { isActive: isActive, inactiveReason: isActive ? null : reason }
                    },
                    reason: reason || (isActive ? "Reactivation" : "Deactivation"),
                    performedBy: userId
                }
            ], { session })

            res.status(200).json({ success: true, message: `Vendor ${isActive ? "Active" : "Inactive"} successfully` })

        })


    } catch (error) {
        next(error)
    } finally {
        await session.endSession()
    }
}