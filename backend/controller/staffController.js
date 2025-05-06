import AdminStaffModel from '../model/adminAndStaffModel.js';
import {LoginValidation} from '../utils/joiValidation.js';
import { comparePassword } from '../utils/comparePassword.js';
import { generateToken } from '../utils/generateToken.js';

// create newUser

// login staff

export const loginStaff = async (req,res) => {
    try{
      const {error,value} = LoginValidation.validate(req.body);

      // const tokenExist = req.cookies.token;

      if(error){
        return res.status(400).json({ message: error.details[0].message });
      }

      const {phonenumber,password} = value;

      const userExist = await AdminStaffModel.findOne({phonenumber:phonenumber});

      if(!userExist){
        return res.status(400).json({success:false,message:"User not found"})
      }

    // compare password
        const isPasswordCorrect = await comparePassword(password,userExist.password);

        if(!isPasswordCorrect){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }

        // if(tokenExist){
        //     return res.status(400).json({success:false,message:"You are already logged in"})
        // }
      
        // // to update staff logged in Status
        //  await AdminStaffModel.findOneAndUpdate({phonenumber:phonenumber},{isLoggedIn:true},{new:true});
        
        if(userExist.role !== "staff"){
            return res.status(400).json({success:false,message:"You are not a staff"})
        }
               
        const token = generateToken({id:userExist._id,role:userExist.role});

        const {password:pass,...userData} = userExist._doc;

        res.cookie("staffToken",token,{httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:"none",
            maxAge:24 * 60 * 60 * 1000}).status(200).json({success:true,message:"Login Successfully",data:userData})

    }catch(error){
         res.status(500).json({success:false,message:"Internal Server Error"})
    }
}


export const checkStaffLogin = async (req,res) => {
    try {
        const userLogged = req.user;

        if(userLogged.role !== "staff"){
            return res.status(401).json({success:false,message:"Unauthorized"});
        }
        const userExist = await  AdminStaffModel.findById(userLogged.id)
        
        const {password:pass,...userData} = userExist._doc;

        res.status(200).json({success:true,message:"staff is logged in",data:userData});
        
       
    } catch (error) {
      res.status(500).json({success:false,message:"Internal Server Error"})
    }
}




// Endpoint to log out a staff member by clearing the authentication token

export const logOutStaff = async (req,res) => {
  try{
    res.clearCookie("staffToken")
    res.status(200).json({success:true,message:"staff logged out successfully"})
  }catch(error){
     return res.status(500).json({success:false,message:"internal server error"})
  }
}