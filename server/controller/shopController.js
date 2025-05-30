import shopModel from '../model/shopModel.js';
import { shopSignupValidtaion ,shopLoginValidation, shopUpdateValidtaion } from '../utils/joiValidation.js';
import { generateToken } from '../utils/generateToken.js';
import { comparePassword } from '../utils/comparePassword.js';
import bcryptjs from 'bcryptjs'
import AdminStaffModel from '../model/adminAndStaffModel.js';


// Endpoint to Create a new shop by an admin
export const createShop = async (req,res) => {
    
    try {
        const {error,value} = shopSignupValidtaion.validate(req.body);

        if(error){
            return res.status(400).json({message:error.details[0].message});
        }

        const {shopName,email,password,countryName,currencyCode} = value;

        const shopExist = await shopModel.findOne({email:email});

        if(shopExist){
            return res.status(400).json({message:"Shop already exists"});
        }

        const hasedPassword = await bcryptjs.hash(password,10);

        const newShop = new shopModel({
            shopName,
            email,
            password:hasedPassword,
            countryName,
            currencyCode,
            role:"shop"
        })

        await newShop.save();

        res.status(201).json({success:true,message:"Shop created successfully"});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// Endpoint to log in a shop 
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

          const isPasswordCorrect = await comparePassword(password,shopExist.password);
        
          if(!isPasswordCorrect){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }         

        const {password:pass,...shopData} = shopExist._doc

        const shopToken = generateToken({id:shopExist._id,role:"shop", countryName:shopExist.countryName, currencyCode:shopExist.currencyCode});

        res.cookie("shopToken",shopToken,{httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.SAMESITE,maxAge:24 * 60 * 60 * 1000}).status(200).json({success:true,message:"Login Successfully",data:shopData})

    }catch(error){ 
        return res.status(500).json({success:false,message:"internal server error"});
      }  
}

// Endpoint to update shop 
    export const shopUpdate = async (req,res) => {
        try{

        const {error,value} = shopUpdateValidtaion.validate(req.body);
       
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }

        const {id} = req.shop;
        const {shopName,email,countryName,currencyCode} = value;

        if(!id){
            return res.status(400).json({success:false,message:"Shop ID is missing"});
        }

      const updatedData =   await shopModel.findByIdAndUpdate(id,{
            shopName,
            email,
            countryName,
            currencyCode,
        },{new:true})

        const {password:pass,...shopData} = updatedData._doc

        res.status(200).json({success:true,message:"Shop updated successfully",data:shopData})

    }catch(error){
        return res.status(500).json({success:false,message:"internal server error"});
    }
}

// Endpoint to delete shop

export const deleteShop = async (req,res) => {
    try{
       const {id} = req.shop;

       if(!id){
        return res.status(400).json({success:false,message:"Shop ID is missing"});
    }

    const staffMembers = await AdminStaffModel.find({shopId:id})

    if (staffMembers.some(staff => staff.role === "admin")) {
        return res.status(403).json({ success: false, message: "Cannot delete shop with admin staff" });
    }
        
     await AdminStaffModel.deleteMany({shopId:id});
     await shopModel.findByIdAndDelete(id)

     res.clearCookie("shopToken")
     res.clearCookie("adminToken")
     res.clearCookie("staffToken")
  
  res.status(200).json({success:true,message:"shop delete successfully"})
    }catch(error){
     
  return res.status(500).json({success:false,message:"internal server error"});
    }
}


// Endpoint to check if a shop is logged in
export const checkShopLogin = async (req,res) => {
    try {
        const shopLogged = req.shop;
    
        if(shopLogged.role !== "shop" ){
            return res.status(401).json({success:false,message:"Unauthorized"});
        }
        const shopExist = await  shopModel.findById(shopLogged.id)
        
        const {password:pass,...shopData} = shopExist._doc;

        res.status(200).json({success:true,message:"Shop is logged in",data:shopData});
    
       
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

// Endpoint to log out a shop 
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
