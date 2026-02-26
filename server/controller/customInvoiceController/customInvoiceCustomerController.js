import mongoose from "mongoose"
import customerModel from "../../model/customerModel.js"
import { AppError } from "../../utils/AppError.js"
import { encryptData } from "../../utils/dataEncryptAndDecrypt.js"
import { generateCustomInvoiceCustomerId } from "../../utils/generateId.js"
import crypto from "crypto"
import { AuditLogModel } from "../../model/auditLogModel.js"
import { createBillingAddress, createCustomCustomerValidation, createShippingAddress } from "../../utils/joiValidation.js"



export const createCustomInvoiceCustomer = async (req, res, next) => {

    // const { customerName, phoneNumber, email, customerType, businessName, displayName, salutation, firstName, lastName } = req.body;

    const { id: shopId } = req.shop;
    const { id: userId } = req.user;


    const { error, value } = createCustomCustomerValidation.validate(req.body)


    if (error) {
        return next(new AppError(error.details[0].message, 400))
    }

    const { customerType,
        customerName,
        email,
        phoneNumber,
        businessName,
        displayName,
        salutation,
        firstName,
        lastName,
        billingLabel,
        billingAddress,
        billingCity,
        billingState,
        billingCountry,
        billingPostalCode,
        shippingLabel,
        shippingAddress,
        shippingCity,
        shippingState,
        shippingCountry,
        shippingPostalCode
    } = value;

    const session = await mongoose.startSession()


    try {

        const result = await session.withTransaction(async () => {
            const hashedPhoneNumber = crypto.createHmac("sha256", process.env.PHONE_SECRET).update(phoneNumber).digest("hex")

            let customerIsExist = null

            if (customerType === "individual") {

                customerIsExist = await customerModel.findOne({ shopId: shopId, phoneHash: hashedPhoneNumber, role: "customInvoice" }).session(session).select("_id customerName")
            } else if (customerType === "business") {
                const cleanBusinessName = businessName.trim().replace(/\s+/g, " ")

                customerIsExist = await customerModel.findOne({ shopId: shopId, businessName: cleanBusinessName, role: "customInvoice" }).session(session).select("_id businessName")
            }


            if (customerIsExist) {
                return next(new AppError("Customer Alreday exist"))
            }

            const hasAllShippingData = [
                shippingLabel,
                shippingAddress,
                shippingCity,
                shippingState,
                shippingCountry,
                shippingPostalCode
            ].every((field) => typeof field === "string" && field?.trim().length > 0)

            const hasAllAddressData = [
                billingLabel,
                billingAddress,
                billingCity,
                billingState,
                billingCountry,
                billingPostalCode,
            ].every((field) => typeof field === "string" && field?.trim().length > 0)

            const customerAddressData = hasAllAddressData ? [{
                label: billingLabel,
                address: billingAddress,
                city: billingCity,
                state: billingState,
                postalCode: billingPostalCode,
                country: billingCountry
            }] : []

            const shippingAddressData = hasAllShippingData ? [{
                label: shippingLabel,
                address: shippingAddress,
                city: shippingCity,
                state: shippingState,
                postalCode: shippingPostalCode,
                country: shippingCountry
            }] : []

            const generteInvCustomerId = await generateCustomInvoiceCustomerId()

            const lastFourDigit = phoneNumber.slice(-4)

            const maskedNumber = lastFourDigit.padStart(phoneNumber.length, "*")



            const encryptPhoneNumber = encryptData(phoneNumber)

            const cleanedCustomerName = customerType === "individual" ? customerName.trim().replace(/\s+/g, " ") : null
            const cleanedCustomerNameLower = customerType === "individual" ? customerName.trim().replace(/\s+/g, " ").toLowerCase() : null

            const cleanedBusinessName = customerType === "business" ? businessName.trim().replace(/\s+/g, " ") : null
            const cleanedBusinessNameLower = customerType === "business" ? businessName.trim().replace(/\s+/g, " ").toLowerCase() : null
            const nameSalutaion = customerType === "business" ? salutation.trim().replace(/\s+/g, " ") : null
            const customerFirstName = customerType === "business" ? firstName.trim().replace(/\s+/g, " ") : null
            const customerLastName = customerType === "business" ? lastName.trim().replace(/\s+/g, " ") : null


            const isEmail = email ? email : null

            const previousState = {
                customerId: generteInvCustomerId,
                customerName: cleanedCustomerName,
                businessName: cleanedBusinessName,
                role: "customInvoice",
                customerType: customerType
            }

            const newCustomInvoiceCustomer = await customerModel.create([
                {
                    customerId: generteInvCustomerId,
                    customerName: cleanedCustomerName,
                    customerNameLowerCase: cleanedCustomerNameLower,
                    phone: encryptPhoneNumber,
                    businessName: cleanedBusinessName,
                    businessNameLowerCase: cleanedBusinessNameLower,
                    phoneHash: hashedPhoneNumber,
                    email: isEmail,
                    maskPhoneNumber: maskedNumber,
                    shopId: shopId,
                    role: "customInvoice",
                    customerType: customerType,
                    displayName: displayName,
                    primaryContact: {
                        salutation: nameSalutaion,
                        firstName: customerFirstName,
                        lastName: customerLastName
                    },
                    billingAddresses: customerAddressData,
                    shippingAddresses: shippingAddressData
                }
            ], { session })




            await AuditLogModel.create([
                {
                    shop: shopId,
                    targetId: newCustomInvoiceCustomer[0]._id,
                    targetModel: "Customer",
                    action: "CREATE",
                    payload: {
                        before: null,
                        after: previousState
                    },
                    reason: "Create new custom invoice customer",
                    performedBy: userId
                }
            ], { session })



            res.status(201).json({ success: true, exists: false, message: "Customer create successfully", })
        })


    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const getCustomCustomerInvoice = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 4

        const results = await customerModel.aggregate([
            {
                $facet: {
                    data: [
                        { $match: { shopId: new mongoose.Types.ObjectId(shopId), role: "customInvoice" } },
                        { $sort: { createdAt: -1 } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },

                        {
                            $project: {
                                customerId: 1,
                                customerName: 1,
                                businessName: 1,
                                email: 1,
                                maskPhoneNumber: 1,
                                isActive: 1,
                                inActiveReason: 1,
                                customerType: 1

                            }
                        }
                    ],
                    totalCount: [{ $match: { shopId: new mongoose.Types.ObjectId(shopId), role: "customInvoice" } }, { $count: "count" }]
                }
            }
        ])


        const data = results[0]?.data || []
        const totalCount = results[0]?.totalCount[0]?.count || 0


        const datalength = data.length || 0

        const hasmore = (page * limit) < totalCount



        res.status(200).json({ success: true, message: "Data fetched successfully", data, totalCount, page, datalength, hasmore, limit })

    } catch (error) {
        next(error)
    }
}


