import AdminStaffModel from "../../model/adminAndStaffModel.js";
import shopModel from "../../model/shopModel.js"
import { comparePassword } from "../../utils/comparePassword.js";
import { generateToken } from "../../utils/generateToken.js";
import { shopPasswordValidation, shopSignupValidtaion, shopUpdateValidtaion, userLoginValidation, userSignupValidation, userUpdateValidation} from "../../utils/joiValidation.js"
import bcryptjs from 'bcryptjs'


// super admin login

    export const superAdminlogin = async (req, res) => {
      try {
        const { error, value } = userLoginValidation.validate(req.body);
     
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
    
        const { phoneNumber, password } = value;
    
    
        const superAdminExist = await AdminStaffModel.findOne({phoneNumber:phoneNumber});
    
        if (!superAdminExist) {
          return res.status(400).json({ success: false, message: "User not found" });
        }
    
        const isPasswordCorrect = await comparePassword(password,superAdminExist.password);
    
        if (!isPasswordCorrect) {
          return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    
      
    
        if (superAdminExist.role !== "super-admin") {
          return res.status(400).json({ success: false, message: "You are not an admin" });
        }
     
        // generate token
        const superAdminToken = generateToken({id: superAdminExist._id,role: superAdminExist.role,email:superAdminExist.email});
    
        const { password: pass, ...superAdminData } = superAdminExist._doc;
    
        res.cookie("superAdminToken", superAdminToken, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.SAMESITE,
            path:'/',
            maxAge: 24 * 60 * 60 * 1000,
          }).status(200).json({success: true, message: "admin Login Successfully", data: superAdminData});
      } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    };


    
    export const UpdateSuperAdmin = async (req, res) => {
      try {
        const { error, value } = userUpdateValidation.validate(req.body);
    
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
    
        const { userName, phoneNumber, email} = value;
    
        const { id } = req.params;
    
        if (!id) {
          return res.status(400).json({ success: false, message: "Id is missing" });
        }
    
        const ExistSuperAdmin = await AdminStaffModel.findById(id);
    
        if (!ExistSuperAdmin) {
          return res.status(400).json({ success: true, message: "super admin not found" });
        }

          
        const userNameLowerCase = userName.toLowerCase();
    
        const superAdminUpdated = await AdminStaffModel.findByIdAndUpdate(id,{
            userName: userNameLowerCase,
            phoneNumber,
            email,
          },
          { new: true }
        );
    
        const { password: pass, ...superAdminData } = superAdminUpdated._doc;
    
        res.status(200).json({success: true,message: "User data updated successfully",data:superAdminData,});
      } catch(error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    };
    
    

    
    export const checkSuperAdminLogin = async (req,res) => {
        try {
            const userLogged = req.user;
    
            if(userLogged.role !== "super-admin"){
                return res.status(401).json({success:false,message:"Unauthorized"});
            }
            const superAdminExist = await  AdminStaffModel.findById(userLogged.id)
            
            const {password:pass,...SuperAdminData} = superAdminExist._doc;
    
            res.status(200).json({success:true,message:"staff is logged in",data:SuperAdminData});
            
           
        } catch (error) {
         return res.status(500).json({success:false,message:"Internal Server Error"})
        }
    }
    
    export const superAdminProfilePage = async (req,res) => {
           try{

            const superAdminId = req.user.id;

            if(!superAdminId){
              return res.status(400).json({success:false,message:"Super admin ID is not get"})
            }

          const getProfile = await AdminStaffModel.findById(superAdminId);

          const {password:pass,...superAdminData} = getProfile._doc;

          res.status(200).json({success:true,message:"Data fetched Successfully",data:superAdminData})

           }catch(error){
              return res.status(500).json({success:false,message:"Internal Server Error"})
           }
    }
    
    
    
    // Endpoint to log out a staff member by clearing the authentication token
    
    export const logOutSuperAdmin = async (req,res) => {
      try{
        res.clearCookie("superAdminToken")
        res.status(200).json({success:true,message:"Super admin logged out successfully"})
      }catch(error){
         return res.status(500).json({success:false,message:"internal server error"})
      }
    }
    


    


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
        })

        await newShop.save();

        res.status(201).json({success:true,message:"Shop created successfully"});
        
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const updateShopBySuperAdmin = async (req,res) => {

   const {error,value} = shopUpdateValidtaion.validate(req.body);

        if(error){
            return res.status(400).json({message:error.details[0].message});
        }
  
  try{

    const {shopName,email,countryName,currencyCode} = value;
    const {id} = req.params;

    if(!id){
      return res.status(400).json({success:false,message:"Shop ID is missing"})
    }
    
    const shopExist = await shopModel.findById(id);

     if(!shopExist){
      return res.status(400).json({success:false,message:"Shop not found"})
     }

     const updatedShop = await shopModel.findByIdAndUpdate(id,{
                           shopName,
                           email,
                           countryName,
                           currencyCode
                        },{new:true})

     const {password:pass,...shopData} = updatedShop._doc;

     res.status(200).json({success:true,message:"shop updated successfully",data:shopData})                   

  }catch(error){
     return res.status(500).json({success:false,message:"Internal server error"});
  }
}



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
   const shopPasswordUpdate =  await shopModel.findByIdAndUpdate(id,{password: hashedPassword,},{ new: true });


   const  {password:pass,...shopData} = shopPasswordUpdate._doc

    res.status(200).json({ success: true, message: "Shop password updated successfully",data:shopData});

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const getShops = async (req,res) => {
    try{
        const shops = await shopModel.find({}).select("-password")

    

        res.status(200).json({success:true,message:"Data fetched successfully",data:shops})
    }catch(error){
           return res.status(500).json({success:false,message:"Internal server error"});
    }
}



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

   

    if(!shopId){
        return res.status(400).json({success:false,message:"Shop ID is not get"})
    }

    if(!role){
    return res.status(400).json({success:false,message:"Role is not get"})
     }

    const userAccountExists = await AdminStaffModel.findOne({ email: email });

    if (userAccountExists) {
      return res.status(400).json({ success: false, message: "staff already exist"});
    }

    if (userAccountExists?.role === "admin"){
      return res.status(400).json({ success: false, message: "admin already exist"});
    }

    const userphoneNumberExists = await AdminStaffModel.findOne({phoneNumber: phoneNumber});

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

    const newUser = new AdminStaffModel({
      userName: userNameLowerCase,
      phoneNumber,
      email,
      password: hashedPassword,
      shopId,
      role,
      permissions:Permissions
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


