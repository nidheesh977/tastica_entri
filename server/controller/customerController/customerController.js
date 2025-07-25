import customerModel from "../../model/customerModel.js";
import walletModels from "../../model/walletModel.js";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.js";
import { generateId } from "../../utils/generateId.js";
import { customerUpdateValidation, customerValidation } from "../../utils/joiValidation.js";
import bwipjs from "bwip-js"

const { walletModel } = walletModels;

export const createCustomer = async (req, res) => {

   const { error, value } = customerValidation.validate(req.body);

   if (error) {
      return res.status(400).json({ message: error.details[0].message });
   }

   try {

      const { customerName, phoneNumber } = value;
      const shopId = req.shop.id;

      const customerExist = await customerModel.findOne({ shopId: shopId, phoneNumber: phoneNumber });

      if (customerExist) {
         return res.status(400).json({ success: false, message: "Customer already exist" })
      }


      //  generating unique ID for customers 
      let customerId;

      do {
         customerId = generateId("CUS")
      } while (await customerModel.findOne({ customerId: customerId }));

      const lowerCaseCustomerName = capitalizeFirstLetter(customerName)

      const newCustomer = new customerModel({
         customerId,
         customerName: lowerCaseCustomerName,
         phoneNumber,
         shopId
      })

      await newCustomer.save()

      const newWallet = walletModel({
         customerId: newCustomer._id,
         shopId
      })

      await newWallet.save()
      res.status(201).json({ success: true, message: "customer created successfully" });
   } catch (error) {

      return res.status(500).json({ success: false, message: "Internal Server Error" })
   }
}

export const updateCustomer = async (req, res) => {
   try {
      const { error, value } = customerUpdateValidation.validate(req.body);

      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }

      const { id } = req.params;
      const { role } = req.user;
      const { customerName, phoneNumber, loyalityPoint } = value;

      const customerFound = await customerModel.findById(id);

      if (!customerFound) {
         return res.status(404).json({ success: false, message: "customer not found" });
      }

      const lowerCaseCustomerName = capitalizeFirstLetter(customerName)

      let customerUpdatedData = {}
      let customerWalletUpdatedData = {}

      if (role === "admin") {

         customerUpdatedData = { customerName: lowerCaseCustomerName, phoneNumber, loyalityPoint }
         customerWalletUpdatedData = { productLoyaltyPoint: loyalityPoint }

      } else {
         customerUpdatedData = { customerName: lowerCaseCustomerName, phoneNumber }
      };



      Object.keys(customerUpdatedData).forEach((key) => {
         if (customerUpdatedData[key] === undefined) delete customerUpdatedData[key]
      });

      Object.keys(customerWalletUpdatedData).forEach((key) => {
         if (customerWalletUpdatedData[key] === undefined) delete customerWalletUpdatedData[key]
      })


      await customerModel.findByIdAndUpdate(id, {
         $set: customerUpdatedData
      }, { new: true })

      await walletModel.findOneAndUpdate({ customerId: id }, {
         $set: customerWalletUpdatedData
      }, { new: true })

      res.status(200).json({ success: true, message: "customer details updated successfully" })

   } catch (error) {
      return res.status(500).json({ success: false, message: "Internal Server Error" })
   }
}

export const deleteCustomer = async (req, res) => {
   try {

      const { id } = req.params;

      const customerExist = await customerModel.findById(id);


      if (!customerExist) {
         return res.status(404).json({ success: false, message: "Customer not found" })
      }


      if ("shop" === customerExist?.role) {
         return res.status(400).json({ success: false, message: "Cannot delete" })
      }


      await customerModel.findByIdAndDelete(id);

      res.status(200).json({ success: true, message: "Customer delete successfully" })

   } catch (error) {
      return res.status(500).json({ success: false, message: "Internal Server Error" })
   }
}

export const getCustomer = async (req, res) => {
   try {

      const shopId = req.shop.id

      if (!shopId) {
         return res.status(400).json({ success: false, message: "Shop ID is missing" })
      }

      const fetchData = await customerModel.find({ shopId: shopId })

      res.status(200).json({ success: true, message: "Data fetch successfully", data: fetchData })

   } catch (error) {
      return res.status(500).json({ success: false, message: "Internal Server Error" })
   }
}


export const getSingleCustomer = async (req, res) => {
   try {
      const { id } = req.params;
      const shopId = req.shop.id;

      const getCustomer = await customerModel.findOne({ _id: id, shopId: shopId }).populate("invoices")

      res.status(200).json({ success: true, message: "Data fetched successfully", data: getCustomer });

   } catch (error) {
      return res.status(500).json({ success: false, message: "Internal Server Error" })
   }
}


export const generateBarcodeImage = async (req, res) => {
   try {
      const { customerId } = req.params;

      if (!customerId) {
         return res.status(400).json({ success: false, message: "Customer ID not get" })
      }

      const findCustomer = await customerModel.findById(customerId);

      if (!findCustomer) {
         return res.status(404).json({ success: false, message: "Customer not found" })
      }

      const png = await bwipjs.toBuffer({
         bcid: 'code128',
         text: findCustomer.customerId,
         scale: 4,
         height: 12,
         includetext: false,
         textalign: "center"
      })

      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(png)

   } catch (error) {
      return res.status(500).json({ success: false, message: "Internal Server Error" })
   }
}