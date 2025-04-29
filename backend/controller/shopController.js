import bcrypt from 'bcryptjs';
import shopModel from '../model/shopModel.js';
import { shopSignupValidtaion ,shopLoginValidation } from '../utils/joiValidation.js';



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

        const hasedPassword = await bcrypt.hash(password,10);

        const newShop = new shopModel({
            shopname,
            email,
            password:hasedPassword,
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

        const isPasswordMatch = await bcrypt.compare(password,shopExist.password);

        if(!isPasswordMatch){
            return res.status(400).json({success:false,message:"Invalid credentials"});
        }

        const {password:pass,...shopData} = shopExist._doc

        res.status(200).json({success:true,message:"login successfully",shopData})
    }catch(error){
    
        return res.status(500).json({success:false,message:"internal server error"});
      }  
}

354977