export const getCustomCustomerForForm = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop;

        const result = await customerModel.aggregate([
            { $match: { shopId: new mongoose.Types.ObjectId(shopId), role: "customInvoice" } },
            {
                $project: {
                    _id: 1,
                    displayName: 1,
                    customerName: 1,
                    email: 1,
                    businessName: 1
                }
            }
        ])


        res.status(200).json({ success: "Data fetched successfully", data: result })
    } catch (error) {
        next(error)
    }
}

export const getCustomCustomerAddress = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop;
        const { customerId } = req.params;



        const customer = await customerModel.findOne({ shopId: shopId, role: "customInvoice", _id: customerId }).select("_id shippingAddresses billingAddresses defaultShippingAddress defaultBillingAddress")


        if (!customer) {
            return next(new AppError("Customer not found", 404))
        }

        res.status(200).json({ success: true, message: "Data fetched successfully", data: customer })

    } catch (error) {
        next(error)
    }
}


export const addShippingAddressToCustomer = async (req, res, next) => {


    const { id: shopId } = req.shop;
    const { customerId } = req.params;
    const { error, value } = createShippingAddress.validate(req.body)

    if (error) {
        return next(new AppError(error.details[0].message, 400))
    }
    const {
        shippingLabel,
        shippingAddress,
        shippingCity,
        shippingState,
        shippingCountry,
        shippingPostalCode } = value;
    try {

        const customer = await customerModel.findOne({ shopId: shopId, role: "customInvoice", _id: customerId }).select("_id shippingAddresses")

        if (!customer) {
            return next(new AppError("Customer not found", 404))
        }

        const shippingAddressData = {
            label: shippingLabel,
            address: shippingAddress,
            city: shippingCity,
            state: shippingState,
            postalCode: shippingPostalCode,
            country: shippingCountry
        }

        customer?.shippingAddresses.push(shippingAddressData)


        await customer.save()




        res.status(200).json({ success: true, message: "Shipping address added successfully" })
    } catch (error) {
        console.log(error);

        next(error)
    }
}

export const addBillingAddressToCustomer = async (req, res, next) => {
    try {

        const { id: shopId } = req.shop;
        const { customerId } = req.params;
        const { error, value } = createBillingAddress.validate(req.body)

        if (error) {
            return next(new AppError(error.details[0].message, 400))
        }
        const {
            billingLabel,
            billingAddress,
            billingCity,
            billingState,
            billingCountry,
            billingPostalCode } = value;

        const customer = await customerModel.findOne({ shopId: shopId, role: "customInvoice", _id: customerId }).select("_id billingAddresses")

        if (!customer) {
            return next(new AppError("Customer not found", 404))
        }


        const billingAddressData = {
            label: billingLabel,
            address: billingAddress,
            city: billingCity,
            state: billingState,
            postalCode: billingPostalCode,
            country: billingCountry
        }


        customer?.billingAddresses.push(billingAddressData)
        await customer.save()


        res.status(200).json({ success: true, message: "Billing address added successfully" })
    } catch (error) {
        next(error)
    }
}