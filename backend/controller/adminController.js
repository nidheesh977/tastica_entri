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
        
      // generate token
        const adminToken = generateToken({id:adminExist._id,role:adminExist.role});

        const {password:pass,...adminData} = adminExist._doc;

        res.cookie("adminToken",adminToken,{httpOnly:true,secure:true,sameSite:"none",maxAge:24 * 60 * 60}).status(200).json({
            success:true,
            message:"admin Login Successfully",
            adminData
        })

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