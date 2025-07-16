import customerModel from "../../model/customerModel.js";
import loyalityPointModel from "../../model/loyalityPointModel.js";
import walletModels from "../../model/walletModel.js";
import { generateToken } from "../../utils/generateToken.js";
import { parseFloatDecimal } from "../../utils/parseFloatDecimal.js";

const { walletModel, walletTransactionModel } = walletModels;


export const walletLog = async (req, res) => {

    try {
        const { barcodeNumber } = req.body;


        if (!barcodeNumber) {
            return res.status(400).json({ success: false, message: "barcode cannot be empty" })
        }

        const findCustomer = await customerModel.findOne({ customerId: barcodeNumber }).select("_id customerName phoneNumber loyalityPoint");

        if (!findCustomer) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        let expireTime = "10m"

        const token = generateToken({ customerId: findCustomer._id }, expireTime)

        res.cookie("walletToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.SAMESITE,
            path: '/',
            maxAge: 10 * 60 * 1000
        }).status(200).json({ success: true, message: "Wallet login successfully", data: findCustomer })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal dserver error" })
    }
}


export const rechargeWallet = async (req, res) => {
    try {
        const { customerId } = req.wallet;
        const staffId = req.user.id;
        const { amount } = req.body;
        const shopId = req.shop.id

        if (parseFloat(amount) < 0) {
            return res.status(400).json({ success: false, message: "Amount cannot be negative" })
        }

        const regex = /^\d+$/

        const isNumber = regex.test(parseFloat(amount))

        if (!isNumber) {
            return res.status(400).json({ success: false, message: "This is not Number" })
        }

        const findWallet = await walletModel.findOne({ customerId: customerId })

        if (!findWallet) {
            return res.status(400).json({ success: false, message: "Wallet not found" })
        }

        const parseNumber = parseFloat(parseFloat(amount).toFixed(2))

        const findLoyality = await loyalityPointModel.findOne({ shop: shopId })

        const amtToPoint = findLoyality.loyalityRate > 0 ? parseFloatDecimal(findLoyality.loyalityRate * parseNumber) : parseFloatDecimal(parseNumber)


        console.log(amtToPoint);


        const addAmount = await walletModel.findByIdAndUpdate(findWallet._id, { $inc: { walletLoyaltyPoint: amtToPoint } }, { new: true }).populate("customerId", "customerName");

        await customerModel.findByIdAndUpdate(customerId, { $inc: { walletLoyaltyPoint: amtToPoint } })

        const newTransaction = walletTransactionModel({
            customerId: customerId,
            staffId: staffId,
            shopId: shopId,
            amount: amount,
            type: "credit",
            amtToPoint: amtToPoint,
            convertLoyalityRate: findLoyality?.loyalityRate || 0
        });

        await newTransaction.save()

        res.clearCookie("walletToken").status(200).json({ success: true, message: "Wallet recharge successfully", data: addAmount })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export const getWalletData = async (req, res) => {
    try {

        const shopId = req.shop.id;

        const getWallet = await walletModel.find({ shopId: shopId }).lean().sort({ createdAt: -1 }).populate({ path: "customerId", select: "customerName phoneNumber" })

        res.status(200).json({ success: true, message: "Data fetch successfully", data: getWallet })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const getWalletTransaction = async (req, res) => {
    try {
        const shopId = req.shop.id;
        const id = req.params.customerId;

        const getTransactions = await walletTransactionModel.find({ shopId: shopId, customerId: id }).lean().sort({ createdAt: -1 }).populate({ path: "customerId", select: "customerName phoneNumber" }).populate({ path: "staffId", select: "userName role" });

        res.status(200).json({ success: true, message: "Data fetch successfully", data: getTransactions })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}