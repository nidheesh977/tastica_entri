import AdminStaffModel from "../../model/adminAndStaffModel.js";
import { comparePassword } from "../../utils/comparePassword.js";
import { userLoginValidation, userPasswordValidation, userSignupValidation, userUpdateValidation,} from "../../utils/joiValidation.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";


export const loginAdmin = async (req, res) => {
  try {
    const { error, value } = userLoginValidation.validate(req.body);
 
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { phoneNumber, password } = value;
    const {id} = req.shop;

    const adminExist = await AdminStaffModel.findOne({shopId:id,phoneNumber:phoneNumber});

    if (!adminExist) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await comparePassword(password,adminExist.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

  

    if (adminExist.role !== "admin") {
      return res.status(400).json({ success: false, message: "You are not an admin" });
    }
 
    // generate token
    const adminToken = generateToken({id: adminExist._id,role: adminExist.role,});

    const { password: pass, ...adminData } = adminExist._doc;

    res.cookie("adminToken", adminToken, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.SAMESITE,
        path:'/',
        maxAge: 24 * 60 * 60 * 1000,
      }).status(200).json({success: true, message: "admin Login Successfully", data: adminData});
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// CREATE NEW EMPLOYEE

export const CreateEmployee = async (req, res) => {
  try {
    const { error, value } = userSignupValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { userName, phoneNumber, email, password } = value;
    const shopId = req.shop.id;

    const userAccountExists = await AdminStaffModel.findOne({ email: email });

    if (userAccountExists) {
      return res.status(400).json({ success: false, message: "staff already exists"});
    }

    const userphoneNumberExists = await AdminStaffModel.findOne({phoneNumber: phoneNumber});

    if (userphoneNumberExists) {
      return res.status(400).json({ success: false, message: "Phone number already exists"});
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userNameLowerCase = userName.toLowerCase();

    const newUser = new AdminStaffModel({
      userName: userNameLowerCase,
      phoneNumber,
      email,
      password: hashedPassword,
      shopId,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "staff created successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const checkAdminLogin = async (req, res) => {
  try {
    const userLogged = req.user;

    if (userLogged.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    const adminExist = await AdminStaffModel.findById(userLogged.id);

    const { password: pass, ...adminData } = adminExist._doc;

    res.status(200).json({success: true,message: "admin logged successfully",data:adminData});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get staffs fetchData for admin panel

export const getStaffs = async (req, res) => {
  try {
    const shopId = req.shop.id;

    if (!shopId) {
      return res.status(400).json({ success: false, message: "Shop ID is missing" });
    }

    const fetchData = await AdminStaffModel.find({ shopId: shopId }).select("-password");

    res.status(200).json({success: true, message: "Data fetch successfully",data:fetchData});
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// delete staff for admin panel

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Id is missing" });
    }

    const userFound = await AdminStaffModel.findById(id);

    if (!userFound) {
      return res.status(403).json({ success: false, message: "User not found" });
    }

    if (userFound.role === "admin") {
      return res.status(403).json({success: false,message: "Deleting an admin account is not allowed"});
    }

    await AdminStaffModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Staff deleted successfully"});
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error"});
  }
};

export const UpdateStaff = async (req, res) => {
  try {
    const { error, value } = userUpdateValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { userName, phoneNumber, email, password } = value;

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
      },
      { new: true }
    );

    const { password: pass, ...updatedStaffData } = updatedStaff._doc;

    res.status(200).json({success: true,message: "User data updated successfully",data:updatedStaffData,});
  } catch(error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};




export const updateUserPassword = async (req, res) => {
  try {
    const { error, value } = userPasswordValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params;
    const { password } = value;

    if (!id) {
      return res.status(400).json({ success: false, message: "Id is missing" });
    }

    const userExist = await AdminStaffModel.findById(id);

    if (!userExist) {
      return res.status(400).json({ success: true, message: "User not found" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await AdminStaffModel.findByIdAndUpdate(id,{password: hashedPassword,},{ new: true });

    res.status(200).json({ success: true, message: "User password updated successfully"});

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

 


export const logOutAdmin = async (req, res) => {
  try {
    res.clearCookie("adminToken");
    res.status(200).json({ success: true, message: "admin logged out successfully"});

  } catch (error) {
    return res.status(500).json({ success: false, message: "internal server error"});
  }
};
