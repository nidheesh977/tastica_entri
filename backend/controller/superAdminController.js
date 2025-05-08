import AdminStaffModel from "../model/adminAndStaffModel.js";
import shopModel from "../model/shopModel.js"
import { shopSignupValidtaion, userSignupValidation} from "../utils/joiValidation.js"
import bcryptjs from 'bcryptjs'


// This controller for test only 
export const CreateEmployee = async (req,res) => {
  try {
    const {error,value} = userSignupValidation.validate(req.body);

      if (error){
          return res.status(400).json({ message: error.details[0].message });
      }
  
      const {userName,phoneNumber,email,password} = value;

      const userAccountExists = await AdminStaffModel.findOne({email:email})

     if(userAccountExists){
      return res.status(400).json({success:false,message:"User already exists"})
     }

      const userphoneNumberExists = await AdminStaffModel.findOne({phoneNumber:phoneNumber})
      
      if(userphoneNumberExists){
          return res.status(400).json({success:false,message:"Phone number already exists"})
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const userNameLowerCase = userName.toLowerCase();

      const newUser = new AdminStaffModel({
          userName:userNameLowerCase, 
          phoneNumber,
          email,
          password:hashedPassword,

      });

      await newUser.save();
      res.status(201).json({success:true,message:"User Created Successfully",data:newUser});    

  } catch (err) {  
      return res.status(500).json({success:false,message:"Internal Server Error"})
  }
}



// This controller for test only
export const createShop = async (req,res) => {
    
    try {
        const {error,value} = shopSignupValidtaion.validate(req.body);

        if(error){
            return res.status(400).json({message:error.details[0].message});
        }

        const {shopname,email,password} = value;

        const shopExist = await shopModel.findOne({email:email});

        if(shopExist){
            return res.status(400).json({message:"Shop already exists"});
        }

        const hasedPassword = await bcryptjs.hash(password,10);

        const newShop = new shopModel({
            shopname,
            email,
            password:hasedPassword,
        })

        await newShop.save();

        res.status(201).json({success:true,message:"Shop created successfully"});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
