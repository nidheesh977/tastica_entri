import AdminStaffModel from "../../model/adminAndStaffModel.js";
import resetTokenModel from "../../model/resetTokenModel.js";
import { addPermissionValidation, resetPasswordValidation, resetSendEmailValidation, userPasswordValidation } from "../../utils/joiValidation.js";
import bcryptjs from 'bcryptjs'
import { nodeMailerTransporter } from "../../utils/nodeMailerTransporter.js";
import {v4 as uuidv4 } from "uuid"


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


// ------------------------------------------- Get single  staff ------------------------------------------------

export const getSingleStaff = async (req,res) => {

  try{
     const {id} = req.params;

     if(!id){
      return res.status(400).json({success:false,message:"Id is missing"});
     }

     const staff = await AdminStaffModel.findById(id);

     const {password:pass,...staffData} = staff._doc;

     res.status(200).json({success:true,message:"staff fetched successfully",data:staffData});
 
  }catch{
     res.status(500).json({ success:false, message: "Internal Server Error"});
  }
}


// --------------------------------------------send otp for reset password--------------------------------------------------
export const sendResetLink = async (req,res) => {
  try{

    // Validate body data
     const { error, value } = resetSendEmailValidation.validate(req.body);
     
     // Data error 
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
    
    const {email} = value;

    // Generate Token 
    const resetToken = uuidv4();

    // Check user exist
    const findUser = await AdminStaffModel.findOne({email:email})


    if(!findUser){
      return res.status(400).json({success:false,message:"User not found"})
    }


    
     // To set Token expire time 5m 
     const expireDate = new Date(Date.now() + 5 * 60 * 1000);

    // Create transporter for send email 
      const transporter = nodeMailerTransporter()

    // Delete existing Token of this user
      await resetTokenModel.deleteMany({userId:findUser._id})

    //  create a new Token
     const newOtp = new resetTokenModel({resetToken,expiresAt:expireDate,userId:findUser._id})
     await newOtp.save()

    const roleBasedResetLink =  findUser.role === "super-admin" ? process.env.SUPER_ADMIN_PASSWORD_RESET_LINK : process.env.ADMIN_PASSWORD_RESET_LINK

    const resetLink = `${roleBasedResetLink}/${resetToken}`

    const html = `<div style="font-family:Arial, san-serif;color:#333;line-height:1.6">
                  <h2 style="color:#007bff;">${findUser.role} Password Reset Request </h2>
                  <p>Hello ${findUser.userName} </p>
                  <p>You requested a password reset for your ${findUser.role} account</p>
                  <p style="text-align:center>

                    <a href="${resetLink}" >
                    Reset Password
                    </a>

                    <p> If the button doesn't work, copy this link : </p>
                    <p> <a href="${resetLink}">${resetLink}</a> </p>

                  </p>
                  <p>This link is valid for only 5 minutes.</p>
                  <p style="color:#777;font-size:12px;">
                 © ${new Date().getFullYear()} zensettle ${findUser.role} panel. All rights reserved.
                  </p>
            </div>`
     
    // send OTP to email
    await transporter.sendMail({
      from:process.env.NODE_GMAIL_SENDER,
      to:email,
      subject:"Password Reset Request",
      html:html
    })
    
   
    res.status(200).json({success:true,message:"Reset link send successfully"})
  }catch(error){
    console.log(error)
    return res.status(500).json({success:false,message:"Internal server error"})
  }
}




// ------------------------------------------------- Reset password -----------------------------------------------

export const resetPassword = async (req, res) => {

    // Validate body data
    const { error, value } = resetPasswordValidation.validate(req.body);

   // Data error 
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

  try {

    const { password} = value;
    const {token} = req.params;

    const resetToken = await resetTokenModel.findOne({resetToken:token})

    

    if(!resetToken || resetToken.expiresAt < new Date()){
      await resetTokenModel.deleteMany({resetToken:token})
      return res.status(400).json({success:false,message:"Invalid or expired reset link"})
    }


    const user = await AdminStaffModel.findOne({_id:resetToken.userId})


    if(!user){
      return res.status(400).json({success:false,message:"User not found"})
    }

    
    user.password = await bcryptjs.hash(password,10)

    await user.save()

    await resetTokenModel.deleteMany({userId:user._id})
  
    res.status(200).json({ success: true, message: "User password updated successfully"});

  } catch (error) {
  
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const addPermissionToStaff = async (req,res) => {

    const { error, value } = addPermissionValidation.validate(req.body);

     if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

  try{

 
  const {permission} = value;
  const {id} = req.params;
 

  if(!id){
     return res.status(400).json({success:false,message:"ID is missing"})
  }

   const addPermissions = await AdminStaffModel.findByIdAndUpdate(id,{$addToSet:{permissions:permission}},{new:true})

  res.status(200).json({success:true,message:"permissions added successfully",data:addPermissions})

  }catch(error){
    return res.status(500).json({ success: false, message: "internal server error"});
  }
}


export const removePermissionFromStaff = async (req,res) => {

    const { error, value } = addPermissionValidation.validate(req.body);

     if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

  try{

 
  const {permission} = value;
  const {id} = req.params;
 

  if(!id){
     return res.status(400).json({success:false,message:"ID is missing"})
  }

   const addPermissions = await AdminStaffModel.findByIdAndUpdate(id,{$pull:{permissions:permission}},{new:true})

  res.status(200).json({success:true,message:"permission remove successfully",data:addPermissions})

  }catch(error){
    return res.status(500).json({ success: false, message: "internal server error"});
  }
}