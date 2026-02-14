import { Types } from "mongoose";
import { VendorStaffModel } from "../../model/vendorStaffModel.js";
import { AppError } from "../../utils/AppError.js";
import { encryptData } from "../../utils/dataEncryptAndDecrypt.js";
import { createVendorStaffValidation } from "../../utils/joiValidation.js";


export const createVendorStaff = async (req, res, next) => {


    const { error, value } = createVendorStaffValidation.validate(req.body)

    if (error) {
        return next(new AppError(error?.details[0].message, 400))
    }

    const { id: shopId } = req.shop
    const { vendorId, staffName, email, phoneNumber } = value

    try {


        const staffAlreadyExist = await VendorStaffModel.findOne({ shop: shopId, email: email })

        if (staffAlreadyExist) {
            return next(new AppError("Staff already exist", 409))
        }

        const lastFourDigit = phoneNumber.slice(-4)

        const maskedNumber = lastFourDigit.padStart(phoneNumber.length, "*")

        const encryptPhoneNumber = encryptData(phoneNumber)

        const newStaff = VendorStaffModel({
            shop: shopId,
            vendor: vendorId,
            staffName,
            email,
            phoneNumber: encryptPhoneNumber,
            maskPhoneNumber: maskedNumber
        })

        await newStaff.save()

        res.status(201).json({ success: true, message: "Create successfully" })
    } catch (error) {
        next(error)
    }
}


export const getVendorStaffForExpenseForm = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop

        const result = await VendorStaffModel.aggregate([
            { $match: { shop: new Types.ObjectId(shopId) } },
            {
                $project: {
                    _id: 1,
                    staffName: 1
                }
            }
        ])


        res.status(200).json({ success: true, message: "Data fetched successfully", data: result })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const vendorStaffDataForShop = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop;
        const { vendorId } = req.params;

        const staffData = await VendorStaffModel.find({ shop: shopId, vendor: vendorId }).select("_id staffName email maskPhoneNumber isActive inActiveReason")

        res.status(200).json({ success: true, message: "Data fetched successfully", data: staffData })

    } catch (error) {
        next(error)
    }
}
