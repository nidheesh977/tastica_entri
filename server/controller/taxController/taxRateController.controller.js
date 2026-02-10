import mongoose, { Types } from "mongoose";
import TaxRateModel from "../../model/taxRateModel.js"
import { addTaxRatesValidation } from "../../utils/joiValidation.js";
import { AppError } from "../../utils/AppError.js";


export const createTaxRateAccount = async (req, res) => {
    try {

        const { currencyCode, id: shopId } = req.shop


        const taxRateAccountExist = await TaxRateModel.findOne({ shop: shopId, isCreated: true });

        if (taxRateAccountExist) {
            return res.status(409).json({ success: false, meesgae: "Tax rate account already exist" })
        }



        const newTaxAccount = TaxRateModel({
            shop: shopId,
            currencyCode: currencyCode,
            taxRates: [
                { taxCodeName: "Zero Rate", rate: 0, taxNameLowerCase: "zero rate", taxType: "ZERO", isButton: true }
            ],
            isCreated: true
        })

        await newTaxAccount.save()

        res.status(200).json({ success: true, message: "Tax rate account create successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const addTaxRatesToAccount = async (req, res) => {

    const { error, value } = addTaxRatesValidation.validate(req.body)


    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message })
    }

    const { taxCodeName, rate, taxType } = value;
    const { id: taxRateAccountId } = req.params;
    const { id: shopId } = req.shop

    try {

        const taxCodeNameLower = taxCodeName.trim().replace(/\s+/g, " ").toLowerCase()

        const addNewTaxRate = await TaxRateModel.findOneAndUpdate({
            shop: shopId, _id: taxRateAccountId,
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
        }, { new: true })

        const message = addNewTaxRate === null ? "Tax Rate Already Exist" : "Tax rate Added Successfully"
        const statusCode = addNewTaxRate === null ? 409 : 201

        res.status(statusCode).json({ success: true, message: message })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const getTaxRatesForExpenseForm = async (req, res) => {
    try {
        const { id: shopId } = req.shop

        const findTaxRates = await TaxRateModel.aggregate([
            { $match: { shop: mongoose.Types.ObjectId.createFromHexString(shopId) } },
            { $unwind: "$taxRates" },
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
                    },

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

        const getTax = await TaxRateModel.findOne({ shop: shopId }).select("_id currencyCode taxRates._id taxRates.taxCodeName taxRates.taxType taxRates.rate taxRates.isButton")

        res.status(200).json({ success: true, message: "Data fetched successfully", data: getTax })
    } catch (error) {
        next(error)
    }
}

export const deleteTaxRate = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop;
        const { taxAccountId, taxRateId } = req.params;

        const checkTaxRateExist = await TaxRateModel.findOne({
            shop: shopId, _id: taxAccountId
            , "taxRates._id": taxRateId
        }).select("_id")

        if (!checkTaxRateExist) {
            return next(new AppError("Tax rate not found", 404))
        }

        await TaxRateModel.findOneAndUpdate({ shop: shopId, _id: taxAccountId, "taxRates._id": taxRateId },
            { $pull: { "taxRates": { _id: taxRateId } } },
            { new: true }
        )

        res.status(200).json({ success: true, message: "Tax rate Remove successfully" })

    } catch (error) {
        next(error)
    }
}