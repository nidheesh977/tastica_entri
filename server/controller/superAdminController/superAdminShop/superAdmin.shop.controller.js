import AdminStaffModel from "../../../model/adminAndStaffModel.js";
import customerModel from "../../../model/customerModel.js";
import shopModel from "../../../model/shopModel.js";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter.js";
import { generateCustomerId } from "../../../utils/generateId.js";
import { shopPasswordValidation, shopSignupValidtaion, shopUpdateValidtaion, } from "../../../utils/joiValidation.js";
import bcryptjs from "bcryptjs";

export const createShop = async (req, res) => {
  try {
    const { error, value } = shopSignupValidtaion.validate(req.body);


    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { shopName, email, password, countryName, currencyCode, phoneNumber } = value;

    const shopExist = await shopModel.findOne({ email: email });

    if (shopExist) {
      return res.status(400).json({ message: "Shop already exists" });
    }

    const shopNameLowercase = capitalizeFirstLetter(shopName);

    const currencyCodeUpperCase = currencyCode.trim().toUpperCase()

    const hasedPassword = await bcryptjs.hash(password, 10);

    const newShop = new shopModel({
      shopName: shopNameLowercase,
      email,
      password: hasedPassword,
      countryName,
      currencyCode: currencyCodeUpperCase,
      role: "shop",
      phoneNumber
    });

    await newShop.save();

    let customerId = await generateCustomerId(newShop._id)


    const lowerCaseCustomerName = capitalizeFirstLetter(newShop.shopName);


    const newCustomer = new customerModel({
      customerId,
      customerName: lowerCaseCustomerName,
      phoneNumber: newShop.phoneNumber,
      shopId: newShop._id,
      role: "shop"
    })

    await newCustomer.save()


    res.status(201).json({ success: true, message: "Shop created successfully" });
  } catch (error) {

    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateShopBySuperAdmin = async (req, res) => {


  const { error, value } = shopUpdateValidtaion.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { shopName, email, countryName, currencyCode } = value;
    const { id } = req.params;



    if (!id) {
      return res.status(400).json({ success: false, message: "Shop ID is missing" });
    }

    const shopExist = await shopModel.findById(id);

    if (!shopExist) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    const shopNameLowercase = capitalizeFirstLetter(shopName);

    const updatedShop = await shopModel.findByIdAndUpdate(id, {
      shopName: shopNameLowercase,
      email,
      countryName,
      currencyCode,
    },
      { new: true }
    );

    const { password: pass, ...shopData } = updatedShop._doc;

    res.status(200).json({ success: true, message: "shop updated successfully", data: shopData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

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
      return res.status(404).json({ success: true, message: "User not found" });
    }

    // Hashing the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update password
    const shopPasswordUpdate = await shopModel.findByIdAndUpdate(id, {
      password: hashedPassword
    },
      { new: true }
    );

    const { password: pass, ...shopData } = shopPasswordUpdate._doc;

    res.status(200).json({ success: true, message: "Shop password updated successfully", data: shopData, });
  } catch (error) {

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const deleteShop = async (req, res) => {
  try {
    const { id } = req.shop;

    if (!id) {
      return res.status(400).json({ success: false, message: "Shop ID is missing" });
    }

    await AdminStaffModel.deleteMany({ shopId: id });
    await shopModel.findByIdAndDelete(id)

    res.clearCookie("shopToken")
    res.clearCookie("adminToken")
    res.clearCookie("staffToken")

    res.status(200).json({ success: true, message: "shop delete successfully" })
  } catch (error) {

    return res.status(500).json({ success: false, message: "internal server error" });
  }
}

export const getShops = async (req, res) => {
  try {
    const shops = await shopModel.find({}).select("-password");
    res.status(200).json({ success: true, message: "Data fetched successfully", data: shops });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const toggleActiveOrInactive = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Shop ID not get" })
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({ success: false, message: "isActive must be a boolean" })
    }

    const findShop = await shopModel.findById(id);

    if (!findShop) {
      return res.status(404).json({ success: false, message: "Shop not found" })
    }

    const shopActiveUpdate = await shopModel.findByIdAndUpdate(id, { isActive: isActive }, { new: true });

    const { password: pass, ...shopData } = shopActiveUpdate._doc;

    const status = isActive ? "activated" : "deactiveted"

    res.status(200).json({ success: true, message: `shop is ${status}`, data: shopData })


  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" })
  }
}