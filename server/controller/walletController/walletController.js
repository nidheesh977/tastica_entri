import customerModel from "../../model/customerModel.js";
import walletModels from "../../model/walletModel.js";
import { generateToken } from "../../utils/generateToken.js";

const {walletModel,walletTransactionModel} = walletModels;

export const createWallet = async (req,res) => {
    try{
        const {customerId} = req.params;

        if(!customerId){
            return res.status(400).json({success:false,message:"Customer ID not get"})
        }

        const findCustomer = await customerModel.findById(customerId)

        if(!findCustomer){
            return res.status(400).json({success:false,message:"Customer not found"})
        }

        const newWallet = await walletModel({
            customerId:findCustomer._id
        })

        await newWallet.save()

        res.status(200).json({success:true,message:"Wallet create successfully",data:newWallet})
    }catch(error){
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

export const walletLog = async (req,res) => {
   
    try{
        const {barcodeNumber} = req.body;

       
        if(!barcodeNumber){
            return res.status(400).json({success:false,message:"barcode cannot be empty"})
        }

        const findCustomer = await customerModel.findOne({customerId:barcodeNumber}).select("_id customerName phoneNumber loyalityPoint");

        if(!findCustomer){
            return res.status(400).json({success:false,message:"User not found"})
        }

        let expireTime="10m"
        
       const token = generateToken({customerId:findCustomer._id},expireTime)

        res.cookie("walletToken",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.SAMESITE,
            path:'/',
            maxAge: 10 * 60 * 1000}).status(200).json({success:true,message:"Wallet login successfully",data:findCustomer})
    
    }catch(error){
         return res.status(500).json({success:false,message:"Internal dserver error"})
    }
}


export const rechargeWallet = async (req,res) => {
    try{
        const {customerId} = req.wallet;
        const staffId = req.user.id; 
        const {amount} = req.body;

        if(parseFloat(amount) < 0){
            return res.status(400).json({success:false,message:"Amount cannot be negative"})
        }

        const regex = /^\d+$/

        const isNumber = regex.test(parseFloat(amount))

        if(!isNumber){
            return res.status(400).json({success:false,message:"This is not Number"})
        }

        const findWallet = await walletModel.findOne({customerId:customerId})

        if(!findWallet){
            return res.status(400).json({success:false,message:"Wallet not found"})
        }

        const parseNumber = parseFloat(amount).toFixed(2)

       const addAmount = await walletModel.findByIdAndUpdate(findWallet._id,{$inc:{balance:parseNumber}},{new:true}).populate("customerId","customerName");

       await customerModel.findByIdAndUpdate(customerId,{$inc:{loyalityPoint:parseNumber,pointAmount:parseNumber}})

       const newTransaction = walletTransactionModel({
         customerId:customerId,
         staffId:staffId,
         amount:amount,
         type:"credit"
       });

       await newTransaction.save()

        res.clearCookie("walletToken").status(200).json({success:true,message:"Wallet recharge successfully",data:addAmount})
    }catch(error){
         return res.status(500).json({success:false,message:"Internal server error"})
    }
}