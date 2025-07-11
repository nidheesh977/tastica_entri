import AdminStaffModel from "../../../model/adminAndStaffModel.js";
import shopModel from "../../../model/shopModel.js"
import { generateStaffId } from "../../../utils/generateStaffId.js";
import {  userSignupValidation, userUpdateValidation} from "../../../utils/joiValidation.js"
import bcryptjs from 'bcryptjs'


export const CreateEmployeeBySuperAdmin = async (req, res) => {
  try {

    const body = req.body

    const bodyObject = {
        userName:body.userName,
        phoneNumber:body.phoneNumber,
        email:body.email,
        password:body.password
    }

    const { error, value } = userSignupValidation.validate(bodyObject);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { userName, phoneNumber, email, password } = value;
    const {shopId,role} = body;

   console.log(role)

    if(!shopId){
        return res.status(400).json({success:false,message:"Shop ID is not get"})
    }

    if(!role){
    return res.status(400).json({success:false,message:"Role is not get"})
     }

     const findShop = await shopModel.findById(shopId);

     if(!findShop){
        return res.status(400).json({success:false,message:"Shop not found"})
     }

     const isAdminExist = await AdminStaffModel.findOne({shopId:shopId,role:role});


     if(isAdminExist?.role === "admin"){
      return res.status(400).json({success:false,message:"Admin already exist"})
     }


    const userAccountExists = await AdminStaffModel.findOne({shopId:shopId, email:email });

    if (userAccountExists) {
      return res.status(400).json({ success: false, message: "Staff email already exist"});
    }


    const userphoneNumberExists = await AdminStaffModel.findOne({shopId:shopId,phoneNumber:phoneNumber});

    if (userphoneNumberExists) {
      return res.status(400).json({ success: false, message: "Phone number already exist"});
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userNameLowerCase = userName.toLowerCase();

    let Permissions;

    if(role === "admin"){
      Permissions = ["product_read","product_update","product_delete","product_create","category_read","category_update","category_delete","category_create","customer_read","customer_update","customer_delete","customer_create"]
    }else{
       Permissions = ["product_read","category_read","customer_read"]
    }

      let shopName = findShop.shopName
      let sliceName = shopName.slice(0,3) || "STF"

    
      let staffId;
               
                do {
                 staffId = generateStaffId(sliceName.toUpperCase())
                   } while (await AdminStaffModel.findOne({staffId:staffId}));
    

    const newUser = new AdminStaffModel({
      userName: userNameLowerCase,
      phoneNumber,
      email,
      password: hashedPassword,
      shopId,
      role,
      permissions:Permissions,
      staffId
    });

    const {password:pass,...userDate} = newUser._doc
    
     await newUser.save();
    res.status(201).json({ success: true, message: "staff created successfully" ,data:userDate});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const getStaffsBySuperAdmin = async (req,res) => {
    try{
     const {shop} = req.query;

     const shops = await AdminStaffModel.find({shopId:shop,role:{$in:["admin","staff"]}}).select("-password").sort({role:1})

    
    res.status(200).json({ success: true, message: "staff data fetched successfully",data:shops });
    }catch(error){
      return res.status(500).json({ success: false, message: "Internal Server Error" }); 
    }
}
 

export const deleteStaffBySuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Id is missing" });
    }

    const userFound = await AdminStaffModel.findById(id);

    if (!userFound) {
      return res.status(403).json({ success: false, message: "User not found" });
    }

    if (userFound.role === "super-admin") {
      return res.status(403).json({success: false,message: "Deleting an admin account is not allowed"});
    }

    await AdminStaffModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Staff deleted successfully"});
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error"});
  }
};


export const UpdateStaffBySuperAdmin = async (req, res) => {
  try {

    const body = req.body;

    const bodyObject = {
        userName:body.userName,
        phoneNumber:body.phoneNumber,
        email:body.email,
    }
    
    const { error, value } = userUpdateValidation.validate(bodyObject);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { userName, phoneNumber, email} = value;
    const {shopId,role} = body;
    const { id } = req.params;

  
    if (!id) {
      return res.status(400).json({ success: false, message: "Id is missing" });
    }

    const userExist = await AdminStaffModel.findById(id);

    if (!userExist) {
      return res.status(400).json({ success: true, message: "User not found" });
    }


    const userNameLowerCase = userName.toLowerCase();

    const updatedStaff = await AdminStaffModel.findByIdAndUpdate(id,{
        userName: userNameLowerCase,
        phoneNumber,
        email,
        shopId,
        role
      },
      { new: true }
    );

    const { password: pass, ...updatedStaffData } = updatedStaff._doc;

    res.status(200).json({success: true,message: "User data updated successfully",data:updatedStaffData,});
  } catch(error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


