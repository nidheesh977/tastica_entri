import { createSlice } from "@reduxjs/toolkit"




export const commonSlice = createSlice({
    name: "common",
    initialState: {
        isBlur: false,
    },
    reducers: {
        addBackgroundBlur: (state, action) => {
            state.isBlur = action.payload
        },
        removeBackgroundBlur: (state, action) => {
            state.isBlur = action.payload
        }
    }
})

export const { addBackgroundBlur, removeBackgroundBlur } = commonSlice.actions

export default commonSlice.reducer