import mongoose, { Types } from "mongoose";
import TaxRateModel from "../../model/taxRateModel.js"
import { addTaxRatesValidation, taxRateStatusValidation } from "../../utils/joiValidation.js";
import { AppError } from "../../utils/AppError.js";
import { AuditLogModel } from "../../model/auditLogModel.js";


export const createTaxRateAccount = async (req, res) => {

    const { currencyCode, id: shopId } = req.shop;
    const { id: userId } = req.user;

    const session = await mongoose.startSession()

    try {

        await session.withTransaction(async () => {
            const taxRateAccountExist = await TaxRateModel.findOne({ shop: shopId, isCreated: true }).session(session).select("_id");

            if (taxRateAccountExist) {
                return res.status(409).json({ success: false, meesgae: "Tax rate account already exist" })
            }

            const newState = {
                currencyCode: currencyCode,
                taxRates: [
                    { taxCodeName: "Zero Rate", rate: 0, taxNameLowerCase: "zero rate", taxType: "ZERO", isButton: true }
                ],
            }

            const newTaxAccount = await TaxRateModel.create([
                {
                    shop: shopId,
                    currencyCode: currencyCode,
                    taxRates: [
                        { taxCodeName: "Zero Rate", rate: 0, taxNameLowerCase: "zero rate", taxType: "ZERO", isButton: true }
                    ],
                    isCreated: true
                }
            ], { session })



            await AuditLogModel.create([
                {
                    shop: shopId,
                    targetId: newTaxAccount[0]?._id,
                    targetModel: "TaxRate",
                    action: "CREATE",
                    payload: {
                        before: null,
                        after: newState
                    },
                    reason: "Create new tax rate book",
                    performedBy: userId
                }
            ], { session })


            res.status(200).json({ success: true, message: "Tax rate account create successfully" })
        })
    } catch (error) {

        return res.status(500).json({ success: false, message: "internal server error" })
    } finally {
        await session.endSession()
    }
}

export const addTaxRatesToAccount = async (req, res, next) => {


    const { id: shopId } = req.shop;
    const { id: userId } = req.user

    const { error, value } = addTaxRatesValidation.validate(req.body)

    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message })
    }

    const { taxCodeName, rate, taxType } = value;

    const session = await mongoose.startSession()

    try {
        await session.withTransaction(async () => {

            const taxCodeNameLower = taxCodeName.trim().replace(/\s+/g, " ").toLowerCase()

            const newState = {
                taxCodeName,
                rate,
                taxType
            }

            const isTaxBookExist = await TaxRateModel.findOne({ shop: shopId }).session(session).select("_id")

            if (!isTaxBookExist) {
                return next(new AppError("Tax Book not found", 404))
            }

            const addNewTaxRate = await TaxRateModel.findOneAndUpdate({
                shop: shopId,
                taxRates: {
                    $not: {
                        $elemMatch: {
                            taxNameLowerCase: taxCodeNameLower,
                            rate: rate,
                        }
                    }
                }

            }, {
                $push: {
                    taxRates: {
                        taxCodeName: taxCodeName,
                        rate: rate,
                        taxNameLowerCase: taxCodeName,
                        taxType: taxType.toUpperCase(),
                        isButton: true
                    }
                }
            }, { session, new: true })

            if (addNewTaxRate === null) {
                return next(new AppError("Tax Rate Already Exist", 409))
            }


            await AuditLogModel.create([
                {
                    shop: shopId,
                    targetId: addNewTaxRate._id,
                    targetModel: "TaxRate",
                    action: "CREATE",
                    payload: {
                        before: null,
                        after: newState
                    },
                    reason: "Create new tax rate",
                    performedBy: userId
                }
            ], { session })


            res.status(201).json({ success: true, message: "Tax rate Added Successfully" })
        })

    } catch (error) {


        next(error)
    } finally {
        await session.endSession()
    }
}

