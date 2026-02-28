import mongoose, { mongo } from "mongoose";
import VendorModel from "../../model/vendorModel.js";
import { vendorStatusValidation, createVendorValidation } from "../../utils/joiValidation.js";
import { decryptData, encryptData } from "../../utils/dataEncryptAndDecrypt.js";
import { AuditLogModel } from "../../model/auditLogModel.js";
import { after } from "node:test";
import { AppError } from "../../utils/AppError.js";


export const createNewVendor = async (req, res, next) => {

    const { id: shopId } = req.shop
    const { id: userId } = req.user

    const { error, value } = createVendorValidation.validate(req.body)


    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message })
    }

    const session = await mongoose.startSession()

    const { vendorName, email, phoneNumber, address } = value;

    try {

        await session.withTransaction(async () => {
            const lastFourDigit = phoneNumber.slice(-4)

            const maskedNumber = lastFourDigit.padStart(phoneNumber.length, "*")

            const maskAddress = address.slice(0, 5) + "..."

            const vendorNameLower = vendorName.trim().replace(/\s+/g, " ").toLowerCase()

            const vendorExist = await VendorModel.findOne({ shop: shopId, vendorNameLowerCase: vendorNameLower }).session(session).select("_id")

            if (vendorExist) {
                return res.status(409).json({ success: false, message: "Vendor account already exist" })
            }

            const sliceString = vendorName.substring(0, 1).toUpperCase()

            const encryptPhoneNumber = encryptData(phoneNumber)


            const newState = {
                vendorName,
                email,
                address
            }

            const newVendor = await VendorModel.create([
                {
                    shop: shopId,
                    char: sliceString,
                    vendorName: vendorName,
                    email: email,
                    phoneNumber: encryptPhoneNumber,
                    address: address,
                    maskPhoneNumber: maskedNumber,
                    maskAddress: address,
                    vendorNameLowerCase: vendorNameLower
                }
            ], { session });

            await AuditLogModel.create([
                {
                    shop: shopId,
                    targetId: newVendor[0]._id,
                    targetModel: "Vendor",
                    action: "CREATE",
                    payload: {
                        before: null,
                        after: newState
                    },
                    reason: "Create new vendor",
                    performedBy: userId
                }
            ], { session })


            res.status(201).json({ success: true, message: "Vendor create successfully" })
        })



    } catch (error) {
        next(error)
    } finally {
        await session.endSession()
    }
}


export const getVendorForExpenseForm = async (req, res) => {
    try {
        const { id: shopId } = req.shop

        const findVendor = await VendorModel.aggregate([
            { $match: { shop: mongoose.Types.ObjectId.createFromHexString(shopId), isActive: true } },
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



export const getVendorDataForShop = async (req, res, next) => {
    try {

        const { id: shopId } = req.shop

        const getVendorData = await VendorModel.find({ shop: shopId }).select("_id vendorName email maskPhoneNumber address isActive inActiveReason")


        res.status(200).json({ success: true, message: "Data fetched successfully", data: getVendorData })

    } catch (error) {
        next(error)
    }
}


export const vendorStatusUpdate = async (req, res, next) => {


    const { id: shopId } = req.shop;
    const { id: userId } = req.user

    const { error, value } = vendorStatusValidation.validate(req.body)

    if (error) {
        return next(new AppError(error?.details[0].message, 400))
    }

    const { vendorId, reason, isActive } = value

    const session = await mongoose.startSession()

    try {

        const result = await session.withTransaction(async () => {

            if (!mongoose.Types.ObjectId.isValid(vendorId)) {
                throw new AppError("Invalid ID format", 400)
            }

            const vendor = await VendorModel.findOne({ shop: shopId, _id: vendorId }).session(session)


            if (!vendor) {
                throw new AppError("Vendor not found", 400)
            }

            if (vendor.isActive === false && isActive === false || vendor.isActive === true && isActive === true) {
                throw new AppError(`Vendor Already ${isActive ? "active" : "inactive"}`, 400)
            }



            const previousState = { isActive: vendor?.isActive, inactiveReason: vendor?.inActiveReason }

            await VendorModel.findOneAndUpdate({ shop: shopId, _id: vendorId },
                { isActive: isActive, inActiveReason: isActive ? null : reason || (isActive ? "Reactivation" : "Deactivation") },
                { session, runValidators: true }
            )

            await AuditLogModel.create([
                {
                    shop: shopId,
                    targetId: vendorId,
                    targetModel: "Vendor",
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


export const decryptVendorPhoneNumber = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop
        const { vendorId } = req.params;



        const findVendor = await VendorModel.findOne({ shop: shopId, _id: vendorId }).select("_id phoneNumber maskPhoneNumber")

        if (!findVendor) {
            return next(new AppError("Vendor not found", 404))
        }



        const decryptPhoneNumber = decryptData(findVendor?.phoneNumber)

        const data = {
            isDecrypt: true,
            decryptPhoneNumber: decryptPhoneNumber
        }




        res.status(200).json({ success: true, message: "data fetch phonenumber", data: data })
    } catch (error) {
        next(error)
    }
}