import AdminStaffModel from '../model/adminAndStaffModel.js';
import {LoginValidation} from '../utils/joiValidation.js';
import { comparePassword } from '../utils/comparePassword.js';
import { generateToken } from '../utils/generateToken.js';

// create newUser

// login staff

export const loginUser = async (req,res) => {
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
        const isPasswordCorrect = comparePassword(password,userExist.password);

        if(!isPasswordCorrect){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }

        // if(tokenExist){
        //     return res.status(400).json({success:false,message:"You are already logged in"})
        // }
      
        // // to update staff logged in Status
        //  await AdminStaffModel.findOneAndUpdate({phonenumber:phonenumber},{isLoggedIn:true},{new:true});
        
               
        const token = generateToken({id:userExist._id,role:userExist.role});

        const {password:pass,...userData} = userExist._doc;

        res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none",maxAge:24 * 60 * 60}).status(200).json({
            success:true,
            message:"Login Successfully",
            userData
        })

    }catch(error){
         res.status(500).json({success:false,message:"Internal Server Error"})
    }
}