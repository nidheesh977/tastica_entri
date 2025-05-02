import AdminStaffModel from "../model/adminAndStaffModel.js";
import { comparePassword } from "../utils/comparePassword.js";
import { LoginValidation,userSignupValidation } from "../utils/joiValidation.js";
import bcryptjs from 'bcryptjs';
import { generateToken } from "../utils/generateToken.js";
 
 


export const loginAdmin = async (req,res) => {
    try{
      const {error,value} = LoginValidation.validate(req.body);

      if(error){
        return res.status(400).json({ message: error.details[0].message });
      }

      const {phonenumber,password} = value;
      // const tokenExist = req.cookies.adminToken;

      const adminExist = await AdminStaffModel.findOne({phonenumber:phonenumber});
      
      if(!adminExist){
        return res.status(400).json({success:false,message:"User not found"})
      }

        const isPasswordCorrect = comparePassword(password,adminExist.password);

        if(!isPasswordCorrect){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        } 

        //  await AdminStaffModel.findOneAndUpdate({phonenumber:phonenumber},{isLoggedIn:true},{new:true});

        // if(tokenExist){
        //     return res.status(400).json({success:false,message:"User already logged in"})
        // }

        if(adminExist.role !== "admin"){
            return res.status(400).json({success:false,message:"You are not an admin"})
        }
        
      // generate token
        const adminToken = generateToken({id:adminExist._id,role:adminExist.role});

        const {password:pass,...adminData} = adminExist._doc;

        res.cookie("adminToken",adminToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:"none",
            maxAge:24 * 60 * 60 * 1000}).status(200).json({success:true, message:"admin Login Successfully",data:adminData})

    }catch(error){
         res.status(500).json({success:false,message:"Internal Server Error"})
    }
}


// CREATE NEW EMPLOYEE

export const CreateEmployee = async (req,res) => {
  try {
    const {error,value} = userSignupValidation.validate(req.body);

      if (error){
          return res.status(400).json({ message: error.details[0].message });
      }
  
      const {username,phonenumber,email,password} = value;

      const userAccountExists = await AdminStaffModel.findOne({email:email})

     if(userAccountExists){
      return res.status(400).json({success:false,message:"User already exists"})
     }

      const userPhoneNumberExists = await AdminStaffModel.findOne({phonenumber:phonenumber})
      
      if(userPhoneNumberExists){
          return res.status(400).json({success:false,message:"Phone number already exists"})
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const usernameLowerCase = username.toLowerCase();

      const newUser = new AdminStaffModel({
          username:usernameLowerCase, 
          phonenumber,
          email,
          password:hashedPassword,

      });

      await newUser.save();
      res.status(201).json({success:true,message:"User Created Successfully"});    

  } catch (err) {  
      return res.status(500).json({success:false,message:"Internal Server Error"})
  }
}



export const checkAdminLogin = async (req,res) => {
    try {
        const adminLogged = req.admin;

        if(!adminLogged){
            return res.status(401).json({success:false,message:"Unauthorized"});
        }else{
            res.status(200).json({success:true,message:"admin is logged in"});
        }
       
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}


export const logOutAdmin = async (req,res) => {
  try{
     res.clearCookie("adminToken")
    res.status(200).json({success:true,message:"admin logged out successfully"})
  }catch(error){
     return res.status(500).json({success:false,message:"internal server error"})
  }
}