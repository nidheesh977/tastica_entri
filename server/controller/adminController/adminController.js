import AdminStaffModel from "../../model/adminAndStaffModel.js";
import { comparePassword } from "../../utils/comparePassword.js";
import { adminAndSuperAdminLoginValidation, userPasswordValidation, userSignupValidation, userUpdateValidation, } from "../../utils/joiValidation.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.js";
import { generatedStaffId } from "../../utils/generateId.js";



export const loginAdmin = async (req, res) => {
  try {
    // validate admin login data
    const { error, value } = adminAndSuperAdminLoginValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Get user credentials
    const { phoneNumber, password } = value;

    // Extract shop ID from request
    const { id } = req.shop;


    // Check if admin exist
    const adminExist = await AdminStaffModel.findOne({ shopId: id, phoneNumber: phoneNumber });

    if (!adminExist) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check password match
    const isPasswordCorrect = await comparePassword(password, adminExist.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }


    // Check if user is a admin
    if (adminExist.role !== "admin") {
      return res.status(400).json({ success: false, message: "You are not an admin" });
    }

    let expireTime = "1d"

    // Generate token
    const adminToken = generateToken({ id: adminExist._id, role: adminExist.role, email: adminExist.email, permissions: adminExist.permissions }, expireTime);

    // Remove password before sending user data
    const { password: pass, ...adminData } = adminExist._doc;


    // Store token in cookie
    res.cookie("adminToken", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.SAMESITE,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    }).status(200).json({ success: true, message: "admin Login Successfully", data: adminData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// CREATE NEW EMPLOYEE
export const CreateEmployee = async (req, res) => {
  try {
    // validate user data
    const { error, value } = userSignupValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //  Get user data
    const { userName, phoneNumber, email, password } = value;

    // Extract shop ID and shop name from request
    const { id, shopName } = req.shop;

    // Check if user exist
    const userAccountExists = await AdminStaffModel.findOne({ shopId: id, email: email });

    if (userAccountExists) {
      return res.status(400).json({ success: false, message: "staff already exists" });
    }

    // Check if user phone number exist
    const userphoneNumberExists = await AdminStaffModel.findOne({ shopId: id, phoneNumber: phoneNumber });

    if (userphoneNumberExists) {
      return res.status(400).json({ success: false, message: "Phone number already exists" });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // User name to lower case
    const userNameLowerCase = capitalizeFirstLetter(userName);

    const sliceName = shopName.slice(0, 3).toUpperCase()

    const staffId = await generatedStaffId(sliceName, id)

    // Create new user 
    const newUser = new AdminStaffModel({
      userName: userNameLowerCase,
      phoneNumber,
      email,
      password: hashedPassword,
      shopId: id,
      permissions: ["product_read", "category_read", "customer_read"],
      staffId: staffId

    });

    await newUser.save();
    res.status(201).json({ success: true, message: "staff created successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const checkAdminLogin = async (req, res) => {
  try {

    // Get user data from request
    const userLogged = req.user;

    // Deny access if not a admin
    if (userLogged.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    // Get user data
    const adminExist = await AdminStaffModel.findById(userLogged.id);

    // Remove password before sending user data
    const { password: pass, ...adminData } = adminExist._doc;

    res.status(200).json({ success: true, message: "admin logged successfully", data: adminData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get staffs fetchData for admin panel

export const getStaffs = async (req, res) => {
  try {
    // Get shop ID from request
    const shopId = req.shop.id;

    if (!shopId) {
      return res.status(400).json({ success: false, message: "Shop ID is missing" });
    }

    // Fetch user data for shop admin
    const fetchData = await AdminStaffModel.find({ shopId: shopId, role: { $in: ["admin", "staff"] } }).select("-password").sort({ role: 1 });

    res.status(200).json({ success: true, message: "Data fetch successfully", data: fetchData });
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
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (userFound.role === "admin") {
      return res.status(403).json({ success: false, message: "Deleting an admin account is not allowed" });
    }

    await AdminStaffModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const UpdateStaff = async (req, res) => {
  try {
    const { error, value } = userUpdateValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { userName, phoneNumber, email } = value;

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Id is missing" });
    }

    const userExist = await AdminStaffModel.findById(id);

    if (!userExist) {
      return res.status(404).json({ success: true, message: "User not found" });
    }

    const userNameLowerCase = capitalizeFirstLetter(userName);

    const updatedStaff = await AdminStaffModel.findByIdAndUpdate(id, {
      userName: userNameLowerCase,
      phoneNumber,
      email,
    },
      { new: true }
    );

    const { password: pass, ...updatedStaffData } = updatedStaff._doc;

    res.status(200).json({ success: true, message: "User data updated successfully", data: updatedStaffData, });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const logOutAdmin = async (req, res) => {
  try {
    res.clearCookie("adminToken");
    res.status(200).json({ success: true, message: "admin logged out successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: "internal server error" });
  }
};


