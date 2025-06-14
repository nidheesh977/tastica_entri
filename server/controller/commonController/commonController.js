import AdminStaffModel from "../../model/adminAndStaffModel.js";
import { userPasswordValidation } from "../../utils/joiValidation.js";
import bcryptjs from 'bcryptjs'
import nodeMailer from 'nodemailer'

export const updateStaffPassword = async (req, res) => {
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

