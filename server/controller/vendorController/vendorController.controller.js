import mongoose, { mongo } from "mongoose";
import VendorModel from "../../model/vendorModel.js";
import { createVendorValidation } from "../../utils/joiValidation.js";


export const createNewVendor = async (req, res) => {

    const { error, value } = createVendorValidation.validate(req.body)


    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message })
    }

    try {

        const { id: shopId } = req.shop

        const { vendorName, vendorEmail, vendorPhoneNumber } = value;




        const vendorExist = await VendorModel.findOne({ vendorEmail: vendorEmail })

        if (vendorExist) {
            return res.staus(409).json({ success: false, message: "Vendor account already exist" })
        }

        const sliceString = vendorName.substring(0, 1).toUpperCase()


        const newVendor = VendorModel({
            shop: shopId,
            char: sliceString,
            vendorName: vendorName,
            vendorEmail: vendorEmail,
            vendorPhoneNumber: vendorPhoneNumber
        });

        await newVendor.save();

        res.status(201).json({ success: true, message: "Vendor create successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export const getVendorForExpenseForm = async (req, res) => {
    try {
        const { id: shopId } = req.shop

        const findVendor = await VendorModel.aggregate([
            { $match: { shop: mongoose.Types.ObjectId.createFromHexString(shopId) } },
            { $sort: { char: 1 } },
            {
                $project: {
                    _id: "$_id",
                    vendorName: 1,
                    char: 1
                }
            }
        ])

        res.status(200).json({ success: true, message: "Data fetched successfully", data: findVendor })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}