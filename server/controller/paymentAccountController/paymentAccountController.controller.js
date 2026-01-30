import bcryptjs from "bcryptjs";
import PaymentAccountModel from "../../model/paymentAccountModel.js";
import { createPaymentAccountValidation } from "../../utils/joiValidation.js";
import { Types } from "mongoose";



export const createPaymentAccount = async (req, res) => {


    const { error, value } = createPaymentAccountValidation.validate(req.body);

    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message })
    }

    const shopId = req.shop.id;

    const { accountType, accountNumber, accountTitle } = value;

    const accountTitleToLowerCase = accountTitle.trim().replace(/\s+/g, " ")

    try {




        const isPaymentAccountExist = await PaymentAccountModel.findOne({ shop: shopId, accountTitleLowerCase: accountTitleToLowerCase })
            .select("_id accountNumber accountTitleLowerCase")

        if (isPaymentAccountExist) {
            return res.status(409).json({ success: false, message: "Payment Account Already Exist" })
        }



        if (accountType === "bank" && !accountNumber) {
            return res.status(400).json({ success: false, message: "Please enter Account Number" })
        }

        if (accountNumber && accountType === "bank") {
            const findAccount = await PaymentAccountModel.find({ shop: shopId, isAccountNumber: true }).select("_id accountNumber isAccountNumber")

            for (let account of findAccount) {
                const compareAccountNumber = await bcryptjs.compare(process.env.ACCOUNT_NUMBER_PEPPER_HASH + accountNumber, account.accountNumber || "")

                if (compareAccountNumber) {
                    return res.status(409).json({ success: false, message: "Account number already exist" })
                }
            }

        }



        let isAccountNumber = !!accountNumber


        let isAccountNumberEmpty = accountNumber && accountType === "bank" ? accountNumber : null;


        let hashedAccountNumber = null

        if (isAccountNumberEmpty) {
            const pepperHashValue = process.env.ACCOUNT_NUMBER_PEPPER_HASH

            const joinedValue = pepperHashValue + accountNumber || ""

            hashedAccountNumber = await bcryptjs.hash(joinedValue, 10)
        } else {
            hashedAccountNumber = null
        }


        const newPaymentAccount = PaymentAccountModel({
            shop: shopId,
            accountType: accountType,
            accountNumber: hashedAccountNumber,
            accountTitle: accountTitle,
            accountTitleLowerCase: accountTitle,
            isAccountNumber: isAccountNumber
        })

        await newPaymentAccount.save()

        res.status(201).json({ success: true, message: "Payment account create successfully" })

    } catch (error) {

        return res.status(500).json({ success: false, message: "Internal server" })
    }
}


export const getPaymentAcountForExpenseForm = async (req, res, next) => {
    try {
        const { id: shopId } = req.shop

        const findAccount = await PaymentAccountModel.aggregate([
            { $match: { shop: new Types.ObjectId(shopId) } },
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