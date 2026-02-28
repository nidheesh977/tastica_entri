import { createSlice } from "@reduxjs/toolkit";


export const vendorSlice = createSlice({
    name: "vendor",
    initialState: {
        vendorDecryptPhone: {
            isDecrypt: false,
            decryptPhoneNumber: null
        }
    }, reducers: {
        setVendorPhoneNumberDecrypt: (state, action) => {
            state.vendorDecryptPhone = action.payload
        }
    }
})

export const {
    setVendorPhoneNumberDecrypt
} = vendorSlice.actions

export default vendorSlice.reducer