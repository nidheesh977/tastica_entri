import productModel from "../../model/productModel.js";
import loyaltyPointModel from "../../model/loyaltyPointModel.js";


export const createLoyaltyRate = async (req, res) => {
    try {
        const { id, currencyCode, countryName } = req.shop;
        const { loyaltyRate } = req.body

        const numToFixed = Number(parseFloat(loyaltyRate).toFixed(2));

        const existLoyality = await loyaltyPointModel.findOne({ shop: id });

        if (existLoyality) {
            return res.status(400).json({ success: false, message: "Already exist" })
        }

        const newRate = new loyaltyPointModel({
            shop: id,
            countryName: countryName,
            currencyCode: currencyCode,
            loyaltyRate: numToFixed
        });

        await newRate.save()

        res.status(200).json({ success: true, message: "Loyality Point Created Successfully", data: newRate })
    } catch (error) {

        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const updateLoyaltyRate = async (req, res) => {
    try {
        const { id } = req.params;
        const { loyaltyRate } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Loyalty point ID not get" })
        }

        if (loyaltyRate < 0) {
            return res.status(400).json({ success: false, message: "LoyaltyRate cannot be negative" })
        }

        const numToFixed = parseFloat(loyaltyRate).toFixed(2);

        const updateLoyaltyPoint = await loyaltyPointModel.findByIdAndUpdate(id, { loyaltyRate: numToFixed }, { new: true });

        res.status(200).json({ success: true, message: "Loyality data updated", data: updateLoyaltyPoint })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const deleteLoyaltyPoint = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "Loyality point ID not get" });
        }

        const deleteLoyalityPoint = await loyaltyPointModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Loyality data Deleted", data: deleteLoyalityPoint });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export const getLoyaltyRate = async (req, res) => {
    try {
        const shopId = req.shop.id

        if (!shopId) {
            return res.status(400).json({ success: false, message: "Shop id is not get" });
        }

        const findloyaltyRate = await loyaltyPointModel.findOne({ shop: shopId })

        res.status(200).json({ success: true, message: "Data fetched successfullty", data: findloyaltyRate })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}



export const loyaltyToProduct = async (req, res) => {

    const shopId = req.shop.id;
    const { loyaltyRate } = req.body;

    if (loyaltyRate < 0) {
        return res.status(400).json({ success: false, message: "No negative value" })
    }

    const matchNumber = loyaltyRate.match(/\d+/g)

    if (!matchNumber) {
        return res.status(400).json({ success: false, message: "Enter only numbers" })
    }

    const strToNum = parseFloat(loyaltyRate)

    try {

        await productModel.updateMany({ shop: shopId }, { $set: { loyaltyRate: strToNum } }, { new: true })


        res.status(200).json({ success: true, message: "loyality rate updated" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}