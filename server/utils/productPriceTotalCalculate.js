

export const productPriceTotalCalculate = (productExist, quantity) => {

    let productPrice;

    if (productExist?.costPrice > 0) {
        productPrice = productExist?.costPrice
    } else if (productExist?.sellingPrice > 0) {
        productPrice = productExist?.sellingPrice
    }

    let productTotalPrice;

    if (productExist?.costPrice > 0) {
        productTotalPrice = productPrice * quantity
    } else if (productExist?.sellingPrice > 0) {
        productTotalPrice = productPrice * quantity
    }

    return { productPrice, productTotalPrice }
}