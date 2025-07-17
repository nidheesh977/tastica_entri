import shopModel from '../../model/shopModel.js';
import { shopLoginValidation, shopUpdateValidtaion } from '../../utils/joiValidation.js';
import { generateToken } from '../../utils/generateToken.js';
import { comparePassword } from '../../utils/comparePassword.js';





// Endpoint to log in a shop 
export const shopLogin = async (req, res) => {
    try {

        // req.body data checking in Joi validation
        const { error, value } = shopLoginValidation.validate(req.body);

        // validate data error pass to frontend
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // validate data from joi validation 
        const { email, password } = value;

        // check if shop exist 
        const shopExist = await shopModel.findOne({ email: email });

        if (!shopExist) {
            return res.status(400).json({ success: false, message: "Shop not found" });
        }

        if (shopExist.isActive === false) {
            return res.status(400).json({ success: false, message: "Shop is inactive . please contact admin" })
        }

        // check if shop Password is Correct 

        const isPasswordCorrect = await comparePassword(password, shopExist.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        // Hide password before pass to frontend
        const { password: pass, ...shopData } = shopExist._doc

        let expireTime = "1d"

        // Generate token share datas likes shop id , country name , currency code 
        const shopToken = generateToken({ id: shopExist._id, role: "shop", shopName: shopExist.shopName, countryName: shopExist.countryName, currencyCode: shopExist.currencyCode }, expireTime);

        // Store generate token above
        res.cookie("shopToken", shopToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.SAMESITE, maxAge: 24 * 60 * 60 * 1000
        })
            .status(200).json({ success: true, message: "Login Successfully", data: shopData })

    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error" });
    }
}




// Endpoint to check if a shop is logged in
export const checkShopLogin = async (req, res) => {
    try {
        const shopLogged = req.shop;

        if (shopLogged.role !== "shop") {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const shopExist = await shopModel.findById(shopLogged.id)

        const { password: pass, ...shopData } = shopExist._doc;

        res.status(200).json({ success: true, message: "Shop is logged in", data: shopData });


    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Endpoint to log out a shop 
export const logOutShop = async (req, res) => {
    try {

        res.clearCookie("shopToken")
        res.clearCookie("adminToken")
        res.clearCookie("staffToken")

        res.status(200).json({ success: true, message: "shop Logout successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}