export const getTaxRatesForExpenseForm = async (req, res) => {
    try {
        const { id: shopId } = req.shop

        const findTaxRates = await TaxRateModel.aggregate([
            {
                $match: {
                    shop: new mongoose.Types.ObjectId(shopId)
                }
            },

            { $unwind: "$taxRates" },

            { $match: { "taxRates.isActive": true } },

            { $sort: { "taxRates.rate": -1 } },

            {
                $group: {
                    _id: "$_id",
                    sortedRates: {
                        $push: {
                            taxId: "$taxRates._id",
                            taxCodeName: "$taxRates.taxCodeName",
                            rate: "$taxRates.rate"
                        }
                    }
                }
            },

            {
                $project: {
                    _id: 1,
                    taxRates: "$sortedRates"
                }
            }
        ])

        // await TaxRateModel.find({ shop: shopId }).select("_id taxRates._id taxRates.taxName taxRates.rate ").sort({ "taxRates.rate": -1 })

        res.status(200).json({ success: true, message: "Data fetched successfully", data: findTaxRates[0] })
    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}


export const getTaxRatesForShop = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop

        const getTax = await TaxRateModel.findOne({ shop: shopId }).select("_id currencyCode taxRates._id taxRates.taxCodeName taxRates.taxType taxRates.rate taxRates.isButton taxRates.isActive taxRates.inActiveReason")

        res.status(200).json({ success: true, message: "Data fetched successfully", data: getTax })
    } catch (error) {
        next(error)
    }
}

export const taxRateStatusUpdate = async (req, res, next) => {
    const { id: shopId } = req.shop;
    const { taxAccountId, taxRateId } = req.params;
    const { id: userId } = req.user

    const { error, value } = taxRateStatusValidation.validate(req.body)

    if (error) {
        return next(new AppError(error?.details[0].message, 400))
    }

    const session = await mongoose.startSession()

    try {

        const { taxRateId, reason, isActive } = value;

        const result = await session.withTransaction(async () => {

            if (!mongoose.Types.ObjectId.isValid(taxRateId)) {
                throw new AppError("Invalid ID format", 400)
            }

            const findTaxRate = await TaxRateModel.findOne({ shop: shopId, _id: taxAccountId, "taxRates._id": taxRateId })

            if (!findTaxRate) {
                return next(new AppError("Tax rate not found", 404))
            }

            const findSelectTaxRate = findTaxRate.taxRates.find(item => item._id.toString() === taxRateId.toString())



            if (findSelectTaxRate.isActive === false && isActive === false || findSelectTaxRate.isActive === true && isActive === true) {
                throw new AppError(`Expense account Already ${isActive ? "active" : "inactive"}`, 400)
            }

            const previousState = { isActive: findSelectTaxRate?.isActive, inactiveReason: findSelectTaxRate?.inActiveReason }


            await TaxRateModel.findOneAndUpdate({ shop: shopId, _id: taxAccountId, "taxRates._id": taxRateId },
                { $set: { "taxRates.$.isActive": isActive, "taxRates.$.inActiveReason": isActive ? null : reason || (isActive ? "Reactivation" : "Deactivation") } },
                { new: true }, { session, runValidators: true })

            await AuditLogModel.create([
                {
                    shop: shopId,
                    targetId: taxAccountId,
                    subDocumentId: taxRateId,
                    targetModel: "TaxRate",
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

        // const checkTaxRateExist = await TaxRateModel.findOne({
        //     shop: shopId, _id: taxAccountId
        //     , "taxRates._id": taxRateId
        // }).select("_id") 

        // if (!checkTaxRateExist) {
        //     return next(new AppError("Tax rate not found", 404))
        // }

        // await TaxRateModel.findOneAndUpdate({ shop: shopId, _id: taxAccountId, "taxRates._id": taxRateId },
        //     { $pull: { "taxRates": { _id: taxRateId } } },
        //     { new: true }
        // )


    } catch (error) {
        next(error)
    } finally {
        await session.endSession()
    }
}