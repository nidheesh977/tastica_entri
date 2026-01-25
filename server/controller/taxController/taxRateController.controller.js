import mongoose from "mongoose";
import TaxRateModel from "../../model/taxRateModel.js"
import { addTaxRatesValidation } from "../../utils/joiValidation.js";


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
                { taxCodeName: "Zero Rate", rate: 0, taxNameLowerCase: "zero rate" }
            ],
            isCreated: true
        })

        await newTaxAccount.save()

        res.status(200).json({ success: true, message: "Tax rate account create successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const addTaxRatesToAccount = async (req, res) => {

    const { error, value } = addTaxRatesValidation.validate(req.body)


    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message })
    }

    const { taxCodeName, rate } = value;
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
                        rate: rate
                    }
                }
            }

        }, {
            $push: {
                taxRates: {
                    taxCodeName: taxCodeName,
                    rate: rate,
                    taxNameLowerCase: taxCodeName
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