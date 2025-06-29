import AdminStaffModel from "../../../model/adminAndStaffModel.js";
import shopModel from "../../../model/shopModel.js";
import { shopSignupValidtaion,shopUpdateValidtaion,} from "../../../utils/joiValidation.js";
import bcryptjs from "bcryptjs";

export const createShop = async (req, res) => {
  try {
    const { error, value } = shopSignupValidtaion.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { shopName, email, password ,countryName,currencyCode} = value;

    const shopExist = await shopModel.findOne({ email: email });

    if (shopExist) {
      return res.status(400).json({ message: "Shop already exists" });
    }

    const hasedPassword = await bcryptjs.hash(password, 10);

    const newShop = new shopModel({
      shopName,
      email,
      password: hasedPassword,
      countryName,
      currencyCode,
      role:"shop"
    });

    await newShop.save();

    res.status(201).json({ success: true, message: "Shop created successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateShopBySuperAdmin = async (req, res) => {
  const { error, value } = shopUpdateValidtaion.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { shopName, email, countryName, currencyCode } = value;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Shop ID is missing" });
    }

    const shopExist = await shopModel.findById(id);

    if (!shopExist) {
      return res.status(400).json({ success: false, message: "Shop not found" });
    }

    const updatedShop = await shopModel.findByIdAndUpdate(id,{
        shopName,
        email,
        countryName,
        currencyCode,
      },
      { new: true }
    );

    const { password: pass, ...shopData } = updatedShop._doc;

    res.status(200).json({ ss: true, message: "shop updated successfully", data: shopData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateShopPasswordBySuperAdmin = async (req, res) => {
  const { error, value } = shopPasswordValidation.validate(req.body);

  // Data error
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { id } = req.params;
    const { password } = value;

    if (!id) {
      return res.status(400).json({ success: false, message: "Id is missing" });
    }

    // Check user exist
    const shopExist = await shopModel.findById(id);

    if (!shopExist) {
      return res.status(400).json({ success: true, message: "User not found" });
    }

    // Hashing the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update password
    const shopPasswordUpdate = await shopModel.findByIdAndUpdate(id,{ 
        password: hashedPassword },
      { new: true }
    );

    const { password: pass, ...shopData } = shopPasswordUpdate._doc;

    res.status(200).json({success: true,message: "Shop password updated successfully", data: shopData,});
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const deleteShop = async (req,res) => {
    try{
       const {id} = req.shop;

       if(!id){
        return res.status(400).json({success:false,message:"Shop ID is missing"});
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

export const getShops = async (req, res) => {
  try {
    const shops = await shopModel.find({}).select("-password");
    res.status(200).json({success:true,message:"Data fetched successfully",data:shops});
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error"});
  }
};
