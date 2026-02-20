import mongoose, { Types } from "mongoose";
import { VendorStaffModel } from "../../model/vendorStaffModel.js";
import { AppError } from "../../utils/AppError.js";
import { encryptData } from "../../utils/dataEncryptAndDecrypt.js";
import { vendorStaffStatusValidation, createVendorStaffValidation, } from "../../utils/joiValidation.js";
import { AuditLogModel } from "../../model/auditLogModel.js";


export const createVendorStaff = async (req, res, next) => {


    const { error, value } = createVendorStaffValidation.validate(req.body)

    if (error) {
        return next(new AppError(error?.details[0].message, 400))
    }

    const { id: shopId } = req.shop
    const { vendorId, staffName, email, phoneNumber } = value

    try {

        const staffNameLower = staffName.trim().replace(/\s+/g, " ").toLowerCase()

        const staffAlreadyExist = await VendorStaffModel.findOne({ shop: shopId, vendor: vendorId, staffNameLowerCase: staffNameLower })

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
            maskPhoneNumber: maskedNumber,
            staffNameLowerCase: staffNameLower
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
        const { vendorId } = req.params

        const result = await VendorStaffModel.aggregate([
            { $match: { shop: new Types.ObjectId(shopId), vendor: new Types.ObjectId(vendorId) } },
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



export const vendorStaffStatusUpdate = async (req, res, next) => {


    const { id: shopId } = req.shop;
    const { id: userId } = req.user
    const { vendorId } = req.params


    const { error, value } = vendorStaffStatusValidation.validate(req.body)

    if (error) {
        return next(new AppError(error?.details[0].message, 400))
    }


    const { staffId, reason, isActive } = value


    const session = await mongoose.startSession()

    try {

        const result = await session.withTransaction(async () => {

            if (!mongoose.Types.ObjectId.isValid(staffId)) {
                throw new AppError("Invalid ID format", 400)
            }

            const vendorStaff = await VendorStaffModel.findById(staffId).session(session)


            if (!vendorStaff) {
                throw new AppError("Vendor not found", 400)
            }

            if (vendorStaff.isActive === false && isActive === false || vendorStaff.isActive === true && isActive === true) {
                throw new AppError(`Vendor Already ${isActive ? "active" : "inactive"}`, 400)
            }



            const previousState = { isActive: vendorStaff?.isActive, inactiveReason: vendorStaff?.inActiveReason }

            await VendorStaffModel.findOneAndUpdate({ shop: shopId, vendor: vendorId, _id: staffId },
                { isActive: isActive, inActiveReason: isActive ? null : reason || (isActive ? "Reactivation" : "Deactivation") },
                { session, runValidators: true }
            )

            await AuditLogModel.create([
                {
                    shop: shopId,
                    targetId: staffId,
                    targetModel: "VendorStaff",
                    action: "STATUS_CHANGE",
                    payload: {
                        before: previousState,
                        after: { isActive: isActive, inactiveReason: isActive ? null : reason }
                    },
                    reason: reason || (isActive ? "Reactivation" : "Deactivation"),
                    performedBy: userId
                }
            ], { session })

            res.status(200).json({ success: true, message: `Vendor staff ${isActive ? "Active" : "Inactive"} successfully` })

        })

    } catch (error) {
        next(error)
    } finally {
        await session.endSession()
    }
}