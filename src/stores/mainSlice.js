import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        showSpinner: false,
    },
    reducers: {
        setShowSpinner: (state, action) => {
            state.showSpinner = action.payload;
        },
    }
}) 

export const {
    setShowSpinner,
} = mainSlice.actions

export default mainSlice.reducer