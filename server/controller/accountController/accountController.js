import mongoose from "mongoose";
import shopModel from "../../model/shopModel.js";
import { AppError } from "../../utils/AppError.js";
import { createDefaultccount } from "../../helpers/defaultAccount.js";
import AccountModel from "../../model/accountModel.js";



export const defaultAccountsSystemCreate = async (req, res, next) => {
    const { id: shopId } = req.shop;

    const session = await mongoose.startSession()
    try {

        await session.withTransaction(async () => {
            const findShop = await shopModel.findById(shopId).session(session).select("_id isAccountingInitialized")

            if (findShop?.isAccountingInitialized) {
                return next(new AppError("Accounts Already created", 409))
            }

            findShop.isAccountingInitialized = true
            await findShop.save(session)

            await createDefaultccount(findShop._id, session)

            res.status(201).json({ success: true, message: "Accounts created successfully" })
        })




    } catch (error) {
        next(error)
    }
}


export const getAccountsForSales = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop;

        const result = await AccountModel.aggregate([
            {
                $match: {
                    shop: new mongoose.Types.ObjectId(shopId),
                    isActive: true
                }
            },
            {
                $facet: {
                    salesAccount: [
                        {
                            $match: {
                                type: "INCOME",
                                category: "SALES"
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1
                            }
                        }

                    ],
                    purchaseAccount: [
                        {
                            $match: {
                                type: "EXPENSE",
                                category: { $in: ["PURCHASE", "COGS", "OTHER"] }
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1
                            }
                        }
                    ]
                }
            }
        ])

        const data = {
            salesAccount: result[0]?.salesAccount,
            purchaseAccount: result[0]?.purchaseAccount
        }

        res.status(200).json({ success: true, mesage: "Data fetched successfully", data: data })

    } catch (error) {
        next(error)
    }
}