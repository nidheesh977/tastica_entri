import AdminStaffModel from "../../../model/adminAndStaffModel.js";
import { comparePassword } from "../../../utils/comparePassword.js";
import { generateToken } from "../../../utils/generateToken.js";
import { adminAndSuperAdminLoginValidation } from "../../../utils/joiValidation.js";

// super admin login

export const superAdminlogin = async (req, res) => {
  try {
    const { error, value } = adminAndSuperAdminLoginValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { phoneNumber, password } = value;

    const superAdminExist = await AdminStaffModel.findOne({
      phoneNumber: phoneNumber,
    });

    if (!superAdminExist) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await comparePassword(
      password,
      superAdminExist.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    if (superAdminExist.role !== "super-admin") {
      return res.status(400).json({ success: false, message: "You are not an admin" });
    }

    let expireTime = "1d"

    // generate token
    const superAdminToken = generateToken({
      id: superAdminExist._id,
      role: superAdminExist.role,
      email: superAdminExist.email,
    }, expireTime);

    const { password: pass, ...superAdminData } = superAdminExist._doc;

    res.cookie("superAdminToken", superAdminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.SAMESITE,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    }).status(200).json({ success: true, message: "admin Login Successfully", data: superAdminData, });

  } catch (error) {

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// check super admin is logged
export const checkSuperAdminLogin = async (req, res) => {
  try {
    const userLogged = req.user;

    if (userLogged.role !== "super-admin") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const superAdminExist = await AdminStaffModel.findById(userLogged.id);

    const { password: pass, ...SuperAdminData } = superAdminExist._doc;

    res.status(200).json({ success: true, message: "staff is logged in", data: SuperAdminData });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// super admin profile page
export const superAdminProfilePage = async (req, res) => {
  try {
    const superAdminId = req.user.id;

    if (!superAdminId) {
      return res.status(400).json({ success: false, message: "Super admin ID is not get" });
    }

    const getProfile = await AdminStaffModel.findById(superAdminId);

    const { password: pass, ...superAdminData } = getProfile._doc;

    res.status(200).json({ success: true, message: "Data fetched Successfully", data: superAdminData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// update super admin account
export const UpdateSuperAdmin = async (req, res) => {
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

    const ExistSuperAdmin = await AdminStaffModel.findById(id);

    if (!ExistSuperAdmin) {
      return res.status(404).json({ success: true, message: "super admin not found" });
    }

    const userNameLowerCase = userName.toLowerCase();

    const superAdminUpdated = await AdminStaffModel.findByIdAndUpdate(id,
      {
        userName: userNameLowerCase,
        phoneNumber,
        email,
      }, { new: true });

    const { password: pass, ...superAdminData } = superAdminUpdated._doc;

    res.status(200).json({ success: true, message: "User data updated successfully", data: superAdminData });
  } catch (error) {

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// super admin log out
export const logOutSuperAdmin = async (req, res) => {
  try {
    res.clearCookie("superAdminToken");
    res.status(200).json({ success: true, message: "Super admin logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "internal server error" });
  }
};
