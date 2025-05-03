import bcryptjs from 'bcryptjs';
import shopModel from '../model/shopModel.js';
import { shopSignupValidtaion ,shopLoginValidation } from '../utils/joiValidation.js';
import { generateToken } from '../utils/generateToken.js';



export const createShop = async (req,res) => {
    
    try {
        const {error,value} = shopSignupValidtaion.validate(req.body);

        if(error){
            return res.status(400).json({message:error.details[0].message});
        }

        const {shopname,email,password} = value;

        const shopExist = await shopModel.findOne({email:email});

        if(shopExist){
            return res.status(400).json({message:"Shop already exists"});
        }

        const hasedPassword = await bcryptjs.hash(password,10);

        const newShop = new shopModel({
            shopname,
            email,
            password:hasedPassword,
            role:"shop"
        })

        await newShop.save();

        res.status(201).json({success:true,message:"Shop created successfully"});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const shopLogin = async (req,res) => {
    try {

        const {error,value} = shopLoginValidation.validate(req.body);

        if(error){
            return res.status(400).json({message:error.details[0].message});
        }

        const {email,password} = value;

        const shopExist = await shopModel.findOne({email:email});

        if(!shopExist){
            return res.status(400).json({success:false,message:"Shop not found"});
        }

        const isPasswordMatch = await bcryptjs.compare(password,shopExist.password);

        if(!isPasswordMatch){
            return res.status(400).json({success:false,message:"Invalid credentials"});
        }

        const {password:pass,...shopData} = shopExist._doc

        const shopToken = generateToken({id:shopExist._id,role:""});

        res.cookie("shopToken",shopToken,{httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:"none",maxAge:24 * 60 * 60 * 1000}).status(200).json({success:true,message:"Login Successfully",data:shopData})

    }catch(error){
      
        return res.status(500).json({success:false,message:"internal server error"});
      }  
}


export const checkShopLogin = async (req,res) => {
    try {
        const shopLogged = req.shop;

        if(!shopLogged){
            return res.status(401).json({success:false,message:"Unauthorized"});
        }else{
            res.status(200).json({success:true,message:"Shop is logged in"});
        }
       
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export const logOutShop = async (req,res) => {
  try{
    res.clearCookie("shopToken")
    res.clearCookie("adminToken")
    res.clearCookie("staffToken")

    res.status(200).json({success:true,message:"shop Logout successfully"})
  }catch(error){
     return res.status(500).json({success:false,message:"internal server error"})
  }
}
