import productModel from "../../model/productModel.js";

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productExist = await productModel.findById(id);

    if (!productExist) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await productModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "internal server error" });
  }
};