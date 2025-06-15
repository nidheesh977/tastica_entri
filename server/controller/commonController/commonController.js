import AdminStaffModel from "../../model/adminAndStaffModel.js";
import otpTokenModel from "../../model/otpTokenModel.js";
import { otpToken } from "../../utils/generateOtpToken.js";
import { otpSendEmailAndPasswordValidation, otpSendEmailValidation, otpVerification, userPasswordValidation } from "../../utils/joiValidation.js";
import bcryptjs from 'bcryptjs'
import { nodeMailerTransporter } from "../../utils/nodeMailerTransporter.js";



export const updateStaffPassword = async (req, res) => {
  try {
    // Validate body data
    const { error, value } = userPasswordValidation.validate(req.body);

    // Data error 
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

   
    const { id } = req.params;
    const { password } = value;

    if (!id) {
      return res.status(400).json({ success: false, message: "Id is missing" });
    }

    // Check user exist
    const userExist = await AdminStaffModel.findById(id);

    if (!userExist) {
      return res.status(400).json({ success: true, message: "User not found" });
    }

    // Hashing the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update password
    await AdminStaffModel.findByIdAndUpdate(id,{password: hashedPassword,},{ new: true });

    res.status(200).json({ success: true, message: "User password updated successfully"});

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// --------------------------------------------send otp for reset password--------------------------------------------------
export const sendOtp = async (req,res) => {
  try{

    // Validate body data
     const { error, value } = otpSendEmailValidation.validate(req.body);
     
     // Data error 
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
    
    const {email} = value;

    // Generate otp 
    const otp = otpToken();

    // Check user exist
    const findUser = await AdminStaffModel.findOne({email:email})


    if(!findUser){
      return res.status(400).json({success:false,message:"User not found"})
    }

    // Hashing OTP
    const hashOtp = await bcryptjs.hash(otp,10);
    
    // To set OTP expire time 5m 
    const expireDate = new Date(Date.now() + 5 * 60 * 1000);

    // Create transporter for send email 
    const transporter = nodeMailerTransporter()

    // Delete existing OTP of this user
     await otpTokenModel.deleteMany({email})

    // create a new OTP
    const newOtp = new otpTokenModel({otp:hashOtp,expiresAt:expireDate,email:email})
    await newOtp.save()

    // send OTP to email
    await transporter.sendMail({
      from:process.env.NODE_GMAIL_SENDER,
      to:email,
      subject:"Your OTP for Password Reset",
      html:`<div style="font-family:Arial, san-serif;padding:20px color:#333;">
                  <h2 style="color:#007bff;">${findUser.role} Password Reset Request </h2>
                  <p>Hello ${findUser.userName} </p>
                  <p>You requested a password reset for Your admin account</p>
                  <p>Your One-Time Password (OTP) is:</p>
                  <h3 style="background-color">
                  ${otp}
                  </h3>
                  <p>This OTP is validfor only 5 minutes. Do not share this code with anyone</p>
                  <p style="color:#777;font-size:12px;">
                 © ${new Date().getFullYear()} zensettle ${findUser.role} panel. All rights reserved.
                  </p>
            </div>`
    })
    
   
    res.status(200).json({success:true,message:"Otp send successfully",data:email})
  }catch(error){
    return res.status(500).json({success:false,message:"Internal server error"})
  }
}

// ----------------------------------------------------verify OTP-------------------------------------------------

export const verifyOtp = async (req,res) => {
  try{

    // Validate body data
     const { error, value } = otpVerification.validate(req.body);
     
     // Data error 
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
   
      const {otp,email} = value;

      if(!otp){
        return res.status(400).json({success:false,message:"otp not empty"})
      }

      // Check OTP exist
      const findRecord = await otpTokenModel.findOne({email:email})

      if(!findRecord){
        return res.status(400).json({success:false,message:"Otp expired or not found"})
      }

      // Check OTP expire time
      if(findRecord.expiresAt < new Date()){
        await otpTokenModel.deleteMany({email})
          return res.status(400).json({success:false,message:"OTP has expired"})
      }

      // Compare hashed OTP
      const isMatch = await bcryptjs.compare(otp,findRecord.otp)

      if(!isMatch){
        return res.status(400).json({success:false,message:"Invalid OTP"})
      }

      // Compare OTP true delete otp from DB
      await otpTokenModel.deleteMany({email})

      res.status(200).json({success:true,message:"OTP verified",data:email})

  }catch(error){
     return res.status(500).json({success:false,message:"Internal server error"})
  }
}

// ------------------------------------------------- Reset password -----------------------------------------------

export const resetPassword = async (req, res) => {
  try {

    // Validate body data
    const { error, value } = otpSendEmailAndPasswordValidation.validate(req.body);

   // Data error 
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
 
 
    const { password,email } = value;

    // Check user Exist
    const userExist = await AdminStaffModel.findOne({email:email});

    if (!userExist) {
      return res.status(400).json({ success: true, message: "User not found" });
    }

    // Hashing the password
    userExist.password = await bcryptjs.hash(password, 10);

    // Save hashed password
    await userExist.save()
    res.status(200).json({ success: true, message: "User password updated successfully"});

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};